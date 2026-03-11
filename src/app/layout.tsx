import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased min-h-screen`}>
        <header className="border-b border-border bg-[var(--background-deep)]">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="group">
              <h1 className="font-serif text-2xl md:text-3xl text-accent tracking-tight group-hover:opacity-80 transition-opacity">
                Flavor Notes
              </h1>
              <p className="text-muted-foreground text-xs tracking-widest uppercase mt-0.5">
                Recipe Versioning
              </p>
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
          &copy; 2026 Timberbain. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
