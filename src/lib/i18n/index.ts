import { cookies } from "next/headers";
import { Locale, Dictionary } from "./types";
import { en } from "./en";
import { sv } from "./sv";

const dictionaries: Record<Locale, Dictionary> = { en, sv };

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;
  return locale === "sv" ? "sv" : "en";
}

export function getTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Locale, Dictionary };
