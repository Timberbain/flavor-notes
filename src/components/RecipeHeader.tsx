"use client";

import Image from "next/image";
import SplitText from "@/components/SplitText";

interface RecipeHeaderProps {
  title: string;
  coverImage: string;
}

export default function RecipeHeader({ title, coverImage }: RecipeHeaderProps) {
  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl">
      <Image
        src={coverImage}
        alt={title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent" />
      {/* Fallback */}
      <div className="absolute inset-0 flex items-end bg-muted -z-10">
        <div className="p-8">
          <span className="font-serif text-3xl text-muted-foreground">{title}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <SplitText
          text={title}
          className="font-serif text-3xl md:text-5xl text-foreground font-bold drop-shadow-lg"
          tag="h1"
          delay={40}
          duration={0.8}
          textAlign="left"
          rootMargin="0px"
          threshold={0}
        />
      </div>
    </div>
  );
}
