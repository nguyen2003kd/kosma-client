/**
 * MinIO migration: compression variants are no longer created.
 * These functions are kept for backward compatibility with existing callers
 * but now simply return the thumbnail path (or undefined) since MinIO
 * stores a single file with a full URL.
 */

/**
 * Returns undefined since responsive compression variants no longer exist.
 * Callers fall back to thumbnail_path.
 */
export const getResponsiveImage = (
  _compressInfo?: unknown
): string | undefined => {
  return undefined;
};

/**
 * Get the thumbnail image URL.
 * compressInfo is ignored (kept for backward compatibility).
 * Returns thumbnailPath || fallback.
 */
export const getThumbnailSrc = (
  _compressInfo?: unknown,
  thumbnailPath?: string | null,
  fallback = "/images/service-1.png"
): string => {
  if (thumbnailPath) return thumbnailPath;
  return fallback;
};
