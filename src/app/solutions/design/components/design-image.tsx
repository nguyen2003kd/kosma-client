"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_IMAGE = "/images/living.jpg";

interface DesignImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

/**
 * Client-side Image wrapper with automatic fallback to a placeholder
 * when the source fails to load. Used in server-rendered detail pages
 * where next/image onError is not available.
 */
export function DesignImage({
  src,
  alt,
  className,
  fill,
  sizes,
  priority,
}: DesignImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      fill={fill}
      sizes={sizes}
      priority={priority}
      onError={() => {
        if (imgSrc !== FALLBACK_IMAGE) setImgSrc(FALLBACK_IMAGE);
      }}
    />
  );
}
