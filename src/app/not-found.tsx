import Link from "next/link";
import { getLocale, getTranslations } from "@/lib/i18n";

export default async function NotFound() {
  const locale = await getLocale();
  const t = getTranslations(locale);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="font-serif text-4xl md:text-5xl text-accent mb-4">404</h2>
      <p className="font-serif text-xl md:text-2xl text-foreground mb-2">
        {t.notFound.title}
      </p>
      <p className="text-muted-foreground mb-8">
        {t.notFound.subtitle}
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
      >
        {t.notFound.backLink}
      </Link>
    </div>
  );
}
