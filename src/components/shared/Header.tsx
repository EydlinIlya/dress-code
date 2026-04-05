"use client";

import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const isGuest = pathname.startsWith("/check");

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-6 py-4 max-w-md mx-auto">
        <a href="/" className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-[family-name:var(--font-heading)] font-semibold tracking-tight text-on-surface">
            Dress Code
          </span>
        </a>
        {!isGuest && (
          <span className="text-xs text-on-surface-variant/60 font-medium">
            No login needed
          </span>
        )}
      </div>
    </header>
  );
}
