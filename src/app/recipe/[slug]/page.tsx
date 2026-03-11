import { notFound } from "next/navigation";
import { getRecipeBySlug, getLatestVersion } from "@/lib/recipes";
import { getLocale, getTranslations } from "@/lib/i18n";
import RecipeDetail from "@/components/RecipeDetail";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const version = getLatestVersion(recipe);
  const locale = await getLocale();
  const translations = getTranslations(locale);

  return <RecipeDetail recipe={recipe} version={version} isLatest translations={translations} />;
}
