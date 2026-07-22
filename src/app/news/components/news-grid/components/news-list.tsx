import { GridCardSkeleton, ListCardSkeleton } from "@/components/common";
import CommonPagination from "@/components/common/pagination";
import type { PostExtended as PostWithImage } from "@/types/post";
import EmptyState from "./empty-state";
import FeaturedNewsCard from "./featured-news-card";
import NewsCard from "./news-card";
import { useTranslation } from "react-i18next";

interface NewsListProps {
  posts: PostWithImage[];
  isLoading: boolean;
  error: unknown;
  viewMode: "grid" | "list";
  currentCategoryName: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasFilters: boolean;
  hasDateFilter: boolean;
  hasCategoryFilter: boolean;
  onClearDateFilter: () => void;
  onClearCategoryFilter: () => void;
}

export default function NewsList({
  posts,
  isLoading,
  error,
  viewMode,
  currentCategoryName,
  currentPage,
  totalPages,
  onPageChange,
  hasFilters,
  hasDateFilter,
  hasCategoryFilter,
  onClearDateFilter,
  onClearCategoryFilter,
}: NewsListProps) {
  const { t } = useTranslation("pages/news");
  return (
    <div className="space-y-6">
      {/* Content Cards */}
      {isLoading ? (
        viewMode === "grid" ? (
          <GridCardSkeleton count={9} />
        ) : (
          <div className="hidden lg:block">
            <ListCardSkeleton count={10} />
          </div>
        )
      ) : error ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-red-500 text-lg">
            {t("loadError")}
          </p>
        </div>
      ) : posts.length === 0 ? (
        <EmptyState
          hasFilters={hasFilters}
          hasDateFilter={hasDateFilter}
          hasCategoryFilter={hasCategoryFilter}
          onClearDateFilter={onClearDateFilter}
          onClearCategoryFilter={onClearCategoryFilter}
          title={t("noResults")}
          messageWithFilter={t("noResultsWithFilter")}
          messageWithoutFilter={t("noResultsWithoutFilter")}
        />
      ) : (
        <>
          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="space-y-6">
              {/* Featured Post - First Item */}
              {posts.length > 0 && <FeaturedNewsCard post={posts[0]} />}

              {/* Regular Grid - Remaining Items */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {posts.slice(1).map((post) => (
                    <NewsCard
                      key={post.id}
                      post={post}
                      viewMode="grid"
                      categoryName={currentCategoryName}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="hidden lg:block space-y-4">
              {posts.map((post) => (
                <NewsCard
                  key={post.id}
                  post={post}
                  viewMode="list"
                  categoryName={currentCategoryName}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      {!isLoading && !error && posts.length > 0 && (
        <div className="mt-8">
          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
