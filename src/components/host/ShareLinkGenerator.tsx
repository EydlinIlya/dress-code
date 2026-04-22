"use client";

import { useRef } from "react";
import { Link, Check, Copy, ChevronDown } from "lucide-react";
import { generateShareUrl } from "@/lib/colors";
import { useClipboard } from "@/hooks/useClipboard";
import { useT } from "@/lib/i18n/LocaleProvider";

interface ShareLinkGeneratorProps {
  colors: string[];
}

export function ShareLinkGenerator({ colors }: ShareLinkGeneratorProps) {
  const { copied, copy } = useClipboard();
  const ref = useRef<HTMLElement>(null);
  const t = useT();

  if (colors.length === 0) return null;

  const path = generateShareUrl(colors);
  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${path}`
      : path;

  const scrollToLink = () => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <>
      {/* Mobile: floating button to scroll down to share section */}
      <button
        onClick={scrollToLink}
        className="lg:hidden fixed bottom-8 right-6 z-40 soul-gradient text-on-primary px-5 py-3.5 rounded-full flex items-center gap-2 shadow-lg hover:opacity-95 active:scale-95 transition-all safe-bottom"
      >
        <Link className="h-4 w-4" />
        <span className="text-sm font-semibold">{t("share.shareLink")}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      <section
        ref={ref}
        className="bg-surface-lowest rounded-[2rem] p-8 shadow-[0px_10px_30px_rgba(47,51,49,0.05)] border border-outline-variant/10 lg:sticky lg:top-24"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Link className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg">
            {t("share.heading")}
          </h3>
        </div>

        <div className="bg-surface-low rounded-xl px-4 py-4 mb-6 font-mono text-sm text-on-surface-variant truncate select-all">
          {fullUrl}
        </div>

        <button
          onClick={() => copy(fullUrl)}
          className="w-full soul-gradient text-on-primary font-semibold py-4 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5" />
              <span>{t("share.copied")}</span>
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" />
              <span>{t("share.copyLink")}</span>
            </>
          )}
        </button>
      </section>
    </>
  );
}
