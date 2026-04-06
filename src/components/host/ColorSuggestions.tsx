"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getSuggestions } from "@/lib/colors";
import { cn } from "@/lib/utils";
import type { ColorSuggestions as ColorSuggestionsType } from "@/types";

interface ColorSuggestionsProps {
  baseColor: string | null;
  onSelect: (color: string) => void;
  compact?: boolean;
}

const PRESETS = [
  { name: "Anastasia\u2019s Wedding", colors: ["#8b2252", "#4a7ab5", "#c9a87c"] },
  { name: "St. Patrick\u2019s Day", colors: ["#2e7d32", "#ffd700"] },
  { name: "Barcelona Game", colors: ["#a50044", "#004d98"] },
  { name: "Monochrome", colors: ["#2c2c2c", "#6b6b6b", "#b0b0b0", "#e8e8e8"] },
];

const suggestionLabels: Record<keyof ColorSuggestionsType, string> = {
  complementary: "Complementary",
  analogous: "Analogous",
  triadic: "Triadic",
  splitComplementary: "Split Comp.",
};

export function ColorSuggestions({ baseColor, onSelect, compact }: ColorSuggestionsProps) {
  const [open, setOpen] = useState(false);

  const suggestions = baseColor ? getSuggestions(baseColor) : null;

  const heading = (
    <div className="flex items-center gap-2.5">
      {baseColor && (
        <div
          className="w-5 h-5 rounded-full border border-outline-variant/30 shadow-sm"
          style={{ backgroundColor: baseColor }}
        />
      )}
      <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg">
        {suggestions ? "Matches" : "Presets"}
      </h3>
    </div>
  );

  const content = (
    <div className="space-y-3">
      {suggestions
        ? (Object.keys(suggestionLabels) as (keyof ColorSuggestionsType)[]).map((key) => (
            <SuggestionRow key={key} label={suggestionLabels[key]} colors={suggestions[key]} onSelect={onSelect} />
          ))
        : PRESETS.map((preset) => (
            <PresetRow key={preset.name} preset={preset} onSelect={onSelect} />
          ))}
    </div>
  );

  if (compact) {
    return (
      <div>
        <div className="mb-5">{heading}</div>
        <div className="grid grid-cols-2 gap-3">
          {suggestions
            ? (Object.keys(suggestionLabels) as (keyof ColorSuggestionsType)[]).map((key) => (
                <SuggestionRow key={key} label={suggestionLabels[key]} colors={suggestions[key]} onSelect={onSelect} />
              ))
            : PRESETS.map((preset) => (
                <PresetRow key={preset.name} preset={preset} onSelect={onSelect} />
              ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Mobile: collapsible */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between py-3 px-1"
        >
          {heading}
          <ChevronDown
            className={cn(
              "h-5 w-5 text-on-surface-variant transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
        {open && (
          <div className="animate-fade-in-up pb-2">
            {content}
          </div>
        )}
      </div>

      {/* Desktop: always visible */}
      <div className="hidden lg:block">
        <div className="mb-6">{heading}</div>
        {content}
      </div>
    </div>
  );
}

function PresetRow({ preset, onSelect }: { preset: { name: string; colors: string[] }; onSelect: (c: string) => void }) {
  const handleAddAll = () => {
    for (const color of preset.colors) {
      onSelect(color);
    }
  };

  return (
    <div className="bg-surface-low rounded-2xl p-5">
      <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/60 mb-4">
        {preset.name}
      </p>
      <div className="flex items-center gap-3">
        {preset.colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            className="w-10 h-10 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform"
            style={{ backgroundColor: color }}
            aria-label={`Add ${color}`}
          />
        ))}
        <button
          onClick={handleAddAll}
          className="ml-auto text-xs font-medium text-on-surface-variant/60 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-high"
        >
          Add all
        </button>
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
