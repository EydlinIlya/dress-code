"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getSuggestions } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/LocaleProvider";
import type { TranslationKey } from "@/lib/i18n/translations";
import type { ColorSuggestions as ColorSuggestionsType } from "@/types";

interface ColorSuggestionsProps {
  baseColor: string | null;
  onSelect: (color: string) => void;
  compact?: boolean;
}

const PRESETS: { nameKey: TranslationKey; colors: string[] }[] = [
  { nameKey: "preset.anastasia", colors: ["#632433", "#246354", "#243447", "#E7DFD2", "#F4F1EA", "#CC9293"] },
  { nameKey: "preset.stPatrick", colors: ["#2e7d32", "#ffd700"] },
  { nameKey: "preset.barcelona", colors: ["#a50044", "#004d98"] },
  { nameKey: "preset.monochrome", colors: ["#2c2c2c", "#6b6b6b", "#b0b0b0", "#e8e8e8"] },
];

const suggestionLabelKeys: Record<keyof ColorSuggestionsType, TranslationKey> = {
  complementary: "suggestions.complementary",
  analogous: "suggestions.analogous",
  triadic: "suggestions.triadic",
  splitComplementary: "suggestions.splitComplementary",
};

export function ColorSuggestions({ baseColor, onSelect, compact }: ColorSuggestionsProps) {
  const [open, setOpen] = useState(false);
  const t = useT();

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
        {suggestions ? t("suggestions.matches") : t("suggestions.presets")}
      </h3>
    </div>
  );

  const content = (
    <div className="space-y-3">
      {suggestions
        ? (Object.keys(suggestionLabelKeys) as (keyof ColorSuggestionsType)[]).map((key) => (
            <SuggestionRow key={key} label={t(suggestionLabelKeys[key])} colors={suggestions[key]} onSelect={onSelect} />
          ))
        : PRESETS.map((preset) => (
            <PresetRow key={preset.nameKey} preset={preset} onSelect={onSelect} />
          ))}
    </div>
  );

  if (compact) {
    return (
      <div>
        <div className="mb-5">{heading}</div>
        <div className="grid grid-cols-2 gap-3">
          {suggestions
            ? (Object.keys(suggestionLabelKeys) as (keyof ColorSuggestionsType)[]).map((key) => (
                <SuggestionRow key={key} label={t(suggestionLabelKeys[key])} colors={suggestions[key]} onSelect={onSelect} />
              ))
            : PRESETS.map((preset) => (
                <PresetRow key={preset.nameKey} preset={preset} onSelect={onSelect} />
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

function PresetRow({ preset, onSelect }: { preset: { nameKey: TranslationKey; colors: string[] }; onSelect: (c: string) => void }) {
  const t = useT();
  const handleAddAll = () => {
    for (const color of preset.colors) {
      onSelect(color);
    }
  };

  return (
    <div className="bg-surface-low rounded-2xl p-5">
      <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/60 mb-4">
        {t(preset.nameKey)}
      </p>
      <div className="flex items-center gap-3">
        {preset.colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelect(color)}
            className="w-10 h-10 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-transform"
            style={{ backgroundColor: color }}
            aria-label={t("suggestions.addColor", { color })}
          />
        ))}
        <button
          onClick={handleAddAll}
          className="ml-auto text-xs font-medium text-on-surface-variant/60 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-high"
        >
          {t("suggestions.addAll")}
        </button>
      </div>
    </div>
  );
}

function SuggestionRow({ label, colors, onSelect }: { label: string; colors: string[]; onSelect: (c: string) => void }) {
  const t = useT();
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
            aria-label={t("suggestions.addColor", { color })}
          />
        ))}
      </div>
    </div>
  );
}
