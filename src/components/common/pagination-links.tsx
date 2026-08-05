"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationLinksProps {
  currentPage: number;
  totalPages: number;
  /** Extra query params to preserve (e.g. { category: "toilets", sort: "price-asc" }) */
  extraParams?: Record<string, string | undefined>;
}

function buildHref(
  pathname: string,
  searchParams: URLSearchParams,
  page: number,
  extraParams?: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(page));
  if (extraParams) {
    for (const [key, value] of Object.entries(extraParams)) {
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }
  }
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}


export default function PaginationLinks({
  currentPage,
  totalPages,
  extraParams,
}: PaginationLinksProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    pages.push(1);
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    if (startPage > 2) pages.push("...");
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (endPage < totalPages - 1 && currentPage !== totalPages) pages.push("...");
    if (currentPage !== totalPages) pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const baseLinkClass =
    "inline-flex items-center justify-center w-9 h-9 rounded-lg text-[13px] font-bold transition-all";
  const activeClass = "bg-ink text-white";
  const inactiveClass =
    "bg-white text-gray-700 border border-mutedLine hover:border-ink/40";

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={buildHref(pathname, searchParams, currentPage - 1, extraParams)}
          className={`${baseLinkClass} ${inactiveClass}`}
          aria-label="Previous page"
        >
          ←
        </Link>
      )}

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="text-gray-700 text-sm px-2">
            …
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(pathname, searchParams, page as number, extraParams)}
            className={`${baseLinkClass} ${currentPage === page ? activeClass : inactiveClass
              }`}
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < totalPages && (
        <Link
          href={buildHref(pathname, searchParams, currentPage + 1, extraParams)}
          className={`${baseLinkClass} ${inactiveClass}`}
          aria-label="Next page"
        >
          →
        </Link>
      )}
    </div>
  );
}
