/*
Adapted from PavelDoGreat/WebGL-Fluid-Simulation (script.js), MIT License.
https://github.com/PavelDoGreat/WebGL-Fluid-Simulation

Copyright (c) 2017 Pavel Dobryakov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Adapted for the Monotone hero: the demo page (dat.GUI panel, screenshot
capture, promo links, analytics) is stripped; the simulation, shader chain,
splat/pointer math and pipeline order (splat -> curl -> vorticity ->
divergence/pressure/gradient subtract -> advect velocity -> advect dye ->
display) are unchanged. Wrapped as a factory so React owns the lifecycle
(start/stop/destroy) instead of the original's self-driving global script.
Color generation is replaced with a fixed Monotone orange-led sampler in
place of the original's free-roaming HSV cycle. Device pixel ratio is capped
at 1.5 and float-texture support is required outright (no soft fallback) so
the caller can show a static CSS fallback instead.
*/

export interface FluidSimConfig {
  SIM_RESOLUTION: number;
  DYE_RESOLUTION: number;
  DENSITY_DISSIPATION: number;
  VELOCITY_DISSIPATION: number;
  PRESSURE: number;
  PRESSURE_ITERATIONS: number;
  CURL: number;
  SPLAT_RADIUS: number;
  SPLAT_FORCE: number;
  SHADING: boolean;
  BLOOM: boolean;
  SUNRAYS: boolean;
  BACK_COLOR: { r: number; g: number; b: number };
  TRANSPARENT: boolean;
  /** No real pointer tracking; the loop fires gentle ambient splats instead. */
  ambientOnly: boolean;
}

export interface FluidSimHandle {
  start(): void;
  stop(): void;
  /** xRatio/yRatio are 0..1 normalized position within the canvas's CSS box. */
  pointerMove(xRatio: number, yRatio: number): void;
  destroy(): void;
}

const DEFAULT_CONFIG: FluidSimConfig = {
  SIM_RESOLUTION: 96,
  DYE_RESOLUTION: 768,
  DENSITY_DISSIPATION: 2.5,
  VELOCITY_DISSIPATION: 0.2,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 12,
  CURL: 30,
  SPLAT_RADIUS: 0.25,
  SPLAT_FORCE: 6000,
  SHADING: true,
  BLOOM: false,
  SUNRAYS: false,
  BACK_COLOR: { r: 255, g: 255, b: 255 }, // hero --color-hero-bg (#ffffff)
  TRANSPARENT: false,
  ambientOnly: false,
};

// ---------------------------------------------------------------------------
// Monotone brand palette: variations stay tightly centered on #ff5a1f. Most of
// the visual range comes from brightness rather than hue, keeping the fluid
// orange without drifting toward red or yellow against the white hero.
// ---------------------------------------------------------------------------

interface PaletteBand {
  h: number;
  s: number;
  v: number;
  weight: number;
}

const PALETTE_BANDS: PaletteBand[] = [
  { h: 0.044, s: 0.95, v: 0.72, weight: 0.16 }, // deep brand orange
  { h: 0.044, s: 0.92, v: 0.86, weight: 0.28 }, // dark brand orange
  { h: 0.044, s: 0.878, v: 1, weight: 0.56 }, // #ff5a1f
];

const DYE_INTENSITY = 0.86;
const AMBIENT_DYE_BOOST = 1.5;

function pickPaletteBand(): PaletteBand {
  const roll = Math.random();
  let acc = 0;
  for (const band of PALETTE_BANDS) {
    acc += band.weight;
    if (roll <= acc) return band;
  }
  return PALETTE_BANDS[0];
}

function clamp01(input: number) {
  return Math.min(Math.max(input, 0), 1);
}

function generateMonotoneColor() {
  const band = pickPaletteBand();
  const h = band.h;
  // Never lower saturation below the band value: desaturation adds green and
  // makes pale overlaps read yellow against the white hero.
  const s = clamp01(band.s + Math.random() * 0.012);
  const v = clamp01(band.v - Math.random() * 0.035);
  const c = HSVtoRGB(h, s, v);
  c.r *= DYE_INTENSITY;
  c.g *= DYE_INTENSITY;
  c.b *= DYE_INTENSITY;
  return c;
}

function HSVtoRGB(h: number, s: number, v: number) {
  let r = 0;
  let g = 0;
  let b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return { r, g, b };
}

function normalizeColor(input: { r: number; g: number; b: number }) {
  return { r: input.r / 255, g: input.g / 255, b: input.b / 255 };
}

function hashCode(s: string) {
  if (s.length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function scaleByPixelRatio(input: number) {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  return Math.floor(input * pixelRatio);
}

function correctDeltaX(delta: number, aspectRatio: number) {
  return aspectRatio < 1 ? delta * aspectRatio : delta;
}

function correctDeltaY(delta: number, aspectRatio: number) {
  return aspectRatio > 1 ? delta / aspectRatio : delta;
}

function correctRadius(radius: number, aspectRatio: number) {
  return aspectRatio > 1 ? radius * aspectRatio : radius;
}

// ---------------------------------------------------------------------------
// WebGL plumbing, parameterized by an explicit gl context (the original
// closed over a single global `gl`; here each hero mount gets its own).
// ---------------------------------------------------------------------------

type GL = WebGLRenderingContext | WebGL2RenderingContext;

interface TextureFormat {
  internalFormat: number;
  format: number;
}

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach(id: number): number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap(): void;
}

function supportRenderTextureFormat(gl: GL, internalFormat: number, format: number, type: number) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  return status === gl.FRAMEBUFFER_COMPLETE;
}

function getSupportedFormat(gl: GL, internalFormat: number, format: number, type: number): TextureFormat | null {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    const gl2 = gl as WebGL2RenderingContext;
    switch (internalFormat) {
      case gl2.R16F:
        return getSupportedFormat(gl, gl2.RG16F, gl2.RG, type);
      case gl2.RG16F:
        return getSupportedFormat(gl, gl2.RGBA16F, gl.RGBA, type);
      default:
        return null;
    }
  }
  return { internalFormat, format };
}

interface WebGLSetup {
  gl: GL;
  isWebGL2: boolean;
  ext: {
    formatRGBA: TextureFormat | null;
    formatRG: TextureFormat | null;
    formatR: TextureFormat | null;
    halfFloatTexType: number;
    supportLinearFiltering: boolean;
  };
}

function getWebGLSetup(canvas: HTMLCanvasElement): WebGLSetup | null {
  const params: WebGLContextAttributes = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };

  let gl: GL | null = canvas.getContext("webgl2", params) as WebGL2RenderingContext | null;
  const isWebGL2 = !!gl;
  if (!gl) {
    gl = (canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params)) as WebGLRenderingContext | null;
  }
  if (!gl) return null;

  let halfFloat: { HALF_FLOAT_OES: number } | null = null;
  let supportLinearFiltering: boolean;
  if (isWebGL2) {
    (gl as WebGL2RenderingContext).getExtension("EXT_color_buffer_float");
    supportLinearFiltering = !!gl.getExtension("OES_texture_float_linear");
  } else {
    halfFloat = gl.getExtension("OES_texture_half_float");
    if (!halfFloat) return null;
    supportLinearFiltering = !!gl.getExtension("OES_texture_half_float_linear");
  }

  const halfFloatTexType = isWebGL2 ? (gl as WebGL2RenderingContext).HALF_FLOAT : halfFloat!.HALF_FLOAT_OES;
  let formatRGBA: TextureFormat | null;
  let formatRG: TextureFormat | null;
  let formatR: TextureFormat | null;

  if (isWebGL2) {
    const gl2 = gl as WebGL2RenderingContext;
    formatRGBA = getSupportedFormat(gl, gl2.RGBA16F, gl2.RGBA, halfFloatTexType);
    formatRG = getSupportedFormat(gl, gl2.RG16F, gl2.RG, halfFloatTexType);
    formatR = getSupportedFormat(gl, gl2.R16F, gl2.RED, halfFloatTexType);
  } else {
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    formatRG = formatRGBA;
    formatR = formatRGBA;
  }

  if (!formatRGBA || !formatRG || !formatR) return null;

  return {
    gl,
    isWebGL2,
    ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering },
  };
}

function addKeywords(source: string, keywords: string[] | null) {
  if (keywords == null) return source;
  let keywordsString = "";
  keywords.forEach((keyword) => {
    keywordsString += "#define " + keyword + "\n";
  });
  return keywordsString + source;
}

function compileShader(gl: GL, type: number, source: string, keywords: string[] | null = null) {
  const shaderSource = addKeywords(source, keywords);
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

function createProgram(gl: GL, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
  }
  return program;
}

function getUniforms(gl: GL, program: WebGLProgram) {
  const uniforms: Record<string, WebGLUniformLocation> = {};
  const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < uniformCount; i++) {
    const info = gl.getActiveUniform(program, i)!;
    uniforms[info.name] = gl.getUniformLocation(program, info.name)!;
  }
  return uniforms;
}

class Program {
  gl: GL;
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation>;

  constructor(gl: GL, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    this.gl = gl;
    this.program = createProgram(gl, vertexShader, fragmentShader);
    this.uniforms = getUniforms(gl, this.program);
  }

  bind() {
    this.gl.useProgram(this.program);
  }
}

class Material {
  gl: GL;
  vertexShader: WebGLShader;
  fragmentShaderSource: string;
  programs: Record<number, WebGLProgram>;
  activeProgram: WebGLProgram | null;
  uniforms: Record<string, WebGLUniformLocation>;

  constructor(gl: GL, vertexShader: WebGLShader, fragmentShaderSource: string) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShaderSource = fragmentShaderSource;
    this.programs = {};
    this.activeProgram = null;
    this.uniforms = {};
  }

  setKeywords(keywords: string[]) {
    let hash = 0;
    for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);

    let program = this.programs[hash];
    if (program == null) {
      const fragmentShader = compileShader(this.gl, this.gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
      program = createProgram(this.gl, this.vertexShader, fragmentShader);
      this.programs[hash] = program;
    }
    if (program === this.activeProgram) return;
    this.uniforms = getUniforms(this.gl, program);
    this.activeProgram = program;
  }

  bind() {
    this.gl.useProgram(this.activeProgram);
  }
}

// ---------------------------------------------------------------------------
// Shader sources (verbatim from the canonical sim) — pipeline order and math
// are untouched.
// ---------------------------------------------------------------------------

const baseVertexShaderSource = `
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`;

const blurVertexShaderSource = `
    precision highp float;

    attribute vec2 aPosition;
    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform vec2 texelSize;

    void main () {
        vUv = aPosition * 0.5 + 0.5;
        float offset = 1.33333333;
        vL = vUv - texelSize * offset;
        vR = vUv + texelSize * offset;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`;

const blurShaderSource = `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
        sum += texture2D(uTexture, vL) * 0.35294117;
        sum += texture2D(uTexture, vR) * 0.35294117;
        gl_FragColor = sum;
    }
`;

const copyShaderSource = `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        gl_FragColor = texture2D(uTexture, vUv);
    }
`;

const clearShaderSource = `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    uniform sampler2D uTexture;
    uniform float value;

    void main () {
        gl_FragColor = value * texture2D(uTexture, vUv);
    }
`;

const colorShaderSource = `
    precision mediump float;

    uniform vec4 color;

    void main () {
        gl_FragColor = color;
    }
`;

const displayShaderSource = `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        // Use the fluid surface normals for white highlights instead of the
        // original multiplicative shading, which produced dark contours.
        float contour = 1.0 - clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c = mix(c, vec3(1.0), contour * 0.3);
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        // Dense splats can accumulate above 1.0. Normalize them before the
        // browser clamps the framebuffer so #ff5a1f does not shift yellow as
        // its red channel reaches the ceiling ahead of green.
        float peak = max(c.r, max(c.g, c.b));
        if (peak > 1.0) c /= peak;

        // Slightly stronger alpha keeps deeper oranges from washing toward
        // white immediately as they dissipate over the hero background.
        float visiblePeak = max(c.r, max(c.g, c.b));
        // Keep the active fluid at its intended saturated hue instead of
        // letting lower dye density turn it into a pale tint over white.
        vec3 displayColor = visiblePeak > 0.0001 ? c / visiblePeak : vec3(0.0);
        // Let opacity track the remaining dye density so the trail softens
        // continuously as it spreads instead of ending with a hard cutoff.
        float a = clamp(visiblePeak, 0.0, 1.0);
        gl_FragColor = vec4(displayColor * a, a);
    }
`;

const bloomPrefilterShaderSource = `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform vec3 curve;
    uniform float threshold;

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;
        float br = max(c.r, max(c.g, c.b));
        float rq = clamp(br - curve.x, 0.0, curve.y);
        rq = curve.z * rq * rq;
        c *= max(rq, br - threshold) / max(br, 0.0001);
        gl_FragColor = vec4(c, 0.0);
    }
`;

const bloomBlurShaderSource = `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum;
    }
`;

const bloomFinalShaderSource = `
    precision mediump float;
    precision mediump sampler2D;

    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform float intensity;

    void main () {
        vec4 sum = vec4(0.0);
        sum += texture2D(uTexture, vL);
        sum += texture2D(uTexture, vR);
        sum += texture2D(uTexture, vT);
        sum += texture2D(uTexture, vB);
        sum *= 0.25;
        gl_FragColor = sum * intensity;
    }
`;

const sunraysMaskShaderSource = `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main () {
        vec4 c = texture2D(uTexture, vUv);
        float br = max(c.r, max(c.g, c.b));
        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
        gl_FragColor = c;
    }
`;

const sunraysShaderSource = `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float weight;

    #define ITERATIONS 16

    void main () {
        float Density = 0.3;
        float Decay = 0.95;
        float Exposure = 0.7;

        vec2 coord = vUv;
        vec2 dir = vUv - 0.5;

        dir *= 1.0 / float(ITERATIONS) * Density;
        float illuminationDecay = 1.0;

        float color = texture2D(uTexture, vUv).a;

        for (int i = 0; i < ITERATIONS; i++)
        {
            coord -= dir;
            float col = texture2D(uTexture, coord).a;
            color += col * illuminationDecay * weight;
            illuminationDecay *= Decay;
        }

        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
    }
`;

const splatShaderSource = `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTarget;
    uniform float aspectRatio;
    uniform vec3 color;
    uniform vec2 point;
    uniform float radius;

    void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
    }
`;

const advectionShaderSource = `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uVelocity;
    uniform sampler2D uSource;
    uniform vec2 texelSize;
    uniform vec2 dyeTexelSize;
    uniform float dt;
    uniform float dissipation;

    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv / tsize - 0.5;

        vec2 iuv = floor(st);
        vec2 fuv = fract(st);

        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
    }

    void main () {
    #ifdef MANUAL_FILTERING
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
        vec4 result = bilerp(uSource, coord, dyeTexelSize);
    #else
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        vec4 result = texture2D(uSource, coord);
    #endif
        float decay = 1.0 + dissipation * dt;
        gl_FragColor = result / decay;
    }
`;

const divergenceShaderSource = `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
    }
`;

const curlShaderSource = `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
    }
`;

const vorticityShaderSource = `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uVelocity;
    uniform sampler2D uCurl;
    uniform float curl;
    uniform float dt;

    void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity += force * dt;
        velocity = min(max(velocity, -1000.0), 1000.0);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`;

const pressureShaderSource = `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uDivergence;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
    }
`;

const gradientSubtractShaderSource = `
    precision mediump float;
    precision mediump sampler2D;

    varying highp vec2 vUv;
    varying highp vec2 vL;
    varying highp vec2 vR;
    varying highp vec2 vT;
    varying highp vec2 vB;
    uniform sampler2D uPressure;
    uniform sampler2D uVelocity;

    void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
    }
`;

const checkerboardShaderSource = `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    uniform sampler2D uTexture;
    uniform float aspectRatio;

    #define SCALE 25.0

    void main () {
        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
        float v = mod(uv.x + uv.y, 2.0);
        v = v * 0.1 + 0.8;
        gl_FragColor = vec4(vec3(v), 1.0);
    }
`;

// ---------------------------------------------------------------------------
// Factory: everything below is per-instance state, torn down on destroy().
// ---------------------------------------------------------------------------

export function createFluidSim(canvas: HTMLCanvasElement, overrides: Partial<FluidSimConfig> = {}): FluidSimHandle | null {
  const config: FluidSimConfig = { ...DEFAULT_CONFIG, ...overrides };

  function resizeCanvasInternal() {
    const width = scaleByPixelRatio(canvas.clientWidth);
    const height = scaleByPixelRatio(canvas.clientHeight);
    if (width === 0 || height === 0) return false;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      return true;
    }
    return false;
  }

  resizeCanvasInternal();

  const setup = getWebGLSetup(canvas);
  if (!setup) return null;
  const { gl, ext } = setup;

  if (!ext.supportLinearFiltering) {
    config.DYE_RESOLUTION = 512;
    config.SHADING = false;
  }

  gl.clearColor(1, 1, 1, 1);

  const baseVertexShader = compileShader(gl, gl.VERTEX_SHADER, baseVertexShaderSource);
  const blurVertexShader = config.SUNRAYS
    ? compileShader(gl, gl.VERTEX_SHADER, blurVertexShaderSource)
    : null;
  const blurShader = config.SUNRAYS
    ? compileShader(gl, gl.FRAGMENT_SHADER, blurShaderSource)
    : null;
  const copyShader = compileShader(gl, gl.FRAGMENT_SHADER, copyShaderSource);
  const clearShader = compileShader(gl, gl.FRAGMENT_SHADER, clearShaderSource);
  const colorShader = compileShader(gl, gl.FRAGMENT_SHADER, colorShaderSource);
  const checkerboardShader = compileShader(gl, gl.FRAGMENT_SHADER, checkerboardShaderSource);
  const bloomPrefilterShader = config.BLOOM
    ? compileShader(gl, gl.FRAGMENT_SHADER, bloomPrefilterShaderSource)
    : null;
  const bloomBlurShader = config.BLOOM
    ? compileShader(gl, gl.FRAGMENT_SHADER, bloomBlurShaderSource)
    : null;
  const bloomFinalShader = config.BLOOM
    ? compileShader(gl, gl.FRAGMENT_SHADER, bloomFinalShaderSource)
    : null;
  const sunraysMaskShader = config.SUNRAYS
    ? compileShader(gl, gl.FRAGMENT_SHADER, sunraysMaskShaderSource)
    : null;
  const sunraysShader = config.SUNRAYS
    ? compileShader(gl, gl.FRAGMENT_SHADER, sunraysShaderSource)
    : null;
  const splatShader = compileShader(gl, gl.FRAGMENT_SHADER, splatShaderSource);
  const advectionShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    advectionShaderSource,
    ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"],
  );
  const divergenceShader = compileShader(gl, gl.FRAGMENT_SHADER, divergenceShaderSource);
  const curlShader = compileShader(gl, gl.FRAGMENT_SHADER, curlShaderSource);
  const vorticityShader = compileShader(gl, gl.FRAGMENT_SHADER, vorticityShaderSource);
  const pressureShader = compileShader(gl, gl.FRAGMENT_SHADER, pressureShaderSource);
  const gradientSubtractShader = compileShader(gl, gl.FRAGMENT_SHADER, gradientSubtractShaderSource);

  const blurProgram = blurVertexShader && blurShader
    ? new Program(gl, blurVertexShader, blurShader)
    : null;
  const copyProgram = new Program(gl, baseVertexShader, copyShader);
  const clearProgram = new Program(gl, baseVertexShader, clearShader);
  const colorProgram = new Program(gl, baseVertexShader, colorShader);
  const checkerboardProgram = new Program(gl, baseVertexShader, checkerboardShader);
  const bloomPrefilterProgram = bloomPrefilterShader
    ? new Program(gl, baseVertexShader, bloomPrefilterShader)
    : null;
  const bloomBlurProgram = bloomBlurShader
    ? new Program(gl, baseVertexShader, bloomBlurShader)
    : null;
  const bloomFinalProgram = bloomFinalShader
    ? new Program(gl, baseVertexShader, bloomFinalShader)
    : null;
  const sunraysMaskProgram = sunraysMaskShader
    ? new Program(gl, baseVertexShader, sunraysMaskShader)
    : null;
  const sunraysProgram = sunraysShader
    ? new Program(gl, baseVertexShader, sunraysShader)
    : null;
  const splatProgram = new Program(gl, baseVertexShader, splatShader);
  const advectionProgram = new Program(gl, baseVertexShader, advectionShader);
  const divergenceProgram = new Program(gl, baseVertexShader, divergenceShader);
  const curlProgram = new Program(gl, baseVertexShader, curlShader);
  const vorticityProgram = new Program(gl, baseVertexShader, vorticityShader);
  const pressureProgram = new Program(gl, baseVertexShader, pressureShader);
  const gradienSubtractProgram = new Program(gl, baseVertexShader, gradientSubtractShader);
  const displayMaterial = new Material(gl, baseVertexShader, displayShaderSource);

  const allPrograms = [
    blurProgram, copyProgram, clearProgram, colorProgram, checkerboardProgram,
    bloomPrefilterProgram, bloomBlurProgram, bloomFinalProgram, sunraysMaskProgram,
    sunraysProgram, splatProgram, advectionProgram, divergenceProgram, curlProgram,
    vorticityProgram, pressureProgram, gradienSubtractProgram,
  ].filter((program): program is Program => program !== null);

  function updateKeywords() {
    const displayKeywords: string[] = [];
    if (config.SHADING) displayKeywords.push("SHADING");
    if (config.BLOOM) displayKeywords.push("BLOOM");
    if (config.SUNRAYS) displayKeywords.push("SUNRAYS");
    displayMaterial.setKeywords(displayKeywords);
  }

  const blit = (() => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    return (target: FBO | null) => {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  })();

  function getResolution(resolution: number) {
    let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
    const min = Math.round(resolution);
    const max = Math.round(resolution * aspectRatio);
    return gl.drawingBufferWidth > gl.drawingBufferHeight ? { width: max, height: min } : { width: min, height: max };
  }

  function getTextureScale(texture: FBO, width: number, height: number) {
    return { x: width / texture.width, y: height / texture.height };
  }

  function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    const fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return {
      texture,
      fbo,
      width: w,
      height: h,
      texelSizeX: 1.0 / w,
      texelSizeY: 1.0 / h,
      attach(id: number) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      },
    };
  }

  function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
    let fbo1 = createFBO(w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(w, h, internalFormat, format, type, param);
    return {
      width: w,
      height: h,
      texelSizeX: fbo1.texelSizeX,
      texelSizeY: fbo1.texelSizeY,
      get read() { return fbo1; },
      set read(value) { fbo1 = value; },
      get write() { return fbo2; },
      set write(value) { fbo2 = value; },
      swap() {
        const temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      },
    };
  }

  function resizeFBO(target: FBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
    const newFbo = createFBO(w, h, internalFormat, format, type, param);
    copyProgram.bind();
    gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
    blit(newFbo);
    return newFbo;
  }

  function resizeDoubleFBO(target: DoubleFBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
    if (target.width === w && target.height === h) return target;
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
    target.write = createFBO(w, h, internalFormat, format, type, param);
    target.width = w;
    target.height = h;
    target.texelSizeX = 1.0 / w;
    target.texelSizeY = 1.0 / h;
    return target;
  }

  let dye: DoubleFBO;
  let velocity: DoubleFBO;
  let divergence: FBO;
  let curl: FBO;
  let pressure: DoubleFBO;
  let bloom: FBO;
  let bloomFramebuffers: FBO[] = [];
  let sunrays: FBO;
  let sunraysTemp: FBO;

  function initBloomFramebuffers() {
    const res = getResolution(768);
    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA!;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    bloom = createFBO(res.width, res.height, rgba.internalFormat, rgba.format, texType, filtering);
    bloomFramebuffers = [];
    for (let i = 0; i < 8; i++) {
      const width = res.width >> (i + 1);
      const height = res.height >> (i + 1);
      if (width < 2 || height < 2) break;
      bloomFramebuffers.push(createFBO(width, height, rgba.internalFormat, rgba.format, texType, filtering));
    }
  }

  function initSunraysFramebuffers() {
    const res = getResolution(196);
    const texType = ext.halfFloatTexType;
    const r = ext.formatR!;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
    sunrays = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering);
    sunraysTemp = createFBO(res.width, res.height, r.internalFormat, r.format, texType, filtering);
  }

  function initFramebuffers() {
    const simRes = getResolution(config.SIM_RESOLUTION);
    const dyeRes = getResolution(config.DYE_RESOLUTION);
    const texType = ext.halfFloatTexType;
    const rgba = ext.formatRGBA!;
    const rg = ext.formatRG!;
    const r = ext.formatR!;
    const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

    gl.disable(gl.BLEND);

    dye = dye == null
      ? createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)
      : resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);

    velocity = velocity == null
      ? createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)
      : resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);

    divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);

    if (config.BLOOM) initBloomFramebuffers();
    if (config.SUNRAYS) initSunraysFramebuffers();
  }

  updateKeywords();
  initFramebuffers();

  // ---- simulation step / render (pipeline order untouched) ----

  function step(dt: number) {
    gl.disable(gl.BLEND);

    curlProgram.bind();
    gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(curl);

    vorticityProgram.bind();
    gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
    gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
    gl.uniform1f(vorticityProgram.uniforms.dt, dt);
    blit(velocity.write);
    velocity.swap();

    divergenceProgram.bind();
    gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
    blit(divergence);

    clearProgram.bind();
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
    gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
    blit(pressure.write);
    pressure.swap();

    pressureProgram.bind();
    gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
    for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
      gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
      blit(pressure.write);
      pressure.swap();
    }

    gradienSubtractProgram.bind();
    gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
    gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    advectionProgram.bind();
    gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
    if (!ext.supportLinearFiltering) {
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
    }
    const velocityId = velocity.read.attach(0);
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
    gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
    gl.uniform1f(advectionProgram.uniforms.dt, dt);
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
    blit(velocity.write);
    velocity.swap();

    if (!ext.supportLinearFiltering) {
      gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
    }
    gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
    gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
    gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
    blit(dye.write);
    dye.swap();
  }

  function drawColor(target: FBO | null, color: { r: number; g: number; b: number }) {
    colorProgram.bind();
    gl.uniform4f(colorProgram.uniforms.color, color.r, color.g, color.b, 1);
    blit(target);
  }

  function drawCheckerboard(target: FBO | null) {
    checkerboardProgram.bind();
    gl.uniform1f(checkerboardProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    blit(target);
  }

  function drawDisplay(target: FBO | null) {
    const width = target == null ? gl.drawingBufferWidth : target.width;
    const height = target == null ? gl.drawingBufferHeight : target.height;

    displayMaterial.bind();
    if (config.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height);
    gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
    if (config.BLOOM) {
      gl.uniform1i(displayMaterial.uniforms.uBloom, bloom.attach(1));
      const scale = getTextureScale(bloom, width, height);
      gl.uniform2f(displayMaterial.uniforms.ditherScale, scale.x, scale.y);
    }
    if (config.SUNRAYS) gl.uniform1i(displayMaterial.uniforms.uSunrays, sunrays.attach(3));
    blit(target);
  }

  function blur(target: FBO, temp: FBO, iterations: number) {
    if (!blurProgram) return;
    blurProgram.bind();
    for (let i = 0; i < iterations; i++) {
      gl.uniform2f(blurProgram.uniforms.texelSize, target.texelSizeX, 0.0);
      gl.uniform1i(blurProgram.uniforms.uTexture, target.attach(0));
      blit(temp);
      gl.uniform2f(blurProgram.uniforms.texelSize, 0.0, target.texelSizeY);
      gl.uniform1i(blurProgram.uniforms.uTexture, temp.attach(0));
      blit(target);
    }
  }

  function applyBloom(source: FBO, destination: FBO) {
    if (
      !bloomPrefilterProgram ||
      !bloomBlurProgram ||
      !bloomFinalProgram ||
      bloomFramebuffers.length < 2
    ) {
      return;
    }
    let last = destination;

    gl.disable(gl.BLEND);
    bloomPrefilterProgram.bind();
    const knee = 0.6 * 0.7 + 0.0001;
    const curve0 = 0.6 - knee;
    const curve1 = knee * 2;
    const curve2 = 0.25 / knee;
    gl.uniform3f(bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
    gl.uniform1f(bloomPrefilterProgram.uniforms.threshold, 0.6);
    gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
    blit(last);

    bloomBlurProgram.bind();
    for (let i = 0; i < bloomFramebuffers.length; i++) {
      const dest = bloomFramebuffers[i];
      gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
      blit(dest);
      last = dest;
    }

    gl.blendFunc(gl.ONE, gl.ONE);
    gl.enable(gl.BLEND);

    for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
      const baseTex = bloomFramebuffers[i];
      gl.uniform2f(bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
      gl.viewport(0, 0, baseTex.width, baseTex.height);
      blit(baseTex);
      last = baseTex;
    }

    gl.disable(gl.BLEND);
    bloomFinalProgram.bind();
    gl.uniform2f(bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
    gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
    gl.uniform1f(bloomFinalProgram.uniforms.intensity, 0.8);
    blit(destination);
  }

  function applySunrays(source: FBO, mask: FBO, destination: FBO) {
    if (!sunraysMaskProgram || !sunraysProgram) return;
    gl.disable(gl.BLEND);
    sunraysMaskProgram.bind();
    gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
    blit(mask);

    sunraysProgram.bind();
    gl.uniform1f(sunraysProgram.uniforms.weight, 1.0);
    gl.uniform1i(sunraysProgram.uniforms.uTexture, mask.attach(0));
    blit(destination);
  }

  function render(target: FBO | null) {
    if (config.BLOOM) applyBloom(dye.read, bloom);
    if (config.SUNRAYS) {
      applySunrays(dye.read, dye.write, sunrays);
      blur(sunrays, sunraysTemp, 1);
    }

    if (target == null || !config.TRANSPARENT) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
    } else {
      gl.disable(gl.BLEND);
    }

    if (!config.TRANSPARENT) drawColor(target, normalizeColor(config.BACK_COLOR));
    if (target == null && config.TRANSPARENT) drawCheckerboard(target);
    drawDisplay(target);
  }

  function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
    splatProgram.bind();
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
    gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.uniforms.point, x, y);
    gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0, canvas.width / canvas.height));
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
    gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
    blit(dye.write);
    dye.swap();
  }

  function multipleSplats(amount: number) {
    for (let i = 0; i < amount; i++) {
      const color = generateMonotoneColor();
      color.r *= AMBIENT_DYE_BOOST;
      color.g *= AMBIENT_DYE_BOOST;
      color.b *= AMBIENT_DYE_BOOST;
      const x = Math.random();
      const y = Math.random();
      const dx = 1000 * (Math.random() - 0.5);
      const dy = 1000 * (Math.random() - 0.5);
      splat(x, y, dx, dy, color);
    }
  }

  // ---- pointer state (single hover pointer; touch uses ambient splats instead) ----

  const pointer = {
    texcoordX: 0.5,
    texcoordY: 0.5,
    prevTexcoordX: 0.5,
    prevTexcoordY: 0.5,
    deltaX: 0,
    deltaY: 0,
    moved: false,
    color: generateMonotoneColor(),
  };
  let lastMoveTime = 0;
  let lastRecolorTime = 0;
  const RECOLOR_INTERVAL_MS = 700;
  const IDLE_RESET_MS = 250;

  function pointerMove(xRatio: number, yRatio: number) {
    const now = performance.now();
    const aspectRatio = canvas.width / canvas.height;

    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = xRatio;
    pointer.texcoordY = 1.0 - yRatio;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX, aspectRatio);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY, aspectRatio);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;

    const idleReset = now - lastMoveTime > IDLE_RESET_MS;
    if (idleReset || now - lastRecolorTime > RECOLOR_INTERVAL_MS) {
      pointer.color = generateMonotoneColor();
      lastRecolorTime = now;
    }
    lastMoveTime = now;
  }

  function splatPointer() {
    const dx = pointer.deltaX * config.SPLAT_FORCE;
    const dy = pointer.deltaY * config.SPLAT_FORCE;
    splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
  }

  // ---- loop ----

  let rafHandle = 0;
  let lastUpdateTime = performance.now();
  let ambientAccum = 0;
  let nextAmbientDelay = 0.6;

  function calcDeltaTime(now: number) {
    let dt = (now - lastUpdateTime) / 1000;
    dt = Math.min(dt, 0.016666);
    lastUpdateTime = now;
    return dt;
  }

  function frameLoop(time: number) {
    const dt = calcDeltaTime(time);
    if (resizeCanvasInternal()) initFramebuffers();

    if (config.ambientOnly) {
      ambientAccum += dt;
      if (ambientAccum > nextAmbientDelay) {
        ambientAccum = 0;
        nextAmbientDelay = 1.4 + Math.random() * 1.2;
        multipleSplats(1);
      }
    } else if (pointer.moved) {
      pointer.moved = false;
      splatPointer();
    }

    step(dt);
    render(null);
    rafHandle = requestAnimationFrame(frameLoop);
  }

  function start() {
    if (rafHandle) return;
    lastUpdateTime = performance.now();
    rafHandle = requestAnimationFrame(frameLoop);
  }

  function stop() {
    if (rafHandle) cancelAnimationFrame(rafHandle);
    rafHandle = 0;
  }

  function disposeFBO(target: FBO | null | undefined) {
    if (!target) return;
    gl.deleteTexture(target.texture);
    gl.deleteFramebuffer(target.fbo);
  }

  function disposeDoubleFBO(target: DoubleFBO | null | undefined) {
    if (!target) return;
    disposeFBO(target.read);
    disposeFBO(target.write);
  }

  function destroy() {
    stop();

    disposeDoubleFBO(dye);
    disposeDoubleFBO(velocity);
    disposeDoubleFBO(pressure);
    disposeFBO(divergence);
    disposeFBO(curl);
    disposeFBO(bloom);
    bloomFramebuffers.forEach(disposeFBO);
    disposeFBO(sunrays);
    disposeFBO(sunraysTemp);

    allPrograms.forEach((p) => gl.deleteProgram(p.program));
    Object.values(displayMaterial.programs).forEach((p) => gl.deleteProgram(p));

    [
      baseVertexShader, blurVertexShader, blurShader, copyShader, clearShader, colorShader,
      checkerboardShader, bloomPrefilterShader, bloomBlurShader, bloomFinalShader,
      sunraysMaskShader, sunraysShader, splatShader, advectionShader, divergenceShader,
      curlShader, vorticityShader, pressureShader, gradientSubtractShader,
    ]
      .filter((shader): shader is WebGLShader => shader !== null)
      .forEach((shader) => gl.deleteShader(shader));

    const loseContext = gl.getExtension("WEBGL_lose_context");
    loseContext?.loseContext();
  }

  return { start, stop, pointerMove, destroy };
}
