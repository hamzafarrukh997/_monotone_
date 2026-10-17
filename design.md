# Monotone — Design System

A living reference for the Monotone agency website: visual language, tokens, components, layout, motion, and content rules. Tokens live in `src/app/globals.css` (`@theme`). Prefer tokens and shared modules over one-off styles.

---

## Brand

**Monotone** is a digital agency for design, web development, and growth marketing.

| Attribute | Direction |
| --- | --- |
| Tone | Editorial, confident, direct — not playful or corporate-generic |
| Visual weight | Large display type, generous whitespace, high contrast ink on cream/white |
| Accent | Single brand orange used sparingly for CTAs, emphasis, and interaction |
| Surfaces | Light pages (`#ffffff` / cream accents); dark bands for FAQ / footer |
| Motion | Intentional and sparse — center-expand CTAs, page wipe, hover lifts — not decoration |

Avoid: purple gradients, cream+terracotta clichés, multi-layer shadows, emoji, glow effects as the primary look.

---

## Design tokens

Source of truth: `@theme` in `src/app/globals.css`. Reference via Tailwind utilities (`bg-bg`, `text-fg`, `bg-accent`, `font-display`, `rounded-pill`, `max-w-page`). **Do not hardcode hex in markup** when a token exists; add a token if the design needs a new value.

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#ffffff` | Primary light surface / page background |
| `--color-hero-bg` | `#ffffff` | Hero background |
| `--color-fg` | `#2b2b2b` | Body / UI text on light |
| `--color-accent` | `#ff5a1f` | Brand orange — CTAs, focus, selection, emphasis |
| `--color-accent-foreground` | `#ffffff` | Text on orange |
| `--color-pill` | `#2b2b2b` | Dark pill / ink fills |
| `--color-toggle-a` / `b` | `#d9d9d9` / `#b0b0b0` | Decorative headline toggles |
| `--color-watermark` | `rgb(43 43 43 / 7%)` | Large hero watermark |

**Recurring hard values** (still prefer tokens when adding new UI):

- Ink / dark bands: `#2b2b2b`
- Cream / soft surface: `#f2eee9`
- FAQ / footer text: white / `#f2eee9` at reduced opacity
- Borders on light editorial pages: `#7f7f7f` at ~55–75% opacity, or `#2b2b2b` at ~25%

**Focus & selection**

- `:focus-visible` — 2px accent outline, 2px offset
- `::selection` — accent background, black text

### Typography

| Role | Family | CSS / utility |
| --- | --- | --- |
| Display / headlines | **Parkinsans** | `--font-display` → `font-display` |
| Body / UI | **Plus Jakarta Sans** | `--font-sans` → `font-sans` |

Wired in `src/app/layout.tsx` via `next/font/local` (variable axes roughly 200–800 Jakarta, 300–800 Parkinsans).

| Token | Approx. size | Notes |
| --- | --- | --- |
| `--text-body` | 14px | Base body |
| `--text-hero` | clamp ~44–80px | Hero headline |
| `--text-watermark` | fluid large | Hero watermark |
| `--text-process-title` | 50px | Process cards |
| `--text-process-body` | 26px | Process body |
| `--text-process-step` | 22px | Process step label |

**Editorial habits**

- Display headlines: tight tracking (`-0.05em` to `-0.08em`), leading near `0.9–1.1`, weight often `300–500`
- Section titles on homepage: often ~`clamp(3rem, 4.17vw, 5rem)` with accent span in orange
- Uppercase micro-labels: Jakarta, ~10–12px, wide tracking (`0.12em–0.16em`), semibold
- Accent words inside headlines use `text-accent` (orange), not underline

### Radii & layout

| Token | Value | Use |
| --- | --- | --- |
| `--radius-pill` | `9999px` | Buttons, chips → `rounded-pill` |
| `--container-page` | `120rem` (1920px) | Max content frame → `max-w-page` |

Common page padding: `px-5` → `md:px-8` → `lg:px-10`. Content often `max-w-[120rem] mx-auto`.

Header Figma scale (desktop ≥64rem): brand/nav controls scale from a **1386px** canvas toward **1920px** (`header-brand-scale` / `header-controls-scale`).

---

## Shared interaction modules

### CTA — `home-heading-cta`

Repeatable section / chrome button (Services, Offers, Work, Insights, footer closing CTA, header “Let’s Talk”).

| Spec | Value |
| --- | --- |
| Height | `50px` |
| Font size | `18px` |
| Font weight | `350` |
| Shape | Pill (`rounded-pill`) |
| Default | Orange border, transparent fill, ink text |
| Hover | Center-expand orange fill (`::before` scale), white label |
| Motion | ~900ms expand; label nudge; reduced-motion short-circuits |

**Variants**

- `home-heading-cta--on-dark` — white fill / border for dark surfaces (footer); hover still expands accent
- `home-heading-cta--header` — solid orange default, **black** expand on hover (header “Let’s Talk”)

Markup pattern:

```tsx
<Button variant="secondary" size="lg" className="home-heading-cta …">
  <span className="home-heading-cta__label">Label</span>
</Button>
```

### CTA — `hero-cta`

Hero and some secondary actions (primary / secondary fills). Same center-expand language; primary fills accent, secondary outlines.

### Project request

Header / global “Let’s Talk” opens `ProjectRequestModal` (`lib/projectRequest` event). Form options come from `content/site.ts` → `projectRequest`.

---

## UI primitives

| Component | Path | Role |
| --- | --- | --- |
| `Button` | `src/components/ui/Button.tsx` | Link or button; variants `primary` \| `secondary` \| `ghost` \| `dark` |
| `Link` | `src/components/ui/Link.tsx` | Styled internal/external links |
| `Container` / `Section` | `src/components/ui/` | Layout wrappers (prefer page-level padding patterns above when matching Figma) |

Prefer composing with `home-heading-cta` / `hero-cta` class modules for marketing CTAs rather than inventing new button skins.

---

## Layout chrome

### Header

- Fixed; transparent over content; samples `data-header-theme="dark"` for light text on dark bands
- Hides over footer via `data-header-hide="true"`
- Brand chip + desktop nav (Services dropdown from `content/services.ts`) + `home-heading-cta--header`
- Mobile: brand + Let’s Talk + hamburger → flyout menu
- Desktop nav/brand use Figma canvas scale; header CTA sits **outside** the scale so it matches section CTAs at 50×18

### Footer

- Dark `#2b2b2b` with soft orange/white atmospheric gradients
- Closing CTA block (“Let’s build the website…”) + `home-heading-cta--on-dark`
- Nav groups + email / WhatsApp from `content/site.ts`
- Oversized wordmark (`monotone.`) at the base

### Page transition

- Global orange **page wipe** (`.page-wipe`) on internal navigations — editorial curtain with destination title
- Smooth scroll via Lenis (`SmoothScroll`)
- Custom cursor (`CustomCursor`) — compact over `.hero-cta`

---

## Site map (designed surfaces)

| Route | Intent |
| --- | --- |
| `/` | Homepage stack (see below) |
| `/services` | Index: hero + category sections + FAQ |
| `/services/[category]` | Detail hero + sub-service sections + FAQ |
| `/work` | Work index |
| `/work/[slug]` | Case study detail |
| `/offers` | Offers index / packages |
| `/offers/[slug]` | Offer detail |
| `/blog` | Insights index |
| `/blog/[slug]` | Article + optional FAQ from MDX |
| `/process` | Process page |
| `/contact` | Contact |
| `/privacy-policy`, `/terms`, `/cookie-policy` | Legal |

Content and cross-links: `content/*` + `lib/links.ts`. Never hardcode nav labels or service names in pages.

---

## Homepage composition

Ordered in `src/app/page.tsx` inside `.home-section-stack` (large vertical gaps on desktop):

1. **Hero** — brand-forward; fluid/canvas atmosphere; primary + secondary `hero-cta`; watermark
2. **WorkShowcase** — selected case studies + “View all work” `home-heading-cta`
3. **ServicesShowcase** — expandable service rows + “View all services”
4. **OffersShowcase** — Figma-scaled offer cards + section CTA; guarantee row opens terms popup
5. **ProcessShowcase** — stepped process cards (tokenized title/body/step sizes)
6. **InsightsShowcase** — article grid + “Explore all” (no arrow in CTA)
7. **TestimonialsShowcase** — social proof
8. **FAQShowcase** — dark band; “Your **questions,** answered”

Section rhythm: one job per section — headline (+ optional accent word), short support if needed, one CTA group, then the content block.

---

## Page / section patterns

### Services

- Index categories: large display heading (~up to 90px), intro, Learn more, media, accordion (plus / minus, not chevron)
- Category detail: custom heroes per category (e.g. Design editorial hero); sub-services as on-page sections (no sub-service routes yet)
- FAQ heading (all service FAQs): **Your questions, answered** — no service name in the title

### Offers

- Card art from Figma assets; included / excluded feature arrows
- Guarantee strip is a button; info icon on the right; portal popup for terms

### Work / case studies

- Index with filters / artwork placeholders as designed
- Detail: large display client title, metrics, gallery slots, closing CTA

### Insights / blog

- Index cards with artwork components
- MDX posts; default HTML until a styled MDX map is added

### FAQ

- Dark background; numbered questions; chevron rotate; accordion one-open pattern

---

## Motion policy

- `framer-motion` is available; use sparingly and with purpose
- Always respect `prefers-reduced-motion` (CTA modules already collapse transitions)
- Prefer: CTA expand, page wipe, subtle card lift, accordion height — not continuous ambient animation on every block

---

## Content & engineering rules (design-adjacent)

1. **Content layer first** — copy, nav, services, offers, portfolio, blog live in `content/`; UI reads via `@/content/*` and `@/lib/*`
2. **Tokens first** — new colors/type sizes go in `@theme` before appearing in components
3. **Cross-links** — use `routes.*` and helpers in `lib/links.ts`; every detail path should end toward Contact / related work
4. **Sub-services** — on-page only; do not link to future nested routes yet
5. **Accessibility** — semantic landmarks, `aria-expanded` on disclosures, visible focus rings, skip link in layout

---

## File map (design-relevant)

```
content/                 # site, services, offers, portfolio, blog MDX, home copy
lib/                     # blog reader, links, mail, projectRequest
src/app/globals.css      # tokens + section CSS modules
src/app/layout.tsx       # fonts, header/footer, cursor, wipe, smooth scroll
src/components/ui/       # Button, Link, Container, Section
src/components/layout/   # Header, Footer, modal, transitions
src/components/sections/ # page sections (Hero, showcases, detail heroes, FAQ…)
public/                  # images, offer SVG chrome, FAQ icons, logo
```

---

## Checklist for new UI

- [ ] Copy / links come from `content/` or `lib/links` — not hardcoded in the page
- [ ] Colors and type use tokens or documented module classes
- [ ] Primary marketing buttons reuse `home-heading-cta` or `hero-cta`
- [ ] Height/type for section CTAs stay **50px / 18px / weight 350** unless a variant is intentional
- [ ] Dark surfaces use `--on-dark` or explicit light text; header CTA uses `--header`
- [ ] Hover/focus states keep contrast; keyboard focus remains visible
- [ ] Motion is optional and reduced-motion safe
- [ ] Section does one job: one headline, one supporting line, one CTA group
