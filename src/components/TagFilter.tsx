"use client";

import { useTranslations } from "./I18nProvider";

interface TagFilterProps {
  tags: string[];
  activeTags: string[];
  onToggleTag: (tag: string) => void;
  onReset: () => void;
}

export default function TagFilter({ tags, activeTags, onToggleTag, onReset }: TagFilterProps) {
  const t = useTranslations();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onReset}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          activeTags.length === 0
            ? "bg-accent text-accent-foreground"
            : "bg-surface border border-border text-muted-foreground hover:text-foreground"
        }`}
      >
        {t.filters.showAll}
      </button>
      {tags.map((tag) => {
        const isActive = activeTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "bg-surface border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
