"use client";

import { usePostApiV10Quotation } from "@/api/endpoints/quotation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  quotationSchema,
  type QuotationFormValues,
} from "../../libs/validation";
// import CertificateInfoSection from "./components/certificate-info-section";
import ContactInfoSection from "./components/contact-info-section";
// import ExecutionLocationSection from "./components/execution-location-section";
import FileUpload from "./components/file-upload-section";
// import InvoiceInfoSection from "./components/invoice-info-section";
// import ResultReturnSection from "./components/result-return-section";

interface QuotationFormProps {
  onSuccess?: () => void;
}

export default function QuotationForm({ onSuccess }: QuotationFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: createQuotation } = usePostApiV10Quotation();
  const { t } = useTranslation("pages/quotation-form");

  const form = useForm<QuotationFormValues>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      organization_name: "",
      address: "",
      tax_code: "",
      contact_person: "",
      post_id: "",
      service_id: "",
      receive_method_id: "",
      calibration_id: "",
      invoice_same_as_delivery: true,
      certificate_info_type: "same_as_delivery",
      execution_location_type: "same_as_delivery",
      language: "vi",
      result_copies: "",
      result_receive_method: "",
      result_return_date: "",
      payment_method: "transfer",
      separate_results: false,
      result_receive_location: "",
      result_note: "",
      internal_recipient: "",
      description: "",
    },
  });

  const onSubmit = async (data: QuotationFormValues) => {
    setIsSubmitting(true);

    try {
      await createQuotation({
        data: {
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          organization_name: data.organization_name,
          service_id: data.service_id,
          receive_method_id: data.receive_method_id,
          calibration_id: data.calibration_id || "",
          description: data.description || "",
          price: "0",
          post_id: data.post_id,
          files: files,
        },
      });

      toast.success({
        title: t("submitSuccess"),
        content: t("submitSuccessMessage"),
      });

      form.reset();
      setFiles([]);

      onSuccess?.();
    } catch (error) {
      console.error("Quotation submission error:", error);
      toast.error({
        title: t("submitError"),
        content: t("submitErrorMessage"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-700/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-6">
                  {/* <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/30 flex-shrink-0">
                    <span className="text-white font-bold text-sm">SMEQ</span>
                  </div> */}

                  <div className="flex-1 text-center">
                    <h1 className="text-2xl font-bold text-white mb-2">
                      {t("formTitle")}
                    </h1>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      {t("formSubtitle")}
                    </p>
                  </div>

                  <div className="w-[76px] flex-shrink-0"></div>
                </div>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="divide-y divide-slate-100"
            >
              {/* SECTIONS */}
              <div className="p-8 bg-slate-50">
                <ContactInfoSection form={form} />
              </div>

              <div className="p-8">
                <FileUpload files={files} setFiles={setFiles} />
              </div>

              {/* <div className="p-8">
                <InvoiceInfoSection form={form} />
              </div>

              <div className="p-8">
                <CertificateInfoSection form={form} />
              </div>

              <div className="p-8">
                <ExecutionLocationSection form={form} />
              </div>

              <div className="p-8">
                <ResultReturnSection form={form} />
              </div> */}

              {/* Submit buttons */}
              <div className="bg-slate-50 px-8 py-6 flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onSuccess?.()}
                  className="h-12 px-6 text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  ← {t("cancel")}
                </Button>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setFiles([]);
                    }}
                    disabled={isSubmitting}
                    className="h-12 px-8 text-base font-medium border-slate-300 hover:bg-white hover:border-slate-400"
                  >
                    {t("reset")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-10 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <Upload className="mr-2 h-5 w-5 animate-spin" />
                        {t("submitting")}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        {t("submit")}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
