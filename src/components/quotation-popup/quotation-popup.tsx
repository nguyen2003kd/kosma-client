"use client";

import QuotationPopupDialog from "@/components/quotation-popup/quotation-popup-dialog";
import QuotationPopupTrigger from "@/components/quotation-popup/quotation-popup-trigger";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function QuotationPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Ẩn popup nếu đang ở trang quotation (đã có form đầy đủ) hoặc trang auth
  if (
    pathname?.startsWith("/quotation") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register")
  ) {
    return null;
  }

  return (
    <>
      <QuotationPopupTrigger onClick={() => setOpen(true)} />

      <QuotationPopupDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
