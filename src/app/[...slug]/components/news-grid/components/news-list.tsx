"use client";

import {
  GridCardSkeleton,
  ListCardSkeleton,
} from "@/components/common/loading";
import CommonPagination from "@/components/common/pagination";
import { getThumbnailSrc } from "@/lib/responsive-image";
import { PostExtended } from "@/types/post";
import parse from "html-react-parser";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import EmptyState from "../../empty-state";
import NewsCard from "./news-card";
import { useTranslation } from "react-i18next";
interface NewsListProps {
  posts: PostExtended[];
  isLoading: boolean;
  error: unknown;
  viewMode: "grid" | "list";
  categoryCode?: string;
  categoryName: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
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
  categoryCode,
  categoryName,
  currentPage,
  totalPages,
  onPageChange,
  hasDateFilter,
  hasCategoryFilter,
  onClearDateFilter,
  onClearCategoryFilter,
}: NewsListProps) {
  const { t, i18n } = useTranslation("pages/post-detail");
  const locale = i18n.language?.startsWith("en") ? "en-US" : "vi-VN";
  if (isLoading) {
    return viewMode === "grid" ? (
      <GridCardSkeleton count={9} />
    ) : (
      <div className="hidden lg:block">
        <ListCardSkeleton count={10} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-red-500 text-lg">
          {t("loadError")}
        </p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        hasFilters={hasDateFilter || hasCategoryFilter}
        hasDateFilter={hasDateFilter}
        hasCategoryFilter={hasCategoryFilter}
        onClearDateFilter={onClearDateFilter}
        onClearCategoryFilter={onClearCategoryFilter}
        title={t("postsNotFound")}
        messageWithFilter={t("noPostsMatch")}
        messageWithoutFilter={t("noPostsYet")}
      />
    );
  }

  const featuredThumbnailSrc =
    posts.length > 0
      ? getThumbnailSrc(posts[0].thumbnail_compress_info, posts[0].thumbnail_path)
      : "/images/service-1.png";

  return (
    <>
      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="space-y-6">
          {/* Featured Post */}
          {posts.length > 0 && (
            <a
              href={`/${
                categoryCode ||
                posts[0].category?.link?.replace(/^\//, "") ||
                "post"
              }/${posts[0].slug || ""}`}
              className="relative block rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 h-[300px] md:h-[380px] group"
            >
              {/* Background Image */}
              <Image
                src={featuredThumbnailSrc}
                alt={posts[0].title || ""}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
              />

              {/* Gradient Overlay - Blue */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-blue-700/15 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div>
                  {/* Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold rounded-full shadow-xl backdrop-blur-sm border border-white/20 group-hover:scale-105 transition-transform">
                      {t("latest")}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl md:text-3xl font-extrabold text-white mb-2 md:mb-3 line-clamp-2 leading-tight tracking-tight drop-shadow-lg max-w-[60%]">
                    {posts[0].title}
                  </h2>

                  {/* Description */}
                  <p className="text-white/90 text-sm md:text-base mb-3 md:mb-4 line-clamp-2 leading-relaxed drop-shadow-md max-w-[60%]">
                    {parse(posts[0].summary || "")}
                  </p>

                  {/* Footer - Compact */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white/90">
                      <Calendar className="w-4 h-4" />
                      <p className="text-xs md:text-sm font-medium">
                        {new Date(posts[0].created_at || "").toLocaleDateString(
                          locale,
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <span className="inline-flex items-center text-white font-bold text-xs md:text-sm gap-2 group-hover:gap-3 transition-all">
                      {t("viewDetails")}
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          )}

          {/* Regular Grid - Remaining Items */}
          {posts.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {posts.slice(1).map((post) => (
                <NewsCard
                  key={post.id}
                  post={post}
                  viewMode="grid"
                  categoryCode={categoryCode}
                  categoryName={categoryName}
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
              categoryCode={categoryCode}
              categoryName={categoryName}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
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
  );
}
