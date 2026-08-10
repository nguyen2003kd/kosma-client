"use client";

import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostExtended as PostWithImage } from "@/types/post";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FALLBACK_IMAGE = "/images/living.jpg";

interface DesignCardProps {
  post: PostWithImage;
  categoryLink?: string;
}

export function DesignCard({ post, categoryLink }: DesignCardProps) {
  const resolvedCategoryLink = post.category?.link || categoryLink || "/solutions/design";
  const href = `${resolvedCategoryLink}/${post.slug || ""}`;

  const [imgSrc, setImgSrc] = useState(
    getThumbnailSrc(undefined, post.thumbnail_path, FALLBACK_IMAGE),
  );

  return (
    <Link
      href={href}
      className="group flex flex-col h-full rounded-[--radius-md] overflow-hidden bg-white border border-mutedLine hover:shadow-soft transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream">
        <Image
          src={imgSrc}
          alt={post.title || ""}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1080px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => {
            if (imgSrc !== FALLBACK_IMAGE) setImgSrc(FALLBACK_IMAGE);
          }}
        />
      </div>

      <div className="p-4 sm:p-5 flex items-center justify-between gap-3">
        <h3 className="font-serif text-[16px] sm:text-[18px] text-ink line-clamp-2 leading-tight group-hover:text-gold transition-colors flex-1">
          {post.title}
        </h3>
        <ArrowRight className="w-4 h-4 text-ink group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
      </div>
    </Link>
  );
}
