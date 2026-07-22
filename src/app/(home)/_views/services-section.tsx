"use client";

import { useGetApiV10Post } from "@/api/endpoints/post";
import ServiceCard from "@/components/common/components/service-card";
import { PAGE_IDS } from "@/constants/page-ids";
import { getThumbnailSrc } from "@/lib/responsive-image";
import { slugify } from "@/lib/slugify";
import { PostExtended } from "@/types/post";
import { mockPosts } from "@/utils/mock-data";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export default function ServicesSection() {
  const paginationStyle = `
    .services-swiper .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      background: rgba(255, 255, 255, 0.6);
      opacity: 1;
      transition: all 0.3s ease;
      border-radius: 9999px;
    }
    .services-swiper .swiper-pagination-bullet:hover {
      background: rgba(255, 255, 255, 0.9);
      width: 16px;
    }
    .services-swiper .swiper-pagination-bullet-active {
      width: 32px;
      background: #22D3EE;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    /* Center pagination */
    .services-swiper .swiper-pagination {
      text-align: center;
    }
  `;

  const { i18n, t } = useTranslation("pages/home");
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const servicesPageId = currentLang === "en" ? PAGE_IDS.SERVICE_POSITION : PAGE_IDS.HOME_SERVICES;

  const { data, isLoading } = useGetApiV10Post({
    page_id: servicesPageId,
    filters: "is_hidden==false",
    pageSize: 8,
    position: "true",
    sortOrderPosition: "ASC",
    filterBy: "CLIENT",
  });

  const services = React.useMemo(() => {
    const posts = (data?.responseData?.rows as PostExtended[]) || [];
    // Nếu không có dữ liệu từ API, sử dụng mock-data
    const dataToUse = posts.length > 0 ? posts : mockPosts.slice(0, 8);

    return dataToUse.map((post) => {
      const imageUrl = getThumbnailSrc(
        post.thumbnail_compress_info,
        post.thumbnail_path,
        "/images/service-1.png",
      );

      return {
        id: post.id || "",
        image: imageUrl,
        title: post.title || "",
        description: post.summary || "",
        link: `/${post.slug || slugify(post.title || "")}`,
        date: post.created_at
          ? new Date(post.created_at).toLocaleDateString("vi-VN")
          : undefined,
      };
    });
  }, [data?.responseData?.rows]);

  return (
    <section
      className="relative py-14 overflow-hidden"
      style={{
        backgroundImage: "url('/images/banner_service_2.png')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2152]/90 via-[#0A2152]/80 to-[#0A2152]/90 z-0" />

      {/* Decorative effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent z-0 pointer-events-none" />

      <style jsx global>
        {paginationStyle}
      </style>
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10">
          {/* Header */}
          <motion.div
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* <div className="mb-4 px-4 py-2 border-2 border-cyan-300/50 rounded-lg bg-white/5 backdrop-blur-sm">
              <span className="text-cyan-300 text-sm font-semibold tracking-wider">
                CASE-SMEQ
              </span>
            </div> */}

            {/* drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]
            shadow-[0_0_15px_rgba(34,211,238,0.6)]
             */}
            <motion.h2
              className="text-4xl md:text-6xl font-extrabold text-center mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent ">
                {t("services")}
              </span>
            </motion.h2>
            <motion.div
              className="w-28 h-1 rounded-full bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-300"
              initial={{ width: 0 }}
              whileInView={{ width: 112 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            ></motion.div>
            {/* <motion.p
              className="text-white/80 text-lg mt-4 text-center max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Giải pháp kỹ thuật chuyên sâu hỗ trợ doanh nghiệp nâng cao chất
              lượng sản phẩm
            </motion.p> */}
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden h-[320px] animate-pulse"
                >
                  <div className="w-full h-48 bg-white/20" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-white/20 rounded w-3/4" />
                    <div className="h-3 bg-white/15 rounded w-full" />
                    <div className="h-3 bg-white/15 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <motion.div
                className="relative -mx-2 px-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              >
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={24}
                  slidesPerView={1}
                  loop={true}
                  speed={1000}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: false,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                    },
                    1280: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                    },
                  }}
                  className="w-full services-swiper !py-2 !pb-20"
                >
                  {services.map((service) => (
                    <SwiperSlide key={service.id} className="h-auto">
                      <div className="h-full p-0">
                        <ServiceCard
                          image={service.image}
                         
                          title={service.title}
                          description={service.description}
                          link={service.link}
                          date={service.date}
                          className="bg-[#346293] border border-white/20 rounded-lg overflow-hidden hover:bg-[#2e5681] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 transform hover:scale-[1.03] h-full min-h-[330px] flex flex-col"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* View all button - Desktop */}
                <div className="absolute -bottom-0 right-2 z-20 hidden sm:block">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all border border-white/30 hover:border-white/50"
                  >
                    {t("viewAllServices")}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>

              {/* View all button - Mobile nằm giữa */}
              <motion.div
                className="mt-6 flex justify-center sm:hidden"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-all border border-white/30 hover:border-white/50"
                >
                  {t("viewAllServices")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
