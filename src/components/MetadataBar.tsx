"use client";

import Counter from "@/components/Counter";

interface MetadataBarProps {
  version: number;
  totalVersions: number;
  rating: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function MetadataBar({
  version,
  totalVersions,
  rating,
  prepTime,
  cookTime,
  servings,
  difficulty,
  tags,
}: MetadataBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold">
          v{version} of {totalVersions}
        </span>

        <div className="flex items-center gap-1">
          <Counter
            value={rating}
            fontSize={20}
            padding={0}
            gap={1}
            horizontalPadding={0}
            textColor="var(--accent)"
            fontWeight="bold"
            gradientHeight={0}
            gradientFrom="transparent"
            gradientTo="transparent"
          />
          <span className="text-accent font-bold text-xl">/10</span>
        </div>

        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
          difficulty === "easy"
            ? "bg-green-900/30 text-green-400"
            : difficulty === "medium"
            ? "bg-yellow-900/30 text-yellow-400"
            : "bg-red-900/30 text-red-400"
        }`}>
          {difficulty}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="text-accent text-xs uppercase tracking-wider font-medium">Prep</span>
          <span>{formatTime(prepTime)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-accent text-xs uppercase tracking-wider font-medium">Cook</span>
          <span>{formatTime(cookTime)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-accent text-xs uppercase tracking-wider font-medium">Servings</span>
          <span>{servings}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs rounded-full bg-surface border border-border text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
