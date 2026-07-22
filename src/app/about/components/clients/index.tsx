"use client";

import Image from "next/image";
// import Link from "next/link";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { PageConfig } from "@/api/models";
import baseConfig from "@/configs/base";
import { useTranslation } from "react-i18next";

interface Partner {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  is_active: boolean;
}

const CUSTOMERS_PARTNERS_CONFIG_KEY = "Customers_partners_config";

function getImageUrl(logo: string | undefined): string {
  if (!logo || logo.trim() === "") return "/images/service-1.png";
  return logo.startsWith("http")
    ? logo
    : `${baseConfig.imgEndpointDomain}${logo}`;
}

function parsePartners(value: string): Partner[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function Clients() {
  const { t } = useTranslation("pages/about");
  const { data, isLoading } = useGetApiV10PageConfig(
    {
      filters: `key==${CUSTOMERS_PARTNERS_CONFIG_KEY}`,
      pageSize: 1,
    },
    {
      query: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    }
  );

  // Parse partners from config
  const partners: Partner[] = (() => {
    if (!data?.responseData?.rows) return [];
    const rows = data.responseData.rows as PageConfig[];
    const config = rows.find((item) => item.key === CUSTOMERS_PARTNERS_CONFIG_KEY);
    return parsePartners(config?.value || "");
  })();

  // Filter only active partners for display
  const activePartners = partners.filter((p) => p.is_active);
  const clients = activePartners;

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto h-auto px-6 lg:px-12">
          <div className="mx-4 md:mx-8 lg:mx-10">
            <h2 className="text-4xl font-bold mb-12">{t("clientsPartners")}</h2>
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (activePartners.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto h-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10">
          <h2 className="text-4xl font-bold mb-12">{t("clientsPartners")}</h2>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            speed={800}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
            }}
            className="w-full"
          >
            {clients.map((client, index) => (
              <SwiperSlide key={`client-${client.id}-${index}`}>
                <div className="flex items-center justify-center p-2 h-40">
                  <a
                    href={client.website || "#"}
                    target={client.website ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={`relative w-full h-full ${client.website ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <Image
                      src={getImageUrl(client.logo)}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
