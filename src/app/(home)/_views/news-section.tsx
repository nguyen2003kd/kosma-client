"use client";

import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10Post } from "@/api/endpoints/post";
import { CategoryWithChildren } from "@/api/models/categoryWithChildren";
import { GridCardSkeleton } from "@/components/common/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { PAGE_IDS } from "@/constants/page-ids";
import { getResponsiveImage } from "@/lib/responsive-image";
import { PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import baseConfig from "@/configs/base";
interface NewsTabContentProps {
  title: string;
  categoryId?: string;
  linkHref?: string;
}

function NewsTabContent({
  categoryId,
  // linkHref = "/news",
}: NewsTabContentProps) {
  const { i18n, t } = useTranslation("pages/home");
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const newsPageId = currentLang === "en" ? PAGE_IDS.HOMEPAGE_NEWS_POSITION : PAGE_IDS.HOME_NEWS;

  const { data, isLoading } = useGetApiV10Post({
    page_id: newsPageId,
    filters: "is_hidden==false",
    pageSize: 3,
    position: "true",
    sortOrderPosition: "ASC",
    filterBy: "CLIENT",
    ...(categoryId && { category_id: categoryId }),
  });

  const posts = useMemo(() => {
    const rows = (data?.responseData?.rows as PostExtended[]) || [];
    // Nếu không có dữ liệu từ API, sử dụng mock-data
    return rows.length > 0 ? rows : mockPosts.slice(0, 3);
  }, [data]);

  return (
    <>
      {isLoading ? (
        <GridCardSkeleton count={3} />
      ) : (
        <>
          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {posts.map((news) => (
              <motion.div
                key={news.id}
                className="flex flex-col md:flex-row gap-4 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="md:w-1/3 h-40 md:h-auto relative overflow-hidden">
                  <Image
                                   src={
                     getResponsiveImage(news?.thumbnail_compress_info) ||
        (news?.thumbnail_path
          ? `${baseConfig?.imgEndpointDomain ?? ""}${news.thumbnail_path}`
          : null) ||
        "/images/service-1.png"
                    }
                    alt={news.title || ""}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {news.category?.name && (
                        <span className="inline-block px-2.5 py-0.5 bg-cyan-100 text-cyan-600 text-xs font-medium rounded-full">
                          {news.category.name}
                        </span>
                      )}
                      {news.created_at && (
                        <span className="text-gray-500 text-xs">
                          {new Date(news.created_at).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            },
                          )}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 hover:text-cyan-500 transition-colors">
                      <Link href={`/${news.slug || ""}`}>{news.title}</Link>
                    </h3>
                    {news.summary && (
                      <div className="text-gray-600 text-xs line-clamp-2 mb-3">
                        {parse(news.summary)}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/${news.slug || ""}`}
                    className="inline-flex items-center text-cyan-500 hover:text-cyan-600 text-sm font-medium transition-colors"
                  >
                    {t("readMore")} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {/* <div className="flex justify-center mt-8">
            <Button
              asChild
              className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-full px-6 py-3 text-sm font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Link href={linkHref}>Xem Tất Cả Tin Tức</Link>
            </Button>
          </div> */}
        </>
      )}
    </>
  );
}

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState("all");

  const { i18n, t } = useTranslation("pages/home");
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const { data: categoriesData } = useGetApiV10Category({ language: currentLang });

  const latestNewsPageId = currentLang === "en" ? PAGE_IDS.HOMEPAGE_LATEST_NEWS_POSITION : PAGE_IDS.HOME_LATEST_NEWS;

  const { data: latestNewsData, isLoading: isLatestNewsLoading } =
    useGetApiV10Post({
      page_id: latestNewsPageId,
      filters: "is_hidden==false",
      pageSize: 10,
      position: "true",
      sortOrderPosition: "ASC",
      filterBy: "CLIENT",
    });

  const newsCategories = useMemo(() => {
    const newsCategory = (
      categoriesData?.responseData as CategoryWithChildren[]
    )?.find((cat) => cat.link === "/news");
    return newsCategory?.categories || [];
  }, [categoriesData]);

  const tabs = useMemo(() => {
    const allTab = { value: "all", label: t("news"), categoryId: "" };
    const categoryTabs = newsCategories.map((cat) => ({
      value: cat.id || "",
      label: cat.name || "",
      categoryId: cat.id || "",
    }));
    return [allTab, ...categoryTabs];
  }, [newsCategories]);

  const latestNews = useMemo(() => {
    const posts = (latestNewsData?.responseData?.rows as PostExtended[]) || [];
    const dataToUse = posts.length > 0 ? posts : mockPosts.slice(0, 10);
    return dataToUse.map((post) => ({
      id: post.id,
      title: post.title || "",
      link: `/${post.slug || ""}`,
      thumbnail:
        getResponsiveImage(post.thumbnail_compress_info) ||
        (post.thumbnail_path
          ? `${baseConfig?.imgEndpointDomain ?? ""}${post.thumbnail_path}`
          : null) ||
        "/images/service-1.png",
      created_at: post.created_at,
    }));
  }, [latestNewsData]);

  return (
    <section className="bg-gradient-to-tl from-cyan-50 via-white to-gray-50/30 py-16 pt-20">
      <div className="max-w-screen-xl mx-auto h-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10">
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold text-center mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              {t("news")}
            </span>
          </motion.h2>
          <motion.div
            className="w-28 h-1 rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 112 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
              <div className="lg:col-span-7">
                {/* <div className="mb-8 border-b">
                  <TabsList className="bg-transparent h-auto p-0 gap-8">
                    {isCategoriesLoading ? (
                      <div className="flex gap-8 pb-4">
                        <Skeleton className="h-8 w-20 rounded-sm" />
                        <Skeleton className="h-8 w-32 rounded-sm" />
                        <Skeleton className="h-8 w-24 rounded-sm" />
                        <Skeleton className="h-8 w-28 rounded-sm" />
                      </div>
                    ) : (
                      tabs.map((tab) => (
                        <TabsTrigger
                          key={tab.value}
                          value={tab.value}
                          className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-0 pb-4 text-gray-600 data-[state=active]:text-gray-900 font-medium"
                        >
                          {tab.label}
                        </TabsTrigger>
                      ))
                    )}
                  </TabsList>
                </div> */}

                {tabs.map((tab) => (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className="mt-0"
                  >
                    <NewsTabContent
                      title={tab.label}
                      categoryId={tab.categoryId}
                    />
                  </TabsContent>
                ))}
              </div>

              {/* Sidebar */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {isLatestNewsLoading ? (
                  <div className="sticky top-6 rounded-xl bg-white overflow-hidden shadow-lg h-[420px] flex flex-col border border-gray-200">
                    <div className="bg-gray-100 px-5 py-5 border-b border-gray-200">
                      <Skeleton className="h-5 w-24 bg-gray-300" />
                    </div>
                    <div className="flex-1 overflow-hidden p-4 space-y-2">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 px-2"
                        >
                          <Skeleton className="flex-shrink-0 h-12 w-16 rounded" />
                          <div className="flex-1 space-y-1.5">
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-4/5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="sticky top-6 rounded-xl bg-white overflow-hidden shadow-lg h-[500px] flex flex-col border border-gray-200">
                    <div className="bg-gray-200 px-4 py-5 flex-shrink-0 border-b border-gray-200">
                      <h3 className="text-base font-extrabold text-gray-800 flex items-center gap-2">
                        <div className="w-1 h-4 bg-cyan-500 rounded-full "></div>
                        {t("latestNewsTitle")}
                      </h3>
                    </div>
                    <ScrollArea className="flex-1 bg-white">
                      <div className="p-2">
                        {latestNews.map((item, index) => (
                          <div key={item.id}>
                            <Link
                              href={item.link}
                              className="flex items-start gap-2.5 py-2 px-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                            >
                              <div className="flex-shrink-0 w-14 h-11 rounded overflow-hidden bg-gray-100 relative">
                                <Image
                                  src={item.thumbnail}
                                  alt={item.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-700 group-hover:text-gray-900 leading-snug font-medium line-clamp-2 mb-1">
                                  {item.title}
                                </p>
                                {item.created_at && (
                                  <p className="text-xs text-gray-500">
                                    {new Date(
                                      item.created_at,
                                    ).toLocaleDateString("vi-VN", {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                    })}
                                  </p>
                                )}
                              </div>
                              <ArrowRight className="flex-shrink-0 w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                            </Link>
                            {index < latestNews.length - 1 && (
                              <hr className="my-2 border-gray-200" />
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </motion.div>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
