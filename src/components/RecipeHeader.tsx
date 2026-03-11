"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";

const PLACEHOLDER = "/images/placeholder.svg";

interface RecipeHeaderProps {
  title: string;
  description: string;
  coverImage: string;
}

export default function RecipeHeader({ title, description, coverImage }: RecipeHeaderProps) {
  const [src, setSrc] = useState(coverImage || PLACEHOLDER);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover"
        sizes="100vw"
        priority
        onError={() => setSrc(PLACEHOLDER)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/60 to-transparent" />
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
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          className="font-serif italic text-base md:text-lg text-muted-foreground drop-shadow-md mt-2"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}
