"use client";

import { useGetApiV10Banner } from "@/api/endpoints/banner";
import { Banner } from "@/api/models/banner";
import { File } from "@/api/models/file";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { getThumbnailSrc } from "@/lib/responsive-image";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import * as React from "react";

interface BannerWithFile extends Banner {
  file?: File;
}

interface AutoplayPlugin {
  play: () => void;
  stop: () => void;
  reset: () => void;
  options: {
    delay: number;
    stopOnInteraction: boolean;
  };
}

const defaultSlides = [
  {
    id: "default-1",
    image: "/images/service-1.png",
    alt: "Banner",
  },
];

export default function HeroBanner() {
  const { data, isLoading } = useGetApiV10Banner({
    filters: "is_active==true",
    sortField: "sort_order",
    sortOrder: "asc",
  });

  const banners = React.useMemo(
    () => (data?.responseData?.rows as BannerWithFile[]) || [],
    [data?.responseData?.rows],
  );

  // Tính display_time từ banner đầu tiên
  const autoplayDelay = React.useMemo(() => {
    const delay = banners[0]?.display_time
      ? parseInt(banners[0].display_time, 10)
      : 0;
    return delay > 0 ? delay : 3000;
  }, [banners]);

  const plugin = React.useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true }),
  );

  // Cập nhật delay khi thay đổi
  React.useEffect(() => {
    if (plugin.current) {
      (plugin.current as AutoplayPlugin).options.delay = autoplayDelay;
    }
  }, [autoplayDelay]);

  // Tạo slides từ banners
  const bannerSlides = React.useMemo(() => {
    const slides = banners
      .map((banner) => {
        const imageUrl = getThumbnailSrc(
          banner.file?.compress_info,
          banner.file?.path,
          "/images/service-1.png",
        );

        return {
          id: banner.id || "",
          image: imageUrl,
          alt: banner.name || "Banner",
        };
      });

    return slides.length > 0 ? slides : defaultSlides;
  }, [banners]);
  return (
    <section className="bg-[#33C5F1] relative  py-12">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10 ">
          {isLoading ? (
            <Skeleton className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl bg-white/10" />
          ) : (
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              onMouseEnter={() => plugin.current.stop()}
              onMouseLeave={() => plugin.current.play()}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {bannerSlides.map((slide, index) => (
                  <CarouselItem key={slide.id}>
                    <Card className="border-0 bg-transparent shadow-none">
                      <CardContent className="p-0">
                        <div className="relative bg-[#346293] rounded-2xl overflow-hidden">
                          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
                            <Image      
                              src={slide.image}
                              alt={slide.alt}
                              fill
                              className="object-cover"
                              priority={index === 0}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}
