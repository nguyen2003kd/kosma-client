"use client";

import { useGetApiV10Category } from "@/api/endpoints/category";
import { useGetApiV10Post } from "@/api/endpoints/post";
import { CategoryWithChildren } from "@/api/models";
import CategoryTab from "@/app/services/components/service-grid/components/category-tab";
import DatePicker from "@/components/common/components/date-picker";
import ServiceCard from "@/components/common/components/service-card";
import { Loading } from "@/components/common/loading";
import { getThumbnailSrc } from "@/lib/responsive-image";
import { PostExtended as PostWithImage } from "@/types/post";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function RelatedServices() {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const { data: categoriesData } = useGetApiV10Category({ language: currentLang });

  const { serviceSubCategories } = useMemo(() => {
    const serviceCategory = (
      categoriesData?.responseData as CategoryWithChildren[]
    )?.find((cat) => cat.link === "/services");
    const categories = serviceCategory?.categories || [];
    return {
      serviceSubCategories: categories,
    };
  }, [categoriesData]);

  const filters = useMemo(() => {
    const base = "is_hidden==false , is_service==true";
    if (!date) return base;
    const start = new Date(date).setHours(0, 0, 0, 0);
    const end = new Date(date).setHours(23, 59, 59, 999);
    return `${base} , created_at>=${new Date(
      start
    ).toISOString()} , created_at<=${new Date(end).toISOString()}`;
  }, [date]);

  const { data, isLoading, error } = useGetApiV10Post({
    filters,
    page: 1,
    pageSize: 3,
    sortField: "created_at",
    sortOrder: "desc",
    ...(selectedCategory && { category_id: selectedCategory }),
  });

  const posts = (data?.responseData?.rows as PostWithImage[]) || [];

  return (
    <div>
      <div className="mb-[56px]">
        <CategoryTab
          categories={serviceSubCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
          }}
          onNavigate={(path) => router.push(path, { scroll: false })}
        />
      </div>

      <div className="rounded-lg mb-20">
        <DatePicker
          date={date}
          onDateChange={(newDate) => {
            setDate(newDate);
          }}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <Loading
            text="Đang tải dịch vụ..."
            size="lg"
            className="text-[#19426D]"
          />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400 text-lg">
            Không thể tải dịch vụ. Vui lòng thử lại sau.
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#0C0800] text-lg">Không có dịch vụ nào.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ServiceCard
              key={post.id}
              image={getThumbnailSrc(post.thumbnail_compress_info, post.thumbnail_path, "/images/service-1.png")}
              title={post.title || ""}
              description={post.summary || ""}
              link={`/services/${post.slug || ""}`}
              backgroundColor="transparent"
              textColor="#0C0800"
              descriptionColor="#4B5563"
              linkColor="#0C0800"
            />
          ))}
        </div>
      )}
    </div>
  );
}
