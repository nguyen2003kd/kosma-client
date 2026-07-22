"use client";

import { useGetApiV10Post } from "@/api/endpoints/post";
import { PAGE_IDS } from "@/constants/page-ids";
import { buildPostFilters } from "@/lib/filters";
import { PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import NewsHeader from "../news-header";
import NewsList from "./components/news-list";

interface NewsGridProps {
  categoryId?: string;
  categoryName?: string;
  categoryCode?: string;
  date?: string;
}

export default function NewsGrid({
  categoryId,
  categoryName = "Bài viết",
  categoryCode,
  date: initialDate,
}: NewsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subcategoryId = searchParams.get("category");

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState<Date | undefined>(
    initialDate ? new Date(initialDate) : undefined
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filters = useMemo(() => {
    return buildPostFilters(date, "is_hidden==false");
  }, [date]);

  const activeCategoryId = subcategoryId || categoryId;

  const { data, isLoading, error } = useGetApiV10Post({
    filters,
    page: currentPage,
    pageSize: 10,
    position: "true",
    sortOrderPosition: "ASC",
    filterBy: "CLIENT",
    category_id: activeCategoryId,
    page_id: PAGE_IDS.LATEST_POSTS,
  });

  const apiPosts = (data?.responseData?.rows as PostExtended[]) || [];

  const posts = apiPosts.length > 0 ? apiPosts : mockPosts.slice(0, 10);

  const totalPages = data?.responseData?.count
    ? Math.ceil(data.responseData.count / (data.responseData.pageSize || 10))
    : 1;

  return (
    <div className="space-y-6">
      <NewsHeader
        categoryName={categoryName}
        date={date}
        onDateChange={(newDate) => {
          setDate(newDate);
          setCurrentPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isLoading={isLoading}
      />

      <NewsList
        posts={posts}
        isLoading={isLoading}
        error={error}
        viewMode={viewMode}
        categoryCode={categoryCode}
        categoryName={categoryName}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        hasDateFilter={!!date}
        hasCategoryFilter={!!subcategoryId}
        onClearDateFilter={() => {
          setDate(undefined);
          setCurrentPage(1);
        }}
        onClearCategoryFilter={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("category");
          router.push(`?${params.toString()}`, { scroll: false });
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
