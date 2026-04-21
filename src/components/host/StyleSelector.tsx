"use client";

import { GUEST_STYLES } from "@/lib/guest-styles";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/LocaleProvider";
import type { TranslationKey } from "@/lib/i18n/translations";
import type { GuestStyle } from "@/types";

interface StyleSelectorProps {
  value: GuestStyle;
  onChange: (style: GuestStyle) => void;
}

const styles: GuestStyle[] = ["wedding", "party", "gala"];

const labelKeys: Record<GuestStyle, TranslationKey> = {
  wedding: "style.wedding.label",
  party: "style.party.label",
  gala: "style.gala.label",
};

const descKeys: Record<GuestStyle, TranslationKey> = {
  wedding: "style.wedding.desc",
  party: "style.party.desc",
  gala: "style.gala.desc",
};

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  const t = useT();
  return (
    <div>
      <label className="block text-sm font-medium text-on-surface mb-2">
        {t("style.label")}
      </label>
      <p className="text-xs text-on-surface-variant mb-4">
        {t("style.desc")}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {styles.map((key) => {
          const config = GUEST_STYLES[key];
          const isActive = value === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={cn(
                "rounded-xl p-3 border-2 transition-all text-left",
                isActive
                  ? "border-primary shadow-sm"
                  : "border-outline-variant/20 hover:border-outline-variant/50"
              )}
            >
              {/* Mini preview */}
              <div
                className="rounded-lg h-16 mb-2.5 flex items-end p-2"
                style={{ backgroundColor: config.bg }}
              >
                <div className="flex gap-1.5">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.text, opacity: 0.3 }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.text, opacity: 0.2 }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: config.text, opacity: 0.15 }} />
                </div>
              </div>
              <span className="text-sm font-semibold text-on-surface block">
                {t(labelKeys[key])}
              </span>
              <span className="text-[10px] text-on-surface-variant">
                {t(descKeys[key])}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
