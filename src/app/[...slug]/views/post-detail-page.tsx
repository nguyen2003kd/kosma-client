"use client";

import { useGetApiV10Post } from "@/api/endpoints/post";
import {
  GridCardSkeleton,
  SidebarNewsSkeleton,
} from "@/components/common/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getThumbnailSrc } from "@/lib/responsive-image";
import { PostContent, PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import parse from "html-react-parser";
import {
  ArrowRight,
  ChevronRight as BreadcrumbArrow,
  Calendar,
  // ChevronLeft,
  // ChevronRight,
  Eye,
  Facebook,
  Home,
  Linkedin,
  Link as LinkIcon,
  Mail,
  Newspaper,
  Printer,
  Copy,
  Download,
  QrCode,
  Twitter,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";
import baseConfig from "@/configs/base";
import { toast } from "sonner";
interface DynamicPostDetailPageProps {
  post: PostExtended;
  categoryName: string;
  categorySlug: string;
  urlCategoryId?: string;
}

export default function DynamicPostDetailPage({
  post,
  categoryName,
  categorySlug,
  urlCategoryId,
}: DynamicPostDetailPageProps) {
  const { t } = useTranslation("pages/post-detail");
  // Check if current post is mock data
  const isMockPost = typeof post.id === "string" && post.id.startsWith("mock-");

  const { data: latestData, isLoading: isLoadingLatest } = useGetApiV10Post(
    {
      filters: "is_hidden==false",
      pageSize: 10,
      sortField: "created_at",
      sortOrder: "desc",
      filterBy: "CLIENT",
      ...(urlCategoryId && { category_id: urlCategoryId }),
    },
    {
      query: {
        enabled: !isMockPost,
      },
    },
  );

  const latestNews = useMemo(() => {
    const posts = (latestData?.responseData?.rows as PostExtended[]) || [];
    const apiNews = posts
      .filter((p) => p.id !== post.id)
      .map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        link: `/${categorySlug}/${p.slug || ""}`,
      }));

    if (apiNews.length === 0) {
      return mockPosts
        .filter((p) => p.id !== post.id)
        .slice(0, 10)
        .map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          link:
            typeof p.id === "string" && p.id.startsWith("mock-")
              ? "/"
              : `/${categorySlug}/${p.slug || ""}`,
        }));
    }

    return apiNews;
  }, [latestData, categorySlug, post.id]);

  const { data: relatedData, isLoading: isLoadingRelated } = useGetApiV10Post(
    {
      filters: `is_hidden==false,id!=${post.id}`,
      pageSize: 3,
      sortField: "view",
      sortOrder: "desc",
      filterBy: "CLIENT",
      ...(urlCategoryId && { category_id: urlCategoryId }),
    },
    {
      query: {
        enabled: !isMockPost,
      },
    },
  );

  const relatedPosts = useMemo(() => {
    const posts = (relatedData?.responseData?.rows as PostExtended[]) || [];
    return posts.length > 0 ? posts : mockPosts.slice(0, 3);
  }, [relatedData]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank",
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        break;
      case "email":
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
    }
  };

  const [qrOpen, setQrOpen] = useState(false);
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [qrUrl, setQrUrl] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setQrUrl(window.location.href);
    setIsClient(true);
  }, []);

  const handleCopyQR = async () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await (await fetch(dataUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast.success(t("qrCopied"));
    } catch {
      toast.error(t("qrCopyError"));
    }
  };

  const handleDownloadQR = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <>
      {/* Navbar Section */}
      <section className="bg-[#0C2449] py-12 border-t border-gray-600"
      style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
            {categoryName}
          </h1>
          {/* Breadcrumb */}
          <nav>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <Link
                href="/"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
              </Link>
              <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
              <Link
                href={`/${categorySlug}`}
                className="hover:text-white transition-colors"
              >
                {categoryName}
              </Link>
              <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
              <span className="text-white font-medium line-clamp-1">
                {post?.title}
              </span>
            </div>
          </nav>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-gray-50 py-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Header */}
              <article className="bg-white rounded-lg shadow-sm p-8">
                {/* Category Badge */}
                {post.category?.name && (
                  <div className="mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      {post.category.name}
                    </Badge>
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {(() => {
                        const d = new Date(post.created_at || "");
                        const date = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
                        const time = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false });
                        return `${date} - ${time}`;
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author || "Admin"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.view || 0} {t("views")}</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                  <span className="text-gray-600 text-sm font-medium">
                    {t("share")}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    onClick={() => handleShare("facebook")}
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    onClick={() => handleShare("linkedin")}
                  >
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    onClick={() => handleShare("twitter")}
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    onClick={() => handleShare("copy")}
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    onClick={() => window.print()}
                  >
                    <Printer className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    onClick={() => handleShare("email")}
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors"
                    onClick={() => setQrOpen(true)}
                  >
                    <QrCode className="w-4 h-4" />
                  </Button>
                </div>

                <Dialog open={qrOpen} onOpenChange={setQrOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>{t("shareQrTitle")}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center p-4 gap-4">
                      <QRCodeCanvas
                        ref={qrRef}
                        value={qrUrl}
                        size={200}
                      />
                      <p className="text-sm text-gray-500 text-center">
                        {t("scanQr")}
                      </p>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={handleCopyQR}
                        >
                          <Copy className="w-4 h-4" />
                          {t("copy")}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={handleDownloadQR}
                        >
                          <Download className="w-4 h-4" />
                          {t("download")}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                  {/* Featured Image */}
                    <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
                      <Image
                        src={getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path, "/images/service-1.png")}
                        alt={post.title || ""}
                        fill
                        className="object-cover"
                      />
                    </div>

                {/* Summary */}
                {post.summary && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                    <div className="tiptap prose max-w-none text-gray-700 italic leading-relaxed">
                      {isClient ? parse(post.summary) : null}
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="space-y-6 mb-8 prose prose-lg max-w-none">
                  {post.post_content?.map((content: PostContent) => {
                    const imageColumns = content.image_columns || 1;

                    return (
                      <div key={content.id} className="space-y-4">
                        {content.content && (
                          <div className="tiptap prose max-w-none text-gray-700 leading-relaxed">
                            {isClient ? parse(content.content) : null}
                          </div>
                        )}

                        {/* Content Images */}
                        {content.post_content_images &&
                          content.post_content_images.length > 0 && (
                            <div
                              className="grid gap-4"
                              style={{
                                gridTemplateColumns: `repeat(${imageColumns}, minmax(0, 1fr))`,
                              }}
                            >
                              {content.post_content_images.map((img) => {
                                const imageSrc = getThumbnailSrc(
                                  img.file?.compress_info,
                                  img.file?.path,
                                  "/images/service-1.png",
                                );
                                return (
                                  <div
                                    key={img.id}
                                    className="relative w-full aspect-video rounded-lg overflow-hidden"
                                  >
                                    <Image
                                      src={imageSrc}
                                      alt="Content image"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-6" />

                {/* Navigation Buttons */}
                {/* <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    className="text-gray-700 hover:text-blue-600 hover:border-blue-300"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Bài trước
                  </Button>
                  <Button
                    variant="outline"
                    className="text-gray-700 hover:text-blue-600 hover:border-blue-300"
                  >
                    Bài sau
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div> */}
              </article>

              {/* Related Posts */}
              {isLoadingRelated ? (
                <div className="mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    {t("relatedPosts")}
                  </h2>
                  <GridCardSkeleton count={3} />
                </div>
              ) : (
                relatedPosts.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                      {t("relatedPosts")}
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <Card
                          key={relatedPost.id}
                          className="group overflow-hidden hover:shadow-2xl border-gray-100 hover:border-blue-200 transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
                        >
                          {/* Image */}
                          <div className="relative h-48 overflow-hidden bg-gray-100">
                            <Image
                              src={
                                getThumbnailSrc(
                                  relatedPost.thumbnail_compress_info ?? undefined,
                                  relatedPost.thumbnail_path,
                                  "/images/service-1.png",
                                )
                              }
                              alt={relatedPost.title || ""}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-5 flex flex-col flex-grow">
                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {relatedPost.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                              {isClient ? parse(relatedPost.summary || "") : null}
                            </p>

                            {/* Link */}
                            <Link
                              href={`${
                                typeof relatedPost.id === "string" &&
                                relatedPost.id.startsWith("mock-")
                                  ? "/"
                                  : `${baseConfig.frontendDomain}/${categorySlug}/`
                              }${relatedPost.slug || ""}`}
                              className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group/link mt-auto"
                            >
                              {t("viewDetails")}
                              <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {isLoadingLatest ? (
                <div className="sticky top-6">
                  <SidebarNewsSkeleton />
                </div>
              ) : (
                <div className="sticky top-6 space-y-4">
                  <Card className="overflow-hidden shadow-lg">
                    {/* Header */}
                    <div className="bg-[#1e40af] px-4 py-3 flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">
                        {t("latestPosts")}
                      </h3>
                      <Newspaper className="w-5 h-5 text-white" />
                    </div>

                    {/* Compact List */}
                    <div>
                      {latestNews.slice(0, 10).map((news, index) => (
                        <Link
                          key={news.id}
                          href={`${baseConfig.frontendDomain}/${news.link}`}
                          className={`flex gap-4 group hover:bg-blue-50 px-4 py-3 transition-colors ${
                            index !== latestNews.slice(0, 10).length - 1
                              ? "border-b border-gray-100"
                              : ""
                          }`}
                        >
                          {/* Number */}
                          <div className="flex-shrink-0 text-3xl font-bold text-gray-200">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          {/* Content */}
                          <div className="flex-1 space-y-1.5">
                            {/* Title */}
                            <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                              {news.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* View All Link */}
                    <div className="px-4 py-2.5 bg-gray-50 text-center border-t border-gray-100">
                      <a
                        href={`${baseConfig.frontendDomain}/${categorySlug}`}
                        className="text-blue-600 font-semibold text-xs hover:text-blue-700 inline-flex items-center gap-1"
                      >
                        {t("viewAll")}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
