"use client";

import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/LocaleProvider";

interface ColorSwatchProps {
  color: string;
  size?: "sm" | "md" | "lg";
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const sizes = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-14 h-14",
};

export function ColorSwatch({
  color,
  size = "md",
  selected,
  onClick,
  className,
}: ColorSwatchProps) {
  const t = useT();
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border-2 transition-all shrink-0",
        sizes[size],
        selected
          ? "border-primary ring-2 ring-primary/30"
          : "border-border hover:border-primary/50",
        onClick ? "cursor-pointer" : "cursor-default",
        className
      )}
      style={{ backgroundColor: color }}
      aria-label={t("swatch.aria", { color })}
    />
  );
}
