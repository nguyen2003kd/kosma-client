"use client";

import { Post } from "@/api/models/post";
import { SidebarSkeleton } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Newspaper } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ServiceSidebarProps {
  relatedServices: Post[];
  isLoading?: boolean;
  onQuoteClick: () => void;
}

export default function ServiceSidebar({
  relatedServices,
  isLoading = false,
  onQuoteClick,
}: ServiceSidebarProps) {
  const { t, i18n } = useTranslation("pages/services");
  const locale = i18n.language?.startsWith("en") ? "en-US" : "vi-VN";

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <div className="sticky top-6 space-y-4">
      {/* Latest Services Card */}
      <Card className="overflow-hidden">
        {/* Header */}
        <div className="bg-[#1e40af] px-4 py-3 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">{t("featuredServices")}</h3>
          <Newspaper className="w-5 h-5 text-white" />
        </div>

        {/* Content - Compact List */}
        <div>
          {relatedServices.slice(0, 5).map((service, index) => (
            <a
              key={service.id}
              href={`${
                typeof service.id === "string" && service.id.startsWith("mock-")
                  ? "/"
                  : "/services/"
              }${service.slug || ""}`}
              className={`flex gap-4 group hover:bg-blue-50 px-4 py-3 transition-colors ${
                index !== relatedServices.slice(0, 5).length - 1
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
                  {service.title}
                </h4>

                {/* Date */}
                <p className="text-xs text-gray-500">
                  {new Date(service.created_at || "").toLocaleDateString(
                    locale,
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* View All Link */}
        <div className="px-4 py-2.5 bg-gray-50 text-center border-t border-gray-100">
          <a
            href="/services"
            className="text-blue-600 font-semibold text-xs hover:text-blue-700 inline-flex items-center gap-1"
          >
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1e40af]/50"></div>

        {/* Icon */}
        <div className="absolute top-5 right-8 z-10">
          <Mail className="w-7 h-7 text-white/30 transition-all group-hover:text-white/60" />
        </div>

        <div className="space-y-3 relative z-10">
          <div>
            <h3 className="text-white font-bold text-base mb-1">{t("needSupport")}</h3>
            <p className="text-blue-50 text-xs">{t("contactForQuote")}</p>
          </div>
          <Button
            onClick={onQuoteClick}
            className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-md hover:shadow-lg"
            size="default"
          >
            {t("requestQuote")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
