"use client";

import { useGetApiV10Post } from "@/api/endpoints/post";
import { Loading } from "@/components/common/loading";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import SearchResults from "./components/search-results";
import type { SearchResult } from "./libs/types";

function SearchContent() {
  const { t } = useTranslation("pages/search");
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data, isLoading } = useGetApiV10Post({
    filters: query
      ? `is_hidden==false , (title|summary)@=${query}`
      : "is_hidden==false",
    pageSize: 50,
  });

  // Hiện tại đang search theo like title và summary nhé
  const results = (data?.responseData?.rows as unknown as SearchResult[]) || [];

  return (
    <SearchResults query={query} results={results} isLoading={isLoading} t={t} />
  );
}

export default function SearchPage() {
  const { t } = useTranslation("pages/search");
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loading text={t("loading")} size="lg" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
