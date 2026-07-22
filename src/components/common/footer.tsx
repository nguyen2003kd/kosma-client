"use client";

import { useGetApiV10Footer } from "@/api/endpoints/footer";
import { useGetApiV10AnalyticsActiveUsers } from "@/api/endpoints/analytics";
import { useGetApiV10Logo } from "@/api/endpoints/logo";
import { Footer as FooterType } from "@/api/models/footer";
import type { FooterLinksItem } from "@/api/models/footerLinksItem";
import { Logo } from "@/api/models/logo";
import { getResponsiveImage } from "@/lib/responsive-image";
import links from "@/lib/links";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface LogoWithFile extends Logo {
  file?: {
    path?: string;
    compress_info?: Record<string, string>;
    name?: string;
  };
}

const Footer = () => {
  const { data } = useGetApiV10Footer({
    filters: "is_active==true",
  });

  const { data: analyticsData } = useGetApiV10AnalyticsActiveUsers(
    { allTime: true },
    { query: { refetchInterval: 60_000 } }
  );

  const { data: logoData, isError: isLogoError } = useGetApiV10Logo({
    filters: "is_active==true",
  });

  const footerData = (data?.responseData?.rows?.[0] as FooterType) || null;
  const logoInfo = logoData?.responseData?.rows?.[0] as LogoWithFile;
  const logoUrl = isLogoError
    ? "/images/service-1.png"
    : logoInfo?.file?.compress_info
      ? getResponsiveImage(logoInfo.file.compress_info)
      : logoInfo?.file?.path
        ? `${links.storageEndpoint}${logoInfo.file.path}`
        : "/images/service-1.png";

  const addresses =
    footerData?.address && footerData.address.length > 0
      ? footerData.address
      : [
          {
            title: "Trụ sở chính",
            location:
              "Số 2 Nguyễn Văn Thủ, Phường Tân Định, Thành phố Hồ Chí Minh",
          },
        ];

  const socialLinks =
    (footerData?.social_links as Record<string, string> | null | undefined) ||
    {};

  const formatViews = (views: string | number | null | undefined): string => {
    if (!views) return "0";
    return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <footer className="w-full bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] text-white font-sans relative overflow-hidden border-t border-white/20">
      {/* Subtle  */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-8 lg:py-10 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-10">
          {/* Logo and Company Info - Takes 4 columns */}
          <div className="lg:col-span-4 space-y-4">
            <div className="w-[150px] h-[60px] relative">
              <Image
                src={logoUrl}
                alt={logoInfo?.name || "Logo"}
                fill
                className="object-contain drop-shadow-md"
              />
            </div>
            <div>
              <h6 className="text-sm font-bold mb-2 leading-relaxed text-white">
                {footerData?.description ||
                  "TRUNG TÂM DỊCH VỤ PHÂN TÍCH THÍ NGHIỆM VÀ TIÊU CHUẨN ĐO LƯỜNG CHẤT LƯỢNG THÀNH PHỐ HỒ CHÍ MINH"}
              </h6>
              {footerData?.sub_description && (
                <p className="text-sm text-white/80 leading-relaxed">
                  {footerData.sub_description}
                </p>
              )}

            </div>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <a
                href={`tel:${footerData?.phone || "18001105"}`}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60 mb-0.5">Điện thoại</p>
                  <p className="text-sm font-medium group-hover:text-white transition-colors">
                    {footerData?.phone || "1800 1105"}
                  </p>
                </div>
              </a>
              <a
                href={`mailto:${footerData?.email || "casehcm@case.vn"}`}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-white/60 mb-0.5">Email</p>
                  <p className="text-sm font-medium break-all group-hover:text-white transition-colors">
                    {footerData?.email || "casehcm@case.vn"}
                  </p>
                </div>
              </a>
            </div>

            {/* Social Links */}
            {Object.keys(socialLinks).length > 0 && (
              <div>
                <p className="text-xs text-white/60 mb-3 uppercase tracking-wider font-medium">
                  Kết nối với chúng tôi
                </p>
                <div className="grid grid-cols-4 gap-2.5 max-w-[180px]">
                  {socialLinks?.facebook && (
                    <Link
                      href={socialLinks.facebook as string}
                      aria-label="Facebook"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/10 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Facebook className="w-4 h-4" />
                    </Link>
                  )}
                  {socialLinks?.instagram && (
                    <Link
                      href={socialLinks.instagram as string}
                      aria-label="Instagram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/10 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Instagram className="w-4 h-4" />
                    </Link>
                  )}
                  {socialLinks?.twitter && (
                    <Link
                      href={socialLinks.twitter as string}
                      aria-label="Twitter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/10 hover:bg-sky-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Twitter className="w-4 h-4" />
                    </Link>
                  )}
                  {socialLinks?.linkedin && (
                    <Link
                      href={socialLinks.linkedin as string}
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Link>
                  )}
                  {socialLinks?.youtube && (
                    <Link
                      href={socialLinks.youtube as string}
                      aria-label="Youtube"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/10 hover:bg-red-500 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    >
                      <Youtube className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Addresses  */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-white/80 rounded-full"></div>
              <h4 className="text-base font-bold">Địa chỉ</h4>
            </div>
            <div
              className={`grid grid-cols-1 gap-5 ${
                addresses.length >= 4
                  ? "md:grid-cols-2"
                  : addresses.length === 3
                    ? "md:grid-cols-3"
                    : "md:grid-cols-1"
              }`}
            >
              {addresses.map((addr, index) => (
                <div key={index} className="text-sm group">
                  <p className="font-semibold mb-1.5 text-white group-hover:text-white/95 transition-colors">
                    {addr.title}
                  </p>
                  <p className="text-white/75 leading-relaxed group-hover:text-white/90 transition-colors">
                    {addr.location}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links  */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-5 bg-white/80 rounded-full"></div>
              <h4 className="text-base font-bold">Liên kết</h4>
            </div>
            <nav className="grid grid-cols-1 gap-x-4 gap-y-2.5 text-sm mb-6 max-w-xs">
              {(footerData?.links as FooterLinksItem[] | null | undefined)?.map(
                (link, idx) => (
                  <a
                    key={idx}
                    href={(link.link as string) || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/85 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white group-hover:scale-125 transition-all"></span>
                    {link.title as string}
                  </a>
                )
              )}
              {(!footerData?.links || (footerData.links as FooterLinksItem[]).length === 0) && (
                <>
                  <a
                    href="https://dost.hochiminhcity.gov.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/85 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white group-hover:scale-125 transition-all"></span>
                    Sở Khoa học và Công nghệ Thành phố Hồ Chí Minh
                  </a>
                  <a
                    href="https://chicuctdc.gov.vn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/85 hover:text-white hover:translate-x-1 transition-all group"
                  >
                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full group-hover:bg-white group-hover:scale-125 transition-all"></span>
                    Chi Cục Tiêu chuẩn Đo lường Chất lượng Thành phố Hồ Chí Minh
                  </a>
                </>
              )}
            </nav>

            {/* Statistics */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 space-y-3">
              <div className="text-center pb-2.5 border-b border-white/10">
                <div className="text-xs text-white/60 mb-1.5 uppercase tracking-wider">
                  Đang truy cập
                </div>
                <div className="text-3xl font-bold text-white">
                  {analyticsData?.responseData?.activeUsers ?? footerData?.online_visitors ?? 888}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/60 mb-1.5 uppercase tracking-wider">
                  Tổng lượt xem
                </div>
                <div className="text-3xl font-bold text-white">
                  {formatViews(analyticsData?.responseData?.totalPageViews ?? footerData?.total_views ?? "8888888")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
