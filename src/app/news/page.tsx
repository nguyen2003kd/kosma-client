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
              text={t("loading") || "Loading news..."}
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

// Mock data - will be replaced with actual API call
// const featuredNews = {
//   id: 1,
//   title: "Support policy for small and medium enterprises in 2024",
//   excerpt:
//     "The government announces a new support package for small and medium enterprises with a total value of 50,000 billion VND...",
//   category: "Policy",
//   author: "Nguyen Van A",
//   date: "2024-12-05",
//   image: "/images/news-placeholder.jpg",
//   featured: true,
// };

// const newsList = [
//   {
//     id: 2,
//     title: "10 Digital Marketing trends for SMEs in 2024",
//     excerpt:
//       "Discover the latest digital marketing trends to help small and medium enterprises grow...",
//     category: "Marketing",
//     author: "Tran Thi B",
//     date: "2024-12-04",
//     image: "/images/news-placeholder.jpg",
//   },
//   {
//     id: 3,
//     title: "How to manage cash flow effectively for small businesses",
//     excerpt:
//       "Detailed guide on cash flow management to maintain stable business operations...",
//     category: "Finance",
//     author: "Le Van C",
//     date: "2024-12-03",
//     image: "/images/news-placeholder.jpg",
//   },
//   {
//     id: 4,
//     title: "Digital transformation - Opportunity or challenge for SMEs?",
//     excerpt:
//       "Analysis of the role of digital transformation in improving competitiveness...",
//     category: "Technology",
//     author: "Pham Thi D",
//     date: "2024-12-02",
//     image: "/images/news-placeholder.jpg",
//   },
//   {
//     id: 5,
//     title: "Business registration procedures in 2024 - What's new",
//     excerpt:
//       "New regulations on business registration procedures effective from January 2024...",
//     category: "Legal",
//     author: "Hoang Van E",
//     date: "2024-12-01",
//     image: "/images/news-placeholder.jpg",
//   },
//   {
//     id: 6,
//     title: "HR management experience from successful CEOs",
//     excerpt:
//       "Sharing from CEOs who have built effective HR teams for small businesses...",
//     category: "Management",
//     author: "Do Thi F",
//     date: "2024-11-30",
//     image: "/images/news-placeholder.jpg",
//   },
// ];

// const categories = [
//   "All",
//   "Policy",
//   "Finance",
//   "Marketing",
//   "Technology",
//   "Legal",
//   "Management",
// ];

// export default function NewsPage() {
//   return (
//     <div className="bg-white">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">
//               News & Articles
//             </h1>
//             <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
//               Latest updates on small and medium enterprises
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
//                 Read more
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
//             Latest articles
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
//                     Read more
//                     <ArrowRight className="w-4 h-4" />
//                   </a>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="mt-12 flex justify-center gap-2">
//             <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
//               Previous
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
//               Next
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Newsletter CTA */}
//       <section className="bg-blue-600 py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">
//             Subscribe for the latest news
//           </h2>
//           <p className="text-xl text-blue-100 mb-8">
//             Receive weekly newsletters about small and medium enterprises
//           </p>
//           <div className="max-w-md mx-auto flex gap-2">
//             <input
//               type="email"
//               placeholder="Your email"
//               className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
//             />
//             <button className="px-6 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
