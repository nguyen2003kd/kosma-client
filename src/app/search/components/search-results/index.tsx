import { Loading } from "@/components/common/loading";
import type { SearchResult } from "../../libs/types";
import SearchEmptyState from "./components/search-empty-state";
import SearchResultItem from "./components/search-result-item";

type TFunc = (key: string, options?: Record<string, unknown>) => string;

interface SearchResultsProps {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  t: TFunc;
}

export default function SearchResults({
  query,
  results,
  isLoading,
  t,
}: SearchResultsProps) {
  const totalResults = results.length;

  return (
    <div className="min-h-screen bg-white relative">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {t("keyword")}: {query}
          </h1>
          <p className="text-gray-600">{t("resultsCount", { count: totalResults })}</p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loading text={t("loadingResults")} size="lg" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && results.length === 0 && (
          <SearchEmptyState query={query} t={t} />
        )}

        {/* Results */}
        {!isLoading && results.length > 0 && (
          <div className="space-y-6">
            {results.map((result) => (
              <SearchResultItem key={result.id} result={result} t={t} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
