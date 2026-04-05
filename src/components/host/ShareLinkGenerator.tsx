"use client";

import { Link, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateShareUrl } from "@/lib/colors";
import { useClipboard } from "@/hooks/useClipboard";

interface ShareLinkGeneratorProps {
  colors: string[];
}

export function ShareLinkGenerator({ colors }: ShareLinkGeneratorProps) {
  const { copied, copy } = useClipboard();

  if (colors.length === 0) return null;

  const path = generateShareUrl(colors);
  const fullUrl = typeof window !== "undefined"
    ? `${window.location.origin}${path}`
    : path;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium flex items-center gap-1.5">
        <Link className="h-4 w-4" />
        Share this link with your guests
      </h3>
      <div className="flex gap-2">
        <Input value={fullUrl} readOnly className="font-mono text-sm" />
        <Button
          variant="outline"
          size="icon"
          onClick={() => copy(fullUrl)}
          className="shrink-0"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
