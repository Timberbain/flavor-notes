import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { getLocale, getTranslations } from "@/lib/i18n";
import I18nProvider from "@/components/I18nProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flavor Notes",
  description: "Personal recipe versioning — track how your recipes evolve over time",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const t = getTranslations(locale);

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen`}>
        <I18nProvider dictionary={t}>
          <header className="border-b border-border bg-[var(--background-deep)]">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="group">
                <h1 className="font-serif text-2xl md:text-3xl text-accent tracking-tight group-hover:opacity-80 transition-opacity">
                  {t.header.title}
                </h1>
                <p className="text-muted-foreground text-xs tracking-widest uppercase mt-0.5">
                  {t.header.subtitle}
                </p>
              </Link>
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
            {t.footer.copyright}
          </footer>
        </I18nProvider>
      </body>
    </html>
  );
}
