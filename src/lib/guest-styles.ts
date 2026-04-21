import type { GuestStyle } from "@/types";

export interface GuestStyleConfig {
  bg: string;
  text: string;
  textMuted: string;
  surface: string;
  fontHeading: string;
  fontBody: string;
  bgImage?: string;
  bgSize?: string;
  bgPosition?: string;
}

// Display labels/descriptions live in src/lib/i18n/translations.ts (style.*).
export const GUEST_STYLES: Record<GuestStyle, GuestStyleConfig> = {
  wedding: {
    bg: "#faf8f4",
    text: "#3a3632",
    textMuted: "#8a847c",
    surface: "#f0ebe3",
    fontHeading: "var(--font-playfair), serif",
    fontBody: "var(--font-sans), sans-serif",
    bgImage: [
      "radial-gradient(ellipse 800px 600px at 5% -5%, rgba(200,180,160,0.12) 0%, transparent 70%)",
      "radial-gradient(ellipse 600px 800px at 95% 105%, rgba(200,180,160,0.09) 0%, transparent 70%)",
      "radial-gradient(circle 300px at 80% 20%, rgba(220,200,180,0.06) 0%, transparent 70%)",
    ].join(", "),
  },
  party: {
    bg: "#1a0a2e",
    text: "#f0eaff",
    textMuted: "#b0a4c8",
    surface: "#2a1a42",
    fontHeading: "var(--font-fredoka), sans-serif",
    fontBody: "var(--font-nunito), sans-serif",
    bgImage: [
      "radial-gradient(circle, rgba(255,120,180,0.3) 1.5px, transparent 1.5px)",
      "radial-gradient(circle, rgba(120,200,255,0.25) 1px, transparent 1px)",
      "radial-gradient(circle, rgba(255,220,80,0.25) 1.5px, transparent 1.5px)",
      "radial-gradient(circle, rgba(140,255,160,0.2) 1px, transparent 1px)",
    ].join(", "),
    bgSize: "50px 50px, 70px 70px, 90px 90px, 60px 60px",
    bgPosition: "0 0, 25px 15px, 10px 40px, 45px 30px",
  },
  gala: {
    bg: "#0c0c14",
    text: "#ece8e0",
    textMuted: "#a09a90",
    surface: "#1a1a24",
    fontHeading: "var(--font-playfair), serif",
    fontBody: "var(--font-sans), sans-serif",
    bgImage: [
      "radial-gradient(ellipse 500px 500px at 15% 10%, rgba(200,180,140,0.08) 0%, transparent 70%)",
      "radial-gradient(ellipse 400px 600px at 85% 90%, rgba(200,180,140,0.06) 0%, transparent 70%)",
      "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 80px)",
    ].join(", "),
  },
};

export function getStyleCssVars(style: GuestStyle): React.CSSProperties {
  const config = GUEST_STYLES[style];
  const css: Record<string, string> = {
    "--guest-bg": config.bg,
    "--guest-text": config.text,
    "--guest-text-muted": config.textMuted,
    "--guest-surface": config.surface,
    "--guest-font-heading": config.fontHeading,
    "--guest-font-body": config.fontBody,
  };
  return css as React.CSSProperties;
}

export function getStyleBgProps(style: GuestStyle): React.CSSProperties {
  const config = GUEST_STYLES[style];
  const props: React.CSSProperties = {};
  if (config.bgImage) {
    props.backgroundImage = config.bgImage;
    if (config.bgSize) props.backgroundSize = config.bgSize;
    if (config.bgPosition) props.backgroundPosition = config.bgPosition;
  }
  return props;
}
