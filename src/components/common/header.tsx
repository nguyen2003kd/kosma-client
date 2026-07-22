"use client";
import { useGetApiV10Logo } from "@/api/endpoints/logo";
import { useGetApiV10Category } from "@/api/endpoints/category";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import "@/i18n";
import { cn } from "@/lib/utils";
import useAuthStore from "@/stores/auth-store";
import type { NavItem } from "@/types";
import type { MenuItem as MenuItemType } from "@/types/menu";
import { LanguageSwitcher } from "@components/common/components/language-switcher";
import { MenuItem } from "@components/common/components/menu-item";
import { UserNav } from "@components/common/user-nav";
import { Skeleton } from "@components/ui/skeleton";
import { cva } from "class-variance-authority";
import links from "@/lib/links";
import type { Logo } from "@/api/models/logo";
import { getResponsiveImage } from "@/lib/responsive-image";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  FileText,
  Headphones,
  Menu,
  Phone,
  Search,
  User,
  UserPen,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
interface HeaderProps {
  navItems?: NavItem[];
  className?: string;
}

type HeaderMenuItem = MenuItemType & {
  useCategoryQuery?: boolean;
  children?: HeaderMenuItem[];
  categories?: HeaderMenuItem[];
};
interface LogoWithFile extends Logo {
  file?: {
    path?: string;
    compress_info?: Record<string, string>;
    name?: string;
  };
}

const withCategoryQueryMode = (
  items: HeaderMenuItem[],
  enabled: boolean,
): HeaderMenuItem[] => {
  return items.map((item) => {
    const rawChildren = item.children || item.categories || [];
    return {
      ...item,
      useCategoryQuery: enabled,
      children: withCategoryQueryMode(rawChildren, enabled),
    };
  });
};
export const headerRoot = cva("header-base", {
  variants: {
    variant: {
      default: "bg-white shadow-sm",
      // customer: 'header-sticky border-accent border-b bg-cover bg-center',
      // admin: 'header-sticky border-accent border-b',
      // auth: 'bg-header-primary'
    },
    scrolled: {
      true: "bg-white bg-cover bg-center shadow-md transition-all duration-300",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      scrolled: true,
      className: "bg-cover bg-center shadow-md transition-all duration-300",
    },
    {
      variant: "default",
      scrolled: false,
      className:
        " bg-white relative w-full overflow-visible transition-all duration-300",
    },
  ],
  defaultVariants: {
    variant: "default",
    scrolled: false,
  },
});

export default function Header({ navItems = [], className }: HeaderProps) {
  const { t } = useTranslation("header");
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { ref: navRef, isDragging } = useDragScroll<HTMLElement>();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isContentSettled, setIsContentSettled] = useState(false);

  // Delay content centering after scroll
  useEffect(() => {
    if (isScrolled) {
      const timer = setTimeout(() => setIsContentSettled(true), 300);
      return () => clearTimeout(timer);
    } else {
      setIsContentSettled(false);
    }
  }, [isScrolled]);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Handle mouse wheel scroll with smooth animation
  const handleWheel = (e: WheelEvent) => {
    if (navRef.current && !isDragging) {
      e.preventDefault();
      const scrollAmount = e.deltaY * 0.8; // Smooth multiplier
      navRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const { data: logoData } = useGetApiV10Logo({
    filters: "is_active==true",
  });

  const logoInfo = logoData?.responseData?.rows?.[0] as LogoWithFile;
  const logoUrl = logoInfo?.file?.compress_info
    ? getResponsiveImage(logoInfo.file.compress_info)
    : logoInfo?.file?.path
      ? `${links.storageEndpoint}${logoInfo.file.path}`
      : "/images/service-1.png";

  // Smooth scroll navigation
  const scrollMenu = (direction: "left" | "right") => {
    if (navRef.current) {
      const scrollAmount = 200;
      navRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Fetch categories from API with current language
  const { i18n } = useTranslation();
  const currentLang = (i18n.language || "vi").startsWith("en") ? "en" : "vi";
  const { data: categoriesData } = useGetApiV10Category(
    { language: currentLang },
    {
    query: {
      staleTime: 1000 * 30,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    },
    },
  );

  // Auth state
  const { email, first_name, last_name } = useAuthStore();
  const isAuthenticated = !!email;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const defaultNavItems: NavItem[] = [
    {
      id: "1",
      name: "Trang chủ",
      type: "",
      content_type: "",
      link: "/",
      sequence: 1,
      display: true,
      parent_id: null,
    },
    {
      id: "2",
      name: "Giới thiệu",
      type: "",
      content_type: "",
      link: "/about",
      sequence: 2,
      display: true,
      parent_id: null,
      children: [
        {
          id: "2-1",
          name: "Tổng quan",
          type: "",
          content_type: "",
          link: "/about/overview",
          sequence: 1,
          display: true,
          parent_id: "2",
          children: [
            {
              id: "2-1-1",
              name: "Lịch sử hình thành",
              type: "",
              content_type: "",
              link: "/about/overview/history",
              sequence: 1,
              display: true,
              parent_id: "2-1",
            },
            {
              id: "2-1-2",
              name: "Cơ cấu tổ chức",
              type: "",
              content_type: "",
              link: "/about/overview/organization",
              sequence: 2,
              display: true,
              parent_id: "2-1",
            },
          ],
        },
        {
          id: "2-2",
          name: "Tầm nhìn & Sứ mệnh",
          type: "",
          content_type: "",
          link: "/about/vision-mission",
          sequence: 2,
          display: true,
          parent_id: "2",
          children: [
            {
              id: "2-2-1",
              name: "Giá trị cốt lõi",
              type: "",
              content_type: "",
              link: "/about/vision-mission/core-values",
              sequence: 1,
              display: true,
              parent_id: "2-2",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "Dịch vụ",
      type: "",
      content_type: "",
      link: "/services",
      sequence: 3,
      display: true,
      parent_id: null,
      children: [
        {
          id: "3-1",
          name: "Tư vấn pháp lý",
          type: "",
          content_type: "",
          link: "/services/legal-consulting",
          sequence: 1,
          display: true,
          parent_id: "3",
          children: [
            {
              id: "3-1-1",
              name: "Doanh nghiệp vừa và nhỏ",
              type: "",
              content_type: "",
              link: "/services/legal-consulting/sme",
              sequence: 1,
              display: true,
              parent_id: "3-1",
            },
            {
              id: "3-1-2",
              name: "Khởi nghiệp",
              type: "",
              content_type: "",
              link: "/services/legal-consulting/startup",
              sequence: 2,
              display: true,
              parent_id: "3-1",
            },
          ],
        },
        {
          id: "3-2",
          name: "Hỗ trợ tài chính",
          type: "",
          content_type: "",
          link: "/services/financial-support",
          sequence: 2,
          display: true,
          parent_id: "3",
          children: [
            {
              id: "3-2-1",
              name: "Vốn vay ưu đãi",
              type: "",
              content_type: "",
              link: "/services/financial-support/loans",
              sequence: 1,
              display: true,
              parent_id: "3-2",
            },
            {
              id: "3-2-2",
              name: "Quỹ đầu tư",
              type: "",
              content_type: "",
              link: "/services/financial-support/funds",
              sequence: 2,
              display: true,
              parent_id: "3-2",
            },
          ],
        },
      ],
    },
    {
      id: "4",
      name: "Tin tức",
      type: "",
      content_type: "",
      link: "/news",
      sequence: 4,
      display: true,
      parent_id: null,
      children: [
        {
          id: "4-1",
          name: "Tin SME",
          type: "",
          content_type: "",
          link: "/news/sme",
          sequence: 1,
          display: true,
          parent_id: "4",
          children: [
            {
              id: "4-1-1",
              name: "Hoạt động nổi bật",
              type: "",
              content_type: "",
              link: "/news/sme/activities",
              sequence: 1,
              display: true,
              parent_id: "4-1",
            },
          ],
        },
      ],
    },
    {
      id: "7",
      name: "Liên hệ",
      type: "",
      content_type: "",
      link: "/contact",
      sequence: 7,
      display: true,
      parent_id: null,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const contactItem: MenuItemType = {
    id: "contact",
    name: t("contact"),
    type: "",
    content_type: "",
    link: "/contact",
    sequence: 999,
    display: true,
    parent_id: null,
  };

  const aboutItem: HeaderMenuItem = {
    id: "about",
    name: t("menu:about"),
    type: "",
    content_type: "",
    link: "/about",
    sequence: 2,
    display: true,
    parent_id: null,
    children: [
      {
        id: "about-overview",
        name: t("aboutOverview"),
        type: "",
        content_type: "",
        link: "/about",
        sequence: 1,
        display: true,
        parent_id: "about",
      },
      {
        id: "functions-responsibilities",
        name: t("functionsResponsibilities"),
        type: "",
        content_type: "",
        link: "/about",
        sequence: 2,
        display: true,
        parent_id: "about",
      },
      {
        id: "about-organizational-chart",
        name: t("organizationalChart"),
        type: "",
        content_type: "",
        link: "/about/organizational-chart",
        sequence: 3,
        display: true,
        parent_id: "about",
      },
      {
        id: "history-development",
        name: t("historyDevelopment"),
        type: "",
        content_type: "",
        link: "/about",
        sequence: 4,
        display: true,
        parent_id: "about",
      },
      {
        id: "branches-offices",
        name: t("branchesOffices"),
        type: "",
        content_type: "",
        link: "/about",
        sequence: 5,
        display: true,
        parent_id: "about",
      },
    ],
  };

  const baseNavigation: HeaderMenuItem[] = categoriesData?.responseData?.length
    ? withCategoryQueryMode(
        categoriesData.responseData as unknown as HeaderMenuItem[],
        true,
      )
    : withCategoryQueryMode(
        (navItems.length > 0 ? navItems : defaultNavItems) as HeaderMenuItem[],
        false,
      );

  // Inject "Chứng nhận" vào children của "Năng lực" (TẠM THỜI ẨN)
  // TODO: Uncomment khi cần hiển thị certification
  /*
  const navigationWithCertification = baseNavigation.map((item) => {
    const itemWithChildren = item as HeaderMenuItem;
    // Kiểm tra nếu là category "Năng lực" (theo link hoặc name)
    if (
      itemWithChildren.link?.includes("/nang-luc") ||
      itemWithChildren.name?.toLowerCase().includes("năng lực")
    ) {
      const hasCertification = (itemWithChildren.children || []).some(
        (child) => child.link === "/certification"
      );
      if (!hasCertification) {
        return {
          ...itemWithChildren,
          children: [
            ...(itemWithChildren.children || []),
            {
              id: "certification",
              name: "Chứng nhận, công nhận, chỉ định",
              link: "/certification",
              type: "",
              content_type: "",
              sequence: 999,
              display: true,
              parent_id: itemWithChildren.id,
              useCategoryQuery: false,
            },
          ],
        };
      }
    }
    return itemWithChildren;
  });

  const navigation = navigationWithCertification;
  */
  const navigation = baseNavigation;

  const filteredNavigation = navigation.filter(
    (item) => item.link !== "/contact" && item.link !== "/about",
  );

  const finalNav = [
    ...(filteredNavigation[0] ? [filteredNavigation[0]] : []),
    aboutItem,
    ...filteredNavigation.slice(1),
    contactItem,
  ];

  // Check scroll arrows visibility
  useEffect(() => {
    const nav = navRef.current;
    if (nav) {
      checkScrollPosition();
      nav.addEventListener("scroll", checkScrollPosition);
      nav.addEventListener("wheel", handleWheel as EventListener, {
        passive: false,
      });
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        nav.removeEventListener("scroll", checkScrollPosition);
        nav.removeEventListener("wheel", handleWheel as EventListener);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, [navigation, isDragging,checkScrollPosition, handleWheel, navRef]);

  return (
    <div className="h-[84px] md:h-[120px] lg:h-[148px]">
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          className,
        )}
      >
        {/* Top Header - ẩn khi cuộn xuống nhé*/}
        <div
          className={cn(
            "bg-[#283B80] text-white overflow-hidden",
            isScrolled
              ? "h-0 transition-all duration-500 ease-in-out"
              : "h-12 transition-all duration-300 ease-in-out",
          )}
        >
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-24">
            <div className="flex items-center justify-between h-12">
              {/* Left side  */}
              <a
                href="tel:18001105"
                className="flex md:hidden items-center gap-1.5 text-[13px] hover:text-blue-200 transition-colors"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span className="font-semibold tracking-wide">
                  {t("hotline")}: 1800 1105
                </span>
              </a>
              <div className="hidden md:flex items-center gap-2 lg:gap-3 text-xs lg:text-sm">
                <Link
                  href="/contact"
                  className="hover:text-blue-200 transition-colors flex items-center gap-1.5 lg:gap-2"
                >
                  <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span>{t("contact")}</span>
                </Link>
                <div className="h-3 w-px bg-white/30"></div>
                <Link
                  href="/careers"
                  className="hover:text-blue-200 transition-colors flex items-center gap-1.5 lg:gap-2"
                >
                  <Briefcase className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span>{t("careers")}</span>
                </Link>
                <div className="h-3 w-px bg-white/30"></div>
                <Link
                  href="/work-schedule"
                  className="hover:text-blue-200 transition-colors flex items-center gap-1.5 lg:gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span>{t("workSchedule")}</span>
                </Link>
                <div className="h-3 w-px bg-white/30"></div>
                <a
                  href="tel:18001105"
                  className="flex items-center gap-1.5 lg:gap-2 hover:text-blue-200 transition-colors"
                >
                  <Headphones className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                  <span className="font-semibold">{t("hotline")}: 1800 1105</span>
                </a>
              </div>

              {/* Right side - Search, Language, Auth */}
              <div className="flex items-center gap-2 lg:gap-3 md:ml-0">
                {/* Search */}
                <form onSubmit={handleSearch} className="hidden lg:block">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("search")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-64 pl-4 pr-10 py-1.5 text-sm bg-white/10  rounded-full text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-sm"
                    >
                      <Search className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </form>

                {/* Language */}
                <div className="hidden md:block">
                  <LanguageSwitcher />
                </div>

                {/* Separator */}

                <div className="hidden md:block h-4 w-px bg-white/30"></div>

                {/* Auth Section */}
                {!isMounted ? (
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Skeleton className="h-7 w-20 md:h-8 md:w-28 bg-white/20 rounded-full" />
                  </div>
                ) : isAuthenticated ? (
                  <div className="flex items-center gap-2">
                    <span className="md:hidden text-xs font-medium">
                      {t("hi")}{" "}
                      <span className="font-semibold">
                        {first_name || t("user")}!
                      </span>
                    </span>
                    {/* Quotation Button */}
                    <Link
                      href="/quotation"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all"
                    >
                      <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="text-xs md:text-sm font-medium">
                        {t("quotation")}
                      </span>
                    </Link>
                    {/* Avatar  */}
                    <div className="scale-[0.85] md:scale-90">
                      <UserNav
                        user={{
                          name:
                            `${first_name || ""} ${last_name || ""}`.trim() ||
                            email ||
                            t("user"),
                          email: email || "",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Link
                      href="/login"
                      className="flex items-center gap-1 md:gap-2 pl-1.5 pr-2.5 md:pr-4 py-1 md:py-1 bg-white/10 hover:bg-white/20 rounded-full transition-all min-w-[85px] md:min-w-0"
                    >
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                      <span className="text-xs md:text-sm font-medium">
                        {t("login")}
                      </span>
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center gap-1 md:gap-2 pl-1.5 pr-2.5 md:pr-4 py-1 md:py-1 bg-white/10 hover:bg-white/20 rounded-full transition-all min-w-[75px] md:min-w-0"
                    >
                      <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/20 flex items-center justify-center">
                        <UserPen className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                      <span className="text-xs md:text-sm font-medium">
                        {t("register")}
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Header  */}
        <div
          className={cn(
            "bg-white border-b border-gray-200 overflow-hidden",
            isScrolled
              ? "py-2.5 shadow-[0_4px_12px_0_rgba(0,0,0,0.35)] transition-all duration-300 ease-in-out delay-200"
              : "py-3 md:py-4 lg:py-6 shadow-sm transition-all duration-200 ease-in-out",
          )}
        >
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 md:px-10 lg:px-16 xl:px-24">
            <div
              className={cn(
                "relative flex flex-row justify-between transition-all duration-500 ease-in-out",
                isScrolled
                  ? isContentSettled
                    ? "items-center translate-y-0"
                    : "items-end translate-y-2"
                  : "items-center translate-y-0",
              )}
            >
              {/* Logo */}
              <div className="flex-shrink-0 z-10">
                <Link
                  href="/"
                  className="flex items-center h-12 overflow-visible"
                >
                  <div
                    className={cn(
                      "relative w-28 sm:w-32 md:w-40 lg:w-44 h-10 sm:h-12 md:h-13 lg:h-14 -my-1 origin-left transition-all ease-in-out",
                      isScrolled
                        ? "scale-90 duration-500 delay-300 drop-shadow-md"
                        : "scale-100 duration-300 drop-shadow-none",
                    )}
                  >
                    <Image
                      src={logoUrl}
                      alt={logoInfo?.name || "Techport Logo"}
                      fill
                      className="object-contain object-left"
                      priority
                    />
                  </div>
                </Link>
              </div>

              {/* Navigation Menu - Desktop */}
              <div className="hidden lg:flex items-center flex-1 min-w-0 justify-start ml-12 relative group">
                {/* Left Arrow */}
                {showLeftArrow && (
                  <button
                    onClick={() => scrollMenu("left")}
                    className="absolute left-0 z-30 p-2 bg-gradient-to-r from-white via-white to-transparent hover:from-blue-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Scroll left"
                  >
                    <ChevronDown className="w-5 h-5 text-blue-600 rotate-90" />
                  </button>
                )}

                <nav
                  ref={navRef}
                  className={cn(
                    "flex items-center justify-start gap-0.5 transition-all duration-500 ease-out overflow-x-auto scrollbar-hide py-2 px-4",
                    "select-none scroll-smooth",
                    "hover:shadow-inner hover:bg-gradient-to-r hover:from-blue-50/30 hover:via-transparent hover:to-blue-50/30",
                    isDragging ? "cursor-grabbing" : "cursor-grab",
                  )}
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {finalNav.map((item) => (
                    <MenuItem
                      variant="main"
                      key={item.id}
                      menu={item}
                      active={pathname === item.link}
                    />
                  ))}
                </nav>

                {/* Right Arrow */}
                {showRightArrow && (
                  <button
                    onClick={() => scrollMenu("right")}
                    className="absolute right-0 z-30 p-2 bg-gradient-to-l from-white via-white to-transparent hover:from-blue-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Scroll right"
                  >
                    <ChevronDown className="w-5 h-5 text-blue-600 -rotate-90" />
                  </button>
                )}
              </div>

              {/* Mobile & Tablet menu button */}
              <div className="lg:hidden flex items-center gap-2">
                {/* Language Switcher - Only on mobile */}
                <div className="md:hidden p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors border border-gray-300 scale-90">
                  <LanguageSwitcher />
                </div>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            {/* Mobile Search */}
            <form
              onSubmit={handleSearch}
              className="px-4 py-3 border-b border-gray-200"
            >
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 overflow-hidden bg-white">
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  <Search className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="px-2 pt-2 pb-3 space-y-1">
              {finalNav.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  {item.badge && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}

              {/* Mobile Auth Section with Skeleton Loading */}
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                {!isMounted ? (
                  <>
                    <Skeleton className="h-14 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </>
                ) : isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 bg-gray-50 rounded-md">
                      <p className="text-sm font-medium text-gray-900">
                        {`${first_name || ""} ${last_name || ""}`.trim() ||
                          email ||
                          t("user")}
                      </p>
                      <p className="text-xs text-gray-500">{email}</p>
                    </div>
                    <Link
                      href="/quotation"
                      className="flex items-center justify-center gap-2 px-3 py-2.5 text-white bg-blue-600 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FileText className="w-4 h-4" />
                      {t("quotation")}
                    </Link>
                    <Link
                      href="/user"
                      className="block px-3 py-2 text-center text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("profile")}
                    </Link>

                    
                  </>
                  
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2 text-center text-blue-600 border border-blue-600 rounded-md font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("login")}
                    </Link>
                    <Link
                      href="/register"
                      className="block px-3 py-2 text-center text-white bg-blue-600 rounded-md font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t("register")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
