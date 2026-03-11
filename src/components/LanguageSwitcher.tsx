"use client";

import { useRouter } from "next/navigation";

interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();

  const toggleLocale = () => {
    const next = currentLocale === "en" ? "sv" : "en";
    document.cookie = `locale=${next};path=/;max-age=31536000`;
    router.refresh();
  };

  const currentLabel = currentLocale === "en" ? "EN" : "SV";

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 bg-surface border border-border text-muted-foreground hover:text-foreground"
    >
      {currentLabel}
    </button>
  );
}
