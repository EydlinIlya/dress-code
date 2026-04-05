"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getSuggestions } from "@/lib/colors";
import { cn } from "@/lib/utils";
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
  const [open, setOpen] = useState(false);

  if (!baseColor) return null;

  const suggestions = getSuggestions(baseColor);

  return (
    <div>
      {/* Mobile: collapsible */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between py-3 px-1"
        >
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg">
            Suggestions
          </h3>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-on-surface-variant transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
        {open && (
          <div className="space-y-3 animate-fade-in-up pb-2">
            {(Object.keys(labels) as (keyof ColorSuggestionsType)[]).map((key) => (
              <SuggestionRow key={key} label={labels[key]} colors={suggestions[key]} onSelect={onSelect} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: always visible */}
      <div className="hidden lg:block">
        <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg mb-6">
          Suggestions
        </h3>
        <div className="space-y-4">
          {(Object.keys(labels) as (keyof ColorSuggestionsType)[]).map((key) => (
            <SuggestionRow key={key} label={labels[key]} colors={suggestions[key]} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SuggestionRow({ label, colors, onSelect }: { label: string; colors: string[]; onSelect: (c: string) => void }) {
  return (
    <div className="bg-surface-low rounded-2xl p-5">
      <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/60 mb-4">
        {label}
      </p>
      <div className="flex gap-3">
        {colors.map((color) => (
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
  );
}
