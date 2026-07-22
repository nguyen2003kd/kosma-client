"use client";

import { usePostApiV10QuotationPublic } from "@/api/endpoints/quotation";
// import CertificateInfoSection from "@/app/(protected)/quotation/components/quotation-form/components/certificate-info-section";
import ContactInfoSection from "@/app/(protected)/quotation/components/quotation-form/components/contact-info-section";
// import ExecutionLocationSection from "@/app/(protected)/quotation/components/quotation-form/components/execution-location-section";
import FileUpload from "@/app/(protected)/quotation/components/quotation-form/components/file-upload-section";
// import InvoiceInfoSection from "@/app/(protected)/quotation/components/quotation-form/components/invoice-info-section";
// import ResultReturnSection from "@/app/(protected)/quotation/components/quotation-form/components/result-return-section";
import {
  quotationPopupSchema,
  type QuotationPopupFormValues,
} from "@/app/(protected)/quotation/libs/validation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface QuotationPopupFormProps {
  onSuccess?: () => void;
  defaultServiceId?: string;
}

export default function QuotationPopupForm({
  onSuccess,
  defaultServiceId,
}: QuotationPopupFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { mutateAsync: createQuotation } = usePostApiV10QuotationPublic();
  const { t, ready } = useTranslation("pages/quotation-form");

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<QuotationPopupFormValues>({
    resolver: zodResolver(quotationPopupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      organization_name: "",
      address: "",
      tax_code: "",
      contact_person: "",
      description: "",
    },
  });

  const onSubmit = async (data: QuotationPopupFormValues) => {
    setIsSubmitting(true);

    try {
      await createQuotation({
        data: {
          name: data.name,
          email: data.email,
          phone_number: data.phone_number,
          organization_name: data.organization_name,
          post_id: defaultServiceId || "",
          receive_method_id: "",
          calibration_id: "",
          description: data.description || "",
          price: "0",
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

  if (!mounted || !ready) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Contact Info Section */}
        <div className="bg-slate-50 p-4 rounded-lg">
          <ContactInfoSection form={form} />
        </div>

        {/* File Upload Section */}
        <div className="p-4">
          <FileUpload files={files} setFiles={setFiles}/>
        </div>

        {/* Invoice Info Section */}
        {/* <div className="p-4">
          <InvoiceInfoSection form={form} />
        </div> */}

        {/* Certificate Info Section */}
        {/* <div className="p-4">
          <CertificateInfoSection form={form} />
        </div> */}

        {/* Execution Location Section */}
        {/* <div className="p-4">
          <ExecutionLocationSection form={form} />
        </div> */}

        {/* Result Return Section */}
        {/* <div className="bg-slate-50 p-4 rounded-lg">
          <ResultReturnSection form={form} />
        </div> */}

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-11 font-semibold shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all"
          >
            {isSubmitting ? (
              <>
                <Upload className="mr-2 h-5 w-5 animate-spin" />
                {t("submitting")}
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                {t("submitQuotation")}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
