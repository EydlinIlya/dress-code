"use client";

import { CircleCheck, CircleAlert, CircleX } from "lucide-react";
import { evaluateMatch } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/LocaleProvider";
import type { MatchLevel, Strictness } from "@/types";

interface MatchResultProps {
  sampledColor: string;
  allowedColors: string[];
  variant?: "card" | "sticky";
  strictness?: Strictness;
}

const config = {
  good: {
    icon: CircleCheck,
    bg: "bg-[#e8f5e9]",
    text: "text-[#2e7d32]",
    border: "border-[#a5d6a7]",
    swatchRing: "ring-[#66bb6a]",
  },
  ask: {
    icon: CircleAlert,
    bg: "bg-[#fff8e1]",
    text: "text-[#f57f17]",
    border: "border-[#ffe082]",
    swatchRing: "ring-[#ffa726]",
  },
  no: {
    icon: CircleX,
    bg: "bg-[#fbe9e7]",
    text: "text-[#c62828]",
    border: "border-[#ef9a9a]",
    swatchRing: "ring-[#ef5350]",
  },
};

const levelMessageKey: Record<MatchLevel, "match.good" | "match.ask" | "match.no"> = {
  good: "match.good",
  ask: "match.ask",
  no: "match.no",
};

export function MatchResult({ sampledColor, allowedColors, variant = "card", strictness = "default" }: MatchResultProps) {
  const t = useT();
  const result = evaluateMatch(sampledColor, allowedColors, strictness);
  const { level, closestColor } = result;
  const message = t(levelMessageKey[level]);
  const { icon: Icon, bg, text, border, swatchRing } = config[level];

  if (variant === "sticky") {
    return (
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 border-t px-5 py-4 animate-fade-in-up safe-bottom",
          bg,
          border
        )}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Icon className={cn("h-7 w-7 shrink-0", text)} />
            <span className={cn("text-sm font-[family-name:var(--font-heading)] font-semibold", text)}>
              {message}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={cn("w-9 h-9 rounded-full ring-2 shadow-sm", swatchRing)}
              style={{ backgroundColor: sampledColor }}
            />
            <span className="text-on-surface-variant/40 text-xs">{t("match.vs")}</span>
            <div
              className="w-9 h-9 rounded-full shadow-sm border border-outline-variant/20"
              style={{ backgroundColor: closestColor }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-[2rem] p-8 border transition-all duration-300 animate-fade-in-up",
        bg,
        border
      )}
    >
      <div className="flex flex-col items-center gap-5">
        <Icon className={cn("h-12 w-12", text)} />
        <span
          className={cn(
            "text-lg font-[family-name:var(--font-heading)] font-semibold text-center",
            text
          )}
        >
          {message}
        </span>
        <div className="flex items-center gap-6 mt-2">
          <div className="text-center">
            <div
              className={cn("w-14 h-14 rounded-full mx-auto ring-3 shadow-sm", swatchRing)}
              style={{ backgroundColor: sampledColor }}
            />
            <span className="text-[11px] text-on-surface-variant font-mono mt-2 block">
              {t("match.yourPick")}
            </span>
          </div>
          <span className="text-on-surface-variant/40 text-sm font-medium">{t("match.vs")}</span>
          <div className="text-center">
            <div
              className="w-14 h-14 rounded-full mx-auto shadow-sm border border-outline-variant/20"
              style={{ backgroundColor: closestColor }}
            />
            <span className="text-[11px] text-on-surface-variant font-mono mt-2 block">
              {t("match.closest")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
