"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SolutionSidebarProps {
  onQuoteClick: () => void;
}

export default function SolutionSidebar({ onQuoteClick }: SolutionSidebarProps) {
  const { t } = useTranslation("pages/solutions");

  return (
    <div className="sticky top-6 space-y-5">
      <div
        className="group rounded-[--radius-md] p-5 shadow-soft hover:shadow-strong transition-shadow relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner_service_2.png')" }}
      >
        <div className="absolute inset-0 bg-black-950/70" />

        <div className="absolute top-5 right-6 z-10">
          <Mail className="w-7 h-7 text-white/30 transition-all group-hover:text-white/60" />
        </div>

        <div className="space-y-3 relative z-10">
          <div>
            <h3 className="font-serif text-white text-[18px] mb-1">{t("needSupport")}</h3>
            <p className="text-white/80 text-xs">{t("contactForQuote")}</p>
          </div>
          <Button
            onClick={onQuoteClick}
            className="w-full bg-white text-ink hover:bg-cream font-semibold shadow-button"
            size="default"
          >
            {t("requestQuote")}
          </Button>
        </div>
      </div>
    </div>
  );
}
