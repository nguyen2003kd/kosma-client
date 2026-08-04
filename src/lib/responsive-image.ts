import links from "@/lib/links";
import type { ImageCompressInfo } from "@/types/post";

export const getResponsiveImage = (
  compressInfo?: ImageCompressInfo
): string => {
  if (!compressInfo) return "";

  if (typeof window === "undefined") {
    const path = compressInfo.desktop || "";
    if (path.startsWith("/images/")) return path;
    return path ? `${links.storageEndpoint}${path}` : "";
  }

  const width = window.innerWidth;
  const selectedPath =
    width < 768
      ? compressInfo.mobile || compressInfo.desktop || ""
      : width < 1024
        ? compressInfo.tablet || compressInfo.desktop || ""
        : compressInfo.desktop || "";

  if (selectedPath.startsWith("/images/")) return selectedPath;
  return selectedPath ? `${links.storageEndpoint}${selectedPath}` : "";
};

/**
 * Get the thumbnail image URL, preferring compress_info, falling back to thumbnail_path.
 * @param compressInfo  - ImageCompressInfo (can be null/undefined)
 * @param thumbnailPath - raw path (string | null | undefined)
 * @param fallback      - placeholder URL if both are empty
 */
export const getThumbnailSrc = (
  compressInfo: ImageCompressInfo | null | undefined,
  thumbnailPath?: string | null,
  fallback = "/images/service-1.png"
): string => {
  if (compressInfo) {
    const url = getResponsiveImage(compressInfo);
    if (url) return url;
  }
  if (thumbnailPath) {
    if (thumbnailPath.startsWith("/images/")) return thumbnailPath;
    return `${links.storageEndpoint}${thumbnailPath}`;
  }
  return fallback;
};
