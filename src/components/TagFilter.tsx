"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "./I18nProvider";

const VISIBLE_COUNT = 8;

interface TagFilterProps {
  tags: string[];
  activeTags: string[];
  onToggleTag: (tag: string) => void;
  onReset: () => void;
}

export default function TagFilter({ tags, activeTags, onToggleTag, onReset }: TagFilterProps) {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTags = tags.slice(0, VISIBLE_COUNT);
  const overflowTags = tags.slice(VISIBLE_COUNT);
  const hasOverflow = overflowTags.length > 0;
  const hasActiveOverflow = overflowTags.some((tag) => activeTags.includes(tag));

  const tagButton = (tag: string) => {
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
  };

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

      {visibleTags.map(tagButton)}

      <AnimatePresence initial={false}>
        {isExpanded && hasOverflow && (
          <motion.div
            className="flex flex-wrap gap-2 basis-full"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            {overflowTags.map(tagButton)}
          </motion.div>
        )}
      </AnimatePresence>

      {hasOverflow && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-surface border border-dashed ${
            hasActiveOverflow && !isExpanded
              ? "border-accent/50 text-accent"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          {isExpanded
            ? t.filters.showLess
            : t.filters.showMore.replace("{n}", String(overflowTags.length))}
        </button>
      )}
    </div>
  );
}
