import { SidebarSkeleton } from "@/components/common";
import { Card } from "@/components/ui/card";
import { PostExtended } from "@/types/post";
import { ArrowRight, Newspaper } from "lucide-react";
import { useTranslation } from "react-i18next";

interface NewsSidebarProps {
  relatedNews: PostExtended[];
  isLoading: boolean;
  categoryCode?: string;
}

export default function NewsSidebar({
  relatedNews,
  isLoading,
  categoryCode,
}: NewsSidebarProps) {
  const { t, i18n } = useTranslation("pages/news");
  const locale = i18n.language?.startsWith("en") ? "en-US" : "vi-VN";

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <Card className="overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-[#1e40af] px-4 py-3 flex items-center justify-between">
        <h3 className="text-base font-bold text-white">{t("featuredNews")}</h3>
        <Newspaper className="w-5 h-5 text-white" />
      </div>

      {/* Content  */}
      <div>
        {relatedNews.slice(0, 5).map((news, index) => {
          const postUrl = `/${
            news.category?.link?.replace(/^\//, "") || categoryCode || "post"
          }/${news.slug || ""}`;

          return (
            <a
              key={news.id}
              href={postUrl}
              className={`flex gap-4 group hover:bg-blue-50 px-4 py-3 transition-colors ${
                index !== relatedNews.slice(0, 5).length - 1
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
                  {new Date(news.created_at || "").toLocaleDateString(locale, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            </a>
          );
        })}
      </div>

      {/* View All Link */}
      <div className="px-4 py-2.5 bg-gray-50 text-center border-t border-gray-100">
        <a
          href="/news"
          className="text-blue-600 font-semibold text-xs hover:text-blue-700 inline-flex items-center gap-1"
        >
          {t("viewAll")}
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </Card>
  );
}
