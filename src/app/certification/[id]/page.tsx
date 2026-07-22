"use client";

import { useGetApiV10PageConfig } from "@/api/endpoints/page-config";
// import baseConfig from "@/configs/base";
import { ArrowLeft, Loader2 } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { ChevronRight as BreadcrumbArrow } from "lucide-react";
interface CertificationDataItem {
  id: string;
  img: string;
  "describe-img": string;
  content: string;
}

interface CertificationConfig {
  title: string;
  describe: string;
  data: CertificationDataItem[];
}

const PAGE_CONFIG_KEY = "certification-config";

export default function CertificationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [config, setConfig] = useState<CertificationConfig | null>(null);
  const [ready, setReady] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { data, isLoading } = useGetApiV10PageConfig({
    filters: `key==${PAGE_CONFIG_KEY}`,
    pageSize: 1,
  });

  useEffect(() => {
    if (data?.responseData?.rows && data.responseData.rows.length > 0) {
      const row = data.responseData.rows[0] as unknown as Record<
        string,
        unknown
      >;
      try {
        const parsed = JSON.parse(
          String(row.value || "{}"),
        ) as CertificationConfig;
        setConfig(parsed);
      } catch {
        setConfig(null);
      }
    }
    setReady(true);
  }, [data]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const item = config?.data.find((d) => d.id === params.id);

  if (isLoading || !ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400">
        <p className="text-lg">Không tìm thấy chứng nhận.</p>
        <Link
          href="/certification"
          className="mt-4 text-blue-600 hover:underline"
        >
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  // const getImageUrl = (path: string) => {
  //   if (!path) return "";
  //   return path.startsWith("http")
  //     ? path
  //     : `${baseConfig.imgEndpointDomain}${path}`;
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <section
        className="bg-[#0C2449] py-12 border-t border-gray-600"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
          Năng lực
          </h1>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
            <nav>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                <Link href="/" className="hover:text-white transition-colors">
                  Trang chủ
                </Link>
                <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
                <Link
                  href="/certification"
                  className="hover:text-white transition-colors"
                >
                  Chứng nhận, công nhận, chỉ định
                </Link>
                <BreadcrumbArrow className="w-4 h-4 text-gray-400" />
                <span className="text-white font-medium truncate">
                  {item["describe-img"]}
                </span>
              </div>
            </nav>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-full mx-auto px-6 py-12">
        <article className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Framed Certificate Image */}
          {/* <div className="bg-slate-50 border-b border-slate-100 p-8 md:p-12 flex justify-center items-center">
            {item.img ? (
              <div className="relative w-full max-w-2xl bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-slate-200/60 aspect-[4/3] md:aspect-[1.414/1] overflow-hidden">
                <div className="relative w-full h-full border-2 border-slate-100 rounded-lg overflow-hidden bg-white">
                  <Image
                    src={getImageUrl(item.img)}
                    alt={item["describe-img"]}
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>
              </div>
            ) : (
              <div className="w-full h-64 flex items-center justify-center text-gray-300">
                <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div> */}

          {/* Text content */}
          <div className="p-8 md:p-12">
            {/* Title / Describe */}
            {/* <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-4">
              Thông tin chứng nhận
            </span> */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
              {item["describe-img"]}
            </h1>

            {/* Content */}
            {item.content ? (
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base md:text-lg">
                {isClient ? parse(item.content) : null}
              </div>
            ) : (
              <p className="text-slate-400 italic">
                Chưa có nội dung chi tiết.
              </p>
            )}
          </div>
        </article>

        {/* Back button */}
        <div className="mt-8 text-center">
          <Link
            href="/certification"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0C2449] hover:bg-[#1a3a5c] text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            Quay lại danh sách
          </Link>
        </div>
      </section>
    </div>
  );
}
