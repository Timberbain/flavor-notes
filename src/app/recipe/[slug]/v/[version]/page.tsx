import { notFound } from "next/navigation";
import { getRecipeBySlug, getLatestVersion, getVersion } from "@/lib/recipes";
import RecipeDetail from "@/components/RecipeDetail";

interface VersionPageProps {
  params: Promise<{ slug: string; version: string }>;
}

export default async function VersionPage({ params }: VersionPageProps) {
  const { slug, version: versionStr } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const versionNum = parseInt(versionStr, 10);
  if (isNaN(versionNum) || versionNum <= 0) notFound();

  const version = getVersion(recipe, versionNum);
  if (!version) notFound();

  const latest = getLatestVersion(recipe);
  const isLatest = version.version === latest.version;

  return <RecipeDetail recipe={recipe} version={version} isLatest={isLatest} />;
}
