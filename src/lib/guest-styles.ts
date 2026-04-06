import type { GuestStyle } from "@/types";

export interface GuestStyleConfig {
  label: string;
  description: string;
  bg: string;
  text: string;
  textMuted: string;
  surface: string;
  fontHeading: string;
  fontBody: string;
}

export const GUEST_STYLES: Record<GuestStyle, GuestStyleConfig> = {
  classic: {
    label: "Classic",
    description: "Clean and minimal",
    bg: "#faf9f7",
    text: "#2f3331",
    textMuted: "#5c605d",
    surface: "#f3f4f1",
    fontHeading: "'Manrope', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  elegant: {
    label: "Elegant",
    description: "Refined and warm",
    bg: "#1a1a2e",
    text: "#e8e6e3",
    textMuted: "#a09b93",
    surface: "#25253d",
    fontHeading: "var(--font-playfair), serif",
    fontBody: "var(--font-sans), sans-serif",
  },
  playful: {
    label: "Playful",
    description: "Bright and fun",
    bg: "#fef6e4",
    text: "#2d334a",
    textMuted: "#64607a",
    surface: "#fff4d9",
    fontHeading: "var(--font-fredoka), sans-serif",
    fontBody: "var(--font-nunito), sans-serif",
  },
};

export function getStyleCssVars(style: GuestStyle): React.CSSProperties {
  const config = GUEST_STYLES[style];
  return {
    "--guest-bg": config.bg,
    "--guest-text": config.text,
    "--guest-text-muted": config.textMuted,
    "--guest-surface": config.surface,
    "--guest-font-heading": config.fontHeading,
    "--guest-font-body": config.fontBody,
  } as React.CSSProperties;
}
