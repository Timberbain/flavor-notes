"use client";

import Image from "next/image";

interface VersionImagesProps {
  images: string[];
}

export default function VersionImages({ images }: VersionImagesProps) {
  return (
    <div>
      <h2 className="font-serif text-2xl text-accent mb-3">Photos</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((src, i) => (
          <div key={i} className="relative h-[200px] w-auto shrink-0 rounded-lg overflow-hidden">
            <Image
              src={src}
              alt={`Version photo ${i + 1}`}
              width={300}
              height={200}
              className="h-[200px] w-auto object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
