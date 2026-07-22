"use client";

import { useGetApiV10Post } from "@/api/endpoints/post";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_IDS } from "@/constants/page-ids";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function BusinessSupportSection() {
  const { i18n, t } = useTranslation("pages/home");
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const businessSupportPageId = currentLang === "en" ? PAGE_IDS.HOMEPAGE_DOCUMENT_POSITION : PAGE_IDS.HOME_BUSINESS_SUPPORT;

  const { data, isLoading } = useGetApiV10Post({
    page_id: businessSupportPageId,
    filters: "is_hidden==false",
    pageSize: 5,
    position: "true",
    sortOrderPosition: "ASC",
    filterBy: "CLIENT",
  });

  const posts = useMemo(() => {
    const rows = (data?.responseData?.rows as PostExtended[]) || [];
    return rows.length > 0 ? rows : mockPosts.slice(0, 2);
  }, [data]);
  return (
    <section className="relative py-12 bg-white overflow-hidden">
      {/* Decorative background effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-100/30 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10">
          <div className="inline-block">
            <motion.h2
              className="text-4xl md:text-6xl font-extrabold text-start mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent uppercase">
                {t("businessSupport")}
              </span>
            </motion.h2>
            <motion.div
              className="w-90 h-1 rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 300 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            ></motion.div>
          </div>
          {isLoading ? (
            <div className="space-y-0">
              {[1, 2].map((i) => (
                <div key={i}>
                  <Separator className="bg-gray-200" />
                  <div className="py-8 space-y-4">
                    <div className="flex items-start justify-between gap-6">
                      <Skeleton className="h-8 w-3/4 bg-gray-200" />
                      <Skeleton className="h-10 w-32 bg-gray-200 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-40 bg-gray-200" />
                    <Skeleton className="h-16 w-full bg-gray-200" />
                  </div>
                  <Separator className="bg-gray-200" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-0">
              {posts.map((item) => (
                <div
                  key={item.id}
                  className="group transition-colors hover:bg-gray-50 rounded-2xl px-4 -mx-4"
                >
                  <Separator className="bg-gray-200 group-first:hidden" />

                  <div className="py-8 flex gap-6">
                    {item.thumbnail_compress_info || item.thumbnail_path ? (
                      <div className="w-1/3 max-w-[280px] hidden md:block">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                          <Image
                            src={getThumbnailSrc(
                              item.thumbnail_compress_info,
                              item.thumbnail_path,
                              "/images/service-1.png",
                            )}
                            alt={item.title || ""}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    ) : null}
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-6 mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 leading-relaxed flex-1 group-hover:text-cyan-600 transition-colors">
                          {item.title}
                        </h3>
                        <Button
                          asChild
                          variant="outline"
                          className="bg-transparent border-[#162857] text-[#162857] hover:bg-[#162857]0 hover:text-[#162857] hover:border-[#162857] flex-shrink-0 rounded-full px-6 transition-all shadow-sm hover:shadow-md"
                        >
                          <Link
                            href={`${
                              typeof item.id === "string" &&
                              item.id.startsWith("mock-")
                                ? "/"
                                : "/news/"
                            }${item.slug || ""}`}
                          >
                            {t("seeMore")}
                          </Link>
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(item.created_at || "").toLocaleDateString(
                            "vi-VN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>

                      <div className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {parse(item.summary || "")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Separator className="bg-gray-200" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
