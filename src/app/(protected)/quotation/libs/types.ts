import type { QuotationWithFiles } from "@/api/models/quotationWithFiles";
import type { QuotationWithFilesFilesItem } from "@/api/models/quotationWithFilesFilesItem";

export interface QuotationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  description: string;
}

export interface QuotationRequest extends QuotationFormData {
  id: string;
  status: "pending" | "processing" | "quoted" | "completed";
  files?: string[];
  created_at: string;
  updated_at?: string;
}

export interface FileUploadResult {
  url: string;
  name: string;
  size: number;
  type: string;
}

export interface ExtendedQuotation extends QuotationWithFiles {
  code?: string;
  quotation_status_id?: string;
  receive_method_id?: string;
  quotation_status?: {
    id: string;
    name: string;
  };
  post?: {
    id: string;
    title: string;
  };
  receive_method?: {
    id: string;
    name: string;
  };
}

export interface ExtendedFile extends QuotationWithFilesFilesItem {
  path?: string;
  name?: string;
  size?: string;
}
