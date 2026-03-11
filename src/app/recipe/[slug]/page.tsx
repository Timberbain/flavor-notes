import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecipeBySlug, getLatestVersion } from "@/lib/recipes";
import { getLocale, getTranslations } from "@/lib/i18n";
import RecipeDetail from "@/components/RecipeDetail";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};

  const title = `${recipe.title} — Flavor Notes`;
  const description = recipe.description || `${recipe.title} recipe`;
  const image = recipe.images?.cover ?? "/images/placeholder.svg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/recipe/${slug}`,
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: recipe.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
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
