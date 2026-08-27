@AGENTS.md

# Monotone — Project Conventions

A digital agency website. **Next.js (App Router) + TypeScript + Tailwind v4 + MDX**, targeting Vercel.

> **Phase 1 = scaffold.** Structure, content layer, routing, and cross-links only. Visual design is deliberately neutral and comes later, section by section. Do not invest in visual fidelity yet.

## Golden rule: content lives in the content layer

**Never hardcode nav labels, service names, hrefs, or structured content in pages or components.** Everything comes from `content/` and is consumed through the helpers in `lib/`. A new service, offer, case study, or post should appear across the site (nav, footer, sitemap, cross-links) by editing data only.

## Folder structure

```
content/              # single source of truth (typed .ts + MDX)
  site.ts             # header nav, footer groups, contact block
  services.ts         # 4 categories (+ sub-services as on-page content)
  offers.ts           # offers
  portfolio.ts        # case studies
  blog/*.mdx          # posts with frontmatter
lib/                  # all shared logic (imported via @/lib/*)
  blog.ts             # MDX reader (frontmatter + related posts) — server-only
  links.ts            # routes helper + cross-link logic
  cn.ts               # className joiner — client-safe
src/
  app/                # App Router routes, sitemap.ts, robots.ts
  components/
    ui/               # primitives: Container, Section, Card, Button, Link, PageHeader
    layout/           # Header, Footer (render entirely from content/site.ts)
    *.tsx             # composed blocks (ContactCTA, LegalPage, mdx)
```
Note: `lib/` lives at the repo root (not under `src/`). Keep server-only
modules (anything importing `node:fs`) out of Client Components.

## Import aliases

- `@/content/*` → `content/*`  (root)
- `@/lib/*` → `lib/*`  (root, server data logic)
- `@/*` → `src/*`  (app, components, client helpers)

Longest-prefix match wins, so all three live under one `@` namespace.

## Tailwind-first

- **Use Tailwind utilities for everything.** Drop to plain CSS only when Tailwind genuinely can't express it (e.g. the focus-visible base rule in `globals.css`).
- **Design tokens** are defined once in the `@theme` block in `src/app/globals.css` (colors, typography, radii, shadows, layout). They are neutral, monochrome placeholders — swap the values there and the whole site follows. Utilities generated include `bg-surface`, `text-muted`, `border-border`, `rounded-lg`, `shadow-card`, `text-display/title/heading/lead`, `max-w-page`, `py-section`.
- **Never hardcode colors** (no `#hex`, no `bg-zinc-800`) in components — use token utilities.

## Naming

- Components: `PascalCase.tsx`, one primary export named for the file.
- Data/lib modules: `camelCase.ts`; content collections exported as plural arrays (`services`, `offers`) with `getX(slug)` lookups and `xSlugs` helpers.
- Routes: kebab-case segments (`/privacy-policy`), dynamic segments `[slug]` / `[category]`.

## Routing

- App Router. Dynamic pages use `generateStaticParams` + async `generateMetadata`, and call `notFound()` for unknown slugs.
- `params` is a Promise — always `await` it. Type page/layout props with the `PageProps<'…'>` / `LayoutProps<'…'>` globals (Next 16).
- Every page carries per-route `metadata`. Global defaults (title template, OG, `metadataBase`) live in `src/app/layout.tsx`.

## Cross-links (no dead ends)

All internal relationships are encoded **once** in `lib/links.ts` and driven by the data:

- Category → sub-services (on-page), related portfolio, Offers, Contact CTA.
- Case study → related service, the other case studies, index, Contact CTA.
- Offer → the other offers, index, Contact CTA.
- Post → related posts, related service, index, Contact CTA.
- Process → Offers, Portfolio, Contact CTA.

Use `routes.*` for hrefs and the `getX…` helpers for related items — don't rebuild these relationships in pages. `ContactCTA` closes every detail page.

## Sub-services are intentionally on-page (routes deferred)

Sub-services render as **cards/text on their category page** and carry a `slug` reserved for a future `/services/[category]/[subService]` route. **Those pages are authored in a later phase.** Until then: **no links or CTAs point to sub-service routes.** Do not create the sub-service route files or link to them yet.

## Animation policy

- `framer-motion` is installed but **nothing is animated yet.** Add motion sparingly and intentionally in a later phase — not as decoration.

## Blog / MDX

- Posts are `.mdx` in `content/blog/` with frontmatter: `title, slug, date, excerpt, cover, tags, relatedServices`.
- Read exclusively through `lib/blog.ts` (never touch the filesystem in a page).
- Rendered with `next-mdx-remote/rsc`; element styling comes from `src/components/mdx.tsx`.

## Accessibility & SEO baseline

- Semantic landmarks (`header`/`nav`/`main`/`footer`/`section` with labels), a skip link, visible `:focus-visible` ring, alt text on images.
- Generated `sitemap.xml` and `robots.txt` derive from the content layer. Keep them data-driven.

## Before launch (later phases)

- Replace placeholder contact details in `content/site.ts` and the real domain in `site.url`.
- Replace placeholder legal copy.
- Add a real OG image.
