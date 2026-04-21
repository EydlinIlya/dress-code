import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono, Playfair_Display, Fredoka, Nunito } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LocaleProvider } from "@/lib/i18n/LocaleProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codedress.vercel.app"),
  title: "Dress Code – Check Your Outfit Colors",
  description:
    "Easily verify if your dress matches the event color code. Pick colors, share a link, and let guests check their outfits.",
  openGraph: {
    title: "Dress Code",
    description: "Check if your outfit matches the event palette.",
    siteName: "Dress Code",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dress Code",
    description: "Check if your outfit matches the event palette.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} ${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LocaleProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
