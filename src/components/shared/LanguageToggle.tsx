"use client";

import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { LOCALE_FULL_LABELS, LOCALE_LABELS, type Locale } from "@/lib/i18n/translations";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();
  const next: Locale = locale === "en" ? "ru" : "en";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => setLocale(next)}
      aria-label={t("lang.switchTo", { lang: LOCALE_FULL_LABELS[next] })}
      title={t("lang.switchTo", { lang: LOCALE_FULL_LABELS[next] })}
      className="gap-1.5 font-semibold"
    >
      <Languages className="h-4 w-4" />
      <span>{LOCALE_LABELS[locale]}</span>
    </Button>
  );
}
