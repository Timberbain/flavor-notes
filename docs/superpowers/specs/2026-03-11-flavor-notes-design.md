# Flavor Notes - Design Specification

## Purpose

A personal web application for documenting experimental food recipes and tracking how they evolve over time. Each recipe is versioned — every tweak creates a new version with a changelog, notes, and evaluation. The app is read-only (recipes are edited as JSON files), focused on a beautiful viewing and browsing experience.

## Tech Stack

- **Framework:** Next.js (App Router, React Server Components)
- **Styling:** Tailwind CSS
- **UI Components:** ReactBits (reactbits.dev) for animations and effects
- **Data Storage:** JSON files on disk (no database)
- **Theme:** Rustic Smokehouse — dark warm wood tones, serif headers, parchment-like textures, earthy browns/cream/charcoal

## Architecture

Server Components read JSON recipe files directly from the filesystem at request time. No API routes, no database. Edit a JSON file, refresh the browser, see changes immediately.

**Data-fetching boundary:** All filesystem reads happen in Server Components. No `fs` calls from Client Components.

- **Home page:** The Server Component fetches all recipes and all tags. It maps recipes to a `RecipeSummary` type (id, title, description, tags, difficulty, cover image, latest version's rating and date) and passes the summaries + tags as props to `RecipeGrid` (client component). Full recipe data is not sent to the client.
- **Recipe detail page:** The Server Component fetches the full recipe and extracts the relevant version. It passes data as props to `RecipeDetail` (server component) which renders animated sub-components. Each animated ReactBits component (SplitText, CountUp, AnimatedList, ScrollReveal, FadeContent) is individually a client component — `RecipeDetail` itself stays as a server component that composes them.

```typescript
// Summary type passed to client-side RecipeGrid:
interface RecipeSummary {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  coverImage: string;
  latestRating: number;
  latestDate: string;
  latestVersion: number;
}
```

## Data Model

Each recipe is a JSON file in `data/recipes/` with the filename as the slug (e.g., `smoked-brisket.json`).

### Recipe Schema

```typescript
interface Recipe {
  id: string;                    // URL slug, matches filename
  title: string;
  description: string;
  tags: string[];                // e.g., ["beef", "smoked", "low-and-slow"]
  difficulty: "easy" | "medium" | "hard";
  images: {
    cover: string;               // path from public root with leading slash, e.g., "/images/recipes/smoked-brisket/cover.jpg"
  };
  versions: RecipeVersion[];     // ordered by version number ascending
}
// Note: No `currentVersion` field. The latest version is derived as
// the last element in the `versions` array (highest version number).

interface RecipeVersion {
  version: number;
  date: string;                  // ISO date (YYYY-MM-DD)
  rating: number;                // 1.0-10.0 scale, one decimal (e.g., 8.5). UI displays as "X.X/10"
  prepTime: number;              // minutes
  cookTime: number;              // minutes
  servings: number;

  // Optional fields (present when relevant)
  temperature?: {
    grill?: string;              // e.g., "110C / 225F"
    internalTarget?: string;     // e.g., "96C / 205F"
    oven?: string;
    stovetop?: string;
  };
  equipment?: string[];          // e.g., ["Offset smoker", "Meat thermometer"]
  weather?: string;              // e.g., "Sunny, 24C, light wind"

  ingredients: Ingredient[];
  execution: string[];           // ordered steps
  changelog?: string;            // what changed from previous version (optional for v1)
  notes: string;                 // personal observations and ideas for next time
  pairings?: string[];           // e.g., ["Pickled onions", "IPA"]
  images?: string[];             // optional per-version images, paths with leading slash (e.g., "/images/recipes/smoked-brisket/v2-plating.jpg")
}

interface Ingredient {
  name: string;
  amount?: string;               // optional — omit for "to taste" items
  unit?: string;                 // optional — omit when amount is unitless or absent
}
```

**Design decisions:**
- `currentVersion` is intentionally omitted — derived from the `versions` array to avoid sync issues when hand-editing JSON.
- `changelog` is optional — version 1 has no prior version to diff against.
- `amount` and `unit` on Ingredient are optional — handles "Salt to taste", "Fresh herbs for garnish", etc.
- `images` on RecipeVersion is optional — allows per-version photos when the dish changes significantly across versions. The recipe-level `images.cover` is always the card thumbnail.
- The BBQ-specific fields (`temperature`, `equipment`, `weather`, `pairings`) are all optional. Non-BBQ recipes simply omit them. The UI conditionally renders these sections only when data is present.

## Pages

### 1. Home Page (`/`)

- **Header:** App title "Flavor Notes" as a clickable link to `/` with rustic smokehouse styling and subtle tagline. This serves as the home navigation from any page.
- **Filter bar:** Tag chips for filtering recipes. Selecting multiple tags uses OR logic — this is intentional because recipes have narrow tag sets, so OR lets you browse across categories (e.g., "beef" + "chicken" shows both). Click an active tag to deselect it. A "Show All" chip resets to no filter. Active tags get the accent color fill. Filter state is client-side only (not in URL) — browser refresh resets to "Show All". This is intentional for simplicity.
- **Recipe grid:** Responsive card grid showing all recipes, sorted by most recent version date (newest first). Breakpoints: 1 column on mobile (<640px), 2 columns on tablet (640-1024px), 3 columns on desktop (>1024px).
  - Each card shows: cover image, title, latest version number, rating displayed as "8.5/10", tags
  - Cards use ReactBits Spotlight Card or Tilted Card for hover effects
  - Missing cover images show a themed placeholder (dark card with the recipe title)
- **Background:** ReactBits Particles or Grainient for subtle smoky atmosphere
- **Empty state:** Friendly message when no recipes match filters

### 2. Recipe Detail (`/recipe/[slug]`)

Shows the latest version by default. Full-width single-column layout. The root layout includes the "Flavor Notes" header as a link to `/`, providing navigation back to home from any page.

**Error handling:** Invalid slug returns Next.js `notFound()` (404 page).

**Sections (top to bottom):**
1. **Hero:** Cover image with recipe title overlay (Split Text animation)
2. **Metadata bar:** Version badge, rating (Count Up animation), prep time, cook time, servings, difficulty, tags
3. **Conditional metadata:** Temperature, equipment, weather, pairings — only shown when present
4. **Ingredients:** Animated list (ReactBits Animated List) with amounts and units. Items without amounts display name only.
5. **Method/Execution:** Numbered steps with clear typography
6. **Version Images:** If the current version has `images`, display them in a horizontal scrollable row below the method steps. Images render at a fixed height (200px) with auto width, maintaining aspect ratio. No click-to-enlarge — keep it simple.
7. **Horizontal Version Timeline:** Custom component with version nodes on a horizontal line. Click a node to navigate to that version via Next.js Link. Current version node is highlighted with the accent color. Clicking the latest version node links to `/recipe/[slug]` (canonical URL), not `/recipe/[slug]/v/[latest]`.
8. **Changelog & Notes:** What changed in this version, personal observations, ideas for next time. Hidden for version 1 if no changelog is provided.

### 3. Version View (`/recipe/[slug]/v/[version]`)

Same layout as recipe detail, but:
- Shows a banner: "Viewing version X of Y — [View Latest]"
- Timeline highlights the viewed version. Non-latest nodes link to `/recipe/[slug]/v/[N]`. The latest version node links to `/recipe/[slug]` (canonical).
- All content reflects the selected version's data

**Error handling:** Invalid version number (non-numeric, out of range, 0, negative) returns Next.js `notFound()` (404 page).

### 4. Not Found Page (`not-found.tsx`)

Custom 404 page matching the rustic theme. Shows a message like "Recipe not found — this one might have gone up in smoke." with a link back to the home page.

## ReactBits Components

| Location | Component | Purpose |
|----------|-----------|---------|
| Homepage background | Particles or Grainient | Subtle smoky/ember atmosphere |
| Recipe cards | Spotlight Card or Tilted Card | Interactive hover effects |
| Recipe title | Split Text | Animated title reveal on detail page |
| Ingredients | Animated List | Staggered reveal animation |
| Version timeline | Custom component | Horizontal nodes with Links — not adapted from Stepper |
| Rating | Count Up | Animated rating number (displays as "X.X/10") |
| Detail page wrapper | Fade Content | Wraps `RecipeDetail` for fade-in on mount |
| Detail sections | Scroll Reveal | Reveal sections as user scrolls down |

## Visual Design: Rustic Smokehouse Theme

### Colors
- **Background:** Deep charcoal brown (`#1c1107`, `#2d1a0a`)
- **Surface/Cards:** Slightly lighter brown with subtle warmth (`rgba(196,149,106,0.08)`)
- **Borders:** Warm gold at low opacity (`rgba(196,149,106,0.15)`)
- **Primary accent:** Warm gold/amber (`#c4956a`)
- **Text primary:** Parchment cream (`#f4e4c1`)
- **Text secondary:** Muted cream (`#b8a68e`)
- **Labels/headings:** Gold accent (`#c4956a`)

### Typography
- **Headings:** Playfair Display (Google Font) — serif, gives the leather-journal feel
- **Body:** Inter (Google Font) — clean sans-serif for readability
- **Labels:** Small uppercase Inter, letter-spaced, gold accent color

### Cards
- Dark surface with subtle warm border
- Cover image with slight overlay gradient
- Gold accent text for title and metadata
- Subtle hover glow effect via ReactBits

## File Structure

```
flavor-notes/
  data/
    recipes/
      smoked-brisket.json       # example recipe
      tomato-bisque.json        # example recipe
  public/
    images/
      recipes/
        smoked-brisket/
          cover.jpg
  src/
    app/
      layout.tsx                # root layout, fonts, theme
      page.tsx                  # home page (card grid)
      not-found.tsx             # custom 404 page
      recipe/
        [slug]/
          page.tsx              # recipe detail (latest version)
          v/
            [version]/
              page.tsx          # specific version view
    components/
      RecipeCard.tsx            # card for the grid with hover effects
      RecipeDetail.tsx          # full recipe detail view
      VersionTimeline.tsx       # horizontal interactive timeline (custom, client component)
      IngredientList.tsx        # animated ingredient list
      TagFilter.tsx             # tag chip filter bar (client component)
      MetadataBar.tsx           # prep time, cook time, servings display
      RecipeHeader.tsx          # hero section with cover image + title
      ChangelogSection.tsx      # changelog and notes display
      RecipeGrid.tsx            # home page grid with filtering (client component)
    lib/
      recipes.ts                # read/parse JSON files from data/
      types.ts                  # TypeScript interfaces
    styles/
      globals.css               # Tailwind config + theme CSS variables
  tailwind.config.ts            # theme colors, fonts
  next.config.ts
  package.json
```

## Data Access Layer (`lib/recipes.ts`)

```typescript
// Key functions (all synchronous, Server Components only):
getAllRecipes(): Recipe[]              // all recipes, sorted by newest version date
getRecipeBySlug(slug: string): Recipe | null  // null if not found
getAllTags(): string[]                 // unique tags across all recipes, sorted alphabetically

// Helper:
getLatestVersion(recipe: Recipe): RecipeVersion  // last element of versions array
getVersion(recipe: Recipe, version: number): RecipeVersion | null  // null if not found
```

All functions read from disk using `fs.readFileSync` in Server Components. The page components call `getRecipeBySlug`, check for null, and call `notFound()` if missing. Version lookup similarly checks for null and calls `notFound()`.

## Sample Recipe Files

Two example recipe JSON files will be authored as part of implementation with realistic sample data:
1. **Smoked Brisket** (3 versions) — BBQ recipe with temperature, equipment, weather, per-version images
2. **Tomato Bisque** (2 versions) — Non-BBQ recipe showing the schema works for soups, stews, etc.

Cover images for sample recipes will use placeholder images from Unsplash (downloaded to `/public/images/recipes/`).
