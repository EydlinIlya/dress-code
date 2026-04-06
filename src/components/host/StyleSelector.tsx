"use client";

import { GUEST_STYLES } from "@/lib/guest-styles";
import { cn } from "@/lib/utils";
import type { GuestStyle } from "@/types";

interface StyleSelectorProps {
  value: GuestStyle;
  onChange: (style: GuestStyle) => void;
}

const styles: GuestStyle[] = ["wedding", "party", "gala"];

export function StyleSelector({ value, onChange }: StyleSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-on-surface mb-2">
        Guest page style
      </label>
      <p className="text-xs text-on-surface-variant mb-4">
        Choose how your guests will see the page.
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
                {config.label}
              </span>
              <span className="text-[10px] text-on-surface-variant">
                {config.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
