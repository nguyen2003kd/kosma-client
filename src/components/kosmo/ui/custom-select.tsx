"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label?: string;
  id?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  className?: string;
}

export function CustomSelect({
  label,
  id,
  required,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  className,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={cn("space-y-1.5 w-full", className)} ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="text-[12px] font-extrabold tracking-[0.04em] text-ink block"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative" style={{ height: "48px", minHeight: "48px" }}>
        {/* Trigger Button */}
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between rounded-[10px] border bg-[#fbfcfb] px-3 text-sm text-ink transition-colors focus:outline-none",
            error
              ? "border-red-500 focus:ring-4 focus:ring-red-500/08"
              : isOpen
                ? "border-black-700 focus:ring-4 focus:ring-black-700/08"
                : "border-mutedLine hover:border-gray-400 focus:border-black-700 focus:ring-4 focus:ring-black-700/08"
          )}
          style={{ height: "48px" }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={cn("truncate text-left flex-1", selectedOption ? "text-ink font-normal" : "text-gray-400")}
            style={{ lineHeight: "1" }}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-2",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-mutedLine rounded-[10px] shadow-lg max-h-60 overflow-y-auto"
            style={{ zIndex: 50 }}
            role="listbox"
          >
            <ul className="py-1.5">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left transition-colors",
                        isSelected
                          ? "text-ink font-semibold"
                          : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                      )}
                      style={isSelected ? { backgroundColor: "#f3f7f5" } : undefined}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span className="flex-1">{option.label}</span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-black-800 flex-shrink-0" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {error && <p className="text-[13px] font-bold text-red-500">{error}</p>}
    </div>
  );
}
