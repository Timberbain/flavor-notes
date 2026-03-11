# CLAUDE.md

## Commands

```bash
npm run dev      # Start dev server (Next.js 16)
npm run build    # Production build
npm run lint     # ESLint (next/core-web-vitals + typescript)
```

No test framework is configured. Always verify changes by running `npm run build` after implementation.

## Architecture

Personal recipe versioning app. Read-only — recipes are authored as JSON files, not through the UI.

- Recipe data: `data/recipes/*.json` (filename slug = recipe ID)
- Data access: `src/lib/recipes.ts` reads JSON via `fs.readFileSync` (Server Components only)
- Types: `src/lib/types.ts` — `Recipe`, `RecipeVersion`, `Ingredient`, `RecipeSummary`
- Routes: `/` (grid), `/recipe/[slug]` (latest), `/recipe/[slug]/v/[version]` (specific version)

### Server vs Client Boundary

IMPORTANT: Only Server Components can read from disk. Client Components must receive data as props.

- **Server**: page routes, `RecipeDetail` — read data, compose client sub-components
- **Client** (`"use client"`): all interactive/animated components

## Design System

IMPORTANT: Read @docs/DESIGN_SYSTEM.md before creating or modifying UI. It defines all color tokens, typography scale, spacing conventions, component patterns, and animation tokens.

- Tailwind CSS v4, shadcn/ui (base-nova style), Lucide icons
- ReactBits components installed via: `npx shadcn@latest add @react-bits/<Name>-TS-TW`
- Path alias: `@/*` maps to `./src/*`

## Gotchas

- NEVER use GSAP ScrollTrigger — causes invisible initial state. ScrollReveal uses mount-based motion animation instead.
- Always use `motion` (framer-motion) for scroll reveals and staggered lists. GSAP is only for SplitText and Counter.
- New UI must match the rustic smokehouse aesthetic — dark, warm, textured. Do not introduce bright/cold colors.
