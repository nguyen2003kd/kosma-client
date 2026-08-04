"use client";

import Link from "next/link";
import { useGetApiV10Footer } from "@/api/endpoints/footer";
import { Loader2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Types for the nested footer structure (matches new backend schema).
// Using local types to avoid depending on generated API models.
// ---------------------------------------------------------------------------
interface FooterElementData {
  id?: string;
  type?: string;
  content?: string | null;
  link?: string | null;
}

interface FooterRowData {
  id?: string;
  footer_elements?: FooterElementData[] | null;
}

interface FooterColumnData {
  id?: string;
  title?: string | null;
  footer_rows?: FooterRowData[] | null;
}

interface FooterData {
  id?: string;
  language?: string;
  is_active?: boolean | null;
  footer_columns?: FooterColumnData[] | null;
}

function renderElement(el: FooterElementData, key: string) {
  if (el.type === "image") {
    const img = (
      <img
        src={el.content || ""}
        alt=""
        className="h-8 sm:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
      />
    );
    if (el.link) {
      return (
        <Link key={key} href={el.link} className="inline-flex">
          {img}
        </Link>
      );
    }
    return <div key={key}>{img}</div>;
  }

  // text element
  const text = (
    <span className="text-[13px] text-white/80 hover:text-white transition-colors">
      {el.content}
    </span>
  );
  if (el.link) {
    const isExternal = /^https?:\/\//.test(el.link);
    if (isExternal) {
      return (
        <a
          key={key}
          href={el.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {text}
        </a>
      );
    }
    return (
      <Link key={key} href={el.link} className="block">
        {text}
      </Link>
    );
  }
  return <div key={key}>{text}</div>;
}

export function KosmoFooter() {
  const { data: footersData, isLoading } = useGetApiV10Footer(undefined as any);
  const rows = (footersData as any)?.responseData?.rows ?? [];
  const activeFooter: FooterData | undefined = rows.find(
    (f: any) => f.is_active,
  );
  const columns = activeFooter?.footer_columns ?? [];

  if (isLoading) {
    return (
      <footer className="bg-black-950 text-white">
        <div className="container-kosmo py-12 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-white/60" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-black-950 text-white">
      <div className="container-kosmo py-12 sm:py-16 md:py-[72px]">
        {columns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {columns.map((col, colIdx) => {
              const rows = col.footer_rows ?? [];
              return (
                <div key={col.id ?? colIdx}>
                  {col.title && (
                    <h3 className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-white mb-4">
                      {col.title}
                    </h3>
                  )}
                  <div className="space-y-4">
                    {rows.map((row, rowIdx) => {
                      const elements = row.footer_elements ?? [];
                      const isMultiCol = elements.length >= 2;
                      return (
                        <div
                          key={row.id ?? rowIdx}
                          className={
                            isMultiCol
                              ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                              : "space-y-3"
                          }
                        >
                          {elements.map((el, elIdx) =>
                            renderElement(
                              el,
                              `${col.id ?? colIdx}-${row.id ?? rowIdx}-${el.id ?? elIdx}`,
                            ),
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Fallback: static content when no footer configured in DB */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            <div className="lg:col-span-1">
              <Link
                href="/home"
                className="inline-flex items-center gap-3 mb-5 sm:mb-6 p-2 sm:p-3 bg-white rounded-lg"
              >
                <img
                  src="/logo.png"
                  alt="Kosmo DNC"
                  className="h-10 sm:h-12 w-auto"
                />
              </Link>
              <p className="text-[13px] text-white/80 mb-5 sm:mb-6 leading-relaxed">
                Interior design, commercial fit-outs, residential renovations,
                construction and branding services in Maryland and Northern
                Virginia.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/20 py-4 sm:py-5">
        <div className="container-kosmo flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-[11px] sm:text-[12px] text-white/80">
            Copyright © {new Date().getFullYear()} Kosmo DNC. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="text-[11px] sm:text-[12px] text-white/80 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[11px] sm:text-[12px] text-white/80 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
