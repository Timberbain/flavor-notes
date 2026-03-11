import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRecipeBySlug, getLatestVersion, getVersion } from "@/lib/recipes";
import { getLocale, getTranslations } from "@/lib/i18n";
import RecipeDetail from "@/components/RecipeDetail";

interface VersionPageProps {
  params: Promise<{ slug: string; version: string }>;
}

export async function generateMetadata({ params }: VersionPageProps): Promise<Metadata> {
  const { slug, version: versionStr } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return {};

  const versionNum = Number(versionStr);
  if (!Number.isInteger(versionNum) || versionNum <= 0 || versionNum > 1000) return {};

  const version = getVersion(recipe, versionNum);
  if (!version) return {};

  const title = `${recipe.title} (v${version.version}) — Flavor Notes`;
  const description = recipe.description || `${recipe.title} recipe`;
  const image = recipe.images?.cover ?? "/images/placeholder.svg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/recipe/${slug}/v/${version.version}`,
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

export default async function VersionPage({ params }: VersionPageProps) {
  const { slug, version: versionStr } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const versionNum = Number(versionStr);
  if (!Number.isInteger(versionNum) || versionNum <= 0 || versionNum > 1000) notFound();

  const version = getVersion(recipe, versionNum);
  if (!version) notFound();

  const latest = getLatestVersion(recipe);
  const isLatest = version.version === latest.version;
  const locale = await getLocale();
  const translations = getTranslations(locale);

  return <RecipeDetail recipe={recipe} version={version} isLatest={isLatest} translations={translations} />;
}
