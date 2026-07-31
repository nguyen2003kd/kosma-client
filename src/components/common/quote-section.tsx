"use client";

import { Star } from "lucide-react";

interface QuoteSectionProps {
  quote: string;
  author: string;
  title?: string;
}

export function QuoteSection({ quote, author, title }: QuoteSectionProps) {
  return (
    <div className="relative bg-black-900 py-14 sm:py-20 md:py-24 lg:py-[100px] overflow-hidden">
      {/* Decorative Quote Mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <span className="font-serif text-[140px] sm:text-[200px] md:text-[280px] lg:text-[340px] text-white/[0.07] leading-none">
          &ldquo;
        </span>
      </div>

      <div className="container-kosmo relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6 sm:mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="w-4 sm:w-5 h-4 sm:h-5 fill-[#dfc18c] text-[#dfc18c]"
              />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="font-serif text-[20px] sm:text-[26px] md:text-[32px] lg:text-[clamp(32px,4.5vw,56px)] text-white leading-tight mb-6 sm:mb-8 px-2">
            &ldquo;{quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="text-white">
            <p className="font-semibold text-[14px] sm:text-[15px]">{author}</p>
            {title && (
              <p className="text-[13px] sm:text-[14px] text-white/90 mt-1">{title}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface GalleryGridProps {
  images: { src: string; alt: string; tall?: boolean; wide?: boolean }[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative group overflow-hidden rounded-xl aspect-[4/3] sm:aspect-auto ${
            image.tall ? "sm:row-span-2 sm:min-h-[400px] md:min-h-[500px]" : image.wide ? "sm:col-span-2 sm:aspect-[2/1]" : "min-h-[200px] sm:min-h-[260px]"
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-bold text-sm drop-shadow-md">View Project</span>
          </div>
        </div>
      ))}
    </div>
  );
}
