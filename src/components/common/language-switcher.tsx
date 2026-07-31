"use client";

import "@/i18n";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [currentLang, setCurrentLang] = useState("vi");

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("i18nextLng") || "vi";
    setCurrentLang(stored);

    if (i18n.language !== stored) {
      i18n.changeLanguage(stored);
    }
  }, [i18n]);

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng);
    };
    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [i18n]);

  const handleLanguageChange = () => {
    const newLanguage = currentLang === "vi" ? "en" : "vi";
    i18n.changeLanguage(newLanguage);
  };

  if (!mounted) {
    return (
      <button
        className="relative flex items-center w-16 h-8 bg-white/10 hover:bg-white/20 rounded-full p-0.5 transition-all duration-300"
        aria-label="Toggle Language"
      >
        <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
          <div className="w-6 h-6 rounded-full overflow-hidden opacity-30">
            <Image
              src="/images/lang-vn.png"
              alt="VI"
              width={24}
              height={24}
              className="object-cover"
            />
          </div>
          <div className="w-6 h-6 rounded-full overflow-hidden opacity-30">
            <Image
              src="/images/lang-en.png"
              alt="EN"
              width={24}
              height={24}
              className="object-cover"
            />
          </div>
        </div>
        <div className="relative z-10 w-7 h-7 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <Image
              src="/images/lang-vn.png"
              alt="VI"
              width={24}
              height={24}
              className="object-cover"
            />
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleLanguageChange}
      className="relative flex items-center w-16 h-8 bg-white/10 hover:bg-white/20 rounded-full p-0.5 transition-all duration-300"
      aria-label="Toggle Language"
    >
      {/* Background inactive flag */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
        <div
          className={cn(
            "w-6 h-6 rounded-full overflow-hidden transition-opacity duration-300",
            currentLang === "vi" ? "opacity-0" : "opacity-30",
          )}
        >
          <Image
            src="/images/lang-vn.png"
            alt="VI"
            width={24}
            height={24}
            className="object-cover"
          />
        </div>
        <div
          className={cn(
            "w-6 h-6 rounded-full overflow-hidden transition-opacity duration-300",
            currentLang === "en" ? "opacity-0" : "opacity-30",
          )}
        >
          <Image
            src="/images/lang-en.png"
            alt="EN"
            width={24}
            height={24}
            className="object-cover"
          />
        </div>
      </div>

      {/* Sliding button with active flag */}
      <div
        className={cn(
          "relative z-10 w-7 h-7 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center",
          currentLang === "en" ? "translate-x-8" : "translate-x-0",
        )}
      >
        <div className="w-6 h-6 rounded-full overflow-hidden">
          <Image
            src={
              currentLang === "vi"
                ? "/images/lang-vn.png"
                : "/images/lang-en.png"
            }
            alt={currentLang === "vi" ? "Tiếng Việt" : "English"}
            width={24}
            height={24}
            className="object-cover"
          />
        </div>
      </div>
    </button>
  );
}
