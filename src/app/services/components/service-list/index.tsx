"use client";

import { EmptyState, PaginationLinks } from "@/components/common";
import type { PostExtended as PostWithImage } from "@/types/post";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ServiceCard from "../service-card";

interface ServiceListProps {
  posts: PostWithImage[];
  error?: unknown;
  currentCategoryName: string;
  currentPage: number;
  totalPages: number;
  hasFilters: boolean;
  hasDateFilter: boolean;
  hasCategoryFilter: boolean;
  locale?: string;
  categoryLink?: string;
}

export default function ServiceList({
  posts,
  error,
  currentCategoryName,
  currentPage,
  totalPages,
  hasFilters,
  hasDateFilter,
  hasCategoryFilter,
  locale,
  categoryLink,
}: ServiceListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const clearFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  if (error) {
    return (
      <div className="rounded-[--radius-md] border border-line bg-white p-8 text-center">
        <p className="text-[14px] text-gray-700">
          Unable to load services. Please try again later.
        </p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        hasFilters={hasFilters}
        hasDateFilter={hasDateFilter}
        hasCategoryFilter={hasCategoryFilter}
        onClearDateFilter={() => clearFilter("date")}
        onClearCategoryFilter={() => clearFilter("category")}
        title="No results"
        messageWithFilter="No results match your filters."
        messageWithoutFilter="No services have been published yet."
      />
    );
  }

  return (
    <div className="space-y-6">
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

      <PaginationLinks currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
