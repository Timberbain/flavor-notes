import { getAllRecipes, getAllTags, getLatestVersion } from "@/lib/recipes";
import { RecipeSummary } from "@/lib/types";
import RecipeGrid from "@/components/RecipeGrid";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function HomePage() {
  const recipes = getAllRecipes();
  const tags = getAllTags();

  const summaries: RecipeSummary[] = recipes.map((recipe) => {
    const latest = getLatestVersion(recipe);
    return {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      tags: recipe.tags,
      difficulty: recipe.difficulty,
      coverImage: recipe.images.cover,
      latestRating: latest.rating,
      latestDate: latest.date,
      latestVersion: latest.version,
    };
  });

  return (
    <div className="relative min-h-screen">
      <ParticlesBackground />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        <RecipeGrid recipes={summaries} tags={tags} />
      </div>
    </div>
  );
}
