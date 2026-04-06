"use client";

import { Suspense, useState, useCallback } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/shared/Header";
import { ColorPickerPanel } from "@/components/host/ColorPickerPanel";
import { ColorList } from "@/components/host/ColorList";
import { ColorSuggestions } from "@/components/host/ColorSuggestions";
import { generateSharePageUrl, parseColorsFromUrl } from "@/lib/colors";
import { MAX_COLORS } from "@/lib/constants";

function HostPageContent() {
  const searchParams = useSearchParams();
  const [colors, setColors] = useState<string[]>(() => {
    const c = searchParams.get("c");
    return c ? parseColorsFromUrl(c) : [];
  });

  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(
    () => (colors.length > 0 ? colors.length - 1 : null)
  );

  const handleAddColor = useCallback((color: string) => {
    setColors((prev) => {
      if (prev.includes(color)) return prev;
      if (prev.length >= MAX_COLORS) return prev;
      const next = [...prev, color];
      setActiveColorIndex(next.length - 1);
      return next;
    });
  }, []);

  const handleRemoveColor = useCallback((index: number) => {
    setColors((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setActiveColorIndex(next.length > 0 ? Math.min(index, next.length - 1) : null);
      return next;
    });
  }, []);

  const [navigating, setNavigating] = useState(false);
  const activeColor = activeColorIndex !== null && activeColorIndex < colors.length
    ? colors[activeColorIndex]
    : null;

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

        {/* Mobile: stacked layout */}
        <div className="flex flex-col gap-10 lg:hidden">
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
            <ColorList
              colors={colors}
              onRemove={handleRemoveColor}
              activeIndex={activeColorIndex}
              onSelect={setActiveColorIndex}
            />
          </section>

          <section>
            <ColorSuggestions
              baseColor={activeColor}
              onSelect={handleAddColor}
            />
          </section>
        </div>

        {/* Desktop: three-column layout */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] gap-8">
          {/* Left: Picker */}
          <section className="bg-surface-low rounded-[2rem] p-6 self-start">
            <ColorPickerPanel colors={colors} onAddColor={handleAddColor} />
          </section>

          {/* Center: Palette */}
          <section className="w-[240px] self-start">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg">
                Your Palette
              </h3>
              {colors.length > 0 && (
                <span className="text-xs text-on-surface-variant/60 font-medium uppercase tracking-wider">
                  {colors.length}/{MAX_COLORS}
                </span>
              )}
            </div>
            <ColorList
              colors={colors}
              onRemove={handleRemoveColor}
              activeIndex={activeColorIndex}
              onSelect={setActiveColorIndex}
              wrap
            />
            {colors.length > 0 && (
              <div className="mt-8">
                <a
                  href={generateSharePageUrl(colors)}
                  onClick={() => setNavigating(true)}
                  className="soul-gradient text-on-primary font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all w-full"
                >
                  {navigating ? "Loading…" : "Continue"}
                  {navigating ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <ArrowRight className="h-5 w-5" />
                  )}
                </a>
              </div>
            )}
          </section>

          {/* Right: Presets / Suggestions */}
          <section className="self-start">
            <ColorSuggestions
              baseColor={activeColor}
              onSelect={handleAddColor}
              compact
            />
          </section>
        </div>
      </main>

      {/* Mobile: sticky Continue button */}
      {colors.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-4 bg-background/90 backdrop-blur-md border-t border-outline-variant/20 safe-bottom">
          <a
            href={generateSharePageUrl(colors)}
            onClick={() => setNavigating(true)}
            className="soul-gradient text-on-primary font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all w-full text-lg"
          >
            {navigating ? "Loading…" : "Continue"}
            {navigating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
          </a>
        </div>
      )}
    </div>
  );
}

export default function HostPage() {
  return (
    <Suspense>
      <HostPageContent />
    </Suspense>
  );
}
