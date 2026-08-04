"use client";

import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10Post } from "@/api/endpoints/post";
import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { PageHero, SectionHeading, ConsultationForm } from "@/components/common";
import QuotationPopupDialog from "@/components/common/quotation-popup/quotation-popup-dialog";
import { Loading } from "@/components/common/loading";
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
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loading text={t("title")} size="lg" className="text-ink" />
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
}

function ServicesContent() {
  const { t, i18n } = useTranslation("pages/services");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const locale = i18n.language?.startsWith("en") ? "en-US" : "vi-VN";

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const { data: categoriesData } = useGetApiV10Category({ language: "en" });

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

  const { serviceSubCategories, currentCategoryName, rootCategoryName } =
    useMemo(() => {
      const serviceCategory = (
        categoriesData?.responseData as CategoryWithChildren[]
      )?.find((cat) => cat.link === pathname);
      const categories = serviceCategory?.categories || [];
      const categoryName = selectedCategory
        ? categories.find((cat) => cat.id === selectedCategory)?.name || "N/a"
        : t("allServices");
      return {
        serviceSubCategories: categories,
        currentCategoryName: categoryName,
        rootCategoryName: serviceCategory?.name || t("title"),
      };
    }, [categoriesData, selectedCategory, pathname, t]);

  const activeCategoryLink = useMemo(() => {
    if (selectedCategory) {
      return serviceSubCategories.find((cat) => cat.id === selectedCategory)?.link || undefined;
    }
    return serviceSubCategories[0]?.link || undefined;
  }, [selectedCategory, serviceSubCategories]);

  const filters = useMemo(() => buildPostFilters(date), [date]);

  const postQueryParams = useMemo(
    () => ({
      filters,
      page: currentPage,
      pageSize: 12,
      position: "true" as const,
      sortOrderPosition: "ASC" as const,
      filterBy: "CLIENT" as const,
      ...(selectedCategory ? { category_id: selectedCategory } : {}),
    }),
    [filters, currentPage, selectedCategory],
  );

  const { data, isLoading, error } = useGetApiV10Post(postQueryParams);

  const posts = (data?.responseData?.rows as PostWithImage[]) || [];
  const totalPages = data?.responseData?.count
    ? Math.ceil(data.responseData.count / (data.responseData.pageSize || 12))
    : 1;

  return (
    <>
      <PageHero
        title={rootCategoryName}
        subtitle={t("allServices")}
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: t("title") },
        ]}
        backgroundImage="/images/hero.jpg"
      />

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow={t("categoryTitle")}
            title={currentCategoryName}
            subtitle={t("allServices")}
          />

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

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
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
                locale={locale}
                categoryLink={activeCategoryLink}
              />
            </div>

            <div className="lg:col-span-1">
              <ServiceSidebar onQuoteClick={() => setIsQuoteModalOpen(true)} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <SectionHeading
            eyebrow={t("needSupport")}
            title={t("requestQuote")}
            subtitle={t("contactForQuote")}
          />
          <div className="max-w-4xl mx-auto">
            <ConsultationForm />
          </div>
        </div>
      </section>

      <QuotationPopupDialog
        open={isQuoteModalOpen}
        onOpenChange={setIsQuoteModalOpen}
      />
    </>
  );
}
