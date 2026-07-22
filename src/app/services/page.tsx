"use client";

import { Loading } from "@/components/common/loading";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import ServiceGrid from "./components/service-grid";

export default function ServicesPage() {
  const { t } = useTranslation("pages/services");

  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#19426D]">
            <Loading
              text={t("loading") || "Đang tải dịch vụ..."}
              size="lg"
              className="text-white"
            />
          </div>
        }
      >
        <ServiceGrid />
      </Suspense>
      {/* <TestimonialSection /> */}
    </>
  );
}

/* 
import {
  BookOpen,
  DollarSign,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Tư vấn pháp lý",
    description: "Hỗ trợ các vấn đề pháp lý cho doanh nghiệp vừa và nhỏ",
    features: [
      "Tư vấn thành lập doanh nghiệp",
      "Soạn thảo hợp đồng",
      "Đăng ký thương hiệu",
      "Tư vấn thuế và kế toán",
    ],
    color: "blue",
  },
  {
    icon: DollarSign,
    title: "Hỗ trợ tài chính",
    description: "Kết nối nguồn vốn và tư vấn tài chính cho doanh nghiệp",
    features: [
      "Tư vấn vay vốn ngân hàng",
      "Kết nối nhà đầu tư",
      "Lập kế hoạch tài chính",
      "Quản lý dòng tiền",
    ],
    color: "green",
  },
  {
    icon: GraduationCap,
    title: "Đào tạo kinh doanh",
    description: "Các khóa học và chương trình đào tạo nâng cao năng lực",
    features: [
      "Kỹ năng quản lý",
      "Marketing & Sales",
      "Chuyển đổi số",
      "Kỹ năng lãnh đạo",
    ],
    color: "purple",
  },
  {
    icon: Users,
    title: "Tư vấn nhân sự",
    description: "Giải pháp tuyển dụng và quản lý nhân sự hiệu quả",
    features: [
      "Tuyển dụng nhân sự",
      "Đào tạo nhân viên",
      "Xây dựng văn hóa",
      "Quản lý hiệu suất",
    ],
    color: "orange",
  },
  {
    icon: TrendingUp,
    title: "Marketing & Branding",
    description: "Xây dựng thương hiệu và chiến lược marketing",
    features: [
      "Xây dựng thương hiệu",
      "Digital Marketing",
      "Social Media",
      "SEO & Content",
    ],
    color: "pink",
  },
  {
    icon: BookOpen,
    title: "Tư vấn chiến lược",
    description: "Định hướng phát triển và tối ưu hóa vận hành",
    features: [
      "Lập kế hoạch kinh doanh",
      "Phân tích thị trường",
      "Tối ưu quy trình",
      "Quản lý rủi ro",
    ],
    color: "indigo",
  },
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  pink: "bg-pink-100 text-pink-600",
  indigo: "bg-indigo-100 text-indigo-600",
};

OLD PAGE STRUCTURE:
<div className="bg-white">
  <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">...</section>
  <section className="py-16">...</section>
  <section className="py-16 bg-gray-50">...</section>
  <section className="py-16">...</section>
</div>
*/
