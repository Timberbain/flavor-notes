export interface Recipe {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
  images: {
    cover: string;
  };
  versions: RecipeVersion[];
}

export interface RecipeVersion {
  version: number;
  date: string;
  rating: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  temperature?: {
    grill?: string;
    internalTarget?: string;
    oven?: string;
    stovetop?: string;
  };
  equipment?: string[];
  weather?: string;
  ingredients: Ingredient[];
  execution: string[];
  changelog?: string;
  notes: string;
  pairings?: string[];
  images?: string[];
}

export interface Ingredient {
  name: string;
  amount?: string;
  unit?: string;
}

export interface RecipeSummary {
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
