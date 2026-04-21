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
import { useT } from "@/lib/i18n/LocaleProvider";

function HostPageContent() {
  const searchParams = useSearchParams();
  const t = useT();
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
        <section className="mb-12 max-w-3xl">
          <h2 className="text-4xl md:text-5xl leading-[1.1] font-[family-name:var(--font-heading)] font-medium tracking-tight text-on-surface mb-4">
            {t("home.hero.title")}
          </h2>
          <p className="text-on-surface-variant leading-relaxed opacity-80">
            {t("home.hero.subtitle")}
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
                {t("home.palette.title")}
              </h3>
              {colors.length > 0 && (
                <span className="text-xs text-on-surface-variant/60 font-medium uppercase tracking-wider">
                  {t("home.palette.count", { count: colors.length, max: MAX_COLORS })}
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

        {/* Desktop layout */}
        <div className="hidden lg:block">
          {/* Palette ribbon — full width */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg">
                  {t("home.palette.title")}
                </h3>
                <span className={`text-xs text-on-surface-variant/60 font-medium uppercase tracking-wider transition-opacity ${colors.length > 0 ? "opacity-100" : "opacity-0"}`}>
                  {t("home.palette.countShort", { count: colors.length || 0, max: MAX_COLORS })}
                </span>
              </div>
              <a
                href={colors.length > 0 ? generateSharePageUrl(colors) : undefined}
                onClick={colors.length > 0 ? () => setNavigating(true) : undefined}
                className={`soul-gradient text-on-primary font-semibold py-3 px-7 rounded-xl flex items-center gap-2 transition-all ${colors.length > 0 ? "opacity-100 hover:opacity-95 active:scale-[0.98]" : "opacity-0 pointer-events-none"}`}
                aria-hidden={colors.length === 0}
              >
                {navigating ? t("home.loading") : t("home.continue")}
                {navigating ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </a>
            </div>
            <ColorList
              colors={colors}
              onRemove={handleRemoveColor}
              activeIndex={activeColorIndex}
              onSelect={setActiveColorIndex}
            />
          </section>

          {/* Two columns: Picker + Suggestions */}
          <div className="grid grid-cols-[400px_1fr] gap-10">
            <section className="bg-surface-low rounded-[2rem] p-6 self-start">
              <ColorPickerPanel colors={colors} onAddColor={handleAddColor} />
            </section>

            <section className="self-start">
              <ColorSuggestions
                baseColor={activeColor}
                onSelect={handleAddColor}
                compact
              />
            </section>
          </div>
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
            {navigating ? t("home.loading") : t("home.continue")}
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
