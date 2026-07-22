"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface QuotationPopupTriggerProps {
  onClick: () => void;
}

export default function QuotationPopupTrigger({
  onClick,
}: QuotationPopupTriggerProps) {
  const [mounted, setMounted] = useState(false);
  const { t, ready } = useTranslation("pages/quotation-form");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !ready) return null;

  return (
    <Button
      onClick={onClick}
      className="fixed bottom-20 right-3 h-[52px] w-[52px] rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all hover:scale-105 z-50 border-2 border-blue-400 hover:border-blue-300 p-0"
      aria-label={t("requestQuote")}
    >
      <MessageSquare className="h-5 w-5" />
    </Button>
  );
}
