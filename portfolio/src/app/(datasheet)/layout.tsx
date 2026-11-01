import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import "../../styles/datasheet.css";

/*
 * The portfolio datasheet renders under its own document wrapper so it never
 * pays for the interactive shell used by the desktop OS, classic page, blog
 * and social routes (theme provider, smooth-scroll, error boundary, and four
 * unused font families). Only the two faces it actually sets are loaded.
 */

const instrumentSans = Instrument_Sans({
  variable: "--font-ds-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const datasheetMono = JetBrains_Mono({
  variable: "--font-ds-mono",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "512x512", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
  ],
  colorScheme: "light dark",
};

export default function DatasheetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /* The datasheet cannot nest its own <html>/<body> inside the root layout —
     the parser strips them and the font/style hooks disappear. The font
     variables live on a display:contents wrapper so they still scope to `/`
     without touching the legacy routes. */
  return (
    <div className={`${instrumentSans.variable} ${datasheetMono.variable} contents`}>
      {/* Effect enhancements only switch on once scripting is confirmed. */}
      <script
        dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
      />
      {children}
    </div>
  );
}
