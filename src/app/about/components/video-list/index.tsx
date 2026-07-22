"use client";

import { useState, useRef, useEffect } from "react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { PageConfig } from "@/api/models";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";

export interface VideoItem {
  url?: string;
  title?: string;
  thumbnail?: string;
}

// --- URL parsers ---

type VideoType = "youtube" | "vimeo" | "direct" | "unknown";

function getVideoType(url: string): VideoType {
  if (!url) return "unknown";
  if (/\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/.test(url))
    return "youtube";
  if (/\/\/(?:www\.)?vimeo\.com\/\d+/.test(url)) return "vimeo";
  // Anything that looks like a video URL (file extension or /video/ path)
  if (
    /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(url) ||
    /\/video[s]?(\/|$)/i.test(url) ||
    /\/uploads.*\/(video|file-)/i.test(url)
  )
    return "direct";
  return "unknown";
}

function getYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
  );
  return match?.[1] ?? "";
}

function getVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match?.[1] ?? "";
}

function getVideoEmbedSrc(url: string): string | null {
  const type = getVideoType(url);
  if (type === "youtube") {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0` : null;
  }
  if (type === "vimeo") {
    const id = getVimeoId(url);
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null;
  }
  if (type === "direct") return url;
  if (type === "unknown" && url) return url;
  return null;
}

function getYouTubeFallbackThumbnail(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

function getVimeoThumbnailUrl(id: string): string {
  return `https://vumbnail.com/${id}.jpg`;
}

function getVideoLabel(url: string): string {
  const type = getVideoType(url);
  if (type === "youtube") return "YouTube";
  if (type === "vimeo") return "Vimeo";
  if (type === "direct") return "Video";
  return "Video";
}

// --- Component ---

export default function VideoList() {
  const { t } = useTranslation("pages/about");
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnails, setThumbnails] = useState<Record<number, string>>({});

  const { data, isLoading } = useGetApiV10PageConfig({
    filters: `key==list_video`,
    pageSize: 1,
  });

  const rows = (data?.responseData?.rows ?? []) as PageConfig[];
  const rawValue: string = rows[0]?.value ?? "";

  let videos: VideoItem[] = [];
  try {
    videos = JSON.parse(rawValue) as VideoItem[];
    if (!Array.isArray(videos)) videos = [];
  } catch {
    videos = [];
  }

  const validVideos = videos.filter((v) => v.url || v.title) as VideoItem[];

  // Capture thumbnail frames only for videos that need it
  useEffect(() => {
    const videoEl = videoRef.current;
    const canvasEl = canvasRef.current;
    if (!videoEl || !canvasEl) return;

    validVideos.forEach((video, index) => {
      const url = video.url ?? "";
      const type = getVideoType(url);
      const needsCapture =
        (type === "direct" || type === "unknown") &&
        !video.thumbnail?.trim() &&
        !(thumbnails[index] ?? false);

      if (!needsCapture || !url) return;

      const onMeta = () => {
        if (videoEl.readyState < 2) return;
        videoEl.currentTime = 0.5;
      };

      const onSeeked = () => {
        const ctx = canvasEl.getContext("2d");
        if (!ctx || !videoEl.videoWidth || !videoEl.videoHeight) return;
        canvasEl.width = videoEl.videoWidth;
        canvasEl.height = videoEl.videoHeight;
        ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
        const dataUrl = canvasEl.toDataURL("image/jpeg", 0.8);
        setThumbnails((prev) => ({ ...prev, [index]: dataUrl }));
        videoEl.src = "";
      };

      videoEl.addEventListener("loadedmetadata", onMeta, { once: true });
      videoEl.addEventListener("seeked", onSeeked, { once: true });
      videoEl.src = url;
      videoEl.load();
    });
  }, [validVideos, thumbnails]);

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="mx-4 md:mx-8 lg:mx-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              {t("videoIntro")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-video bg-gray-200 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!validVideos.length) {
    return null;
  }

  const handleOpenVideo = (index: number) => setPlayingIndex(index);
  const handleCloseVideo = () => setPlayingIndex(null);

  return (
    <>
      {/* Hidden video + canvas for thumbnail capture */}
      <video
        ref={videoRef}
        className="hidden"
        muted
        playsInline
        crossOrigin="anonymous"
      />
      <canvas ref={canvasRef} className="hidden" />

      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="mx-4 md:mx-8 lg:mx-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">
              {t("videoIntro")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {validVideos.slice(0, 4).map((video, index) => {
                const videoUrl = video.url ?? "";
                const src = getVideoEmbedSrc(videoUrl);
                const type = getVideoType(videoUrl);

                // Thumbnail source priority:
                // 1. User-provided thumbnail field
                // 2. YouTube hqdefault / Vimeo thumbnail
                // 3. Captured video frame (direct .mp4)
                // 4. Placeholder
                let thumbnailSrc: string | null = null;
                if (type === "youtube") {
                  const id = getYouTubeId(videoUrl);
                  thumbnailSrc = id ? getYouTubeFallbackThumbnail(id) : null;
                } else if (type === "vimeo") {
                  const id = getVimeoId(videoUrl);
                  thumbnailSrc = id ? getVimeoThumbnailUrl(id) : null;
                } else if (type === "direct") {
                  thumbnailSrc =
                    (video.thumbnail && video.thumbnail.trim()) ||
                    thumbnails[index] ||
                    null;
                } else if (type === "unknown" && videoUrl) {
                  thumbnailSrc =
                    (video.thumbnail && video.thumbnail.trim()) ||
                    thumbnails[index] ||
                    null;
                }

                return (
                  <div
                    key={index}
                    className="group relative aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-100"
                  >
                    {/* Thumbnail */}
                    {thumbnailSrc ? (
                      <img
                        src={thumbnailSrc}
                        alt={video.title ?? `Video ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 gap-2">
                        <Play className="w-10 h-10 text-white/60" />
                        <span className="text-xs text-white/40 font-medium">
                          {getVideoLabel(videoUrl)}
                        </span>
                      </div>
                    )}

                    {/* Hover overlay with play button */}
                    {src && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors cursor-pointer">
                        <div className="w-14 h-14 rounded-full bg-white/0 group-hover:bg-white flex items-center justify-center shadow-lg scale-0 group-hover:scale-100 transition-all duration-300">
                          <Play
                            className="w-6 h-6 text-blue-600 ml-1"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    )}

                    {/* Click area */}
                    {src && (
                      <button
                        onClick={() => handleOpenVideo(index)}
                        className="absolute inset-0 w-full h-full"
                        aria-label={t("playVideo")}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Video modal */}
      {playingIndex !== null && validVideos[playingIndex] && (
        <VideoModal
          video={validVideos[playingIndex]}
          index={playingIndex}
          onClose={handleCloseVideo}
          modalVideoRef={videoRef}
        />
      )}
    </>
  );
}

// --- Video Modal ---

interface VideoModalProps {
  video: VideoItem;
  index: number;
  onClose: () => void;
  modalVideoRef?: React.RefObject<HTMLVideoElement>;
}

function VideoModal({ video, index, onClose, modalVideoRef }: VideoModalProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const videoEl = modalVideoRef ?? localVideoRef;

  const videoUrl = video.url ?? "";
  const src = getVideoEmbedSrc(videoUrl);
  const type = getVideoType(videoUrl);
  const isDirect = type === "direct";

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-full p-0 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">
          {video.title ?? `Video ${index + 1}`}
        </DialogTitle>
        <div className="relative aspect-video bg-black">
          {isDirect ? (
            <video
              ref={videoEl}
              src={src ?? ""}
              controls
              autoPlay
              className="w-full h-full"
            />
          ) : (
            <iframe
              src={src ?? ""}
              title={video.title ?? `Video ${index + 1}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}