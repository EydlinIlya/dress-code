"use client";

import { X } from "lucide-react";
import { ColorSwatch } from "@/components/shared/ColorSwatch";

interface ColorListProps {
  colors: string[];
  onRemove: (index: number) => void;
}

export function ColorList({ colors, onRemove }: ColorListProps) {
  if (colors.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        No colors added yet. Pick a color and click &quot;Add Color&quot;.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {colors.map((color, i) => (
        <div key={`${color}-${i}`} className="relative group">
          <ColorSwatch color={color} size="lg" />
          <button
            onClick={() => onRemove(i)}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
            aria-label={`Remove color ${color}`}
          >
            <X className="h-3 w-3" />
          </button>
          <span className="text-[10px] text-muted-foreground font-mono block text-center mt-1">
            {color.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
}
