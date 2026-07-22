"use client";

import { getThumbnailSrc } from "@/lib/responsive-image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import type { SearchResult } from "../../../libs/types";
import parse from 'html-react-parser';

type TFunc = (key: string, options?: Record<string, unknown>) => string;

interface SearchResultItemProps {
  result: SearchResult;
  t: TFunc;
}

export default function SearchResultItem({ result, t }: SearchResultItemProps) {
  const resultLink = result.is_service
    ? `/services/${result.slug}`
    : `/news/${result.slug}`;

  return (
    <Link
      href={resultLink}
      className="block bg-white hover:shadow-lg transition-shadow duration-300 border border-gray-200 rounded-lg overflow-hidden"
    >
      <div className="flex gap-6 p-0">
        {/* Image */}
        <div className="relative w-full max-w-[365px] aspect-[16/9] flex-shrink-0 overflow-hidden bg-gray-200">
          <Image
            src={getThumbnailSrc(
              result.thumbnail_compress_info,
              result.thumbnail_path,
              "/images/service-1.png",
            )}
            alt={result.title || ""}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 py-6 pr-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
            {result.title}
          </h2>

          {/* Category Badge and Date */}
          <div className="flex items-center gap-3 mb-3">
            {/* category name vì backend không trả ra categoryId ra api post nên check bằng is_service */}
            <span className="inline-block px-3 py-1 text-xs font-medium text-gray-800 bg-white border border-gray-300 rounded">
              {result.is_service ? t("service") : t("news")}
            </span>

            {result.created_at && (
              <span className="text-sm text-gray-500">
                {format(new Date(result.created_at), "dd/MM/yyyy HH:mm", {
                  locale: vi,
                })}
              </span>
            )}
          </div>

          {/* Description */}
          {result.summary && (
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
              {parse(result.summary)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
