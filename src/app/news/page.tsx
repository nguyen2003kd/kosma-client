"use client";

import { Loading } from "@/components/common/loading";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import NewsGrid from "./components/news-grid";



export default function NewsPage() {
  const { t } = useTranslation("pages/news");

  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#19426D]">
            <Loading
              text={t("loading") || "Đang tải tin tức..."}
              size="lg"
              className="text-white"
            />
          </div>
        }
      >
        <NewsGrid />
      </Suspense>
      {/* <TestimonialSection /> */}
    </>
  );
}

// Mock data - sẽ thay bằng API call thực tế
// const featuredNews = {
//   id: 1,
//   title: "Chính sách hỗ trợ doanh nghiệp vừa và nhỏ năm 2024",
//   excerpt:
//     "Chính phủ công bố gói hỗ trợ mới dành cho doanh nghiệp vừa và nhỏ với tổng giá trị 50,000 tỷ đồng...",
//   category: "Chính sách",
//   author: "Nguyễn Văn A",
//   date: "2024-12-05",
//   image: "/images/news-placeholder.jpg",
//   featured: true,
// };

// const newsList = [
//   {
//     id: 2,
//     title: "10 xu hướng Marketing Digital cho SME trong năm 2024",
//     excerpt:
//       "Khám phá những xu hướng marketing digital mới nhất giúp doanh nghiệp vừa và nhỏ tăng trưởng...",
//     category: "Marketing",
//     author: "Trần Thị B",
//     date: "2024-12-04",
//     image: "/images/news-placeholder.jpg",
//   },
//   {
//     id: 3,
//     title: "Cách quản lý dòng tiền hiệu quả cho doanh nghiệp nhỏ",
//     excerpt:
//       "Hướng dẫn chi tiết về cách quản lý dòng tiền để duy trì hoạt động kinh doanh ổn định...",
//     category: "Tài chính",
//     author: "Lê Văn C",
//     date: "2024-12-03",
//     image: "/images/news-placeholder.jpg",
//   },
//   {
//     id: 4,
//     title: "Chuyển đổi số - Cơ hội hay thách thức cho SME?",
//     excerpt:
//       "Phân tích về vai trò của chuyển đổi số trong việc nâng cao năng lực cạnh tranh...",
//     category: "Công nghệ",
//     author: "Phạm Thị D",
//     date: "2024-12-02",
//     image: "/images/news-placeholder.jpg",
//   },
//   {
//     id: 5,
//     title: "Thủ tục thành lập doanh nghiệp năm 2024 - Những điểm mới",
//     excerpt:
//       "Các quy định mới về thủ tục thành lập doanh nghiệp có hiệu lực từ tháng 1/2024...",
//     category: "Pháp lý",
//     author: "Hoàng Văn E",
//     date: "2024-12-01",
//     image: "/images/news-placeholder.jpg",
//   },
//   {
//     id: 6,
//     title: "Kinh nghiệm quản lý nhân sự từ các CEO thành công",
//     excerpt:
//       "Chia sẻ từ những CEO đã xây dựng đội ngũ nhân sự hiệu quả cho doanh nghiệp nhỏ...",
//     category: "Quản trị",
//     author: "Đỗ Thị F",
//     date: "2024-11-30",
//     image: "/images/news-placeholder.jpg",
//   },
// ];

// const categories = [
//   "Tất cả",
//   "Chính sách",
//   "Tài chính",
//   "Marketing",
//   "Công nghệ",
//   "Pháp lý",
//   "Quản trị",
// ];

// export default function NewsPage() {
//   return (
//     <div className="bg-white">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">
//               Tin tức & Bài viết
//             </h1>
//             <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
//               Cập nhật thông tin mới nhất về doanh nghiệp vừa và nhỏ
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Category Filter */}
//       <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex gap-4 py-4 overflow-x-auto">
//             {categories.map((category, index) => (
//               <button
//                 key={index}
//                 className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
//                   index === 0
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured News */}
//       <section className="py-12 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-lg shadow-md overflow-hidden md:flex">
//             <div className="md:w-1/2 relative h-64 md:h-auto">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
//                 <span className="text-white text-6xl font-bold">SMEQ</span>
//               </div>
//             </div>

//             <div className="md:w-1/2 p-8">
//               <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full mb-4">
//                 {featuredNews.category}
//               </span>

//               <h2 className="text-3xl font-bold text-gray-900 mb-4">
//                 {featuredNews.title}
//               </h2>

//               <p className="text-gray-600 mb-6">{featuredNews.excerpt}</p>

//               <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
//                 <div className="flex items-center gap-2">
//                   <User className="w-4 h-4" />
//                   <span>{featuredNews.author}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Calendar className="w-4 h-4" />
//                   <span>
//                     {new Date(featuredNews.date).toLocaleDateString("vi-VN")}
//                   </span>
//                 </div>
//               </div>

//               <a
//                 href={`/news/${featuredNews.id}`}
//                 className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
//               >
//                 Đọc thêm
//                 <ArrowRight className="w-4 h-4" />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* News Grid */}
//       <section className="py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">
//             Bài viết mới nhất
//           </h2>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {newsList.map((news) => (
//               <article
//                 key={news.id}
//                 className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
//               >
//                 <div className="relative h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
//                   <span className="text-white text-4xl font-bold">SMEQ</span>
//                 </div>

//                 <div className="p-6">
//                   <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full mb-3">
//                     {news.category}
//                   </span>

//                   <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
//                     {news.title}
//                   </h3>

//                   <p className="text-gray-600 mb-4 line-clamp-3">
//                     {news.excerpt}
//                   </p>

//                   <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-3 h-3" />
//                       <span>
//                         {new Date(news.date).toLocaleDateString("vi-VN")}
//                       </span>
//                     </div>
//                   </div>

//                   <a
//                     href={`/news/${news.id}`}
//                     className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
//                   >
//                     Đọc thêm
//                     <ArrowRight className="w-4 h-4" />
//                   </a>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="mt-12 flex justify-center gap-2">
//             <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
//               Trang trước
//             </button>
//             <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
//               1
//             </button>
//             <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
//               2
//             </button>
//             <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
//               3
//             </button>
//             <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
//               Trang sau
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Newsletter CTA */}
//       <section className="bg-blue-600 py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">
//             Đăng ký nhận tin tức mới nhất
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Nhận bản tin hàng tuần về doanh nghiệp vừa và nhỏ
//           </p>
//           <div className="max-w-md mx-auto flex gap-2">
//             <input
//               type="email"
//               placeholder="Email của bạn"
//               className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
//             />
//             <button className="px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
//               Đăng ký
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
