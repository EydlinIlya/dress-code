"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/shared/Header";
import { ColorPickerPanel } from "@/components/host/ColorPickerPanel";
import { ColorList } from "@/components/host/ColorList";
import { ColorSuggestions } from "@/components/host/ColorSuggestions";
import { ShareLinkGenerator } from "@/components/host/ShareLinkGenerator";
import { MAX_COLORS } from "@/lib/constants";

export default function HostPage() {
  const [colors, setColors] = useState<string[]>([]);

  const handleAddColor = useCallback((color: string) => {
    setColors((prev) => {
      if (prev.includes(color)) return prev;
      if (prev.length >= MAX_COLORS) return prev;
      return [...prev, color];
    });
  }, []);

  const handleRemoveColor = useCallback((index: number) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const lastColor = colors.length > 0 ? colors[colors.length - 1] : null;

  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 pt-4 pb-16 px-6 max-w-md mx-auto w-full">
        {/* Hero */}
        <section className="mb-12">
          <h2 className="text-5xl leading-[1.1] font-[family-name:var(--font-heading)] font-medium tracking-tight text-on-surface mb-4">
            Create your event&apos;s dress code.
          </h2>
          <p className="text-on-surface-variant leading-relaxed opacity-80">
            Pick colors and share a link with your guests. No accounts needed.
          </p>
        </section>

        <div className="space-y-10">
          {/* Color Picker */}
          <section className="bg-surface-low rounded-[2rem] p-6">
            <ColorPickerPanel colors={colors} onAddColor={handleAddColor} />
          </section>

          {/* Palette */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg">
                Your Palette
              </h3>
              {colors.length > 0 && (
                <span className="text-xs text-on-surface-variant/60 font-medium uppercase tracking-wider">
                  {colors.length}/{MAX_COLORS} colors
                </span>
              )}
            </div>
            <ColorList colors={colors} onRemove={handleRemoveColor} />
          </section>

          {/* Suggestions */}
          {lastColor && (
            <section>
              <ColorSuggestions
                baseColor={lastColor}
                onSelect={handleAddColor}
              />
            </section>
          )}

          {/* Share */}
          {colors.length > 0 && (
            <ShareLinkGenerator colors={colors} />
          )}
        </div>
      </main>
    </div>
  );
}
