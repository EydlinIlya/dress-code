"use client";

import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { useT } from "@/lib/i18n/LocaleProvider";

export function Header() {
  const t = useT();
  return (
    <header className="w-full z-50 bg-background">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <a href="/" className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-[family-name:var(--font-heading)] font-semibold tracking-tight text-on-surface">
            {t("brand")}
          </span>
        </a>
        <LanguageToggle />
      </div>
    </header>
  );
}
