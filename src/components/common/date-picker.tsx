"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, X } from "lucide-react";

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export default function DatePicker({ date, onDateChange }: DatePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-11 px-4 justify-start text-left font-medium border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md rounded-xl bg-white"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 transition-colors">
                <CalendarIcon className="h-4 w-4 text-blue-600" />
              </div>
              {date ? (
                <span className="text-sm font-semibold text-gray-800">
                  {format(date, "dd/MM/yyyy", { locale: vi })}
                </span>
              ) : (
                <span className="text-sm text-gray-500">Chọn ngày</span>
              )}
            </div>
            {date && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onDateChange(undefined);
                }}
                className="ml-2 hover:bg-red-100 rounded-full p-1 transition-colors"
              >
                <X className="h-4 w-4 text-red-500" />
              </div>
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
  );
}
