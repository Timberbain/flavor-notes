"use client";

import Link from "next/link";

interface VersionTimelineProps {
  recipeSlug: string;
  versions: { version: number; date: string }[];
  currentVersion: number;
  latestVersion: number;
}

export default function VersionTimeline({
  recipeSlug,
  versions,
  currentVersion,
  latestVersion,
}: VersionTimelineProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center min-w-max px-4">
        {versions.map((v, i) => {
          const isCurrent = v.version === currentVersion;
          const href =
            v.version === latestVersion
              ? `/recipe/${recipeSlug}`
              : `/recipe/${recipeSlug}/v/${v.version}`;

          return (
            <div key={v.version} className="flex items-center">
              <Link
                href={href}
                className={`flex flex-col items-center gap-1.5 group relative ${
                  isCurrent ? "cursor-default" : ""
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    isCurrent
                      ? "bg-accent border-accent scale-125"
                      : "bg-transparent border-muted-foreground group-hover:border-accent group-hover:scale-110"
                  }`}
                />
                <div className="text-center">
                  <div
                    className={`text-sm font-semibold ${
                      isCurrent ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    v{v.version}
                  </div>
                  <div className="text-xs text-muted-foreground">{v.date}</div>
                </div>
              </Link>
              {i < versions.length - 1 && (
                <div className="w-16 md:w-24 h-0.5 bg-border mx-2 mt-[-20px]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
