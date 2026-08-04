import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostExtended as PostWithImage } from "@/types/post";
import parse from "html-react-parser";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  post: PostWithImage;
  categoryName?: string;
  locale?: string;
  categoryLink?: string;
}

export default function ServiceCard({ post, categoryName, locale = "en-US", categoryLink }: ServiceCardProps) {
  const { t } = useTranslation("pages/services");
  const resolvedCategoryLink = post.category?.link || categoryLink || "/services";
  const href = `${resolvedCategoryLink}/${post.slug || ""}`;
  const formattedDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString(locale)
    : "";

  return (
    <Link
      href={href}
      className="group flex flex-col h-full rounded-[--radius-md] overflow-hidden bg-white border border-line hover:shadow-soft transition-shadow"
    >
      <div className="relative h-40 sm:h-44 overflow-hidden bg-cream">
        <Image
          src={getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path)}
          alt={post.title || ""}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        {categoryName && (
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.12em] text-black-800 mb-2">
            {categoryName}
          </span>
        )}
        <h3 className="font-serif text-[18px] sm:text-[20px] text-ink mb-2 line-clamp-2 leading-tight group-hover:text-gold transition-colors">
          {post.title}
        </h3>
        <div className="text-[13px] sm:text-[14px] text-gray-700 line-clamp-2 flex-grow">
          {parse(post.summary || "")}
        </div>

        <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
          <p className="text-gray-600 text-xs flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </p>
          <span className="inline-flex items-center text-ink font-semibold text-[13px] group-hover:text-gold transition-colors">
            {t("viewDetails")}
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
