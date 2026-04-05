"use client";

import { ColorSwatch } from "@/components/shared/ColorSwatch";

interface AllowedColorsDisplayProps {
  colors: string[];
}

export function AllowedColorsDisplay({ colors }: AllowedColorsDisplayProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">
        Accepted dress code colors
      </h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {colors.map((color, i) => (
          <div key={`${color}-${i}`} className="text-center">
            <ColorSwatch color={color} size="md" />
            <span className="text-[10px] text-muted-foreground font-mono block mt-0.5">
              {color.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
