import links from "@/lib/links";
import type { ImageCompressInfo } from "@/types/post";

export interface ProductImageFile {
  id: string;
  path?: string;
  name?: string | null;
  compress_info?: ImageCompressInfo | null;
}

export interface ProductImageRow {
  id: string;
  position: number;
  file_id: string;
  product_id: string;
  file?: ProductImageFile;
}

export function getProductImageSrc(img: ProductImageRow): string {
  const file = img.file;
  if (!file) return "";
  const compress = file.compress_info;
  const path =
    compress?.desktop || compress?.tablet || compress?.mobile || file.path || "";
  if (!path) return "";
  if (path.startsWith("/images/")) return path;
  return `${links.storageEndpoint}${path}`;
}

export function getProductImageList(
  images: ProductImageRow[] | null | undefined,
): string[] {
  if (!images || images.length === 0) return [];
  return images
    .slice()
    .sort((a, b) => a.position - b.position)
    .map(getProductImageSrc)
    .filter(Boolean);
}

export function getPrimaryProductImage(
  images: ProductImageRow[] | null | undefined,
  thumbnailPath?: string | null,
  fallback = "/images/living.jpg",
): string {
  const list = getProductImageList(images);
  if (list.length > 0) return list[0];
  if (thumbnailPath) {
    if (thumbnailPath.startsWith("/images/")) return thumbnailPath;
    return `${links.storageEndpoint}${thumbnailPath}`;
  }
  return fallback;
}
