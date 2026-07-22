import { getResponsiveImage } from "@/lib/responsive-image";
import type { PostExtended as PostWithImage } from "@/types/post";
import parse from "html-react-parser";
import { ArrowRight, Calendar, Newspaper } from "lucide-react";
import Image from "next/image";
import baseConfig from "@/configs/base";
interface FeaturedNewsCardProps {
  post: PostWithImage;
}

export default function FeaturedNewsCard({ post }: FeaturedNewsCardProps) {
  const href = `${
    typeof post.id === "string" && post.id.startsWith("mock-") ? "/" : "/news/"
  }${post.slug || ""}`;

  return (
    <a
      href={href}
      className="relative block rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 h-[300px] md:h-[380px] group"
    >
      {/* Background Image */}
      <Image
             src={
              getResponsiveImage(post.thumbnail_compress_info) ||
              baseConfig.imgEndpointDomain + post.thumbnail_path|| "/images/service-1.png"
            }
        alt={post.title || ""}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
      />

      {/* Gradient Overlay - Blue */}
     <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-blue-700/15 to-transparent"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Bottom Content */}
        <div>
          {/* Badge */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold rounded-full shadow-xl backdrop-blur-sm border border-white/20 group-hover:scale-105 transition-transform">
              <Newspaper className="w-4 h-4" />
              MỚI NHẤT
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-3xl font-extrabold text-white mb-2 md:mb-3 line-clamp-2 leading-tight tracking-tight drop-shadow-lg max-w-[60%]">
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-white/90 text-sm md:text-base mb-3 md:mb-4 line-clamp-2 leading-relaxed drop-shadow-md max-w-[60%]">
            {parse(post.summary || "")}
          </p>

          {/* Footer - Compact */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/90">
              <Calendar className="w-4 h-4" />
              <p className="text-xs md:text-sm font-medium">
                {new Date(post.created_at || "").toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>

            <span className="inline-flex items-center text-white font-bold text-xs md:text-sm gap-2 group-hover:gap-3 transition-all">
              Xem chi tiết
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
