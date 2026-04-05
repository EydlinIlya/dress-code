import { Palette } from "lucide-react";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <a href="/" className="flex items-center gap-2 font-semibold">
          <Palette className="h-5 w-5" />
          <span>Dress Code</span>
        </a>
      </div>
    </header>
  );
}
