import { Home, Newspaper, Search, Tag } from "lucide-react";

type TFunc = (key: string, options?: Record<string, unknown>) => string;

interface SearchEmptyStateProps {
  query: string;
  t: TFunc;
}

export default function SearchEmptyState({ query, t }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-2 px-4">
      {/* Empty State Box */}
      <div className="border-[3px] border-dashed border-gray-300 rounded-2xl p-8 max-w-6xl w-full ">
        <div className="relative mb-8 flex justify-center">
          <div className="w-28 h-28 relative">
            {/* Animated Rings */}
            <div className="absolute inset-0 rounded-full border-[3px] border-blue-200 opacity-20" />
            <div className="absolute inset-2 rounded-full border-[3px] border-blue-100 opacity-40" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100" />

            {/* Search Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-16 h-16 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-bold text-gray-900">
            {t("noResultsTitle")}
          </h3>
          <p className="text-gray-600 text-base max-w-2xl mx-auto leading-relaxed">
            {t("noResultsDesc")}
          </p>
          <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-full">
            <Tag className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-blue-700 font-semibold text-base">
              &ldquo;{query}&rdquo;
            </span>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="group px-6 py-3 text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-300 font-semibold"
            >
              <span className="flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                {t("goHome")}
              </span>
            </a>
            <a
              href="/news"
              className="group px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 font-semibold"
            >
              <span className="flex items-center justify-center gap-2">
                <Newspaper className="w-5 h-5" />
                {t("viewNews")}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
