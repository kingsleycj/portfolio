import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";

import { Curtain } from "@/components/layout/Curtain";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { profile } from "@/content/profile";

import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  // Only `wdth` is used by the type scale. Dropping `opsz` roughly halves the
  // variable font payload, which was the single largest asset on the page.
  axes: ["wdth"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  // Stays preloaded. Deferring it measured no LCP improvement (3.50s either
  // way) and only moved the noisy TBT figure — not worth a visible swap on
  // every line of body copy.
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["500"],
  // Kept preloaded on purpose. Deferring it saved ~22KB but the late swap on
  // every meta label pushed CLS from 0 to 0.09 — the wrong trade for this page.
});

const description = `Software engineer in Lagos building backends, on-chain payment rails and AI infrastructure. ${profile.valueProp}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — Software Engineer`,
    template: `%s — ${profile.name}`,
  },
  description,
  keywords: [
    "Kingsley Nweke",
    "Software Engineer",
    "Backend Engineer",
    "AI Systems Engineering",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Python",
    "FastAPI",
    "Solana",
    "Solidity",
  ],
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — Software Engineer`,
    description,
    url: profile.siteUrl,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Software Engineer`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/** Structured data so search engines read the page as a person, not a document. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: "Software Engineer",
  knowsAbout: [
    "Backend engineering",
    "AI systems engineering",
    "Distributed payments",
    "Smart contracts",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  sameAs: [
    "https://github.com/kingsleycj",
    "https://linkedin.com/in/kingsleycj",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The theme script below sets data-theme before React hydrates.
      suppressHydrationWarning
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Stamps the theme onto <html> before the first paint, so a dark-mode
            visitor never sees a flash of the light palette. Kept inline and
            tiny on purpose — a deferred script would paint light first. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.dataset.theme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})()",
          }}
        />
        {/* Motion server-renders `opacity: 0` on scroll reveals. Without JavaScript
            nothing would ever reveal them, so force them visible up front. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".reveal{opacity:1!important;transform:none!important}.drawn-underline path{stroke-dasharray:none!important;stroke-dashoffset:0!important}",
            }}
          />
        </noscript>
      </head>
      <body>
        <Curtain />
        <div aria-hidden="true" className="grain" />
        <a
          href="#main"
          className="text-meta sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
