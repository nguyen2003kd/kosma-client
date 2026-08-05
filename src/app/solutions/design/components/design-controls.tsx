"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, ReactNode } from "react";
import { Search } from "lucide-react";

interface DesignControlsProps {
  basePath: string;
  /** SSR-rendered design grid + pagination, passed as children */
  children: ReactNode;
}

/**
 * Client-side controls (search) for the design gallery page.
 * Reads/writes URL search params: ?search=&page=
 */
export function DesignControls({ basePath, children }: DesignControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";

  const pushParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      // Reset to page 1 on filter change
      params.delete("page");
      const qs = params.toString();
      router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
    },
    [router, searchParams, basePath],
  );

  return (
    <>
      {/* Search bar */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            defaultValue={currentSearch}
            onChange={(e) => pushParams({ search: e.target.value })}
            placeholder="Search designs by title..."
            className="w-full rounded-full border border-mutedLine bg-white pl-10 pr-4 py-2.5 text-[13px] sm:text-[14px] text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink/60 transition-colors"
          />
        </div>
      </div>

      {children}
    </>
  );
}
