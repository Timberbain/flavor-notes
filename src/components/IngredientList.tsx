"use client";

import { motion } from "motion/react";
import { Ingredient } from "@/lib/types";

interface IngredientListProps {
  ingredients: Ingredient[];
}

export default function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <ul className="space-y-0">
      {ingredients.map((ingredient, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="flex items-baseline gap-2 py-2 border-b border-border last:border-0"
        >
          <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" />
          <span className="text-foreground">{ingredient.name}</span>
          {ingredient.amount && (
            <span className="text-muted-foreground ml-auto whitespace-nowrap">
              {ingredient.amount}
              {ingredient.unit && ` ${ingredient.unit}`}
            </span>
          )}
        </motion.li>
      ))}
    </ul>
  );
}
