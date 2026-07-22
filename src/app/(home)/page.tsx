import { constructMetadata } from "@/lib/seo";
import HeroBanner from "./_views/banner-section";
import BusinessSupportSection from "./_views/business-support-section";
import DocumentsSection from "./_views/documents-section";
import NewsSection from "./_views/news-section";
import ServicesSection from "./_views/services-section";

export const metadata = constructMetadata({
  title: "Trang chủ",
  description: "Trung tâm Dịch vụ Phân tích thí nghiệm và Tiêu chuẩn Đo lường Chất lượng Thành Phố Hồ Chí Minh",
  url: "/",
});

export default function Home() {
  return (
    <div className="bg-white">
      <HeroBanner />
      <ServicesSection />

      <NewsSection />
      {/* <TestimonialSection /> */}
      <DocumentsSection />
      <BusinessSupportSection />

      {/* <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Chào mừng đến với SMEQ
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Nền tảng hỗ trợ doanh nghiệp vừa và nhỏ
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="/register"
                className="px-8 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Đăng ký ngay
              </a>
              <a
                href="/about"
                className="px-8 py-3 border-2 border-white text-white rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                Tìm hiểu thêm
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Dịch vụ của chúng tôi
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tư vấn pháp lý
              </h3>
              <p className="text-gray-600">
                Hỗ trợ các vấn đề pháp lý cho doanh nghiệp vừa và nhỏ
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hỗ trợ tài chính
              </h3>
              <p className="text-gray-600">
                Kết nối nguồn vốn và tư vấn tài chính cho doanh nghiệp
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Đào tạo kinh doanh
              </h3>
              <p className="text-gray-600">
                Các khóa học và chương trình đào tạo nâng cao năng lực
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Đăng ký ngay để nhận được hỗ trợ từ chúng tôi
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Đăng ký miễn phí
          </a>
        </div>
      </section> */}
    </div>
  );
}
