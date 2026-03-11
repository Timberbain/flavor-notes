import fs from "fs";
import path from "path";
import { Recipe, RecipeVersion } from "./types";

const recipesDir = path.join(process.cwd(), "data", "recipes");

export function getAllRecipes(): Recipe[] {
  if (!fs.existsSync(recipesDir)) return [];

  const files = fs.readdirSync(recipesDir).filter((f) => f.endsWith(".json"));
  const recipes: Recipe[] = files.map((file) => {
    const content = fs.readFileSync(path.join(recipesDir, file), "utf-8");
    return JSON.parse(content) as Recipe;
  });

  // Sort by newest version date descending
  return recipes.filter((r) => !r.hidden).sort((a, b) => {
    const dateA = getLatestVersion(a).date;
    const dateB = getLatestVersion(b).date;
    return dateB.localeCompare(dateA);
  });
}

export function getRecipeBySlug(slug: string): Recipe | null {
  const filePath = path.join(recipesDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as Recipe;
}

export function getAllTags(): string[] {
  const recipes = getAllRecipes();
  const tagSet = new Set<string>();
  for (const recipe of recipes) {
    for (const tag of recipe.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function getLatestVersion(recipe: Recipe): RecipeVersion {
  return recipe.versions[recipe.versions.length - 1];
}

export function getVersion(
  recipe: Recipe,
  version: number
): RecipeVersion | null {
  return recipe.versions.find((v) => v.version === version) ?? null;
}
