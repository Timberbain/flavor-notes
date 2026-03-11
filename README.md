# Flavor Notes

A personal web app for documenting experimental food recipes and tracking how they evolve over time. Each recipe is versioned — every tweak creates a new version with a changelog, notes, and evaluation. The app is read-only; recipes are authored as JSON files, focused on a beautiful viewing and browsing experience.

## Tech Stack

- **Next.js 16** (App Router, React Server Components)
- **Tailwind CSS v4** with a rustic smokehouse theme
- **ReactBits** for animations and effects (SpotlightCard, SplitText, Counter, Particles, etc.)
- **GSAP + motion** (framer-motion) for scroll reveals and character animations
- **JSON files on disk** — no database

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

Server Components read JSON recipe files directly from the filesystem at request time. No API routes, no database. Edit a JSON file, refresh the browser, see changes immediately.

### Adding a Recipe

Create a JSON file in `data/recipes/` — the filename becomes the URL slug.

```
data/recipes/my-new-recipe.json → /recipe/my-new-recipe
```

### Recipe Schema

```jsonc
{
  "id": "my-new-recipe",          // must match filename
  "title": "My New Recipe",
  "description": "A short description",
  "tags": ["tag1", "tag2"],
  "difficulty": "easy",            // "easy" | "medium" | "hard"
  "images": {
    "cover": "/images/recipes/my-new-recipe/cover.jpg"
  },
  "versions": [
    {
      "version": 1,
      "date": "2026-01-15",
      "rating": 7.5,              // 1.0–10.0
      "prepTime": 30,             // minutes
      "cookTime": 120,            // minutes
      "servings": 4,
      "ingredients": [
        { "name": "Salt", "amount": "2", "unit": "tsp" },
        { "name": "Fresh herbs" }  // amount/unit optional for "to taste" items
      ],
      "execution": [
        "Step one...",
        "Step two..."
      ],
      "notes": "Personal observations and ideas for next time",

      // Optional fields:
      "temperature": { "grill": "110C / 225F", "internalTarget": "96C / 205F" },
      "equipment": ["Offset smoker", "Meat thermometer"],
      "weather": "Sunny, 24C, light wind",
      "pairings": ["Pickled onions", "IPA"],
      "changelog": "What changed from the previous version",
      "images": ["/images/recipes/my-new-recipe/v1-plating.jpg"]
    }
  ]
}
```

To iterate on a recipe, add a new entry to the `versions` array with an incremented version number. The app automatically shows the latest version and provides a timeline to browse older versions.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — filterable recipe grid sorted by newest version date |
| `/recipe/[slug]` | Recipe detail showing the latest version |
| `/recipe/[slug]/v/[version]` | Specific version with banner linking to latest |

## Theme

Rustic smokehouse aesthetic — dark warm wood tones, serif headers (Playfair Display), parchment cream text, warm gold accents.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```
