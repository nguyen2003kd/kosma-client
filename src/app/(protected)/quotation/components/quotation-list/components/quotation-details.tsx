"use client";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import links from "@/lib/links";
import {
  DollarSign,
  Download,
  FileText,
  ListChecks,
  Mail,
  MessageCircle,
  Paperclip,
  Phone,
  Truck,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ExtendedFile, ExtendedQuotation } from "../../../libs/types";

interface QuotationDetailsProps {
  quotation: ExtendedQuotation | null;
  onClose: () => void;
}

export default function QuotationDetails({
  quotation,
  onClose,
}: QuotationDetailsProps) {
  const { t, ready } = useTranslation("pages/quotation");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return t("notAvailable");
    const date = new Date(isoDate);
    return date.toLocaleDateString("vi-VN");
  };

  const getStatusBadgeColor = (statusName: string) => {
    switch (statusName) {
      case "Đã hoàn tất":
      case "Completed":
        return "bg-green-50 text-green-700 border border-green-300 hover:bg-green-100 hover:text-green-800";
      case "Mới tạo":
      case "New":
        return "bg-yellow-50 text-yellow-700 border border-yellow-300 hover:bg-yellow-100 hover:text-yellow-800";
      case "Đã từ chối":
      case "Rejected":
        return "bg-red-50 text-red-700 border border-red-300 hover:bg-red-100 hover:text-red-800";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-gray-800";
    }
  };

  const formatFileSize = (bytes: string) => {
    const size = parseInt(bytes);
    if (size < 1024) return size + " B";
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
    return (size / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleFileView = (filePath?: string) => {
    if (filePath) {
      const fileUrl = `${links.storageEndpoint}${filePath}`;
      window.open(fileUrl, "_blank");
    }
  };

  if (!mounted || !ready) return null;

  return (
    <Sheet open={!!quotation} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto flex flex-col [&>button]:right-6">
        <SheetHeader className="border-b pb-3">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-lg font-bold text-gray-900">
                {t("detailsTitle")}
              </SheetTitle>
              <p className="text-xs text-gray-500 mt-0.5">
                {t("detailsId")}{" "}
                {quotation?.code || `#REQ-${quotation?.id?.slice(-4)}`}
              </p>
            </div>
            <Badge
              className={`${getStatusBadgeColor(
                quotation?.quotation_status?.name || "",
              )} px-2.5 py-1 text-[10px] font-medium uppercase mt-8`}
            >
              {quotation?.quotation_status?.name || t("statusPending")}
            </Badge>
          </div>
        </SheetHeader>

        {quotation && (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto">
              {/* Customer Information */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2.5 border-b border-gray-200">
                  <div className="bg-blue-600 p-1.5 rounded">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wide">
                    {t("customerInfo")}
                  </h3>
                </div>
                <div className="flex gap-3 p-4">
                  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <User className="w-7 h-7 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-0.5">
                      {quotation.name || t("notAvailable")}
                    </h4>
                    <p className="text-xs text-gray-600 mb-3">
                      {quotation.organization_name || t("notAvailable")}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                          {t("email")}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          <p className="text-xs text-gray-900 truncate">
                            {quotation.email}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                          {t("phoneNumber")}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          <p className="text-xs text-gray-900">
                            {quotation.phone_number || t("notAvailable")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 bg-cyan-50 px-4 py-2.5 border-b border-gray-200">
                  <div className="bg-cyan-600 p-1.5 rounded">
                    <ListChecks className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wide">
                    {t("serviceInfo")}
                  </h3>
                </div>
                <div className="space-y-3 p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                        {t("serviceType")}
                      </p>
                      <p className="text-xs font-semibold text-gray-900">
                        {quotation.post?.title || t("serviceUnknown")}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                        {t("sentDate")}
                      </p>
                      <p className="text-xs font-semibold text-gray-900">
                        {formatDate(quotation.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                      {t("receiveMethod")}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-blue-600" />
                      <p className="text-xs font-semibold text-blue-600">
                        {quotation.receive_method?.name || t("notAvailable")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">
                      {t("customerNote")}
                    </p>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 relative">
                      <p className="text-xs text-gray-800 italic leading-relaxed">
                        &ldquo;{quotation.description || t("noNote")}
                        &rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Files Section */}
              {quotation.files && quotation.files.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-gray-600" />
                      <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wide">
                        {t("attachedFiles")} ({quotation.files.length})
                      </h3>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      {t("downloadAll")}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {quotation.files?.map(
                      (file: ExtendedFile, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="bg-blue-600 p-1.5 rounded">
                            <FileText className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-[10px] text-gray-500">
                              {formatFileSize(file.size || "0")} • DOCX
                            </p>
                          </div>
                          <button
                            onClick={() => handleFileView(file.path)}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Price Section - Sticky Footer */}
            <div className="sticky bottom-0 mt-2 pt-2 border-t bg-white">
              {quotation.price &&
              quotation.quotation_status?.name === "Đã hoàn tất" ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <div className="bg-green-600 p-1.5 rounded">
                      <DollarSign className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-green-900 uppercase tracking-wide">
                        {t("officialQuote")}
                      </p>
                      <div className="flex items-center gap-0.5">
                        <div className="w-1 h-1 bg-green-600 rounded-full"></div>
                        <p className="text-[11px] text-green-700">
                          {t("approvedByAdmin")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        {parseFloat(quotation.price).toLocaleString("vi-VN")}
                      </p>
                      <p className="text-[11px] font-medium text-gray-600">
                        {t("currency")}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="bg-gray-200 p-3 rounded-full">
                      <MessageCircle className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-900 mb-1">
                        {t("quoteNotReady")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {t("quoteNotReadyMessage")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer Actions */}
        {/* <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose} className="w-full h-11">
            <X className="w-4 h-4 mr-2" />
            Đóng
          </Button>
          <Button
            className="w-full h-11 bg-gray-900 hover:bg-gray-800"
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4 mr-2" />
            In Báo Giá
          </Button>
        </div> */}
      </SheetContent>
    </Sheet>
  );
}
