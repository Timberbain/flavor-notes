"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/i18n/types";

const I18nContext = createContext<Dictionary | null>(null);

export function useTranslations(): Dictionary {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslations must be used within I18nProvider");
  return ctx;
}

export default function I18nProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return <I18nContext.Provider value={dictionary}>{children}</I18nContext.Provider>;
}
