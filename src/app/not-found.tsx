import { Header } from "@/components/shared/Header";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <h2 className="text-6xl font-[family-name:var(--font-heading)] font-bold text-primary/20 mb-4">
            404
          </h2>
          <h3 className="text-xl font-[family-name:var(--font-heading)] font-semibold text-on-surface mb-3">
            Page not found
          </h3>
          <p className="text-on-surface-variant mb-8">
            This link doesn&apos;t look right. If you&apos;re a guest, ask the host for a new link.
          </p>
          <a
            href="/"
            className="soul-gradient text-on-primary font-semibold py-3 px-6 rounded-xl inline-flex items-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
          >
            Go to home page
          </a>
        </div>
      </main>
    </div>
  );
}
