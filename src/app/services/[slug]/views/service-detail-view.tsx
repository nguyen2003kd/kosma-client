"use client";

import {
  useGetApiV10Post,
  useGetApiV10PostSlugSlug,
} from "@/api/endpoints/post";
import ServiceCard from "@/components/common/components/service-card";
import { Loading } from "@/components/common/loading";
import QuotationPopupDialog from "@/components/quotation-popup/quotation-popup-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostContent, PostExtended } from "@/types/post";
import parse from "html-react-parser";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "sonner";
import {
  ArrowRight,
  ChevronRight as BreadcrumbArrow,
  Calendar,
  //   ChevronLeft,
  //   ChevronRight,
  Eye,
  Copy,
  Download,
  Facebook,
  Home,
  Linkedin,
  Link as LinkIcon,
  Mail,
  Newspaper,
  Printer,
  QrCode,
  Twitter,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface ServiceDetailViewProps {
  slug: string;
  initialPost?: PostExtended;
}

export default function ServiceDetailView({ slug, initialPost }: ServiceDetailViewProps) {
  const { t } = useTranslation(["pages/post-detail", "pages/services"]);
  const { data, isLoading, error } = useGetApiV10PostSlugSlug(slug);

  const { data: latestServicesData } = useGetApiV10Post({
    filters: "is_hidden==false , is_service==true",
    sortField: "created_at",
    sortOrder: "desc",
    pageSize: 10,
    filterBy: "CLIENT",
  });

  const { data: relatedServicesData } = useGetApiV10Post({
    filters: "is_hidden==false , is_service==true",
    sortField: "created_at",
    sortOrder: "desc",
    pageSize: 3,
    page: 1,
    filterBy: "CLIENT",
  });

  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const currentPost = (data?.responseData as PostExtended | undefined) ?? initialPost;

  const latestServices =
    (latestServicesData?.responseData?.rows as PostExtended[])?.filter(
      (post) => post.id !== currentPost?.id,
    ) || [];

  const relatedServices: PostExtended[] =
    (relatedServicesData?.responseData?.rows as PostExtended[])?.filter(
      (service) => service.id !== currentPost?.id,
    ) || [];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = currentPost?.title || "";

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

  if (isLoading && !initialPost) {
    return (
      <section className="bg-gray-50 py-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <Loading text={t("loadingService")} size="lg" className="text-gray-900" />
        </div>
      </section>
    );
  }

  if ((error || !currentPost) && !initialPost) {
    return (
      <section className="bg-gray-50 py-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center">
            <p className="text-red-600 text-lg">{t("serviceNotFound")}</p>
            <Link href="/services">
              <Button className="mt-4">{t("backToServices")}</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!currentPost) return null;

  return (
    <>
      {/* Hero Navbar Section */}
      <section
        className="bg-[#0C2449] py-12 border-t border-gray-600"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">{t("pages/services:title")}</h1>
          <nav>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
              </Link>
              <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
              <Link href="/services" className="hover:text-white transition-colors">{t("pages/services:title")}</Link>
              <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
              <span className="text-white font-medium line-clamp-1">{currentPost.title}</span>
            </div>
          </nav>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-gray-50 py-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-lg shadow-sm p-8">
                <div className="mb-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {t("onlineRegistrationBadge")}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {currentPost.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {(() => {
                        const d = new Date(currentPost.created_at || "");
                        const date = d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
                        const time = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: false });
                        return `${date} - ${time}`;
                      })()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{currentPost.author || "Admin"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{currentPost.view?.toLocaleString("vi-VN") || 0} {t("views")}</span>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                  <span className="text-gray-600 text-sm font-medium">{t("share")}</span>
                  <Button variant="outline" size="icon" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors" onClick={() => handleShare("facebook")}>
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors" onClick={() => handleShare("linkedin")}>
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors" onClick={() => handleShare("twitter")}>
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors" onClick={() => handleShare("copy")}>
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors" onClick={() => window.print()}>
                    <Printer className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors" onClick={() => handleShare("email")}>
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors" onClick={() => setQrOpen(true)}>
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
                      src={getThumbnailSrc(currentPost.thumbnail_compress_info, currentPost.thumbnail_path, "/images/service-1.png")}
                      alt={currentPost.title || ""}
                      fill
                      className="object-cover"
                    />
                  </div>

                {/* Summary */}
                {currentPost.summary && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                    <div className="tiptap prose max-w-none text-gray-700 italic leading-relaxed">
                      {isClient ? parse(currentPost.summary || "") : null}
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="space-y-6 mb-8 prose prose-lg max-w-none">
                  {currentPost.post_content?.map((content: PostContent) => {
                    const imageColumns = content.image_columns || 1;
                    return (
                      <div key={content.id} className="space-y-4">
                        <div className="tiptap prose max-w-none text-gray-700 leading-relaxed">
                          {isClient && content.content ? parse(content.content || "") : null}
                        </div>
                        {content.post_content_images && content.post_content_images.length > 0 && (
                          <div
                            className="grid gap-4"
                            style={{ gridTemplateColumns: `repeat(${imageColumns}, minmax(0, 1fr))` }}
                          >
                            {content.post_content_images.map((img) => {
                              const imageSrc = getThumbnailSrc(
                                img.file?.compress_info,
                                img.file?.path,
                                "/images/service-1.png",
                              );
                              return (
                                <div key={img.id} className="relative w-full aspect-video rounded-lg overflow-hidden">
                                  <Image src={imageSrc} alt="Content image" fill className="object-cover" />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-600 font-medium">{t("tags")}</span>
                    {[t("tagOnlineReg"), t("tagInspection"), t("tagCalibration"), t("tagTesting")].map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* <div className="flex justify-between items-center">
                  <Button variant="outline" className="text-gray-700 hover:text-blue-600 hover:border-blue-300">
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Bài trước
                  </Button>
                  <Button variant="outline" className="text-gray-700 hover:text-blue-600 hover:border-blue-300">
                    Bài sau
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div> */}
              </article>

              {/* Related Services */}
              <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t("relatedServices")}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      image={getThumbnailSrc(service.thumbnail_compress_info, service.thumbnail_path, "/images/service-1.png")}
                      title={service.title || ""}
                      description={service.summary || ""}
                      link={`/services/${service.slug}`}
                      backgroundColor="white"
                      textColor="#1e293b"
                      descriptionColor="#64748b"
                      linkColor="#3b82f6"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <Card className="overflow-hidden">
                  <div className="bg-[#1e40af] px-4 py-3 flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{t("latestServices")}</h3>
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    {latestServices.slice(0, 10).map((service, index) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug || ""}`}
                        className={`flex gap-4 group hover:bg-blue-50 px-4 py-3 transition-colors ${index !== latestServices.slice(0, 10).length - 1 ? "border-b border-gray-100" : ""
                          }`}
                      >
                        <div className="flex-shrink-0 text-3xl font-bold text-gray-200">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                            {service.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {new Date(service.created_at || "").toLocaleDateString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 bg-gray-50 text-center border-t border-gray-100">
                    <a href="/services" className="text-blue-600 font-semibold text-xs hover:text-blue-700 inline-flex items-center gap-1">
                      {t("viewAll")}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </Card>

                {/* Quote Request Box */}
                <Card
                  className="group rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
                >
                  <div className="absolute inset-0 bg-[#1e40af]/50" />
                  <div className="absolute top-5 right-8 z-10">
                    <Mail className="w-7 h-7 text-white/30 transition-all group-hover:text-white/60" />
                  </div>
                  <div className="space-y-3 relative z-10">
                    <div>
                      <h3 className="text-white font-bold text-base mb-1">{t("requestQuote")}</h3>
                      <p className="text-blue-50 text-xs line-clamp-2">{currentPost.title}</p>
                    </div>
                    <Button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-md hover:shadow-lg"
                      size="default"
                    >
                      {t("submitRequest")}
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuotationPopupDialog
        open={isQuoteModalOpen}
        onOpenChange={setIsQuoteModalOpen}
        defaultServiceId={currentPost?.id}
      />
    </>
  );
}
