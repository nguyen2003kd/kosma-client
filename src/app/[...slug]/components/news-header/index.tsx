"use client";

import DatePicker from "@/components/common/components/date-picker";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, Newspaper } from "lucide-react";

interface NewsHeaderProps {
  categoryName: string;
  categoryDescription?: string;
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  isLoading: boolean;
}

export default function NewsHeader({
  categoryName,
  categoryDescription,
  date,
  onDateChange,
  viewMode,
  onViewModeChange,
  isLoading,
}: NewsHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
        {/* Left: Title */}
        <div className="flex items-start gap-3">
          <div className="bg-blue-50 p-2.5 rounded-lg mt-0.5">
            <Newspaper className="w-7 h-7 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{categoryName}</h2>
            <p className="text-sm text-gray-500">
              {categoryDescription || "Cập nhật mới nhất"}
            </p>
          </div>
        </div>

        {/* Date Filter + View Toggle */}
        <div className="flex items-center gap-3">
          {/* Date Picker */}
          {!isLoading && <DatePicker date={date} onDateChange={onDateChange} />}

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
            <Button
              onClick={() => onViewModeChange("grid")}
              variant="ghost"
              size="icon"
              className={
                viewMode === "grid"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "hover:bg-gray-100 hover:text-blue-600"
              }
            >
              <LayoutGrid className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onViewModeChange("list")}
              variant="ghost"
              size="icon"
              className={
                viewMode === "list"
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "hover:bg-gray-100 hover:text-blue-600"
              }
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
