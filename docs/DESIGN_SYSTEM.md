# Flavor Notes — Design System

Reference for the visual language, tokens, and component patterns used throughout the app.

---

## Theme: Rustic Smokehouse

Dark warm wood tones, serif headers, parchment-like textures, earthy browns/cream/charcoal. Evokes a leather-bound recipe journal kept next to an offset smoker.

---

## Color Tokens

Defined as CSS custom properties in `src/app/globals.css` and mapped to Tailwind via `@theme inline`.

| Token                | Value                          | Tailwind Class          | Usage                                    |
|----------------------|--------------------------------|-------------------------|------------------------------------------|
| `--background`       | `#1c1107`                      | `bg-background`         | Page background                          |
| `--background-deep`  | `#150d05`                      | `bg-[var(--background-deep)]` | Header, deepest surfaces          |
| `--surface`          | `rgba(196,149,106, 0.08)`     | `bg-surface`            | Cards, containers, input backgrounds     |
| `--card`             | `rgba(196,149,106, 0.06)`     | `bg-card`               | Recipe cards (slightly lighter than surface) |
| `--border`           | `rgba(196,149,106, 0.15)`     | `border-border`         | All borders, dividers, separators        |
| `--accent`           | `#c4956a`                      | `text-accent`, `bg-accent` | Gold — headings, labels, active states |
| `--accent-foreground`| `#1c1107`                      | `text-accent-foreground` | Text on accent backgrounds              |
| `--foreground`       | `#f4e4c1`                      | `text-foreground`       | Primary body text (parchment cream)      |
| `--muted`            | `#2d1a0a`                      | `bg-muted`              | Subdued backgrounds, fallback areas      |
| `--muted-foreground` | `#b8a68e`                      | `text-muted-foreground` | Secondary text, timestamps, descriptions |

### Difficulty Colors

| Level  | Background           | Text               |
|--------|----------------------|---------------------|
| Easy   | `bg-green-900/30`    | `text-green-400`    |
| Medium | `bg-yellow-900/30`   | `text-yellow-400`   |
| Hard   | `bg-red-900/30`      | `text-red-400`      |

---

## Typography

### Font Families

| Role     | Font              | Tailwind Class | CSS Variable       |
|----------|-------------------|----------------|---------------------|
| Headings | Playfair Display  | `font-serif`   | `--font-playfair`   |
| Body     | Inter             | `font-sans`    | `--font-inter`      |

Both loaded via `next/font/google` in `src/app/layout.tsx`.

### Type Scale

| Element              | Classes                                              |
|----------------------|------------------------------------------------------|
| Hero title           | `font-serif text-3xl md:text-5xl font-bold`          |
| Section heading (h2) | `font-serif text-2xl text-accent mb-4`               |
| Subsection (h3)      | `font-serif text-xl text-accent mb-3`                |
| Card title           | `font-serif text-xl text-foreground`                 |
| Body text            | `text-foreground leading-relaxed`                    |
| Small label          | `text-accent text-xs uppercase tracking-wider font-medium` |
| Muted meta           | `text-sm text-muted-foreground`                      |

---

## Spacing Conventions

| Context               | Pattern                       |
|-----------------------|-------------------------------|
| Between major sections | `space-y-8`                   |
| Between subsections    | `space-y-6`                   |
| Between form/meta items| `space-y-4`                  |
| Section heading margin | `mb-4` (h2), `mb-3` (h3)     |
| Page container         | `max-w-6xl mx-auto px-4` (home), `max-w-4xl mx-auto px-4` (detail) |
| Page vertical padding  | `py-8` (detail), `py-10` (home) |

---

## Component Patterns

### Tag Chips

```
px-2 py-0.5 text-xs rounded-full bg-surface border border-border text-muted-foreground
```

Used on cards and detail pages to display recipe tags.

### Pairing Chips

```
px-3 py-1.5 rounded-full bg-surface border border-border text-foreground text-sm
```

Slightly larger than tag chips, used for food/drink pairings.

### Version Badge

```
px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold
```

Shows "vX of Y" on detail pages.

### Difficulty Badge

```
px-2 py-0.5 rounded text-xs font-medium
```

Color varies by level (see Difficulty Colors above).

### Filter Buttons

- **Active:** `bg-accent text-accent-foreground`
- **Inactive:** `bg-surface border border-border text-muted-foreground hover:text-foreground`
- **Shared:** `px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200`

### Info Cards (Temperature, Equipment, Weather)

```
bg-surface border border-border rounded-lg p-4
```

Arranged in a `grid grid-cols-1 md:grid-cols-3 gap-4`. Each has an uppercase label heading.

### Ingredient List Items

```
flex items-baseline gap-2 py-2 border-b border-border last:border-0
```

- Bullet: `w-2 h-2 rounded-full bg-accent`
- Name: `text-foreground`
- Amount: `text-muted-foreground ml-auto whitespace-nowrap`

### Method Steps

Numbered with a serif numeral:
- Number: `font-serif text-2xl text-accent/40 font-bold w-8 text-right`
- Step text: `text-foreground leading-relaxed pt-1`

### Recipe Cards (Home Grid)

- Wrapper: SpotlightCard with `spotlightColor="rgba(196, 149, 106, 0.15)"`
- Image: `aspect-[16/10]` with gradient overlay `from-[var(--background)]`
- Hover: `group-hover:scale-105` on image, `group-hover:text-accent` on title
- Layout: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`

### Version Timeline

- Node (active): `w-4 h-4 rounded-full border-2 bg-accent border-accent scale-125`
- Node (inactive): `bg-transparent border-muted-foreground` with hover → `border-accent scale-110`
- Connector: `w-16 md:w-24 h-0.5 bg-border`
- Horizontal scrollable container

---

## Animation Patterns

| Pattern         | Implementation                              | Used In            |
|-----------------|---------------------------------------------|--------------------|
| Scroll reveal   | Mount fade: `opacity 0→1, y 20→0, 0.5s`    | ScrollReveal       |
| Item stagger    | `delay: index * 0.05`                       | IngredientList     |
| Title reveal    | SplitText (GSAP) per-character animation    | RecipeHeader       |
| Rating counter  | Counter (motion) animated digits            | MetadataBar        |
| Card spotlight  | Radial gradient following cursor            | RecipeCard         |
| Background      | Particles (OGL WebGL) with gold/cream tones | Home page          |

### Animation Tokens

- **Duration (fast):** `0.3s` — individual items
- **Duration (standard):** `0.5s` — section reveals
- **Duration (slow):** `0.8s` — hero title
- **Easing:** `easeOut` (motion), `power3.out` (GSAP)
- **Hover transitions:** `transition-all duration-200` (buttons), `transition-transform duration-500` (images)

---

## Image Handling

| Scenario             | Behavior                                              |
|----------------------|-------------------------------------------------------|
| Cover image exists   | `next/image` with `fill` + `object-cover`             |
| Cover image missing  | Falls back to `/images/placeholder.svg`               |
| Image load error     | `onError` swaps `src` to placeholder                  |
| Card image overlay   | `bg-gradient-to-t from-[var(--background)] via-transparent to-transparent` |
| Hero image overlay   | Same gradient + `via-[var(--background)]/60`           |
| Version gallery      | `h-[200px]` fixed height, horizontal scroll, `rounded-lg` |

---

## Layout Structure

```
<html>
  <body>
    <header>   — sticky-top bar with "Flavor Notes" link, bg-[--background-deep]
    <main>     — page content
    <footer>   — copyright, border-t, text-muted-foreground
  </body>
</html>
```

### Responsive Breakpoints

| Breakpoint | Tailwind | Card Grid | Detail Layout        |
|------------|----------|-----------|----------------------|
| Mobile     | default  | 1 column  | Full width, smaller hero (300px) |
| Tablet     | `sm:`    | 2 columns | —                    |
| Desktop    | `lg:`    | 3 columns | max-w-4xl centered, taller hero (400px) |

---

## File Reference

| File                     | Purpose                              |
|--------------------------|--------------------------------------|
| `src/app/globals.css`    | Color tokens, Tailwind theme, scrollbar styles |
| `src/app/layout.tsx`     | Font loading, header, footer         |
| `src/app/icon.svg`       | Favicon (flame on dark rounded square) |
| `public/images/placeholder.svg` | Missing image placeholder     |
