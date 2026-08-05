"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import type { Category } from "@/api/models/category";
import ServiceFilters from "@/app/services/components/service-filters";
import ServiceSidebar from "@/app/services/components/service-sidebar";
import QuotationPopupDialog from "@/components/common/quotation-popup/quotation-popup-dialog";
import { slugify } from "@/lib/slugify";

interface ServicesControlsProps {
  categories: Category[];
  selectedCategory: string;
  children: ReactNode;
}


export function ServicesControls({
  categories,
  selectedCategory,
  children,
}: ServicesControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    // Update URL: ?category=<slug-or-id> and reset page
    const params = new URLSearchParams(searchParams.toString());
    if (!categoryId) {
      params.delete("category");
    } else {
      const cat = categories.find((c) => c.id === categoryId);
      const slug = cat ? slugify(cat.name || "") || cat.id || categoryId : categoryId;
      params.set("category", slug);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleNavigate = (path: string) => {
    router.push(path, { scroll: false });
  };

  return (
    <>
      <ServiceFilters
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        isLoading={false}
        onNavigate={handleNavigate}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div className="lg:col-span-3">{children}</div>

        <div className="lg:col-span-1">
          <ServiceSidebar onQuoteClick={() => setIsQuoteModalOpen(true)} />
        </div>
      </div>

      <QuotationPopupDialog
        open={isQuoteModalOpen}
        onOpenChange={setIsQuoteModalOpen}
      />
    </>
  );
}
