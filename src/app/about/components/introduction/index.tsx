"use client";

import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
import { PageConfig } from "@/api/models";
import baseConfig from "@/configs/base";
import { DynamicIcon } from "@/utils/dynamic-icon";
import parse from "html-react-parser";
import { Building2, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type BlockType =
  | "org-header"
  | "branches"
  | "heading"
  | "text-input"
  | "rich-text"
  | "info-row"
  | "card-item"
  | "badge"
  | "image"
  | "divider";

interface BaseBlock {
  id: string;
  type: BlockType;
  hidden?: boolean;
}

interface OrgHeaderBlock extends BaseBlock {
  type: "org-header";
  nameVi1: string;
  nameVi2: string;
  nameEn: string;
  abbreviation: string;
  headquarterAddress: string;
  taxCode: string;
  // English versions
  nameEn1?: string;
  nameEn2?: string;
  abbreviationEn?: string;
  headquarterAddressEn?: string;
}

interface BranchItem {
  id: string;
  name: string;
  address: string;
  phone: string;
  // English versions
  nameEn?: string;
  addressEn?: string;
}

interface BranchesBlock extends BaseBlock {
  type: "branches";
  title: string;
  titleEn?: string;
  items: BranchItem[];
}

interface HeadingBlock extends BaseBlock {
  type: "heading";
  text: string;
  textEn?: string;
  level: "h1" | "h2" | "h3";
}

interface TextInputBlock extends BaseBlock {
  type: "text-input";
  label: string;
  value: string;
  labelEn?: string;
  valueEn?: string;
}

interface RichTextBlock extends BaseBlock {
  type: "rich-text";
  content: string;
  contentEn?: string;
}

interface InfoRowBlock extends BaseBlock {
  type: "info-row";
  icon: string;
  label: string;
  value: string;
  labelEn?: string;
  valueEn?: string;
}

interface CardItemBlock extends BaseBlock {
  type: "card-item";
  title: string;
  subtitle: string;
  body: string;
  titleEn?: string;
  subtitleEn?: string;
  bodyEn?: string;
}

interface BadgeBlock extends BaseBlock {
  type: "badge";
  text: string;
  textEn?: string;
  color: "cyan" | "white" | "yellow" | "green";
}

interface ImageBlock extends BaseBlock {
  type: "image";
  src: string;
  alt: string;
  caption: string;
  altEn?: string;
  captionEn?: string;
}

interface DividerBlock extends BaseBlock {
  type: "divider";
}

type PageBlock =
  | OrgHeaderBlock
  | BranchesBlock
  | HeadingBlock
  | TextInputBlock
  | RichTextBlock
  | InfoRowBlock
  | CardItemBlock
  | BadgeBlock
  | ImageBlock
  | DividerBlock;

// â”€â”€ Constants â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const BADGE_CLS: Record<BadgeBlock["color"], string> = {
  cyan: "bg-cyan-300/20 text-cyan-300 border-cyan-400/30",
  white: "bg-white/10 text-white border-white/20",
  yellow: "bg-yellow-300/20 text-yellow-300 border-yellow-400/30",
  green: "bg-gray-300/20 text-gray-300 border-gray-400/30",
};

// â”€â”€ Fallback â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const FALLBACK_BLOCKS: PageBlock[] = [
  {
    id: "fallback-header",
    type: "org-header",
    nameVi1: "TRUNG TÃ‚M Dá»ŠCH Vá»¤ PHÃ‚N TÃCH THÃ NGHIá»†M",
    nameVi2: "VÃ€ TIÃŠU CHUáº¨N ÄO LÆ¯á»œNG CHáº¤T LÆ¯á»¢NG THÃ€NH PHá» Há»’ CHÃ MINH",
    nameEn:
      "CENTER OF ANALYTICAL SERVICES, EXPERIMENTATION AND STANDARDS, METROLOGY, QUALITY OF HO CHI MINH CITY",
    abbreviation: "CASE-SMQ",
    headquarterAddress:
      "Sá»‘ 2 Nguyá»…n VÄƒn Thá»§, PhÆ°á»ng TÃ¢n Äá»‹nh, ThÃ nh phá»‘ Há»“ ChÃ­ Minh",
    taxCode: "0319238568",
    nameEn1: "ANALYTICAL SERVICES CENTER",
    nameEn2: "EXPERIMENTATION AND STANDARDS, METROLOGY, QUALITY OF HO CHI MINH CITY",
    abbreviationEn: "CASE-SMQ",
    headquarterAddressEn: "No. 2 Nguyen Van Thu, Tan Dinh Ward, Ho Chi Minh City",
  },
  {
    id: "fallback-branches",
    type: "branches",
    title: "Trá»¥ sá»Ÿ / chi nhÃ¡nh / vÄƒn phÃ²ng Ä‘áº¡i diá»‡n",
    titleEn: "Headquarters / Branches / Representative Offices",
    items: [
      {
        id: "1",
        name: "Trá»¥ sá»Ÿ 1",
        address:
          "Sá»‘ 263 Äiá»‡n BiÃªn Phá»§, PhÆ°á»ng XuÃ¢n HÃ²a, ThÃ nh phá»‘ Há»“ ChÃ­ Minh",
        phone: "028 3930 2733 â€“ 3933 3533",
        nameEn: "Headquarters 1",
        addressEn: "No. 263 Dien Bien Phu, Xuan Hoa Ward, Ho Chi Minh City",
      },
      {
        id: "2",
        name: "Trá»¥ sá»Ÿ 3",
        address:
          "Sá»‘ 26 Huá»³nh VÄƒn Nghá»‡, PhÆ°á»ng PhÃº Lá»£i, ThÃ nh phá»‘ Há»“ ChÃ­ Minh",
        phone: "0274 3897 574 â€“ 3883 186",
        nameEn: "Headquarters 3",
        addressEn: "No. 26 Huynh Van Nghe, Phu Loi Ward, Ho Chi Minh City",
      },
      {
        id: "3",
        name: "Trá»¥ sá»Ÿ 4",
        address: "Sá»‘ 379 HÃ  Huy Táº­p, PhÆ°á»ng BÃ  Rá»‹a, ThÃ nh phá»‘ Há»“ ChÃ­ Minh",
        phone: "0254 3717 636",
        nameEn: "Headquarters 4",
        addressEn: "No. 379 Ha Huy Tap, Ba Ria Ward, Ho Chi Minh City",
      },
      {
        id: "4",
        name: "Chi nhÃ¡nh Cáº§n ThÆ¡",
        address:
          "Sá»‘ F2.67-F2.68 Nguyá»…n Thá»‹ SÃ¡u, PhÆ°á»ng HÆ°ng PhÃº, ThÃ nh phá»‘ Cáº§n ThÆ¡",
        phone: "0292. 3918 217 â€“ 3918 218",
        nameEn: "Can Tho Branch",
        addressEn: "No. F2.67-F2.68 Nguyen Thi Sau, Hung Phu Ward, Can Tho City",
      },
      {
        id: "5",
        name: "VP Ä‘áº¡i diá»‡n Miá»n Trung",
        address:
          "Sá»‘ STH 27.18, ÄÆ°á»ng 8E, Khu Ä‘Ã´ Thá»‹ má»›i LÃª Há»“ng Phong II, PhÆ°á»ng Nam Nha Trang, Tá»‰nh KhÃ¡nh HÃ²a",
        phone: "0258. 2465 255 â€“ 2465 355",
        nameEn: "Central Region Representative Office",
        addressEn: "No. STH 27.18, 8E Street, Le Hong Phong II New Urban Area, Nam Nha Trang Ward, Khanh Hoa Province",
      },
    ],
  },
];

// â”€â”€ Helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function parseBlocks(rows: PageConfig[], key: string): PageBlock[] {
  const row = rows.find((r) => r.key === key);
  if (!row?.value) return FALLBACK_BLOCKS;
  try {
    const parsed = JSON.parse(row.value);
    return Array.isArray(parsed) ? (parsed as PageBlock[]) : FALLBACK_BLOCKS;
  } catch {
    return FALLBACK_BLOCKS;
  }
}

// â”€â”€ Block Renderer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function BlockRenderer({ block, t, lang }: { block: PageBlock; t: (key: string) => string; lang: string }) {
  const isEn = lang === "en";

  if (block.hidden) return null;

  switch (block.type) {
    // â”€â”€ org-header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    case "org-header":
      return (
        <div className="text-white space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{isEn ? (block.nameEn1 || block.nameVi1) : block.nameVi1}</h1>
          <h1 className="text-3xl md:text-4xl font-bold">{isEn ? (block.nameEn2 || block.nameVi2) : block.nameVi2}</h1>
          <p className="text-base text-white/90">
            {t("orgNameEnLabel")}{" "}
            <span className="font-semibold">{block.nameEn}</span>
          </p>
          <p className="text-base text-white/90">
            {t("abbreviationLabel")}{" "}
            <span className="font-semibold text-cyan-300">
              {isEn ? (block.abbreviationEn || block.abbreviation) : block.abbreviation}
            </span>
          </p>
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-cyan-300 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-cyan-300">{t("headquartersLabel")}</p>
                <p className="text-white/90">{isEn ? (block.headquarterAddressEn || block.headquarterAddress) : block.headquarterAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-cyan-300 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-cyan-300">{t("taxCodeLabel")}</p>
                <p className="text-white/90">{block.taxCode}</p>
              </div>
            </div>
          </div>
        </div>
      );

    // â”€â”€ branches â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    case "branches":
      return (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            {isEn ? (block.titleEn || block.title) : block.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {block.items.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center gap-2 text-cyan-300">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold">{isEn ? (item.nameEn || item.name) : item.name}</span>
                </div>
                <p className="text-white/90 text-sm">{isEn ? (item.addressEn || item.address) : item.address}</p>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Phone className="w-3 h-3" />
                  <span>{item.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    // â”€â”€ heading â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    case "heading": {
      const cls =
        block.level === "h1"
          ? "text-3xl md:text-4xl font-bold text-white"
          : block.level === "h2"
            ? "text-2xl md:text-3xl font-bold text-white"
            : "text-xl md:text-2xl font-semibold text-white";
      const Tag = block.level;
      return <Tag className={cls}>{isEn ? (block.textEn || block.text) : block.text}</Tag>;
    }

    // â”€â”€ text-input â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    case "text-input":
      return (
        <p className="text-base text-white/90">
          <span className="font-semibold text-cyan-300">{isEn ? (block.labelEn || block.label) : block.label}: </span>
          {isEn ? (block.valueEn || block.value) : block.value}
        </p>
      );

    // â”€â”€ rich-text â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    case "rich-text":
      return (
        <div className="text-white/90 text-base leading-relaxed prose prose-invert max-w-none">
          {parse(isEn ? (block.contentEn || block.content) : block.content)}
        </div>
      );

    // â”€â”€ info-row â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    case "info-row":
      return (
        <div className="flex items-start gap-3">
          <span className="text-cyan-300 mt-0.5 flex-shrink-0">
            <DynamicIcon name={block.icon} className="w-5 h-5" />
          </span>
          <div>
            <p className="font-semibold text-cyan-300">{isEn ? (block.labelEn || block.label) : block.label}:</p>
            <p className="text-white/90">{isEn ? (block.valueEn || block.value) : block.value}</p>
          </div>
        </div>
      );

    // â”€â”€ card-item â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    case "card-item":
      return (
        <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg p-4 space-y-1">
          <p className="font-semibold text-white">{isEn ? (block.titleEn || block.title) : block.title}</p>
          {(isEn ? (block.subtitleEn || block.subtitle) : block.subtitle) && (
            <p className="text-cyan-300 text-sm">{isEn ? (block.subtitleEn || block.subtitle) : block.subtitle}</p>
          )}
          {(isEn ? (block.bodyEn || block.body) : block.body) && (
            <p className="text-white/80 text-sm">{isEn ? (block.bodyEn || block.body) : block.body}</p>
          )}
        </div>
      );

    // â”€â”€ badge â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    case "badge":
      return (
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${BADGE_CLS[block.color] ?? BADGE_CLS.cyan}`}
        >
          {isEn ? (block.textEn || block.text) : block.text}
        </span>
      );

    // â”€â”€ image â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    case "image": {
      if (!block.src) return null;
      const url = block.src.startsWith("http")
        ? block.src
        : `${baseConfig.imgEndpointDomain}${block.src}`;
      return (
        <div className="space-y-2">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={url}
              alt={isEn ? (block.altEn || block.alt) : block.alt || ""}
              fill
              className="object-cover"
            />
          </div>
          {(isEn ? (block.captionEn || block.caption) : block.caption) && (
            <p className="text-white/80 text-xs text-center italic">
              {isEn ? (block.captionEn || block.caption) : block.caption}
            </p>
          )}
        </div>
      );
    }

    // â”€â”€ divider â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    case "divider":
      return <hr className="border-white/20" />;

    default:
      return null;
  }
}

// â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function Introduction() {
  const { t, i18n } = useTranslation("pages/about");
  const lang = i18n.language || "vi";
  const configKey = lang === "en" ? "introduction-page_en" : "introduction-page";

  const { data, isLoading } = useGetApiV10PageConfig(
    { filters: `key==${configKey}`, pageSize: 1 },
    {
      query: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    }
  );

  const blocks = isLoading
    ? FALLBACK_BLOCKS
    : parseBlocks((data?.responseData?.rows as PageConfig[]) ?? [], configKey);

  return (
    <section className="bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] py-16">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
        <div className="mx-4 md:mx-8 lg:mx-10 space-y-10">
          {blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} t={t} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
