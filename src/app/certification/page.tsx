"use client";

import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { useGetApiV10Category } from "@/api/endpoints/category";
import { Category } from "@/api/models/category";

interface CategoryWithChildren extends Category {
  categories?: Category[];
}
import baseConfig from "@/configs/base";
import { Loader2, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CategoryTab from "../[...slug]/components/category-tab";
import EmptyState from "../[...slug]/components/empty-state";
import RelatedSidebar from "../[...slug]/components/related-sidebar";

interface CertificationDataItem {
  id: string;
  img: string;
  "describe-img": string;
  content: string;
}

interface CertificationConfig {
  title: string;
  describe: string;
  data: CertificationDataItem[];
}

const PAGE_CONFIG_KEY = "certification-config";
const PARENT_CATEGORY_SLUG = "nang-luc";

const getImageUrl = (path: string) => {
  if (!path) return "";
  return path.startsWith("http")
    ? path
    : `${baseConfig.imgEndpointDomain}${path}`;
};

export default function CertificationPage() {
  const [config, setConfig] = useState<CertificationConfig | null>(null);
  const [ready, setReady] = useState(false);

  const { data, isLoading } = useGetApiV10PageConfig({
    filters: `key==${PAGE_CONFIG_KEY}`,
    pageSize: 1,
  });

  const { i18n, t } = useTranslation("pages/post-detail");
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const { data: categoriesData } = useGetApiV10Category({ language: currentLang });

  useEffect(() => {
    if (data?.responseData?.rows && data.responseData.rows.length > 0) {
      const row = data.responseData.rows[0] as unknown as Record<
        string,
        unknown
      >;
      try {
        const parsed = JSON.parse(
          String(row.value || "{}"),
        ) as CertificationConfig;
        setConfig(parsed);
      } catch {
        setConfig(null);
      }
    }
    setReady(true);
  }, [data]);

  const parentCategory = useMemo(() => {
    const allCategories = (categoriesData?.responseData ||
      []) as CategoryWithChildren[];
    return allCategories.find(
      (cat) =>
        cat.link === `/${PARENT_CATEGORY_SLUG}` ||
        cat.link === `/${PARENT_CATEGORY_SLUG}/`,
    );
  }, [categoriesData]);

  const subcategories = useMemo(() => {
    const list = [...(parentCategory?.categories || [])];
    return list as Category[];
  }, [parentCategory]);

  if (isLoading || !ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const items = config?.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section
        className="relative bg-cover bg-center bg-no-repeat pt-20 pb-28 overflow-hidden"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C2449]/95 via-[#0C2449]/80 to-[#283B80]/40" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">
            {t("capability")}
          </h1>
          {/* {config?.describe && (
            <p className="max-w-3xl mx-auto text-base md:text-lg text-blue-100 font-light opacity-90 leading-relaxed">
              {config.describe}
            </p>
          )} */}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-10 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Category Tab */}
              <CategoryTab
                categories={subcategories}
              />

              {/* Related Sidebar */}
              <RelatedSidebar
                categoryId={parentCategory?.id || ""}
                categoryCode={PARENT_CATEGORY_SLUG}
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                {/* Left: Title */}
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2.5 rounded-lg mt-0.5">
                    <Newspaper className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {t("capability")}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {t("latestUpdate")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            {items.length === 0 ? (
              <EmptyState
                hasFilters={false}
                title={t("noCertifications")}
                messageWithoutFilter={t("noCertificationsDesc")}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 py-6">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/certification/${item.id}`}
                    className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5"
                  >
                    {/* Logo Container */}
                    <div className="relative w-full aspect-square max-w-[180px] bg-white rounded-full border border-slate-200/80 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-blue-200 transition-all duration-300 mb-4">
                      {item.img ? (
                        <div className="relative w-3/4 h-3/4">
                          <Image
                            src={getImageUrl(item.img)}
                            alt={item["describe-img"]}
                            fill
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                          <svg
                            className="w-12 h-12 opacity-50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="max-w-[280px]">
                      <h3 className="text-sm font-medium text-slate-700 leading-relaxed group-hover:text-blue-600 transition-colors duration-200">
                        {item["describe-img"]}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
