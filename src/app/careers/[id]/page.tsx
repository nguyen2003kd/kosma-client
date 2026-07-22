"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  DollarSign,
  Briefcase,
  CalendarDays,
  ChevronRight,
  UploadCloud,
  X,
  CheckCircle,
  FileText,
  Clock,
  AlertCircle,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { useGetApiV10RecruitmentId, useGetApiV10Recruitment } from "@/api/endpoints/recruitment";
import { useGetApiV10FileId } from "@/api/endpoints/file";
import { mainInstance } from "@/api/mutator/custom-instance";
import { postApiV10Candidate } from "@/api/endpoints/candidate";
import { postApiV10CandidateFileBulk } from "@/api/endpoints/candidate-file";
import type {
  File as ApiFile,
  PostApiV10FileBulk200,
  CandidateCreatedResponse,
  CandidateFileBulkResponse,
} from "@/api/models";
import baseConfig from "@/configs/base";
import { useTranslation } from "react-i18next";

interface PageProps {
  params: { id: string };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MAX_FILES = 6;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file (matches backend MAX_FILE_SIZE)
const ACCEPTED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const ACCEPTED_EXTENSIONS = [
  ".pdf", ".doc", ".docx", ".xls", ".xlsx",
  ".jpg", ".jpeg", ".png", ".gif", ".webp",
].join(",");

const EMPLOYMENT_TYPE_MAP: Record<string, string> = {
  full_time: "detail.fullTime",
  part_time: "detail.partTime",
  contract: "detail.contract",
  internship: "detail.internship",
  freelance: "detail.freelance",
  temporary: "detail.temporary",
};

function formatEmploymentType(type: string | null | undefined, t?: (key: string) => string): string {
  if (!type) return "";
  const mapped = EMPLOYMENT_TYPE_MAP[type];
  return mapped ? (t ? t(mapped) : mapped) : type.replace(/_/g, " ");
}

function formatCurrency(amount: string | null | undefined, t?: (key: string) => string): string {
  if (!amount) return t ? t("detail.negotiable") : "Thỏa thuận";
  const num = parseFloat(amount);
  if (isNaN(num)) return t ? t("detail.negotiable") : "Thỏa thuận";
  return `${num.toLocaleString("vi-VN")} VNĐ`;
}

function formatDate(dateStr: string | null | undefined, t?: (key: string) => string): string {
  if (!dateStr) return t ? t("updating") : "Đang cập nhật";
  return new Date(dateStr).toLocaleDateString("vi-VN");
}

// ---------------------------------------------------------------------------
// File upload item
// ---------------------------------------------------------------------------
interface UploadFileItem {
  file: File;
  /** Percentage 0-100 */
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  errorMessage?: string;
  /** Populated after successful upload */
  result?: ApiFile;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function JobDetailPage({ params }: PageProps) {
  const { t } = useTranslation("pages/careers");
  const { data, isLoading, error } = useGetApiV10RecruitmentId(params.id);
  const job = (data as unknown as { responseData?: Record<string, unknown> })?.responseData as {
    title?: string; description?: string; location?: string; updated_at?: string;
    salary_min?: string; salary_max?: string; quantity?: number; deadline?: string;
    benefits?: string; requirements?: string; required_documents?: string | null;
    experience?: string | null; employment_type?: string | null; file_id?: string | null;
  } | undefined;

  // File modal
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const { data: fileData, isLoading: isFileLoading } = useGetApiV10FileId(
    job?.file_id || "",
    { query: { enabled: !!job?.file_id && isFileModalOpen } },
  );
  const fileInfo = (fileData as unknown as { responseData?: { name?: string; path?: string; description?: string } })?.responseData;

  // Similar jobs
  const { data: listData, isLoading: listLoading } = useGetApiV10Recruitment({
    page: 1,
    pageSize: 5,
    sortField: "created_at",
    sortOrder: "desc",
  });

  interface JobRow {
    id: string;
    title?: string;
    location?: string;
    quantity?: number;
    deadline?: string;
  }
  const similarJobs: JobRow[] = ((listData as unknown as { responseData?: { rows?: Record<string, unknown>[] } })?.responseData?.rows ?? [])
    .map((row): JobRow | null => {
      const record = row as Record<string, unknown>;
      const id = typeof record.id === "string" ? record.id : undefined;
      if (!id) return null;
      const item: JobRow = { id };
      if (typeof record.title === "string") item.title = record.title;
      if (typeof record.location === "string") item.location = record.location;
      if (typeof record.quantity === "number") {
        item.quantity = record.quantity;
      } else if (typeof record.quantity === "string") {
        const parsed = Number(record.quantity);
        if (Number.isFinite(parsed)) item.quantity = parsed;
      }
      if (typeof record.deadline === "string") item.deadline = record.deadline;
      return item;
    })
    .filter((item): item is JobRow => item !== null)
    .filter((item) => item.id !== params.id)
    .slice(0, 4);

  // ---------------------------------------------------------------------------
  // Bulk file upload state
  // ---------------------------------------------------------------------------
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [uploadItems, setUploadItems] = useState<UploadFileItem[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isUploading = React.useMemo(
    () => uploadItems.some((i) => i.status === "uploading"),
    [uploadItems],
  );

  // ---------------------------------------------------------------------------
  // Validate files before uploading
  // ---------------------------------------------------------------------------
  const validateFiles = (rawFiles: FileList | File[]): { valid: File[]; errors: string[] } => {
    const errors: string[] = [];
    const allFiles = Array.from(rawFiles) as File[];
    const remaining = MAX_FILES - uploadItems.length;
    if (allFiles.length > remaining) {
      errors.push(t("detail.maxFilesExceeded", { max: MAX_FILES, current: uploadItems.length }));
    }
    const valid: File[] = [];
    for (const f of allFiles) {
      if (!ACCEPTED_TYPES.has(f.type)) {
        errors.push(t("detail.fileTypeUnsupported", { name: f.name }));
        continue;
      }
      if (f.size > MAX_FILE_SIZE) {
        errors.push(t("detail.fileTooLarge", { name: f.name }));
        continue;
      }
      valid.push(f);
    }
    return { valid, errors };
  };

  // ---------------------------------------------------------------------------
  // Add files to the upload queue
  // ---------------------------------------------------------------------------
  const enqueueFiles = (rawFiles: FileList | File[]) => {
    setValidationErrors([]);
    const { valid, errors } = validateFiles(rawFiles);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    const newItems: UploadFileItem[] = valid.map((file) => ({
      file,
      progress: 0,
      status: "pending" as const,
    }));
    setUploadItems((prev) => [...prev, ...newItems]);
  };

  // ---------------------------------------------------------------------------
  // Start the bulk upload — returns updated uploadItems after completion
  // ---------------------------------------------------------------------------
  const startBulkUpload = useCallback(async (items: UploadFileItem[]): Promise<UploadFileItem[]> => {
    const pending = items.filter((i) => i.status === "pending");
    if (pending.length === 0) return items;

    abortControllerRef.current = new AbortController();
    const ac = abortControllerRef.current;

    // No setUploadItems here — React 18 batching would cause race condition.
    // We update state only after API completes (inside try block).
    try {
      const body = new FormData();
      pending.forEach((i) => body.append("files", i.file));
      body.append("is_in_library_all", "false");

      const result = await mainInstance<PostApiV10FileBulk200>({
        url: "/api/v1.0/file/bulk",
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: body,
        signal: ac.signal,
      });

      // Backend trả về: { message, responseData: [files...], status: "success" }
      // responseData là ARRAY TRỰC TIẾP, không phải { data: [...] }
      const returnedFiles = (result?.responseData as unknown as ApiFile[]) ?? [];

      // Map pending items → done với kết quả từ API
      // Dùng pending.map thay vì items.map + indexOf để tránh React batching race condition
      const uploadedItems = pending.map((item, idx) => ({
        ...item,
        status: "done" as const,
        progress: 100,
        result: returnedFiles[idx] ?? undefined,
      }));

      // Merge: giữ nguyên items không phải pending, thay pending bằng kết quả upload
      const updatedItems = items.map((item) => {
        const uploaded = uploadedItems.find((u) => u.file === item.file);
        return uploaded ?? item;
      });

      setUploadItems(updatedItems);
      return updatedItems;
    } catch (err) {
      if (ac.signal.aborted) return items;
      const msg = (err as { message?: string })?.message ?? t("detail.uploadFailed");
      toast.error({ content: msg });
      const updatedItems = items.map((item) =>
        item.status === "uploading" ? { ...item, status: "error" as const, errorMessage: msg, progress: 0 } : item,
      );
      setUploadItems(updatedItems);
      return updatedItems;
    } finally {
      abortControllerRef.current = null;
    }
  }, []);

  // ---------------------------------------------------------------------------
  // File input / drop handlers
  // ---------------------------------------------------------------------------
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    enqueueFiles(e.target.files);
    e.target.value = "";
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-blue-400");
    if (!e.dataTransfer.files.length) return;
    enqueueFiles(e.dataTransfer.files);
  };

  // ---------------------------------------------------------------------------
  // Remove a file from the queue (or cancel an in-flight one)
  // ---------------------------------------------------------------------------
  const removeFile = (index: number) => {
    const item = uploadItems[index];
    if (item.status === "uploading") {
      abortControllerRef.current?.abort();
    }
    setUploadItems((prev) => prev.filter((_, i) => i !== index));
  };

  // ---------------------------------------------------------------------------
  // Form submission
  // ---------------------------------------------------------------------------

  const [form, setForm] = useState({
    full_name: "",
    address: "",
    phone: "",
    email: "",
    language_proficiency: "",
    it_proficiency: "",
    education_level: "",
    major: "",
  });

  const completedUploads = uploadItems.filter((i) => i.status === "done");
  const hasErrors = uploadItems.some((i) => i.status === "error");
  const isFormValid =
    !!form.full_name && !!form.phone && !!form.email && !hasErrors;
  const isExpired = job?.deadline ? new Date(job.deadline) < new Date() : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isExpired) return;
    setIsSubmitting(true);

    // Step 1: Upload any pending files inline, then continue with candidate submission
    let currentItems = uploadItems;
    if (uploadItems.some((i) => i.status === "pending")) {
      currentItems = await startBulkUpload(uploadItems);
      const hasErrorsAfterUpload = currentItems.some((i) => i.status === "error");
      if (hasErrorsAfterUpload) {
        setIsSubmitting(false);
        return;
      }
    }

    const fileIds = currentItems
      .filter((i) => i.status === "done" && i.result?.id)
      .map((i) => i.result!.id)
      .filter((id): id is string => !!id);

    // Step 2: Submit candidate
    try {
      const candidateResponse = (await postApiV10Candidate({
        recruitment_id: params.id,
        full_name: form.full_name,
        address: form.address,
        phone: form.phone,
        email: form.email,
        position: job?.title ?? "",
        language_proficiency: form.language_proficiency,
        it_proficiency: form.it_proficiency,
        education_level: form.education_level,
        major: form.major,
        status: "pending",
      })) as unknown as CandidateCreatedResponse;

      const candidateId = candidateResponse?.responseData?.id;
      if (!candidateId) {
        throw new Error(t("detail.candidateIdError"));
      }
      // Step 3: Associate uploaded files with the candidate
      if (fileIds.length > 0) {
        const bulkResponse = (await postApiV10CandidateFileBulk({
          candidate_id: candidateId,
          file_ids: fileIds,
        })) as unknown as CandidateFileBulkResponse;

        const { created, skippedFileIds } = bulkResponse?.responseData?.data ?? { created: [], skippedFileIds: [] };

        if (created.length > 0 && skippedFileIds.length > 0) {
          toast.success({
            content: t("detail.submitSuccessPartial", { created: created.length, skipped: skippedFileIds.length }),
          });
        } else if (created.length > 0) {
          toast.success({ content: t("detail.submitSuccessFiles", { count: created.length }) });
        } else if (skippedFileIds.length > 0) {
          toast.success({ content: t("detail.submitSuccessSkipped", { count: skippedFileIds.length }) });
        } else {
          toast.success({ content: t("detail.submitSuccessNoFiles") });
        }
      } else {
        toast.success({ content: t("detail.submitSuccessNoFiles") });
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setForm({ full_name: "", address: "", phone: "", email: "", language_proficiency: "", it_proficiency: "", education_level: "", major: "" });
      setUploadItems([]);
      setValidationErrors([]);
    } catch (err) {
      setIsSubmitting(false);
      const msg = (err as { message?: string })?.message ?? t("detail.submitFailed");
      toast.error({ content: msg });
    }
  };

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------
  const renderFileItem = (item: UploadFileItem, index: number) => {
    const isUploadingThis = item.status === "uploading";
    const isDone = item.status === "done";
    const isError = item.status === "error";

    return (
      <div key={index} className="flex items-start gap-3 bg-[#eff6ff] border border-[#93c5fd] rounded-lg px-4 py-3">
        <div className="mt-0.5 flex-shrink-0">
          {isDone ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : isError ? (
            <AlertCircle className="h-4 w-4 text-red-500" />
          ) : isUploadingThis ? (
            <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <FileText className="h-4 w-4 text-blue-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{item.file.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatBytes(item.file.size)}
            {isError && item.errorMessage && (
              <span className="text-red-500 ml-1">— {item.errorMessage}</span>
            )}
            {isUploadingThis && (
              <span className="ml-1 text-blue-600">{item.progress}%</span>
            )}
            {isDone && <span className="ml-1 text-green-600">{t("detail.uploaded")}</span>}
          </p>
          {isUploadingThis && (
            <div className="mt-1.5 h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => removeFile(index)}
          className="text-muted-foreground hover:text-red-500 transition-colors mt-0.5 flex-shrink-0"
          aria-label={t("detail.removeFile")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  };

  // ---------------------------------------------------------------------------
  // Loading / error states
  // ---------------------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">{t("detail.loadingDetail")}</p>
      </div>
    );
  }
  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">{t("detail.notFound")}</p>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border/40 py-4 px-4 sm:px-6 lg:px-8 mb-6">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-muted-foreground">
          <a href="/" className="hover:text-primary cursor-pointer transition-colors">{t("detail.home")}</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <a href="/careers" className="hover:text-primary cursor-pointer transition-colors">{t("title")}</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium truncate">{job.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="w-full lg:w-8/12 flex flex-col gap-6">

            {/* Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white p-8 sm:p-10 shadow-lg group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl -ml-10 -mb-10 group-hover:bg-blue-400/30 transition-all duration-700" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-3">{job.title}</h1>
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#eff6ff] p-2.5 rounded-xl text-[#2563eb]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">{t("location")}</p>
                    <p className="text-sm font-semibold text-foreground">{job.location || t("detail.headquarters")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#eff6ff] p-2.5 rounded-xl text-[#2563eb]">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">{t("detail.updatedAt")}</p>
                    <p className="text-sm font-semibold text-foreground">{formatDate(job.updated_at, t)}</p>
                  </div>
                </div>

                {job.experience && (
                  <div className="flex items-start gap-3">
                    <div className="bg-[#eff6ff] p-2.5 rounded-xl text-[#2563eb]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-0.5">{t("detail.experience")}</p>
                      <p className="text-sm font-semibold text-foreground">{job.experience}</p>
                    </div>
                  </div>
                )}
                {job.employment_type && (
                  <div className="flex items-start gap-3">
                    <div className="bg-[#eff6ff] p-2.5 rounded-xl text-[#2563eb]">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium mb-0.5">{t("detail.employmentType")}</p>
                      <p className="text-sm font-semibold text-foreground">{formatEmploymentType(job.employment_type, t)}</p>
                    </div>
                  </div>
                )}
                                <div className="flex items-start gap-3">
                  <div className="bg-[#ecfdf5] p-2.5 rounded-xl text-[#10b981]">
                    <DollarSign className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">{t("detail.salary")}</p>
                    <p className="text-sm font-semibold text-foreground">
                      {job.salary_min && job.salary_max
                        ? `${formatCurrency(job.salary_min, t)} - ${formatCurrency(job.salary_max, t)}`
                        : t("detail.negotiable")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#eff6ff] p-2.5 rounded-xl text-[#2563eb]">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">{t("quantity")}</p>
                    <p className="text-sm font-semibold text-foreground">{t("detail.quantityPeople", { count: job.quantity ?? 1 })}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#fef2f2] p-2.5 rounded-xl text-[#ef4444]">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium mb-0.5">{t("detail.deadlineLabel")}</p>
                    <p className="text-sm font-semibold text-foreground">{formatDate(job.deadline, t)}</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Description & Requirements */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
              {job.description && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-1.5 h-6 bg-[#2563eb] rounded-full" />
                    <h2 className="text-xl font-bold uppercase text-[#1e3a8a]">{t("detail.jobDescription")}</h2>
                  </div>
                  <div className="text-[15px] text-foreground/80 whitespace-pre-line leading-relaxed">
                    {job.description}
                  </div>
                </div>
              )}
            </div>
            {job.requirements && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-[#2563eb] rounded-full" />
                <h2 className="text-xl font-bold uppercase text-[#1e3a8a]">{t("detail.candidateRequirements")}</h2>
              </div>
              <div className="text-[15px] text-foreground/80 whitespace-pre-line leading-relaxed">
                {job.requirements}
              </div>
            </div>
              )}

            {/* Benefits */}
            {job.benefits && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-[#2563eb] rounded-full" />
                  <h2 className="text-xl font-bold uppercase text-[#1e3a8a]">{t("detail.benefitsLabel")}</h2>
                </div>
                <div className="text-[15px] text-foreground/80 whitespace-pre-line leading-relaxed">
                  {job.benefits}
                </div>
              </div>
            )}

            {/* Required Documents */}
            {job.required_documents && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-[#2563eb] rounded-full" />
                  <h2 className="text-xl font-bold uppercase text-[#1e3a8a]">{t("detail.requiredDocuments")}</h2>
                </div>
                <ul className="space-y-2.5">
                  {job.required_documents
                    .split(/[,;\n]/)
                    .map((doc, idx) => {
                      const trimmed = doc.trim();
                      if (!trimmed) return null;
                      return (
                        <li key={idx} className="flex items-start gap-3">
                          <FileCheck className="h-4 w-4 text-[#2563eb] mt-0.5 flex-shrink-0" />
                          <span className="text-[15px] text-foreground/80 leading-relaxed">{trimmed}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}


          {/* File Attachment */}
            {job.file_id && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50">
                <button
                  onClick={() => setIsFileModalOpen(true)}
                  className="flex items-center gap-3 w-full p-4 rounded-xl bg-[#eff6ff] hover:bg-[#dbeafe] transition-colors border border-[#93c5fd]"
                >
                  <div className="bg-[#3b82f6] p-3 rounded-xl">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-[#1e3a8a]">{t("detail.recruitmentNotice")}</p>
                    <p className="text-sm text-muted-foreground">{t("detail.viewRecruitmentNotice")}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            )}
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-4/12 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-border/50 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-[#f59e0b] rounded-full" />
                <h2 className="text-lg font-bold uppercase text-[#1e3a8a]">{t("detail.otherJobs")}</h2>
              </div>
              <div className="space-y-0">
                {listLoading ? (
                  <div className="text-center py-4 text-sm text-muted-foreground">{t("loading")}</div>
                ) : similarJobs.length > 0 ? (
                  similarJobs.map((similarJob: JobRow) => (
                    <Link
                      key={similarJob.id}
                      href={`/careers/${similarJob.id}`}
                      className="block py-4 border-b border-border/50 hover:bg-[#eff6ff]/30 transition-all group px-2 rounded-lg"
                    >
                      <h3 className="font-medium text-[#2563eb] text-[15px] group-hover:text-blue-800 transition-colors mb-1">
                        {similarJob.title}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-xs font-medium mt-2">
                        <div className="flex items-center gap-1.5 text-foreground/70">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{similarJob.location || t("detail.headquarters")}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-foreground/70">
                          <Briefcase className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{t("detail.quantityPeople", { count: similarJob.quantity ?? 1 })}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-foreground/70 col-span-2">
                          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="truncate">{t("detail.deadlineShort")}: {formatDate(similarJob.deadline, t)}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-4 text-sm text-muted-foreground">{t("detail.noOtherJobs")}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-2 border-border/50 border-dashed mt-8">
          <h2 className="text-lg font-bold uppercase text-center mb-6 text-foreground">{t("detail.submitApplicationTitle")}</h2>

          {/* ---- Bulk file upload area ---- */}
          <div className="w-full mb-10">
            {/* Validation errors */}
            {validationErrors.length > 0 && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg space-y-1">
                {validationErrors.map((err, i) => (
                  <p key={i} className="text-xs text-red-600 flex items-start gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                    {err}
                  </p>
                ))}
              </div>
            )}


            {/* Drop zone */}
            {uploadItems.length < MAX_FILES && (
              <div
                className="border border-dashed border-[#93c5fd] bg-[#eff6ff]/30 rounded-xl p-10 flex flex-col items-center justify-center w-full cursor-pointer hover:bg-[#eff6ff]/50 transition-colors"
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("border-blue-400"); }}
                onDragLeave={(e) => e.currentTarget.classList.remove("border-blue-400")}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={ACCEPTED_EXTENSIONS}
                  className="hidden"
                  onChange={handleFileInput}
                />
                <div className="bg-[#dbeafe] p-3 rounded-full text-[#3b82f6] mb-3">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <p className="font-semibold text-sm mb-1 text-foreground">{t("dragDrop")}</p>
                <p className="text-xs text-muted-foreground mb-4">
                  {t("orChoose")} <span className="text-[#3b82f6] hover:underline cursor-pointer">{t("chooseFromComputer")}</span>
                </p>
                <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                  {t("detail.uploadHint", { count: MAX_FILES })}
                </p>
              </div>
            )}
            {/* Uploaded file list */}
            {uploadItems.length > 0 ? (
              <div className="space-y-2 my-4">
                {uploadItems.map(renderFileItem)}
              </div>
            ) : null}

            {/* Upload progress summary */}
            {isUploading && (
              <p className="mt-2 text-xs text-blue-600 text-right">
                {t("detail.uploadingCount", { count: uploadItems.filter((i) => i.status === "uploading").length })}
              </p>
            )}
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-2">
                  {t("fullName")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("enterName")}
                  value={form.full_name}
                  onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                  className="w-full text-sm rounded-md border border-input bg-background px-3 py-2.5 outline-none focus:border-[#3b82f6] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-2">{t("address")}</label>
                <input
                  type="text"
                  placeholder={t("enterAddress")}
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="w-full text-sm rounded-md border border-input bg-background px-3 py-2.5 outline-none focus:border-[#3b82f6] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-2">
                  {t("phone")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("enterPhone")}
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full text-sm rounded-md border border-input bg-background px-3 py-2.5 outline-none focus:border-[#3b82f6] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-2">
                  {t("email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder={t("enterEmail")}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full text-sm rounded-md border border-input bg-background px-3 py-2.5 outline-none focus:border-[#3b82f6] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-2">
                  {t("foreignLanguage")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("enterForeignLanguage")}
                  value={form.language_proficiency}
                  onChange={(e) => setForm((f) => ({ ...f, language_proficiency: e.target.value }))}
                  className="w-full text-sm rounded-md border border-input bg-background px-3 py-2.5 outline-none focus:border-[#3b82f6] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-2">
                  {t("itSkill")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("enterItSkill")}
                  value={form.it_proficiency}
                  onChange={(e) => setForm((f) => ({ ...f, it_proficiency: e.target.value }))}
                  className="w-full text-sm rounded-md border border-input bg-background px-3 py-2.5 outline-none focus:border-[#3b82f6] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-2">
                  {t("degree")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.education_level}
                  onChange={(e) => setForm((f) => ({ ...f, education_level: e.target.value }))}
                  className="w-full text-sm rounded-md border border-input bg-background px-3 py-2.5 outline-none focus:border-[#3b82f6] transition-colors text-muted-foreground focus:text-foreground"
                >
                  <option value="" disabled>{t("selectDegree")}</option>
                  <option value="Trung cấp">{t("degreeAssociate")}</option>
                  <option value="Cao đẳng">{t("degreeCollege")}</option>
                  <option value="Đại học">{t("degreeBachelor")}</option>
                  <option value="Thạc sĩ">{t("degreeMaster")}</option>
                  <option value="Tiến sĩ">{t("degreePhD")}</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-foreground mb-2">
                  {t("major")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("enterMajor")}
                  value={form.major}
                  onChange={(e) => setForm((f) => ({ ...f, major: e.target.value }))}
                  className="w-full text-sm rounded-md border border-input bg-background px-3 py-2.5 outline-none focus:border-[#3b82f6] transition-colors"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[13px] font-medium text-foreground mb-2">
                  {t("positionApplied")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={job.title}
                  disabled
                  className="w-full text-sm rounded-md border border-input bg-muted px-3 py-2.5 outline-none opacity-80 cursor-not-allowed"
                />
              </div>
            </div>

            {/* File upload status hint */}
            {uploadItems.length > 0 && (
              <p className="text-xs text-muted-foreground">
                {completedUploads.length > 0
                  ? t("detail.fileReady", { done: completedUploads.length, total: uploadItems.length })
                  : hasErrors
                    ? t("detail.fileHasErrors", { count: uploadItems.length }) : ""}
              </p>
            )}

            {/* Expired warning */}
            {/* {isExpired && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950/30">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm font-medium text-red-600 dark:text-red-400">
                  Tin tuyển dụng này đã hết hạn nộp hồ sơ.
                </p>
              </div>
            )} */}

            <div className="mt-8 flex justify-center">
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting || isExpired}
                className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] hover:opacity-90 text-white rounded-md py-6 text-sm font-medium disabled:opacity-50"
              >
                {isExpired ? t("expired") : isSubmitting ? t("submitting") : t("submit")}
              </Button>
            </div>
          </form>

          {submitSuccess && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-700">{t("detail.submitSuccessInline")}</p>
            </div>
          )}
        </div>
      </div>

      {/* File Modal */}
      {isFileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsFileModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[85vh] bg-white shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6]">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{t("detail.recruitmentNotice")}</h3>
              </div>
              <button
                onClick={() => setIsFileModalOpen(false)}
                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
              {isFileLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 border-4 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
                  <span className="ml-3 text-muted-foreground">{t("detail.loadingDocument")}</span>
                </div>
              ) : fileInfo ? (
                <div className="space-y-4">
                  {fileInfo.name && (
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-[#1e3a8a]">{fileInfo.name}</h2>
                    </div>
                  )}
                  {fileInfo.path && (
                    <div className="mt-6 pt-4 border-t border-border">
                      <a
                        href={`${baseConfig.backendDomain}${fileInfo.path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#eff6ff] text-[#2563eb] rounded-lg hover:bg-[#dbeafe] transition-colors font-medium"
                      >
                        <FileText className="h-4 w-4" />
                        {t("detail.viewDocument")}
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>{t("detail.documentNotFound")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
