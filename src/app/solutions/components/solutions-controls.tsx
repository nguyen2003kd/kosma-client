"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import SolutionSidebar from "../components/solution-sidebar";
import QuotationPopupDialog from "@/components/common/quotation-popup/quotation-popup-dialog";
import { useState } from "react";
import { SOLUTION_TYPES, type SolutionType } from "./solution-types";

export { SOLUTION_TYPES };

interface SolutionsControlsProps {
  basePath: string;
  activeType: SolutionType;
  currentCategoryName: string;
  children: ReactNode;
}

export function SolutionsControls({
  activeType,
  currentCategoryName,
  children,
}: SolutionsControlsProps) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
        {SOLUTION_TYPES.map((type) => {
          const isActive = activeType === type.id;
          return (
            <Link
              key={type.id}
              href={`?type=${type.id}`}
              className={`inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-[14px] font-bold transition-all ${isActive
                ? "bg-ink text-white shadow-soft"
                : "bg-white text-gray-700 border border-mutedLine hover:border-ink/40 hover:text-ink"
                }`}
            >
              {type.label}
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">{children}</div>

        <div className="lg:col-span-1">
          <SolutionSidebar onQuoteClick={() => setIsQuoteModalOpen(true)} />
        </div>
      </div>

      <QuotationPopupDialog
        open={isQuoteModalOpen}
        onOpenChange={setIsQuoteModalOpen}
      />
    </>
  );
}
