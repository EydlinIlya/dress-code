"use client";

import { useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { ColorPickerPanel } from "@/components/host/ColorPickerPanel";
import { ColorList } from "@/components/host/ColorList";
import { ColorSuggestions } from "@/components/host/ColorSuggestions";
import { generateSharePageUrl } from "@/lib/colors";
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
      <main className="flex-1 pt-4 pb-24 lg:pb-16 px-6 max-w-6xl mx-auto w-full">
        {/* Hero */}
        <section className="mb-12 max-w-xl">
          <h2 className="text-4xl md:text-5xl leading-[1.1] font-[family-name:var(--font-heading)] font-medium tracking-tight text-on-surface mb-4">
            Create your event&apos;s dress code.
          </h2>
          <p className="text-on-surface-variant leading-relaxed opacity-80">
            Pick colors and share a link with your guests. No accounts needed.
          </p>
        </section>

        {/* Desktop: two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left column: Picker + Palette */}
          <div className="space-y-10 lg:w-[400px] shrink-0">
            <section className="bg-surface-low rounded-[2rem] p-6">
              <ColorPickerPanel colors={colors} onAddColor={handleAddColor} />
            </section>

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
          </div>

          {/* Right column: Suggestions + Desktop Continue */}
          <div className="flex-1 min-w-0">
            {lastColor && (
              <section>
                <ColorSuggestions
                  baseColor={lastColor}
                  onSelect={handleAddColor}
                />
              </section>
            )}

            {/* Desktop Continue button */}
            {colors.length > 0 && (
              <div className="hidden lg:flex mt-10 justify-start">
                <a
                  href={generateSharePageUrl(colors)}
                  className="soul-gradient text-on-primary font-semibold py-4 px-8 rounded-xl flex items-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all text-lg"
                >
                  Continue
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile: sticky Continue button */}
      {colors.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-background/90 backdrop-blur-md border-t border-outline-variant/20 safe-bottom">
          <a
            href={generateSharePageUrl(colors)}
            className="soul-gradient text-on-primary font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all w-full"
          >
            Continue
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      )}
    </div>
  );
}
