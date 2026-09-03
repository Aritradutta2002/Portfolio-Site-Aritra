import type { Metadata } from "next";
import { Inter, Fira_Code, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import SmoothScroll from '@/components/SmoothScroll'

/* Variable display + body fonts, self-hosted via next/font (no CDN). */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Aritra Dutta | Portfolio",
  description: "Full Stack Application Engineer at TCS with 2+ years building Java microservices, AI-powered features, and cloud platforms. 700+ problems solved, LeetCode 1672.",
  keywords: "Aritra Dutta, Full Stack Engineer, Java, Spring Boot, LangChain, React, AWS, Portfolio, TCS, Competitive Programming, LeetCode",
  authors: [{ name: "Aritra Dutta" }],
  creator: "Aritra Dutta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aritradutta.dev",
    title: "Aritra Dutta | Full Stack Engineer Portfolio",
    description: "Full Stack Application Engineer at TCS with 2+ years. Java microservices, AI-powered features with LangChain, 30x API performance gains.",
    siteName: "Aritra Dutta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aritra Dutta | Full Stack Engineer Portfolio",
    description: "Full Stack Application Engineer at TCS with 2+ years. Java microservices, AI-powered features with LangChain, 30x API performance gains.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#BEF264" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${firaCode.variable} font-sans antialiased transition-colors duration-500`}
      >
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
