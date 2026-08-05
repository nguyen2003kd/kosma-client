import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Kosmo DNC",
  description:
    "Shop construction materials, fixtures, lighting, and hardware — with trade pricing for contractors and builders.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
