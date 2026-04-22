"use client";

import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/LocaleProvider";

interface PhotoThumbnailsProps {
  photos: { file: File; url: string }[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function PhotoThumbnails({
  photos,
  activeIndex,
  onSelect,
}: PhotoThumbnailsProps) {
  const t = useT();
  if (photos.length <= 1) return null;

  return (
    <div className="flex gap-3 overflow-x-auto py-2">
      {photos.map((photo, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={cn(
            "w-16 h-16 rounded-xl overflow-hidden shrink-0 transition-all",
            i === activeIndex
              ? "ring-2 ring-primary shadow-sm"
              : "border border-outline-variant/20 hover:border-primary/40"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.url}
            alt={t("photos.alt", { n: i + 1 })}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
