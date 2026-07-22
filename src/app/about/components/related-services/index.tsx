"use client";
import { useGetApiV10Post } from "@/api/endpoints/post";
import ServiceCard from "@/components/common/components/service-card";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_IDS } from "@/constants/page-ids";
import { getResponsiveImage } from "@/lib/responsive-image";
import type { PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function RelatedServices() {
  const { t } = useTranslation("pages/about");
  const { data, isLoading } = useGetApiV10Post({
    page_id: PAGE_IDS.ABOUT_RELATED_SERVICES,
    filters: "is_hidden==false",
    pageSize: 3,
    position: "true",
    sortOrderPosition: "ASC",
    filterBy: "CLIENT",
  });

  const relatedServices = useMemo(() => {
    const rows = (data?.responseData?.rows as PostExtended[]) || [];
    // Nếu không có dữ liệu từ API, sử dụng mock-data
    return rows.length > 0 ? rows : mockPosts.slice(0, 3);
  }, [data]);

  if (isLoading) {
    return (
      <section className="bg-[#2563EB] py-16">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="mx-4 md:mx-8 lg:mx-10">
            <Skeleton className="h-10 w-64 mx-auto mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              <Skeleton className="h-80 rounded-lg" />
              <Skeleton className="h-80 rounded-lg" />
              <Skeleton className="h-80 rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!relatedServices || relatedServices.length === 0) {
    return null;
  }

  return (
    <section className="h-max-fill py-16"
    style={{
      backgroundImage: "url('/images/banner_service_2.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10">
                  <motion.h2
            className="text-4xl md:text-6xl font-extrabold text-center mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              {t("relatedServices")}
            </span>
          </motion.h2>
          <motion.div
            className="w-28 h-1 mb-4 rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 112 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {relatedServices.map((service) => (
              <ServiceCard
                key={service.id}
                image={
                  service.thumbnail_compress_info
                    ? getResponsiveImage(service.thumbnail_compress_info)
                    : ""
                }
                title={service.title || ""}
                description={service.summary || ""}
                link={`/${service.slug || ""}`}
                backgroundColor="#FFFFFF"
                textColor="#000000"
                descriptionColor="#4B5563"
                linkColor="#000000"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
