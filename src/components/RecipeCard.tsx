"use client";

import Link from "next/link";
import Image from "next/image";
import SpotlightCard from "@/components/SpotlightCard";
import { RecipeSummary } from "@/lib/types";

interface RecipeCardProps {
  recipe: RecipeSummary;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`} className="block group">
      <SpotlightCard
        className="!p-0 !bg-[var(--card)] !border-border !rounded-xl h-full"
        spotlightColor="rgba(196, 149, 106, 0.15)"
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl">
          <Image
            src={recipe.coverImage}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
          {/* Fallback when image fails */}
          <div className="absolute inset-0 flex items-center justify-center bg-muted -z-10">
            <span className="font-serif text-xl text-muted-foreground">{recipe.title}</span>
          </div>
        </div>
        <div className="p-4 space-y-3">
          <h2 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors">
            {recipe.title}
          </h2>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-accent font-semibold">{recipe.latestRating.toFixed(1)}/10</span>
            <span className="text-muted-foreground">v{recipe.latestVersion}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              recipe.difficulty === "easy"
                ? "bg-green-900/30 text-green-400"
                : recipe.difficulty === "medium"
                ? "bg-yellow-900/30 text-yellow-400"
                : "bg-red-900/30 text-red-400"
            }`}>
              {recipe.difficulty}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-surface border border-border text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}
