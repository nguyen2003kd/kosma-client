"use client";

import { useGetApiV10Post } from "@/api/endpoints/post";
import { SidebarSkeleton } from "@/components/common/loading";
import { Card } from "@/components/ui/card";
import { PAGE_IDS } from "@/constants/page-ids";
import { PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { Newspaper } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

interface RelatedSidebarProps {
  categoryId: string;
  categoryCode?: string;
  categoryName?: string;
}

export default function RelatedSidebar({
  categoryId,
  categoryCode,
  categoryName,
}: RelatedSidebarProps) {
  const { t, i18n } = useTranslation("pages/post-detail");
  const locale = i18n.language?.startsWith("en") ? "en-US" : "vi-VN";
  const searchParams = useSearchParams();
  const subcategoryId = searchParams.get("category");
  const activeCategoryId = subcategoryId || categoryId;
  const siderbarName = t("latestCapabilityInfo");
  const { data: relatedNewsData, isLoading } = useGetApiV10Post(
    {
      filters: "is_hidden==false",
      pageSize: 5,
      position: "true",
      sortOrderPosition: "ASC",
      filterBy: "CLIENT",
      page_id: PAGE_IDS.FEATURED_NEWS,
      category_id: activeCategoryId,
    },
    {
      query: {
        enabled: !!activeCategoryId,
        refetchOnMount: true,
      },
    },
  );

  const apiPosts =
    (relatedNewsData?.responseData?.rows as PostExtended[]) || [];

  const relatedNews = apiPosts.length > 0 ? apiPosts : mockPosts.slice(0, 5);

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <Card className="overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-[#1e40af] px-4 py-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-white text-center">{categoryName? `${t("latestCapabilityInfo")}` : siderbarName}</h3>
        <Newspaper className="w-5 h-5 text-white" />
      </div>

      {/* Content */}
      {relatedNews.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <p className="text-gray-500 text-sm">{t("noFeaturedPosts")}</p>
        </div>
      ) : (
        <div>
          {relatedNews.map((news, index) => {
            const postUrl = `/${
              news.category?.link?.replace(/^\//, "") || categoryCode || "post"
            }/${news.slug || ""}`;

            return (
              <a
                key={news.id}
                href={postUrl}
                className={`flex gap-4 group hover:bg-blue-50 px-4 py-3 transition-colors ${
                  index !== relatedNews.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {/* Number */}
                <div className="flex-shrink-0 text-3xl font-bold text-gray-200">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1.5">
                  {/* Title */}
                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {news.title}
                  </h4>

                  {/* Date */}
                  <p className="text-xs text-gray-500">
                    {new Date(news.created_at || "").toLocaleDateString(
                      locale,
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </Card>
  );
}
