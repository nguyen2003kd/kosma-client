"use client";

import { usePostApiV10QuotationPublic } from "@/api/endpoints/quotation";
import { Input, Textarea } from "@/components/common/input";
import { CustomSelect } from "@/components/common/custom-select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toastErrorMessage, toast } from "@/components/ui/toaster";
import { Upload, X, CheckCircle2, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface QuotationPopupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SERVICE_OPTIONS = [
  "contactPersonSelf",
  "contactPersonOther",
  "serviceEnvironmentMonitoring",
  "serviceConsulting",
  "serviceTraining",
  "serviceRadiationSafety",
  "serviceResearch",
  "serviceCertification",
  "serviceOther",
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FORMATS = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/webp",
];

interface FormData {
  name: string;
  organization_name: string;
  email: string;
  phone_number: string;
  address: string;
  tax_code: string;
  service_id: string;
  description: string;
}

const initialFormData: FormData = {
  name: "",
  organization_name: "",
  email: "",
  phone_number: "",
  address: "",
  tax_code: "",
  service_id: "",
  description: "",
};

export default function QuotationPopupDialog({
  open,
  onOpenChange,
}: QuotationPopupDialogProps) {
  const { t } = useTranslation("pages/quotation-form");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [files, setFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const mutation = usePostApiV10QuotationPublic();

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const errors: string[] = [];
    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      if (!ACCEPTED_FORMATS.includes(file.type)) {
        errors.push(`${file.name}: ${t("fileFormatError")}`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: ${t("fileSizeError")}`);
        continue;
      }
      if (files.some((f) => f.name === file.name && f.size === file.size)) {
        errors.push(`${file.name}: ${t("fileDuplicateError")}`);
        continue;
      }
      validFiles.push(file);
    }

    setFileErrors(errors);
    setFiles((prev) => [...prev, ...validFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFiles([]);
    setFileErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(
      {
        data: {
          name: formData.name,
          post_id: "public",
          phone_number: formData.phone_number,
          email: formData.email,
          description: formData.description || null,
          price: "0",
          organization_name: formData.organization_name || null,
          service_id: formData.service_id || null,
          files: files.length > 0 ? files : undefined,
        },
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          resetForm();
          toast.success({
            title: t("submitSuccess"),
            content: t("submitSuccessMessage"),
          });
        },
        onError: (error) => {
          toastErrorMessage(error);
        },
      },
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (isSuccess) {
        setIsSuccess(false);
      }
      resetForm();
    }
    onOpenChange(open);
  };

  const serviceOptions = SERVICE_OPTIONS.map((key) => ({
    value: key,
    label: t(key),
  }));

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t("submitSuccess")}
            </h3>
            <p className="text-gray-600 mb-6">{t("submitSuccessMessage")}</p>
            <Button
              variant="outline"
              onClick={() => {
                setIsSuccess(false);
                handleOpenChange(false);
              }}
            >
              {t("close")}
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {t("formTitle")}
              </DialogTitle>
              <DialogDescription>{t("formSubtitle")}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t("customerName")}
                  id="name"
                  required
                  placeholder={t("customerNamePlaceholder")}
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <Input
                  label={t("organizationName")}
                  id="organization_name"
                  placeholder={t("organizationNamePlaceholder")}
                  value={formData.organization_name}
                  onChange={(e) => handleChange("organization_name", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t("emailContact")}
                  id="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                  label={t("phone")}
                  id="phone_number"
                  type="tel"
                  required
                  placeholder={t("phonePlaceholder")}
                  value={formData.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t("address")}
                  id="address"
                  placeholder={t("addressPlaceholder")}
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
                <Input
                  label={t("taxCode")}
                  id="tax_code"
                  placeholder={t("taxCodePlaceholder")}
                  value={formData.tax_code}
                  onChange={(e) => handleChange("tax_code", e.target.value)}
                />
              </div>

              <CustomSelect
                label={t("contactPerson")}
                id="service_id"
                required
                value={formData.service_id}
                onChange={(value) => handleChange("service_id", value)}
                options={serviceOptions}
                placeholder={t("selectContactPerson")}
              />

              <Textarea
                label={t("quotationContent")}
                id="description"
                placeholder={t("quotationContentPlaceholder")}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />

              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-[12px] font-extrabold tracking-[0.04em] text-ink block">
                  {t("fileUploadTitle")}
                </label>
                <p className="text-xs text-gray-500">{t("fileUploadSubtitle")}</p>
                <div
                  className="border-2 border-dashed border-mutedLine rounded-[10px] p-4 text-center cursor-pointer hover:border-black-700 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">{t("selectFile")}</p>
                  <p className="text-xs text-gray-400 mt-1">{t("fileUploadNote")}</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.webp"
                    onChange={handleFileSelect}
                  />
                </div>

                {fileErrors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-red-600 mb-1">
                      {t("fileValidationTitle")}
                    </p>
                    {fileErrors.map((err, i) => (
                      <p key={i} className="text-xs text-red-500">
                        {err}
                      </p>
                    ))}
                  </div>
                )}

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <span className="text-sm text-gray-700 truncate flex-1">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleOpenChange(false)}
                  disabled={mutation.isPending}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("submitting")}
                    </>
                  ) : (
                    t("submit")
                  )}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
