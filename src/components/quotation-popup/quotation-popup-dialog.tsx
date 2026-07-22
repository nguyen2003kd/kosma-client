"use client";

import QuotationPopupForm from "@/components/quotation-popup/quotation-popup-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface QuotationPopupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultServiceId?: string;
}

export default function QuotationPopupDialog({
  open,
  onOpenChange,
  defaultServiceId,
}: QuotationPopupDialogProps) {
  const [mounted, setMounted] = useState(false);
  const { t, ready } = useTranslation("pages/quotation-form");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !ready) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full max-w-full max-h-full sm:w-full sm:h-auto sm:max-w-5xl sm:max-h-[95vh] p-0 border-0 [&>button]:hidden sm:rounded-lg rounded-none flex flex-col">
        <DialogHeader className="flex-shrink-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative">
          <div className="p-5 relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-700/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-6">
                {/* <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/30 flex-shrink-0">
                  <span className="text-white font-bold text-sm">SMEQ</span>
                </div> */}

                <div className="flex-1 text-center">
                  <DialogTitle className="text-2xl font-bold text-white mb-2">
                    {t("formTitle")}
                  </DialogTitle>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {t("formSubtitle")}
                  </p>
                </div>

                {/* Custom Close Button */}
                <Button
                  onClick={() => onOpenChange(false)}
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-white transition-all"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">{t("close")}</span>
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 pt-6 flex-1 overflow-y-auto min-h-0 bg-gradient-to-b from-slate-50 to-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100/40 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400/90 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
          <QuotationPopupForm
            onSuccess={() => onOpenChange(false)}
            defaultServiceId={defaultServiceId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
