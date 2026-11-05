import type { Metadata, Viewport } from "next";
import { Inter, Geist, Geist_Mono, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import SmoothScroll from '@/components/SmoothScroll'
import MotionProvider from '@/components/providers/MotionProvider'
import ScrollProgress from '@/components/ScrollProgress'
import GrainOverlay from '@/components/GrainOverlay'
import Cursor from '@/components/Cursor'

/* Variable display + body fonts, self-hosted via next/font (no CDN). */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

/* Zro datasheet body/mono typeface. Scoped via --font-ds-mono so the
   legacy OS, classic, blog and social routes keep Geist. */
const datasheetMono = JetBrains_Mono({
  variable: "--font-ds-mono",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
    { media: "(prefers-color-scheme: light)", color: "#fafafc" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aritrodutta.tech"),
  title: "Aritra Dutta | Portfolio",
  description: "Full Stack Application Engineer at TCS with 2+ years building Java microservices, AI-powered features, and cloud platforms. 700+ problems solved, LeetCode 1672.",
  keywords: "Aritra Dutta, Full Stack Application Engineer, Java, Spring Boot, LangChain, React, AWS, Portfolio, TCS, Competitive Programming, LeetCode",
  authors: [{ name: "Aritra Dutta" }],
  creator: "Aritra Dutta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.aritrodutta.tech/",
    title: "Aritra Dutta | Full Stack Application Engineer Portfolio",
    description: "Full Stack Application Engineer at TCS with 2+ years. Java microservices, AI-powered features with LangChain, 20x API performance gains.",
    siteName: "Aritra Dutta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aritra Dutta | Full Stack Application Engineer Portfolio",
    description: "Full Stack Application Engineer at TCS with 2+ years. Java microservices, AI-powered features with LangChain, 20x API performance gains.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} ${datasheetMono.variable} font-sans antialiased transition-colors duration-500`}
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange={false}
          >
            <MotionProvider>
              <GrainOverlay />
              <Cursor />
              <ScrollProgress />
              <SmoothScroll>
                {children}
              </SmoothScroll>
            </MotionProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
