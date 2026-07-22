import { constructMetadata } from "@/lib/seo";
import Banner from "./components/banner";
import Clients from "./components/clients";
import Introduction from "./components/introduction";
import VideoList from "./components/video-list";


export const metadata = constructMetadata({
  title: "Giới thiệu",
  description: "Trung tâm Dịch vụ Phân tích thí nghiệm và Tiêu chuẩn Đo lường Chất lượng Thành Phố Hồ Chí Minh",
  url: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Banner />

      <Introduction />

      <VideoList />

      {/* <Testimonial /> */}

      {/* <RelatedServices /> */}

      <Clients />

      {/* Mission & Vision */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Sứ mệnh</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Xây dựng một hệ sinh thái hỗ trợ toàn diện cho các doanh nghiệp
                vừa và nhỏ, giúp họ phát triển bền vững và cạnh tranh hiệu quả
                trong nền kinh tế số.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Tầm nhìn</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Trở thành nền tảng hỗ trợ doanh nghiệp vừa và nhỏ hàng đầu Việt
                Nam, đồng hành cùng hàng nghìn doanh nghiệp trên con đường phát
                triển.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Core Values */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-xl text-gray-600">
              Những giá trị định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CheckCircle className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Chất lượng
              </h3>
              <p className="text-gray-600">
                Cam kết cung cấp dịch vụ chất lượng cao, đáp ứng mọi nhu cầu của
                doanh nghiệp
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Đồng hành
              </h3>
              <p className="text-gray-600">
                Luôn sát cánh cùng doanh nghiệp trong mọi giai đoạn phát triển
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Target className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hiệu quả
              </h3>
              <p className="text-gray-600">
                Tối ưu hóa quy trình, mang lại giá trị thiết thực cho doanh
                nghiệp
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Statistics */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Doanh nghiệp</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Chuyên gia</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">20+</div>
              <div className="text-gray-600">Dịch vụ</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Hài lòng</div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      {/* <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng hợp tác cùng chúng tôi?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Đăng ký ngay để nhận tư vấn miễn phí
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-md font-medium hover:bg-gray-100 transition-colors"
          >
            Đăng ký ngay
          </a>
        </div>
      </section> */}
    </div>
  );
}
