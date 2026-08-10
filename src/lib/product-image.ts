import links from "@/lib/links";

export interface ProductImageFile {
  id: string;
  path?: string;
  file_name?: string | null;
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
  return file.path || "";
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
  if (thumbnailPath) return thumbnailPath;
  return fallback;
}
