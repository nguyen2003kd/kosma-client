"use client";

import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10Post } from "@/api/endpoints/post";
import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { Post } from "@/api/models/post";
import QuotationPopupDialog from "@/components/common/quotation-popup/quotation-popup-dialog";
import { Loading } from "@/components/common/loading";
import { PAGE_IDS } from "@/constants/page-ids";
import { buildPostFilters } from "@/lib/filters";
import { slugify } from "@/lib/slugify";
import type { PostExtended as PostWithImage } from "@/types/post";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ServiceFilters from "./components/service-filters";
import ServiceList from "./components/service-list";
import ServiceSidebar from "./components/service-sidebar";

export default function ServicesPage() {
  const { t } = useTranslation("pages/services");

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#19426D]">
          <Loading text={t("title")} size="lg" className="text-white" />
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}

function ServicesContent() {
  const { i18n } = useTranslation("pages/services");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";

  // server
  const { data: categoriesData } = useGetApiV10Category({ language: currentLang });

  useEffect(() => {
    if (!categoriesData?.responseData || !categoryParam) {
      setSelectedCategory("");
      return;
    }

    const categories = categoriesData.responseData.find(
      (cat: CategoryWithChildren) => cat.link === pathname,
    )?.categories || [];

    const matched = categories.find(
      (cat) => slugify(cat.name || "") === categoryParam || cat.id === categoryParam,
    );

    setSelectedCategory(matched?.id || "");
  }, [categoryParam, categoriesData, pathname]);

  const { serviceSubCategories, currentCategoryName, servicesCategoryId, rootCategoryName } =
    useMemo(() => {
      const serviceCategory = (
        categoriesData?.responseData as CategoryWithChildren[]
      )?.find((cat) => cat.link === pathname);
      const categories = serviceCategory?.categories || [];
      const categoryName = selectedCategory
        ? categories.find((cat) => cat.id === selectedCategory)?.name || "N/a"
        : "All services";
      return {
        serviceSubCategories: categories,
        currentCategoryName: categoryName,
        servicesCategoryId: serviceCategory?.id || "",
        rootCategoryName: serviceCategory?.name || "Services",
      };
    }, [categoriesData, selectedCategory, pathname]);

  const filters = useMemo(() => buildPostFilters(date), [date]);

  const { data, isLoading, error } = useGetApiV10Post(
    {
      filters,
      page: currentPage,
      pageSize: 12,
      position: "true",
      sortOrderPosition: "ASC",
      filterBy: "CLIENT",
      category_id: selectedCategory || servicesCategoryId,
      page_id: PAGE_IDS.LATEST_POSTS,
    },
    {
      query: {
        enabled: !!(selectedCategory || servicesCategoryId),
      },
    },
  );

  const { data: relatedServicesData, isLoading: isLoadingRelated } = useGetApiV10Post(
    {
      filters: "is_hidden==false",
      pageSize: 10,
      position: "true",
      sortOrderPosition: "ASC",
      filterBy: "CLIENT",
      page_id: PAGE_IDS.FEATURED_NEWS,
      category_id: selectedCategory || servicesCategoryId,
    },
    {
      query: {
        enabled: !!(selectedCategory || servicesCategoryId),
      },
    },
  );

  const relatedServices = (relatedServicesData?.responseData?.rows as Post[]) || [];
  const posts = (data?.responseData?.rows as PostWithImage[]) || [];
  const totalPages = data?.responseData?.count
    ? Math.ceil(data.responseData.count / (data.responseData.pageSize || 10))
    : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat pt-16 pb-32 overflow-hidden"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="absolute inset-0 bg-[#1a3a5c]/60" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-4">
            {rootCategoryName}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-20 pb-8">
        <ServiceFilters
          selectedCategory={selectedCategory}
          onCategoryChange={(categoryId) => {
            setSelectedCategory(categoryId);
            setCurrentPage(1);
          }}
          categories={serviceSubCategories}
          isLoading={!categoriesData?.responseData}
          onNavigate={(path) => router.push(path, { scroll: false })}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            <ServiceList
              posts={posts}
              isLoading={isLoading}
              error={error}
              currentCategoryName={currentCategoryName}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              hasFilters={!!(date || selectedCategory)}
              hasDateFilter={!!date}
              hasCategoryFilter={!!selectedCategory}
              onClearDateFilter={() => {
                setDate(undefined);
                setCurrentPage(1);
              }}
              onClearCategoryFilter={() => {
                setSelectedCategory("");
                setCurrentPage(1);
                router.push("/services", { scroll: false });
              }}
            />
          </div>

          <div className="lg:col-span-1">
            <ServiceSidebar
              relatedServices={relatedServices}
              isLoading={isLoadingRelated}
              onQuoteClick={() => setIsQuoteModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <QuotationPopupDialog
        open={isQuoteModalOpen}
        onOpenChange={setIsQuoteModalOpen}
      />
    </div>
  );
}
