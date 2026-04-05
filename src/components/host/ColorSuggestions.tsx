"use client";

import { getSuggestions } from "@/lib/colors";
import { ColorSwatch } from "@/components/shared/ColorSwatch";
import type { ColorSuggestions as ColorSuggestionsType } from "@/types";

interface ColorSuggestionsProps {
  baseColor: string | null;
  onSelect: (color: string) => void;
}

const labels: Record<keyof ColorSuggestionsType, string> = {
  complementary: "Complementary",
  analogous: "Analogous",
  triadic: "Triadic",
  splitComplementary: "Split Comp.",
};

export function ColorSuggestions({ baseColor, onSelect }: ColorSuggestionsProps) {
  if (!baseColor) return null;

  const suggestions = getSuggestions(baseColor);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Suggested colors based on your pick
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(labels) as (keyof ColorSuggestionsType)[]).map((key) => (
          <div key={key} className="space-y-1.5">
            <span className="text-xs text-muted-foreground">{labels[key]}</span>
            <div className="flex gap-1.5">
              {suggestions[key].map((color) => (
                <ColorSwatch
                  key={color}
                  color={color}
                  size="sm"
                  onClick={() => onSelect(color)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
