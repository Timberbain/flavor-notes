import { notFound } from "next/navigation";
import { getRecipeBySlug, getLatestVersion } from "@/lib/recipes";
import RecipeDetail from "@/components/RecipeDetail";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const version = getLatestVersion(recipe);

  return <RecipeDetail recipe={recipe} version={version} isLatest />;
}
