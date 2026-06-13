import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AccessibilityProvider, AccessibilitySettings } from '@/components/AccessibilityProvider'
import SmoothScroll from '@/components/SmoothScroll'

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
  description: "Backend Engineer at TCS specializing in Java, Spring Boot, and cloud microservices. 554+ problems solved, LeetCode 1672.",
  keywords: "Aritra Dutta, Software Engineer, Java, Angular, Spring Boot, Portfolio, TCS, Competitive Programming, LeetCode",
  authors: [{ name: "Aritra Dutta" }],
  creator: "Aritra Dutta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aritradutta.dev",
    title: "Aritra Dutta | Backend Engineer Portfolio",
    description: "Backend Engineer at TCS. Building enterprise microservices, 30x API performance gains, Azure cloud migrations.",
    siteName: "Aritra Dutta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aritra Dutta | Backend Engineer Portfolio",
    description: "Backend Engineer at TCS. Building enterprise microservices, 30x API performance gains, Azure cloud migrations.",
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
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans antialiased transition-colors duration-500`}
      >
        <ErrorBoundary>
          <AccessibilityProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange={false}
            >
              <SmoothScroll>
                {children}
                <AccessibilitySettings />
              </SmoothScroll>
            </ThemeProvider>
          </AccessibilityProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
