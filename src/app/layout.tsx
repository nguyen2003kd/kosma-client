import type { Metadata } from "next";
import { dehydrate } from "@tanstack/react-query";
import Script from "next/script";
import "./globals.css";
import baseConfig from "@/configs/base";
import { getQueryClient } from "@/lib/get-query-client";
import { prefetchLayoutData } from "@/lib/prefetch-helpers";
import localFont from "next/font/local";
import { KosmoHeader, KosmoFooter } from "@/components/layout";
import Providers from "@/app/_providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "Kosmo DNC | Interior Design & Construction in Maryland",
    template: "%s | Kosmo DNC",
  },
  description: "Kosmo DNC provides interior design, commercial fit-outs, residential renovations, project management and branding in Maryland and Northern Virginia.",
  keywords: [
    "interior design and construction Maryland",
    "commercial interior design Maryland",
    "design build contractor Rockville MD",
    "commercial fit-out Maryland",
    "residential renovation Maryland",
    "nail salon design and construction",
    "interior design Northern Virginia",
    "custom joinery Maryland",
    "building permit drawings Maryland",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Kosmo DNC | Design, Build & Brand",
    description: "Interior design, commercial fit-outs, residential renovations, construction and branding services in Maryland and Northern Virginia.",
    url: baseConfig.frontendDomain,
    siteName: "Kosmo DNC",
    images: [
      {
        url: `${baseConfig.frontendDomain}/seo.png`,
        width: 1200,
        height: 630,
        alt: "Kosmo DNC | Interior Design & Construction",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kosmo DNC | Design, Build & Brand",
    description: "Interior design, commercial fit-outs, residential renovations, construction and branding services in Maryland and Northern Virginia.",
    images: [`${baseConfig.frontendDomain}/seo.png`],
  },
};

export default async function KosmoLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  await prefetchLayoutData(queryClient);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S1WZBLT72V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S1WZBLT72V');
          `}
        </Script>

        <Providers dehydratedState={dehydrate(queryClient)}>
          <KosmoHeader />
          <main className="min-h-screen">{children}</main>
          <KosmoFooter />
        </Providers>
      </body>
    </html>
  );
}
