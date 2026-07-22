import Providers from "@/components/providers";
import { AbilityProvider } from "@/components/providers/ability-provider";
import baseConfig from "@/configs/base";
import { getQueryClient } from "@/lib/get-query-client";
import { prefetchLayoutData } from "@/lib/prefetch-helpers";
import { Toaster } from "@components/ui/toaster";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

import "./globals.css";
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
    default: "Kosmo - Custom Storage Solutions for Every Space",
    template: "%s | Kosmo - Custom Storage Solutions",
  },
  description:
    "Transform your home with beautifully organized spaces designed around your lifestyle. Free in-home consultations available.",
  keywords: [
    "custom closets",
    "garage storage",
    "home organization",
    "pantries",
    "laundry rooms",
    "mudrooms",
    "walk-in closets",
    "custom storage solutions",
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
    title: "Kosmo - Custom Storage Solutions for Every Space",
    description:
      "Transform your home with beautifully organized spaces designed around your lifestyle.",
    url: baseConfig.frontendDomain,
    siteName: "Kosmo - Custom Storage Solutions",
    images: [
      {
        url: `${baseConfig.frontendDomain}/seo.png`,
        width: 1200,
        height: 630,
        alt: "Kosmo - Custom Storage Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kosmo - Custom Storage Solutions for Every Space",
    description:
      "Transform your home with beautifully organized spaces designed around your lifestyle.",
    images: [`${baseConfig.frontendDomain}/seo.png`],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = getQueryClient();
  await prefetchLayoutData(queryClient);

  return (
    <html lang="vi">
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

        <Providers>
          <AbilityProvider>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <main className="min-h-screen">{children}</main>
            </HydrationBoundary>
          </AbilityProvider>
          <Toaster
            richColors
            closeButton
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              className: "p-3 gap-2",
              classNames: {
                closeButton: "left-auto right-0 top-0 -translate-y-2.5 translate-x-0",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
