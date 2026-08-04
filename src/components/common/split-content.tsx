"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const FALLBACK_IMAGE = "/images/living.jpg";

interface SplitContentProps {
  image: string;
  eyebrow?: string;
  title: string;
  description?: string;
  features?: { title: string; description: string }[];
  cta?: { label: string; href: string };
  reverse?: boolean;
}

export function SplitContent({
  image,
  eyebrow,
  title,
  description,
  features,
  cta,
  reverse = false,
}: SplitContentProps) {
  const [imgSrc, setImgSrc] = useState(image);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Image */}
      <div className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden ${reverse ? "md:order-2" : ""}`}>
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover"
          onError={() => {
            if (imgSrc !== FALLBACK_IMAGE) setImgSrc(FALLBACK_IMAGE);
          }}
        />
      </div>

      {/* Content */}
      <div className={reverse ? "md:order-1" : ""}>
        {eyebrow && (
          <p className="text-eyebrow text-black-700 font-extrabold uppercase tracking-[0.18em] mb-2 sm:mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-[28px] sm:text-[36px] md:text-h1 text-ink mb-3 sm:mb-4 leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-[14px] sm:text-base md:text-[17px] text-gray-700 leading-relaxed mb-5 sm:mb-6">
            {description}
          </p>
        )}
        {features && features.length > 0 && (
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-xl bg-[#d8c29c] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-black-950" />
                </div>
                <div>
                  <h3 className="font-semibold text-[15px] sm:text-base text-ink leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-gray-700 leading-relaxed mt-0.5">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {cta && (
          <Link href={cta.href}>
            <Button size="lg">{cta.label}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
