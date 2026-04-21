"use client";

import { Header } from "@/components/shared/Header";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function NotFound() {
  const t = useT();
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <h2 className="text-6xl font-[family-name:var(--font-heading)] font-bold text-primary/20 mb-4">
            404
          </h2>
          <h3 className="text-xl font-[family-name:var(--font-heading)] font-semibold text-on-surface mb-3">
            {t("notFound.title")}
          </h3>
          <p className="text-on-surface-variant mb-8">
            {t("notFound.message")}
          </p>
          <a
            href="/"
            className="soul-gradient text-on-primary font-semibold py-3 px-6 rounded-xl inline-flex items-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
          >
            {t("notFound.home")}
          </a>
        </div>
      </main>
    </div>
  );
}
