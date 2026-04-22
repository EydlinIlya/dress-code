"use client";

import { useT } from "@/lib/i18n/LocaleProvider";

interface AllowedColorsDisplayProps {
  colors: string[];
}

export function AllowedColorsDisplay({ colors }: AllowedColorsDisplayProps) {
  const t = useT();
  return (
    <div className="p-6 bg-surface-low rounded-[1.5rem]">
      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-6">
        {t("guest.hostsPalette")}
      </span>
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {colors.map((color, i) => (
          <div key={`${color}-${i}`} className="flex flex-col items-center gap-3">
            <div
              className="w-14 h-14 rounded-full shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] font-medium font-mono text-on-surface-variant">
              {color.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
