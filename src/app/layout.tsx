import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AccessibilityProvider, AccessibilitySettings } from '@/components/AccessibilityProvider'

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
  title: "Aritra Dutta - Software Engineer | Portfolio",
  description: "Passionate coder & problem solver building robust software. Software Engineer at TCS specializing in Java, Angular, and competitive programming.",
  keywords: "Aritra Dutta, Software Engineer, Java, Angular, Spring Boot, Portfolio, TCS, Competitive Programming, LeetCode",
  authors: [{ name: "Aritra Dutta" }],
  creator: "Aritra Dutta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aritradutta.dev",
    title: "Aritra Dutta - Software Engineer Portfolio",
    description: "Passionate coder & problem solver building robust software, keen on clean code, algorithms, and technology.",
    siteName: "Aritra Dutta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aritra Dutta - Software Engineer Portfolio",
    description: "Passionate coder & problem solver building robust software, keen on clean code, algorithms, and technology.",
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ErrorBoundary>
          <AccessibilityProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange={false}
            >
              {children}
              <AccessibilitySettings />
            </ThemeProvider>
          </AccessibilityProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
