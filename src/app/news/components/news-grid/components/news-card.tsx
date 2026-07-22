import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostExtended as PostWithImage } from "@/types/post";
import parse from "html-react-parser";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
interface NewsCardProps {
  post: PostWithImage;
  viewMode: "grid" | "list";
  categoryName: string;
}

export default function NewsCard({
  post,
  viewMode,
  categoryName,
}: NewsCardProps) {
  const { t, i18n } = useTranslation("pages/news");
  const locale = i18n.language?.startsWith("en") ? "en-US" : "vi-VN";
  if (viewMode === "list") {
    return (
      <Card className="group overflow-hidden hover:shadow-2xl border-gray-100 hover:border-blue-200 transition-all duration-300 flex hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative w-64 h-52 flex-shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path)}
            alt={post.title || ""}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <div>
            {/* Category Badge */}
            <Badge
              variant="outline"
              className="text-blue-600 border-transparent mb-2 px-0 text-sm"
            >
              {categoryName}
            </Badge>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm line-clamp-2">
              {parse(post.summary || "")}
            </p>
          </div>

          {/* Footer - Date & Link */}
          <div className="space-y-3 mt-4">
            <Separator className="bg-gray-100" />
            <div className="flex items-center justify-between">
              {/* Date */}
              <p className="text-gray-500 text-xs flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.created_at || "").toLocaleDateString(locale)}
              </p>

              {/* Link */}
              <a
                href={`${
                  typeof post.id === "string" && post.id.startsWith("mock-")
                    ? "/"
                    : "/news/"
                }${post.slug || ""}`}
                className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group/link"
              >
                {t("viewDetails")}
                <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  // Grid view
  return (
    <Card className="group overflow-hidden hover:shadow-2xl border-gray-100 hover:border-blue-200 transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-36 sm:h-40 overflow-hidden bg-gray-100">
        <Image
            src={getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path)}
          alt={post.title || ""}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <CardContent className="pt-4 md:pt-5 pb-2 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 md:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-2">
          {parse(post.summary || "")}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="py-2 md:py-3 pb-3 md:pb-4 flex-col items-start gap-2">
        <Separator className="bg-gray-100" />
        <div className="w-full flex items-center justify-between">
          {/* Date */}
          <p className="text-gray-500 text-xs flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.created_at || "").toLocaleDateString(locale)}
          </p>

          {/* Link */}
          <a
            href={`${
              typeof post.id === "string" && post.id.startsWith("mock-")
                ? "/"
                : "/news/"
            }${post.slug || ""}`}
            className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group/link"
          >
            {t("viewDetails")}
            <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
