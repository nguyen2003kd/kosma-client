"use client";

import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10Post } from "@/api/endpoints/post";
import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { Post } from "@/api/models/post";
import { PAGE_IDS } from "@/constants/page-ids";
import { slugify } from "@/lib/slugify";
import type { PostExtended as PostWithImage } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { buildPostFilters } from "@lib/filters";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CategoryTab from "../category-tab";
import NewsSidebar from "../news-sidebar";
import NewsFilters from "./components/news-filters";
import NewsList from "./components/news-list";

export default function NewsGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetApiV10Category({ language: currentLang });

  useEffect(() => {
    if (!categoriesData?.responseData || !categoryParam) {
      setSelectedCategory("");
      return;
    }

    const categories =
      categoriesData.responseData.find(
        (cat: CategoryWithChildren) => cat.link === "/news",
      )?.categories || [];

    const matched = categories.find(
      (cat) =>
        slugify(cat.name || "") === categoryParam || cat.id === categoryParam,
    );

    setSelectedCategory(matched?.id || "");
  }, [categoryParam, categoriesData]);

  const { newsSubCategories, currentCategoryName, newsCategoryId, rootCategoryName } =
    useMemo(() => {
      const newsCategory = (
        categoriesData?.responseData as CategoryWithChildren[]
      )?.find((cat) => cat.link === "/news");
      const categories = newsCategory?.categories || [];
      const categoryName = selectedCategory
        ? categories.find((cat) => cat.id === selectedCategory)?.name ||
          "Tin tức"
        : "Tin tức";
      return {
        newsSubCategories: categories,
        currentCategoryName: categoryName,
        newsCategoryId: newsCategory?.id || "",
        rootCategoryName: newsCategory?.name || "Tin tức",
      };
    }, [categoriesData, selectedCategory]);

  // Filter
  const filters = useMemo(
    () => buildPostFilters(date, "is_hidden==false"),
    [date],
  );

  const { data, isLoading, error } = useGetApiV10Post({
    filters,
    page: currentPage,
    pageSize: 10,
    position: "true",
    sortOrderPosition: "ASC",
    filterBy: "CLIENT",
    page_id: PAGE_IDS.LATEST_POSTS,
    category_id: selectedCategory || newsCategoryId,
  });

  const { data: relatedNewsData, isLoading: isLoadingRelated } =
    useGetApiV10Post(
      {
        filters: "is_hidden==false",
        pageSize: 5,
        position: "true",
        sortOrderPosition: "ASC",
        filterBy: "CLIENT",
        page_id: PAGE_IDS.FEATURED_NEWS,
        category_id: selectedCategory || newsCategoryId,
      },
      {
        query: {
          enabled: true,
        },
      },
    );

  const relatedNewsRows = (relatedNewsData?.responseData?.rows as Post[]) || [];
  const relatedNews =
    relatedNewsRows.length > 0 ? relatedNewsRows : mockPosts.slice(0, 5);

  const postsFromAPI = (data?.responseData?.rows as PostWithImage[]) || [];
  const posts = postsFromAPI.length > 0 ? postsFromAPI : mockPosts.slice(0, 10);

  const totalPages = data?.responseData?.count
    ? Math.ceil(data.responseData.count / (data.responseData.pageSize || 10))
    : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat pt-16 pb-24 overflow-hidden"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="absolute inset-0 bg-[#1a3a5c]/60"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-4">
            {rootCategoryName}
          </h1>
          {/* <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Cập nhật thông tin mới nhất
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Theo dõi các hoạt động, sự kiện nổi bật và các bài viết chuyên ngành
            từ CASE-SMEQ.
          </p> */}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Category Section */}
              <CategoryTab
                isLoading={isCategoriesLoading}
                categories={newsSubCategories}
                selectedCategory={selectedCategory}
                onCategoryChange={(categoryId) => {
                  setSelectedCategory(categoryId);
                  setCurrentPage(1);
                }}
              />

              {/* Related Sidebar */}
              <NewsSidebar
                relatedNews={relatedNews}
                isLoading={isLoadingRelated}
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header with Title and Controls */}
            <NewsFilters
              date={date}
              onDateChange={(newDate) => {
                setDate(newDate);
                setCurrentPage(1);
              }}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              showDatePicker={!isLoading}
            />

            {/* Content Cards */}
            <NewsList
              posts={posts}
              isLoading={isLoading}
              error={error}
              viewMode={viewMode}
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
                router.push("/news", { scroll: false });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
