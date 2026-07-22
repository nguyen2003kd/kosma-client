"use client";

import { useGetApiV10Post } from "@/api/endpoints/post";
import DocumentCard from "@/app/(home)/_views/components/document-card";
import ContentSidebar from "@/components/common/components/content-sidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_IDS } from "@/constants/page-ids";
import { getThumbnailSrc } from "@/lib/responsive-image";
import type { PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { format } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function DocumentsSection() {
  const { i18n, t } = useTranslation("pages/home");
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const documentsPageId = currentLang === "en" ? PAGE_IDS.HOMEPAGE_CAPABILITIES_POSITION : PAGE_IDS.HOME_CAPABILITIES;
  const latestDocsPageId = currentLang === "en" ? PAGE_IDS.HOMEPAGE_NEW_CAPABILITIES_POSITION : PAGE_IDS.HOME_NEW_CAPABILITIES;

  const { data: documentsData, isLoading } = useGetApiV10Post({
    page_id: documentsPageId,
    filters: "is_hidden==false",
    pageSize: 5,
    position: "true",
    sortOrderPosition: "ASC",
    filterBy: "CLIENT",
  });

  const { data: latestDocumentsData } = useGetApiV10Post({
    page_id: latestDocsPageId,
    filters: "is_hidden==false",
    pageSize: 10,
    position: "true",
    sortOrderPosition: "ASC",
    filterBy: "CLIENT",
  });

  const documents = useMemo(() => {
    const rows = (documentsData?.responseData?.rows as PostExtended[]) || [];
    // Nếu không có dữ liệu từ API, sử dụng mock-data
    return rows.length > 0 ? rows : mockPosts.slice(0, 5);
  }, [documentsData]);

  const latestDocuments = useMemo(() => {
    const posts =
      (latestDocumentsData?.responseData?.rows as PostExtended[]) || [];
    // Nếu không có dữ liệu từ API, sử dụng mock-data
    const dataToUse = posts.length > 0 ? posts : mockPosts.slice(0, 10);
    return dataToUse.map((post) => ({
      id: post.id || 0,
      title: post.title || "",
      link: `/${post.slug || ""}`,
    }));
  }, [latestDocumentsData]);

  const getColumn1Image = () => documents[0];
  const getColumn1Card = () => documents[0];
  const getColumn2Image = () => documents[1];
  const getColumn2Card = () => documents[1];
  const getColumn3Card = () => documents[2];
  const getColumn3Image = () => documents[2];

  if (isLoading) {
    return (
      <section className="bg-[#2563EB]-to-br  py-16">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="mx-4 md:mx-8 lg:mx-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-16">
                  <Skeleton className="h-12 w-48" />
                  <Skeleton className="h-10 w-32 rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Skeleton className="h-96 rounded-lg" />
                  <Skeleton className="h-96 rounded-lg" />
                  <Skeleton className="h-96 rounded-lg" />
                </div>
              </div>
              <div className="lg:col-span-1">
                <Skeleton className="h-[500px] rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!documents || documents.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-4">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center flex-col gap-4">
                  <motion.h2
                    className="text-4xl md:text-6xl font-extrabold text-start mb-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent uppercase">
                      {t("capabilities")}
                    </span>
                  </motion.h2>
                  <motion.div
                    className="w-28 h-1 rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 "
                    initial={{ width: 0 }}
                    whileInView={{ width: 112 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  ></motion.div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white border-2 border-[#162857] text-[#162857] hover:bg-[#162857] hover:text-white transition-all duration-300 rounded-full px-6 shadow-sm"
                >
                  <Link href="/services">{t("viewAll")}</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:block hidden lg:col-span-1 lg:self-start">
                  <ContentSidebar
                    title={t("newCapabilitiesInfo")}
                    items={latestDocuments}
                    className="bg-gradient-to-br from-cyan-50 to-blue-100 border border-cyan-200 shadow-md"
                    maxHeight="500px"
                  />
                </div>
                <div className="lg:row-span-2 flex flex-col gap-6">
                  {getColumn1Card() && (
                    <>
                      <DocumentCard
                        category={getColumn1Card().category?.name || t("document")}
                        date={
                          getColumn1Card().created_at
                            ? format(
                                new Date(getColumn1Card().created_at!),
                                "dd/MM/yyyy HH:mm",
                              )
                            : ""
                        }
                        title={getColumn1Card().title || ""}
                        // description={getColumn1Card().summary || undefined}
                        link={`/${getColumn1Card().slug || ""}`}
                        className="flex-1 min-h-48"
                      />
                      {getColumn1Image() && (
                        <div className="relative w-full h-40 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={getThumbnailSrc(
                              getColumn1Image()?.thumbnail_compress_info,
                              getColumn1Image()?.thumbnail_path,
                              "/images/service-1.png",
                            )}
                            alt={getColumn1Image().title || ""}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="lg:row-span-2 flex flex-col gap-6">
                  {getColumn2Image() && (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={getThumbnailSrc(
                          getColumn2Image()?.thumbnail_compress_info,
                          getColumn2Image()?.thumbnail_path,
                          "/images/service-1.png",
                        )}
                        alt={getColumn2Image().title || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {getColumn2Card() && (
                    <DocumentCard
                      category={getColumn2Card().category?.name || t("document")}
                      date={
                        getColumn2Card().created_at
                          ? format(
                              new Date(getColumn2Card().created_at!),
                              "dd/MM/yyyy HH:mm",
                            )
                          : ""
                      }
                      title={getColumn2Card().title || ""}
                      link={`/${getColumn2Card().slug || ""}`}
                      className="flex-1 min-h-48"
                    />
                  )}
                </div>

                <div className="lg:row-span-2 flex flex-col gap-6">
                  {getColumn3Card() && (
                    <DocumentCard
                      category={getColumn3Card().category?.name || t("document")}
                      date={
                        getColumn3Card().created_at
                          ? format(
                              new Date(getColumn3Card().created_at!),
                              "dd/MM/yyyy HH:mm",
                            )
                          : ""
                      }
                      title={getColumn3Card().title || ""}
                      link={`/${getColumn3Card().slug || ""}`}
                      className="flex-1 min-h-48"
                    />
                  )}
                  {getColumn3Image() && (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={getThumbnailSrc(
                          getColumn3Image()?.thumbnail_compress_info,
                          getColumn3Image()?.thumbnail_path,
                          "/images/service-1.png",
                        )}
                        alt={getColumn3Image().title || ""}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="block lg:hidden lg:col-span-1 lg:self-start">
              <ContentSidebar
                title={t("newCapabilitiesInfo")}
                items={latestDocuments}
                className="bg-gradient-to-br from-cyan-50 to-blue-100 border border-cyan-200 shadow-md"
                maxHeight="500px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
