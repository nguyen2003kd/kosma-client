import { GridCardSkeleton } from "@/components/common";
import CommonPagination from "@/components/common/pagination";
import type { PostExtended as PostWithImage } from "@/types/post";
import { useTranslation } from "react-i18next";
import EmptyState from "../empty-state";
import ServiceCard from "../service-card";

interface ServiceListProps {
  posts: PostWithImage[];
  isLoading: boolean;
  error: unknown;
  currentCategoryName: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasFilters: boolean;
  hasDateFilter: boolean;
  hasCategoryFilter: boolean;
  onClearDateFilter: () => void;
  onClearCategoryFilter: () => void;
  locale?: string;
  categoryLink?: string;
}

export default function ServiceList({
  posts,
  isLoading,
  error,
  currentCategoryName,
  currentPage,
  totalPages,
  onPageChange,
  hasFilters,
  hasDateFilter,
  hasCategoryFilter,
  onClearDateFilter,
  onClearCategoryFilter,
  locale,
  categoryLink,
}: ServiceListProps) {
  const { t } = useTranslation("pages/services");
  return (
    <div className="space-y-6">
      {isLoading ? (
        <GridCardSkeleton count={6} />
      ) : error ? (
        <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
          <p className="text-[14px] text-gray-700">{t("loadError")}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {posts.map((post) => (
              <ServiceCard
                key={post.id}
                post={post}
                categoryName={currentCategoryName}
                locale={locale}
                categoryLink={categoryLink}
              />
            ))}
          </div>

          {posts.length > 0 && (
            <div className="mt-8">
              <CommonPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
