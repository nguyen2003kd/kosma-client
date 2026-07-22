"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface ContentFiltersProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function ContentFilters({
  date,
  onDateChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: ContentFiltersProps) {
  return (
    <div className="rounded-lg p-4 mb-6">
      {/* Category Tabs */}
      {categories.length > 0 && (
        <Tabs
          value={selectedCategory || "all"}
          onValueChange={(value) =>
            onCategoryChange(value === "all" ? "" : value)
          }
          className="w-full mb-10"
        >
          <TabsList
            className={`grid w-full h-auto`}
            style={{
              gridTemplateColumns: `repeat(${
                categories.length + 1
              }, minmax(0, 1fr))`,
            }}
          >
            <TabsTrigger
              value="all"
              className="text-xs px-1 py-2 whitespace-normal h-auto min-h-[2.5rem]"
            >
              Tất cả
            </TabsTrigger>
            {categories.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="text-xs px-1 py-2 whitespace-normal h-auto min-h-[2.5rem]"
              >
                {cat.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "dd/MM/yyyy", { locale: vi })
              ) : (
                <span>Chọn ngày</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              locale={vi}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
