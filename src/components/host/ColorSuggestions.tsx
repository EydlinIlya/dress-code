"use client";

import { getSuggestions } from "@/lib/colors";
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
    <div>
      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg mb-6">
        Suggestions
      </h3>
      <div className="space-y-4">
        {(Object.keys(labels) as (keyof ColorSuggestionsType)[]).map((key) => (
          <div key={key} className="bg-surface-low rounded-2xl p-5">
            <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/60 mb-4">
              {labels[key]}
            </p>
            <div className="flex gap-3">
              {suggestions[key].map((color) => (
                <button
                  key={color}
                  onClick={() => onSelect(color)}
                  className="w-10 h-10 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform"
                  style={{ backgroundColor: color }}
                  aria-label={`Add ${color}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
