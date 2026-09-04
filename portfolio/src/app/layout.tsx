import type { Metadata } from "next";
import { Inter, Fira_Code, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import SmoothScroll from '@/components/SmoothScroll'

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: 'swap' });
const spaceGrotesk = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], display: 'swap' });
const instrumentSerif = Instrument_Serif({ variable: "--font-serifd", subsets: ["latin"], weight: ["400"], style: ["normal", "italic"], display: 'swap' });
const firaCode = Fira_Code({ variable: "--font-mono", subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "Aritra Dutta — Full-Stack Engineer",
  description: "Full-stack engineer @ TCS (2+ yrs): Java 21 microservices, 30× API wins, Azure migrations, GenAI in production. LeetCode 1672, 700+ problems solved.",
  keywords: "Aritra Dutta, Full Stack Engineer, Java, Spring Boot, LangChain, React, AWS, Azure, Portfolio, TCS, LeetCode",
  authors: [{ name: "Aritra Dutta" }],
  creator: "Aritra Dutta",
  metadataBase: new URL("https://aritradutta.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aritradutta.dev",
    title: "Aritra Dutta — Full-Stack Engineer",
    description: "Java microservices, 30× API wins, zero-downtime Azure migrations, GenAI in production.",
    siteName: "Aritra Dutta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aritra Dutta — Full-Stack Engineer",
    description: "Java microservices, 30× API wins, zero-downtime Azure migrations, GenAI in production.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "512x512", type: "image/png" }],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aritra Dutta",
  jobTitle: "Full-Stack Engineer",
  worksFor: { "@type": "Organization", name: "Tata Consultancy Services" },
  address: { "@type": "PostalAddress", addressLocality: "Bhubaneswar", addressCountry: "IN" },
  sameAs: [
    "https://github.com/Aritradutta2002",
    "https://www.linkedin.com/in/aritra-dutta-rick20/",
    "https://leetcode.com/u/Ari2001/",
    "https://www.algoguru.online/",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#07080C" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${firaCode.variable} font-sans antialiased luxe-grain`}>
        <a href="#content" className="skip-link">Skip to content</a>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
            <SmoothScroll>
              <main id="content">{children}</main>
            </SmoothScroll>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
