import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Play,
  Star,
  Twitter,
  Youtube,
} from "lucide-react";
import RelatedServices from "./RelatedServices";

export default function ServiceDetailPage() {
  return (
    <main className="bg-white text-[#19426D]">
      <section className="container px-6 lg:px-[96px] py-10">
        <div className="flex flex-col items-center gap-10">
          <h1 className="font-bold text-[32px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-center text-[#19426D]">
            Doanh nghiệp đăng ký online
          </h1>

          <div className="w-full flex flex-col items-start justify-center gap-10">
            <div className="text-[14px] font-semibold text-[#19426D]">
              10/12/2024 15:55
            </div>

            <div className="flex items-center gap-3 text-[#19426D]">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Twitter size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Youtube size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <Image
            src="/images/figma/image_60.png"
            width={1248}
            height={311}
            alt="Doanh nghiệp đăng ký online - Hero"
            className="w-full object-contain shadow-sm"
          />
        </div>

        <article className="mt-10 space-y-10 text-[16px] leading-[1.5] text-[#19426D]">
          <div className="flex flex-col gap-10">
            <p className="lg:text-base text-xs">
              Mến chào Quý khách hàng của Trung tâm Kỹ thuật Tiêu chuẩn Đo lường
              chất lượng TP.HCM!!!
            </p>

            <p className="lg:text-base text-xs">
              Nhằm mục đích để quý khách hàng đăng ký các dịch vụ thử nghiệm,
              hiệu chuẩn của SMEQ được nhanh chóng và thuận tiện hơn, các Anh/
              Chị có thể thực hiện đăng ký online theo hướng dẫn dưới đây:
            </p>
          </div>

          <section className="space-y-10">
            <h2 className="font-bold  text-[24px] lg:text-[40px] leading-[1.3] text-[#19426D]">
              1. ĐĂNG KÝ ĐĂNG NHẬP TÀI KHOẢN
            </h2>

            <div className="space-y-10">
              <h3 className="font-bold text-[20px] lg:text-[32px] leading-[1.3] tracking-[-0.32px] text-[#19426D]">
                1.1 ĐĂNG KÝ
              </h3>

              <div className="flex flex-col gap-10">
                <p className="lg:text-base text-xs">
                  Thực hiện đăng ký nếu như các Quý khách hàng chưa có tài khoản
                  trên phần mềm.
                </p>
                <div className="space-y-3">
                  <p className="lg:text-base text-xs">
                    Bước 1: Truy cập link https://smeq.com.vn/
                  </p>
                  <p className="lg:text-base text-xs">
                    Bước 2: Ở mục “Khách hàng” chọn “Đăng ký”.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <Image
                  src="/images/figma/image_61.png"
                  width={400}
                  height={308}
                  alt="Hình minh họa đăng ký"
                  className="max-w-[400px] w-full h-auto object-contain"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="lg:text-base text-xs">
                  Bước 3: Nhập các thông tin theo yêu cầu để đăng ký tài khoản.
                </p>
                <p className="lg:text-base text-xs">
                  Lưu ý: Thông tin có dấu{" "}
                  <span className="text-[#D32F2F]">*</span> là yêu cầu bắt buộc
                  nhập.
                </p>
              </div>

              <div className="flex justify-center">
                <Image
                  src="/images/figma/image_62.png"
                  width={804}
                  height={459}
                  alt="Hình minh họa đăng nhập bước 2"
                  className="max-w-[804px] w-full h-auto object-contain"
                />
              </div>

              <div className="flex flex-col gap-10">
                <div className="space-y-3">
                  <h4 className="font-bold text-[20px] lg:text-[32px] leading-[1.3] tracking-[-0.32px] text-[#19426D]">
                    1.2 ĐĂNG NHẬP
                  </h4>
                  <p className="lg:text-base text-xs">
                    Thực hiện đăng nhập nếu như các quý khách hàng đã có tài
                    khoản trên phần mềm.
                  </p>
                  <p className="lg:text-base text-xs">
                    Bước 1: Truy cập link https://smeq.com.vn/.
                  </p>
                  <p className="lg:text-base text-xs">
                    Bước 2: Ở mục “Khách hàng” chọn “Đăng nhập”.
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/figma/image_63.png"
                  width={400}
                  height={308}
                  alt="Ví dụ giao diện đăng nhập"
                  className="object-contain"
                />
              </div>
              <p className="lg:text-base text-xs">
                Bước 3: Chọn Công ty nếu đăng nhập bằng tài khoản công ty, chọn
                Người liên hệ nếu đăng nhập bằng tài khoản cá nhân của người
                liên hệ. Sau đó nhập ID và mật khẩu tương ứng để tiến hành đăng
                nhập.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/figma/image_64.png"
                width={400}
                height={318}
                alt="Giao diện thông tin khách hàng"
                className="max-w-[764px] object-contain"
              />
            </div>
            <div className="space-y-10">
              <h2 className="font-bold  text-[24px] lg:text-[40px] leading-[1.3] text-[#19426D]">
                2. SỬ DỤNG TÀI KHOẢN :
              </h2>

              <div className="flex flex-col gap-10">
                <h3 className="font-bold text-[20px] lg:text-[32px] leading-[1.3] tracking-[-0.32px] text-[#19426D]">
                  2.1 Thông tin khách hàng
                </h3>
                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.1.1 Cập nhật thông tin khách hàng
                </h3>

                <p className="lg:text-base text-xs">
                  Thông tin khách hàng được cập nhật tự động theo thông tin đăng
                  ký của khách hàng hoặc theo thông tin do SMEQ tạo.
                </p>
                <p className="lg:text-base text-xs">Giao diện chính:</p>

                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_65.png"
                    width={764}
                    height={454}
                    alt="Giao diện thông tin khách hàng"
                    className="max-w-[764px] w-full h-auto object-contain"
                  />
                </div>
                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.1.2 Chỉnh sửa thông tin khách hàng
                </h3>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Bước 1: Chọn</p>
                  <Image
                    src="/images/figma/image_66.png"
                    width={262}
                    height={37}
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_67.png"
                    width={827}
                    height={463}
                    alt="Giao diện thông tin khách hàng"
                    className="object-contain"
                  />
                </div>
                <p className="lg:text-base text-xs">
                  Bước 2: Chỉnh sửa thông tin khách hàng
                </p>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_68.png"
                    width={1163}
                    height={614}
                    alt="Giao diện thông tin khách hàng"
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Bước 3: Chọn</p>
                  <Image
                    src="/images/figma/image_66.png"
                    width={262}
                    height={37}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">xuất hiện thông báo:</p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_70.png"
                    width={400}
                    height={304}
                    alt="Giao diện thông tin khách hàng"
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">chọn</p>
                  <Image
                    src="/images/figma/image_71.png"
                    width={64}
                    height={44}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    để xác nhận các thông tin đã đổi trong 10s
                  </p>
                </div>
                <p className="lg:text-base text-xs">Lưu ý:</p>
                <p className="lg:text-base text-xs">
                  Khi chỉnh sửa thông tin khách hàng, site chính SMEQ cũng sẽ
                  cập nhật thông tin đã chỉnh sửa theo site khách hàng
                </p>
              </div>

              <div className="flex flex-col gap-10">
                <h3 className="font-bold text-[20px] lg:text-[32px] leading-[1.3] tracking-[-0.32px] text-[#19426D]">
                  2.2 Thông tin liên hệ
                </h3>
                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.2.1 Thêm mới người liên hệ
                </h3>
                <div className="flex flex-col gap-10">
                  <p className="lg:text-base text-xs">
                    Bước 1: Chọn tab Thông tin liên hệ
                  </p>
                  <div className="flex justify-center">
                    <Image
                      src="/images/figma/image_72.png"
                      width={617}
                      height={422}
                      alt="Giao diện thông tin khách hàng"
                      className="object-contain"
                    />
                  </div>
                  <div className="flex justify-start gap-10 items-center">
                    <p className="lg:text-base text-xs">Bước 2: Chọn</p>
                    <Image
                      src="/images/figma/image_73.png"
                      width={91}
                      height={35}
                      alt=""
                      className="object-contain"
                    />
                    <p className="lg:text-base text-xs">
                      Nhập hoặc chọn các tông tin yêu cầu để tạo mới người liên
                      hệ. Các thông tin có dấu * là những thông tin bắt buộc
                      phải điền, không được để trống:
                    </p>
                  </div>
                  <ul className="list-disc pl-6 space-y-5 text-[16px] font-normal leading-[1.5] text-[#19426D]">
                    <li>
                      Tên đăng nhập: tên người liên hệ dùng để đăng nhập vào hệ
                      thống (bắt buộc).
                    </li>
                    <li>Họ và tên: Họ và tên của người liên hệ (bắt buộc).</li>
                    <li>
                      Số điện thoại: không bắt buộc và là duy nhất (kiểu số).
                    </li>
                    <li>
                      Email: không bắt buộc và là duy nhất. Email phải là dạng
                      đuôi của email (ví dụ: @gmail.com).
                    </li>
                    <li>Địa chỉ: địa chỉ của người liên hệ.</li>
                  </ul>
                </div>

                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_74.png"
                    width={604}
                    height={531}
                    alt="Minh họa thông tin liên hệ"
                    className="object-contain"
                  />
                </div>
                <p className="lg:text-base text-xs">
                  Bước 3: Chọn để thêm thông tin người liên hệ vào danh sách.
                </p>
                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.2.2 Xóa người liên hệ
                </h3>
                <p className="lg:text-base text-xs">
                  Bước 1: Ở tên người liên hệ cần xóa, chọn
                </p>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_76.png"
                    width={1123}
                    height={167}
                    alt="Minh họa thông tin liên hệ"
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Bước 2: Chọn</p>
                  <Image
                    src="/images/figma/image_77.png"
                    width={64}
                    height={44}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    để xác nhận xóa người liên hệ
                  </p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_78.png"
                    width={400}
                    height={329}
                    alt="Minh họa thông tin liên hệ"
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.2.3 Chỉnh sửa thông tin người liên hệ
                </h3>
                <p className="lg:text-base text-xs">
                  Bước 1: Ở tên người liên hệ cần chỉnh sửa, chọn
                </p>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_80.png"
                    width={1123}
                    height={167}
                    alt="Minh họa thông tin liên hệ"
                    className="object-contain"
                  />
                </div>
                <p className="lg:text-base text-xs">
                  Bước 2: Thực hiện chỉnh sửa thông tin người liên hệ tương tự
                  như mục 2.2.1. Thêm mới người liên hệ.
                </p>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Bước 3: chọn</p>
                  <Image
                    src="/images/figma/image_81.png"
                    width={42}
                    height={33}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">xuất hiện thông báo:</p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_82.png"
                    width={400}
                    height={307}
                    alt="Minh họa thông tin liên hệ"
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Chọn</p>
                  <Image
                    src="/images/figma/image_83.png"
                    width={64}
                    height={44}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    để xác nhận sửa đổi trong 10s.
                  </p>
                </div>
                <p className="lg:text-base text-xs">Lưu ý:</p>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Chọn</p>
                  <Image
                    src="/images/figma/image_84.png"
                    width={28}
                    height={23}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    phần mềm sẽ cập nhập lại mật khẩu mặc định 123 cho người
                    liên hệ.
                  </p>
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">
                    Chọn trạng thái On/ Off của nút
                  </p>
                  <Image
                    src="/images/figma/image_85.png"
                    width={199}
                    height={130}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    kích hoạt hoặc tạm dừng hoạt động của tài khoản người liên
                    hệ.
                  </p>
                </div>
                <p className="lg:text-base text-xs">
                  Site chính SMEQ sẽ tự động cập nhật thông tin người liên hệ
                  theo site khách hàng.
                </p>
              </div>

              <div className="flex flex-col gap-10">
                <h3 className="font-bold text-[20px] lg:text-[32px] leading-[1.3] tracking-[-0.32px] text-[#19426D]">
                  2.3 Đăng ký dịch vụ
                </h3>
                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.3.1 Thử nghiệm
                </h3>
                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.3.1.1 Thêm mới phiếu đăng ký
                </h3>
                <p className="lg:text-base text-xs">
                  Bước 1: Vào thanh menu “Đăng ký dịch vụ” à chọn “Thử nghiệm”.
                </p>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_86.png"
                    width={500}
                    height={326}
                    alt="Minh họa thông tin liên hệ"
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Bước 2: Chọn</p>
                  <Image
                    src="/images/figma/image_87.png"
                    width={65}
                    height={33}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    khai báo thông tin trên phiếu đăng ký.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-5 text-[16px] font-normal leading-[1.5] text-[#19426D]">
                  <li>Thông tin khách hàng giao dịch được tự động cập nhật.</li>
                  <li>
                    Thông tin khách hàng xuất hóa đơn, Thông tin khách hàng trên
                    phiếu báo cáo thử nghiệm, Thông tin nơi thực hiện: được tự
                    động chọn giống với giao dịch. Nếu có sự thay đổi các thông
                    tin này thì tick chọn vào ô “Khác” và nhập thông tin mới.
                  </li>
                </ul>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_88.png"
                    width={1121}
                    height={624}
                    alt="Minh họa thông tin liên hệ"
                    className="object-contain"
                  />
                </div>

                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Bước 3: Chọn</p>
                  <Image
                    src="/images/figma/image_89.png"
                    width={95}
                    height={44}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">xuất hiện giao diện</p>
                </div>

                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_90.png"
                    width={1154}
                    height={1403}
                    alt="Giao diện chi tiết"
                    className="max-w-[1154px] w-full h-auto object-contain"
                  />
                </div>

                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Bước 4.2: Chọn</p>
                  <Image
                    src="/images/figma/image_93.png"
                    width={53}
                    height={33}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    để thêm mẫu vào phiếu đăng ký.
                  </p>
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">
                    Bước 5: Chỉnh sửa/ xóa mẫu đã thêm: Chỉnh sửa mẫu: Ở mẫu cần
                    chỉnh sửa, chọn
                  </p>
                  <Image
                    src="/images/figma/image_94.png"
                    width={29}
                    height={26}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    chỉnh sửa thông tin mẫu như Bước 4. Thêm mẫu vào phiếu đăng
                    ký.
                  </p>
                </div>
                <p className="lg:text-base text-xs">
                  Bước 4: Thêm mẫu vào phiếu đăng ký:
                </p>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">
                    Xóa mẫu: Ở mẫu cần chỉnh sửa, chọn
                  </p>
                  <Image
                    src="/images/figma/image_95.png"
                    width={27}
                    height={26}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">để xóa mẫu.</p>
                </div>
                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.3.1.2 Chỉnh sửa phiếu đăng ký
                </h3>
                <p className="lg:text-base text-xs">
                  Bước 1: Vào thanh menu “Đăng ký dịch vụ” và chọn “Thử nghiệm”.
                </p>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">
                    Bước 2: Ở phiếu đăng ký cần chỉnh sửa, chọn
                  </p>
                  <Image
                    src="/images/figma/image_95.png"
                    width={27}
                    height={26}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    và chỉnh sửa phiếu đăng ký tương tự như mục 2.3.1.1. Thêm
                    mới phiếu đăng ký.
                  </p>
                </div>
                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.3.1.3 Xóa phiếu đăng ký
                </h3>
                <p className="lg:text-base text-xs">
                  Bước 1: Vào thanh menu “Đăng ký dịch vụ” à chọn “Thử nghiệm”.
                </p>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">
                    Bước 2: Ở phiếu đăng ký cần xóa, chọn
                  </p>
                  <Image
                    src="/images/figma/image_95.png"
                    width={27}
                    height={26}
                    alt=""
                    className="object-contain"
                  />
                </div>

                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_96.png"
                    width={1140}
                    height={87}
                    alt="Thanh thông báo"
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Bước 3: Chọn</p>
                  <Image
                    src="/images/figma/image_97.png"
                    width={64}
                    height={44}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    ở thông báo xác nhận xóa để xóa phiếu đăng ký.
                  </p>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_98.png"
                    width={400}
                    height={307}
                    alt="Thanh thông báo"
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.3.1.4 Gửi phiếu đăng ký
                </h3>
                <p className="lg:text-base text-xs">
                  Bước 1: Vào thanh menu “Đăng ký dịch vụ” à chọn “Thử nghiệm”.
                </p>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Bước 2: Chọn</p>
                  <Image
                    src="/images/figma/image_97.png"
                    width={64}
                    height={44}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    để xác nhận hoàn thành phiếu đăng ký, phiếu đăng ký sẽ được
                    gửi sang site chính SMEQ.
                  </p>
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">
                    Phiếu đăng ký đã gửi nhưng chưa được tiếp nhận sẽ được cập
                    nhật ở tab
                  </p>
                  <Image
                    src="/images/figma/image_99.png"
                    width={62}
                    height={35}
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">
                    Phiếu đăng ký đã gửi và đã được xác nhận thực hiện thử
                    nghiệm được cập nhật ở tab
                  </p>
                  <Image
                    src="/images/figma/image_100.png"
                    width={104}
                    height={32}
                    alt=""
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">
                    Phiếu đăng ký đã gửi và bị từ chối yêu cầu thử nghiệm sẽ
                    được cập nhật ở tab
                  </p>
                  <Image
                    src="/images/figma/image_101.png"
                    width={71}
                    height={30}
                    alt=""
                    className="object-contain"
                  />
                </div>
                <p className="lg:text-base text-xs">Lưu ý:</p>
                <ul className="list-disc pl-6 space-y-5 text-[16px] font-normal leading-[1.5] text-[#19426D]">
                  <li>
                    Các thông tin sau trên phiếu yêu cầu của khách hàng sẽ được
                    bắt tự động trên biểu mẫu phiếu yêu cầu của SMEQ khi khách
                    hàng hàng gửi qua site chính:
                  </li>
                  <li>Khách hàng</li>
                  <li>Người liên hệ</li>
                  <li>Ngày tạo phiếu</li>
                  <li>Ngày trả kết quả</li>
                  <li>Thông tin mẫu: tên mẫu, số lượng mẫu.</li>
                </ul>

                <div className="flex justify-start gap-10 items-center">
                  <p className="lg:text-base text-xs">Chọn</p>
                  <Image
                    src="/images/figma/image_102.png"
                    width={25}
                    height={21}
                    alt=""
                    className="object-contain"
                  />
                  <p className="lg:text-base text-xs">
                    để download file phiếu đăng ký file word.
                  </p>
                </div>

                <h3 className="font-bold text-[18px] lg:text-[26px] leading-[1.4] tracking-[-0.26px] text-[#19426D]">
                  2.3.2 Hiệu chuẩn, kiểm định
                </h3>
                <p className="lg:text-base text-xs">
                  Thao tác tương tực như mục 2.3.1. Thử nghiệm.
                </p>
              </div>

              <div className="flex flex-col gap-10">
                <h4 className="font-bold text-[32px] leading-[1.3] text-[#19426D]">
                  2.4 Thông tin dịch vụ
                </h4>

                <div className="text-[16px] leading-[1.5] text-[#19426D] space-y-5">
                  <p className="lg:text-base text-xs">
                    Bước 1: Vào thanh menu “Thông tin dịch vụ”.
                  </p>
                  <p className="lg:text-base text-xs">
                    Bước 2: Xem tiến độ thực hiện của các phiếu yêu cầu:
                  </p>
                </div>

                <ul className="list-disc pl-6 space-y-5 text-[16px] leading-[1.5] text-[#19426D]">
                  <li>
                    <div className="flex flex-wrap items-center gap-3">
                      <span>Chọn</span>
                      <Image
                        src="/images/figma/image_103.png"
                        width={45}
                        height={27}
                        alt="Tất cả"
                        className="object-contain"
                      />
                      <span>để xem tất cả các phiếu yêu cầu.</span>
                    </div>
                  </li>

                  <li>
                    <div className="flex flex-wrap items-center gap-3">
                      <span>Chọn</span>
                      <Image
                        src="/images/figma/image_104.png"
                        width={210}
                        height={80}
                        alt="Đang thực hiện"
                        className="object-contain"
                      />
                      <span>
                        để xem các phiếu yêu cầu đang ở giai đoạn từ{" "}
                        <strong>Tạo hợp đồng</strong> đến{" "}
                        <strong>Ký kiểm soát</strong>.
                      </span>
                    </div>
                  </li>

                  <li>
                    <div className="flex flex-wrap items-center gap-3">
                      <span>Chọn</span>
                      <Image
                        src="/images/figma/image_105.png"
                        width={301}
                        height={82}
                        alt="Trình ký"
                        className="object-contain"
                      />
                      <span>
                        để xem các phiếu yêu cầu đang ở giai đoạn{" "}
                        <strong>Ký ban hành</strong>.
                      </span>
                    </div>
                  </li>

                  <li>
                    <div className="flex flex-wrap items-start gap-3">
                      <span className="mt-1">Chọn</span>
                      <Image
                        src="/images/figma/image_106.png"
                        width={64}
                        height={44}
                        alt="Trình ký"
                        className="object-contain"
                      />
                      <span className="flex-1">
                        để xem các phiếu yêu cầu đang ở giai đoạn từ{" "}
                        <strong>Chuyển phiếu</strong> đến{" "}
                        <strong>Thanh toán</strong>. Nếu phiếu kết quả của yêu
                        cầu thử nghiệm hoặc hiệu chuẩn, kiểm định đã được upload
                        file, khách hàng vào mã phiếu yêu cầu để xem và tải file
                        phiếu kết quả.
                      </span>
                    </div>
                  </li>
                </ul>

                <div className="text-[16px] leading-[1.5] text-[#19426D] space-y-2">
                  <p className="lg:text-base text-xs">Lưu ý:</p>
                  <ul className="list-disc pl-6">
                    <li>
                      Phiếu đăng ký được tạo từ site khách hàng sẽ có{" "}
                      <strong>ngày đăng ký</strong>, phiếu đăng ký được tạo từ
                      site chính SMEQ sẽ không có ngày đăng ký.
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <Image
                    src="/images/figma/image_107.png"
                    width={821}
                    height={285}
                    alt="Thanh thông báo"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-20 items-center bg-white rounded-2xl p-6 lg:p-10">
              <div className="relative w-full lg:w-[584px] aspect-[584/623] rounded-xl overflow-hidden shrink-0 bg-gray-200 group cursor-pointer">
                <div className="absolute inset-0">
                  <Image
                    src="/images/figma/Placeholder Lightbox.png"
                    fill
                    alt="Thumbnail"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform transform group-hover:scale-110">
                    <Play className="w-8 h-8 text-black fill-black ml-1" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className="fill-[#0C0800] text-[#0C0800]"
                    />
                  ))}
                </div>

                <h3 className="font-bold text-[32px] lg:text-[40px] leading-tight text-[#0C0800] uppercase">
                  &quot;HT 175 2018.&quot;
                </h3>

                <div className="flex items-center gap-6">
                  <div className="space-y-1 font-source-sans text-[#0C0800]">
                    <p className="font-bold text-[16px]">
                      Câu chuyện kinh doanh HTV9
                    </p>
                    <p className="text-[14px]">7,09 N người đăng ký</p>
                  </div>
                  <div className="w-[1px] h-[40px] bg-[#0C0800]/20"></div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </section>
      <section className="w-full px-6 lg:px-[96px] py-10 bg-[#FADADA]">
        <div className="flex flex-col gap-20">
          <h3 className="font-bold text-[48px] leading-[1.2] tracking-[-0.48px] text-center text-[#0C0800]">
            Cùng chuyên mục
          </h3>
          <RelatedServices />
        </div>
        <div></div>
      </section>
      <section className="w-full px-6 lg:px-[96px] py-10 gap-20">
        <h3 className="font-bold text-[32px] lg:text-[48px] leading-[1.2] tracking-[-0.48px] text-[#0C0800] mb-20">
          Khách hàng
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="relative w-full max-w-[180px] aspect-square flex items-center justify-center group"
            >
              <div className="w-full h-full rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center p-4 hover:shadow-md transition-all duration-300">
                <Image
                  src={`/images/figma/image_khach_${index}.png`}
                  width={156}
                  height={156}
                  alt="Logo khách hàng"
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
