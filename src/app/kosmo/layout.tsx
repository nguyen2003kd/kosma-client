import { KosmoHeader } from "@/components/kosmo/layout/header";
import { KosmoFooter } from "@/components/kosmo/layout/footer";
import { PromoBar } from "@/components/kosmo/layout/promo-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kosmo - Custom Storage Solutions for Every Space",
  description: "Transform your home with beautifully organized spaces designed around your lifestyle. Free in-home consultations available.",
  keywords: ["custom closets", "garage storage", "home organization", "pantries", "laundry rooms", "mudrooms", "walk-in closets"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Kosmo - Custom Storage Solutions",
    description: "Transform your home with beautifully organized spaces designed around your lifestyle.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Kosmo - Custom Storage Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kosmo - Custom Storage Solutions",
    description: "Transform your home with beautifully organized spaces designed around your lifestyle.",
    images: ["/seo.png"],
  },
};

export default function KosmoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PromoBar />
      <KosmoHeader />
      <main>{children}</main>
      <KosmoFooter />
    </>
  );
}
