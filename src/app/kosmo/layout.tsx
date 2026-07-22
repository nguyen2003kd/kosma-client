import { KosmoHeader } from "@/components/kosmo/layout/header";
import { KosmoFooter } from "@/components/kosmo/layout/footer";
import { PromoBar } from "@/components/kosmo/layout/promo-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Kosmo DNC | Interior Design & Construction in Maryland",
    template: "%s | Kosmo DNC",
  },
  description:
    "Kosmo DNC provides interior design, commercial fit-outs, residential renovations, project management and branding in Maryland and Northern Virginia.",
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
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Kosmo DNC | Design, Build & Brand",
    description:
      "Interior design, commercial fit-outs, residential renovations, construction and branding services in Maryland and Northern Virginia.",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "Kosmo DNC | Interior Design & Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kosmo DNC | Design, Build & Brand",
    description:
      "Interior design, commercial fit-outs, residential renovations, construction and branding services in Maryland and Northern Virginia.",
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
