import { Recipe, RecipeVersion } from "@/lib/types";
import { Dictionary } from "@/lib/i18n/types";
import RecipeHeader from "./RecipeHeader";
import MetadataBar from "./MetadataBar";
import IngredientList from "./IngredientList";
import VersionTimeline from "./VersionTimeline";
import ChangelogSection from "./ChangelogSection";
import ScrollReveal from "./ScrollReveal";
import VersionImages from "./VersionImages";
import Link from "next/link";

interface RecipeDetailProps {
  recipe: Recipe;
  version: RecipeVersion;
  isLatest: boolean;
  translations: Dictionary;
}

export default function RecipeDetail({ recipe, version, isLatest, translations: t }: RecipeDetailProps) {
  const latestVersion = recipe.versions[recipe.versions.length - 1].version;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {!isLatest && (
        <div className="bg-surface border border-border rounded-lg px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <span className="text-muted-foreground">
            {t.version.viewing} <span className="text-accent font-semibold">{version.version}</span> {t.version.of}{" "}
            <span className="text-accent font-semibold">{latestVersion}</span>
          </span>
          <Link
            href={`/recipe/${recipe.id}`}
            className="text-accent hover:underline font-medium text-sm"
          >
            {t.version.viewLatest}
          </Link>
        </div>
      )}

      <RecipeHeader title={recipe.title} coverImage={recipe.images.cover} />

      <ScrollReveal>
        <MetadataBar
          version={version.version}
          totalVersions={latestVersion}
          rating={version.rating}
          prepTime={version.prepTime}
          cookTime={version.cookTime}
          servings={version.servings}
          difficulty={recipe.difficulty}
          tags={recipe.tags}
        />
      </ScrollReveal>

      {/* Conditional sections: temperature, equipment, weather */}
      {(version.temperature || version.equipment || version.weather) && (
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {version.temperature && (
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="text-accent text-xs uppercase tracking-wider font-medium mb-2">{t.sections.temperature}</h3>
                <div className="space-y-1 text-sm">
                  {version.temperature.grill && (
                    <div><span className="text-muted-foreground">{t.temperature.grill}:</span> <span className="text-foreground">{version.temperature.grill}</span></div>
                  )}
                  {version.temperature.internalTarget && (
                    <div><span className="text-muted-foreground">{t.temperature.internal}:</span> <span className="text-foreground">{version.temperature.internalTarget}</span></div>
                  )}
                  {version.temperature.oven && (
                    <div><span className="text-muted-foreground">{t.temperature.oven}:</span> <span className="text-foreground">{version.temperature.oven}</span></div>
                  )}
                  {version.temperature.stovetop && (
                    <div><span className="text-muted-foreground">{t.temperature.stovetop}:</span> <span className="text-foreground">{version.temperature.stovetop}</span></div>
                  )}
                </div>
              </div>
            )}
            {version.equipment && (
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="text-accent text-xs uppercase tracking-wider font-medium mb-2">{t.sections.equipment}</h3>
                <ul className="space-y-1 text-sm text-foreground">
                  {version.equipment.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {version.weather && (
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="text-accent text-xs uppercase tracking-wider font-medium mb-2">{t.sections.weather}</h3>
                <p className="text-sm text-foreground">{version.weather}</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      )}

      {/* Ingredients */}
      <ScrollReveal delay={0.1}>
        <div>
          <h2 className="font-serif text-2xl text-accent mb-4">{t.sections.ingredients}</h2>
          <IngredientList ingredients={version.ingredients} />
        </div>
      </ScrollReveal>

      {/* Method / Execution */}
      <ScrollReveal delay={0.1}>
        <div>
          <h2 className="font-serif text-2xl text-accent mb-4">{t.sections.method}</h2>
          <ol className="space-y-4">
            {version.execution.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-serif text-2xl text-accent/40 font-bold shrink-0 w-8 text-right">
                  {i + 1}
                </span>
                <p className="text-foreground leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </ScrollReveal>

      {/* Version Images */}
      {version.images && version.images.length > 0 && (
        <ScrollReveal delay={0.1}>
          <VersionImages images={version.images} />
        </ScrollReveal>
      )}

      {/* Pairings */}
      {version.pairings && version.pairings.length > 0 && (
        <ScrollReveal delay={0.1}>
          <div>
            <h2 className="font-serif text-2xl text-accent mb-3">{t.sections.pairsWith}</h2>
            <div className="flex flex-wrap gap-2">
              {version.pairings.map((pairing, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-surface border border-border text-foreground text-sm"
                >
                  {pairing}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Version Timeline */}
      <ScrollReveal delay={0.1}>
        <div>
          <h2 className="font-serif text-2xl text-accent mb-4">{t.sections.versionHistory}</h2>
          <VersionTimeline
            recipeSlug={recipe.id}
            versions={recipe.versions.map((v) => ({ version: v.version, date: v.date }))}
            currentVersion={version.version}
            latestVersion={latestVersion}
          />
        </div>
      </ScrollReveal>

      {/* Changelog & Notes */}
      <ScrollReveal delay={0.1}>
        <ChangelogSection
          changelog={version.changelog}
          notes={version.notes}
          whatChangedLabel={t.changelog.whatChanged}
          notesLabel={t.changelog.notes}
        />
      </ScrollReveal>
    </div>
  );
}
