import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="font-serif text-4xl md:text-5xl text-accent mb-4">404</h2>
      <p className="font-serif text-xl md:text-2xl text-foreground mb-2">
        Recipe not found
      </p>
      <p className="text-muted-foreground mb-8">
        This one might have gone up in smoke.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
      >
        Back to Recipes
      </Link>
    </div>
  );
}
