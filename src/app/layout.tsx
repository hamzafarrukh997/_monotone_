import type { Metadata } from "next";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/content/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { PageTransition } from "@/components/layout/PageTransition";
import { absoluteUrl, jsonLd } from "@/lib/seo";

const jakarta = localFont({
  src: "./fonts/PlusJakartaSans-latin.woff2",
  variable: "--font-jakarta",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: false,
});

const parkinsans = localFont({
  src: "./fonts/Parkinsans-latin.woff2",
  variable: "--font-parkinsans",
  display: "swap",
  weight: "300 800",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Web Design & Digital Marketing Agency | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: `Web Design & Digital Marketing Agency | ${site.name}`,
    description: site.description,
  },
  twitter: {
    card: "summary",
    title: `Web Design & Digital Marketing Agency | ${site.name}`,
    description: site.description,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      description: site.description,
      logo: absoluteUrl("/logo.svg"),
      email: site.contact.email,
      telephone: site.contact.whatsapp,
      areaServed: "Worldwide",
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} ${parkinsans.variable}`}>
      <body className="relative bg-bg text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
        />
        <SmoothScroll />
        <CustomCursor />
        <PageTransition />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" className="pt-24">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
