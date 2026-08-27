@AGENTS.md

# Monotone — Project Conventions

A digital agency website. **Next.js (App Router) + TypeScript + Tailwind v4 + MDX**, targeting Vercel.

> **Phase 1 = structure only.** Routing, content layer, and cross-links are wired up. **Pages are intentionally blank — plain, unstyled semantic HTML with no component layer and no design tokens yet.** Visual design (components, tokens, styling, motion) is added later, section by section. Do not add styling ahead of that.

## Golden rule: content lives in the content layer

**Never hardcode nav labels, service names, hrefs, or structured content in pages.** Everything comes from `content/` and is consumed through the helpers in `lib/`. A new service, offer, case study, or post should appear across the site (nav, footer, sitemap, cross-links) by editing data only. The header nav and footer in `src/app/layout.tsx` render entirely from `content/site.ts`.

## Folder structure

```
content/              # single source of truth (typed .ts + MDX)
  site.ts             # header nav, footer groups, contact block
  services.ts         # 4 categories (+ sub-services as on-page content)
  offers.ts           # offers
  portfolio.ts        # case studies
  blog/*.mdx          # posts with frontmatter
lib/                  # all shared logic (imported via @/lib/*), at repo root
  blog.ts             # MDX reader (frontmatter + related posts) — server-only
  links.ts            # routes helper + cross-link logic
src/
  app/                # App Router routes, layout (inline header/footer),
                      # sitemap.ts, robots.ts, not-found.tsx, globals.css
```

Styling has begun (Phase 2). `src/components/ui/` holds the primitives
(`Container`, `Section`, `Button`, `Link`) and `src/components/sections/` holds
designed page sections (e.g. `Hero`). Pages not yet designed remain flat plain
HTML. Keep server-only modules (anything importing `node:fs`, e.g. `lib/blog.ts`)
out of Client Components.

## Import aliases

- `@/content/*` → `content/*`  (root)
- `@/lib/*` → `lib/*`  (root, shared logic)
- `@/*` → `src/*`

Longest-prefix match wins, so all three live under one `@` namespace.

## Styling policy

- **Tailwind-first.** Design tokens live once in the `@theme` block in `globals.css` (colors, typography, radii, layout), sourced from Figma. Reference them via utilities (`bg-bg`, `text-fg`, `bg-accent`, `text-hero`, `font-display`, `rounded-pill`, `max-w-page`). **Never hardcode colors** (no raw hex, no `bg-zinc-800`) in markup — if the design needs a value no token covers, add a token. Drop to plain CSS only when Tailwind genuinely can't express something.
- Fonts are wired via `next/font` in `layout.tsx` and exposed as `--font-display` (Parkinsans) and `--font-sans` (Plus Jakarta Sans).
- Design is built **section by section**; only the sections that have been designed carry styling. The header/footer are still their plain placeholder state until their own phase.

## Naming

- Data/lib modules: `camelCase.ts`; content collections exported as plural arrays (`services`, `offers`) with `getX(slug)` lookups and `xSlugs` helpers.
- Routes: kebab-case segments (`/privacy-policy`), dynamic segments `[slug]` / `[category]`.
- Future components: `PascalCase.tsx`, one primary export named for the file.

## Routing

- App Router. Dynamic pages use `generateStaticParams` + async `generateMetadata`, and call `notFound()` for unknown slugs.
- `params` is a Promise — always `await` it. Type page/layout props with the `PageProps<'…'>` / `LayoutProps<'…'>` globals (Next 16).
- Every page carries per-route `metadata`. Global defaults (title template, OG, `metadataBase`) live in `src/app/layout.tsx`.

## Cross-links (no dead ends)

All internal relationships are encoded **once** in `lib/links.ts` and driven by the data. Use `routes.*` for hrefs and the `getX…` helpers for related items — don't rebuild these relationships in pages:

- Category → sub-services (on-page), related portfolio, Offers, Contact.
- Case study → related service, the other case studies, index, Contact.
- Offer → the other offers, index, Contact.
- Post → related posts, related service, index, Contact.
- Process → Offers, Portfolio, Contact.

Every detail page ends with a Contact section so nothing is a dead end.

## Sub-services are intentionally on-page (routes deferred)

Sub-services render as **on-page content on their category page** and carry a `slug` reserved for a future `/services/[category]/[subService]` route. **Those pages are authored in a later phase.** Until then: **no links or CTAs point to sub-service routes.** Do not create the sub-service route files or link to them yet.

## Blog / MDX

- Posts are `.mdx` in `content/blog/` with frontmatter: `title, slug, date, excerpt, cover, tags, relatedServices`.
- Read exclusively through `lib/blog.ts` (never touch the filesystem in a page).
- Rendered with `next-mdx-remote/rsc`. No element-styling map yet — MDX renders default HTML. A styled component map comes with the design phase.

## Animation policy

- `framer-motion` is installed but **nothing is animated yet.** Add motion sparingly and intentionally in a later phase — not as decoration.

## Before launch (later phases)

- Replace placeholder contact details in `content/site.ts` and the real domain in `site.url`.
- Replace placeholder legal copy.
- Add design tokens, components, styling, and a real OG image.
