"use client";

import { useState } from "react";
import { RecipeSummary } from "@/lib/types";
import RecipeCard from "./RecipeCard";
import TagFilter from "./TagFilter";
import { useTranslations } from "./I18nProvider";

interface RecipeGridProps {
  recipes: RecipeSummary[];
  tags: string[];
}

export default function RecipeGrid({ recipes, tags }: RecipeGridProps) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const t = useTranslations();

  const filteredRecipes =
    activeTags.length === 0
      ? recipes
      : recipes.filter((r) => r.tags.some((t) => activeTags.includes(t)));

  const handleToggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleReset = () => setActiveTags([]);

  return (
    <div className="space-y-8">
      <TagFilter
        tags={tags}
        activeTags={activeTags}
        onToggleTag={handleToggleTag}
        onReset={handleReset}
      />

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-2xl text-muted-foreground">{t.noResults.title}</p>
          <p className="text-sm text-muted-foreground mt-2">{t.noResults.subtitle}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
