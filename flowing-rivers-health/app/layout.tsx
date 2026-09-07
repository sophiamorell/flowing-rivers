import type { Metadata, Viewport } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import "./globals.css";
import { site, ui } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { revealScript } from "@/lib/reveal-script";

/* Display serif for headings (brief 1.3). Only the optical-size axis is
   loaded: adding SOFT/WONK nearly doubles the font file (65KB -> 117KB). */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

/* Body sans. Montserrat was supplied with the brand assets; next/font serves
   the same face as a subsetted, self-hosted woff2 (no request to Google at
   runtime). The original TTFs are kept in docs/fonts-supplied for reference. */
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.meta.title,
    template: `%s | ${site.name}`,
  },
  description: site.meta.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: site.meta.title,
    description: site.meta.description,
    images: [
      {
        url: site.meta.ogImage.src,
        width: site.meta.ogImage.width,
        height: site.meta.ogImage.height,
        alt: site.meta.ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
    images: [site.meta.ogImage.src],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fdfaf7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${montserrat.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          {ui.skipLink}
        </a>
        {children}
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </body>
    </html>
  );
}
