"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/LocaleProvider";
import type { TranslationKey } from "@/lib/i18n/translations";
import type { Strictness } from "@/types";

interface StrictnessSelectorProps {
  value: Strictness;
  onChange: (value: Strictness) => void;
}

const options: {
  key: Strictness;
  labelKey: TranslationKey;
  descKey: TranslationKey;
  accent: string;
  activeBg: string;
  checkBg: string;
  inactiveBg: string;
}[] = [
  {
    key: "strict",
    labelKey: "strictness.strict.label",
    descKey: "strictness.strict.desc",
    accent: "border-amber-400",
    activeBg: "bg-amber-50",
    checkBg: "bg-amber-500",
    inactiveBg: "bg-surface-lowest",
  },
  {
    key: "default",
    labelKey: "strictness.default.label",
    descKey: "strictness.default.desc",
    accent: "border-emerald-400",
    activeBg: "bg-emerald-50",
    checkBg: "bg-emerald-500",
    inactiveBg: "bg-surface-lowest",
  },
  {
    key: "relaxed",
    labelKey: "strictness.relaxed.label",
    descKey: "strictness.relaxed.desc",
    accent: "border-sky-400",
    activeBg: "bg-sky-50",
    checkBg: "bg-sky-500",
    inactiveBg: "bg-surface-lowest",
  },
];

export function StrictnessSelector({ value, onChange }: StrictnessSelectorProps) {
  const t = useT();
  return (
    <div className="space-y-3">
      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block">
        {t("strictness.label")}
      </span>

      <div className="grid grid-cols-3 gap-3">
        {options.map((opt) => {
          const active = value === opt.key;
          return (
            <button
              key={opt.key}
              onClick={() => onChange(opt.key)}
              className={cn(
                "relative rounded-2xl p-4 flex flex-col items-center gap-2 transition-all border-2",
                active
                  ? `${opt.activeBg} ${opt.accent} shadow-sm`
                  : `${opt.inactiveBg} border-outline-variant/20 hover:border-outline-variant/40 opacity-60 hover:opacity-80`
              )}
            >
              {/* Checkmark badge */}
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                active ? `${opt.checkBg} scale-100` : "bg-outline-variant/20 scale-90"
              )}>
                {active && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
              </div>

              <span className={cn(
                "text-sm font-semibold font-[family-name:var(--font-heading)] text-center leading-tight",
                active ? "text-on-surface" : "text-on-surface-variant"
              )}>
                {t(opt.labelKey)}
              </span>
              <span className="text-[11px] text-on-surface-variant/70 leading-tight text-center">
                {t(opt.descKey)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
