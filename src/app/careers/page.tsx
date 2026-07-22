"use client";

import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {MapPin , Search, MessageCircleQuestionMark , ArrowRight, Users, RefreshCw, Clock, UploadCloud, X, FileText } from "lucide-react";
import { usePostApiV10Candidate } from "@/api/endpoints/candidate";
import { usePostApiV10File } from "@/api/endpoints/file";
import type { CandidateMutate } from "@/api/models/candidateMutate";
import { usePostApiV10Question } from "@/api/endpoints/question";
import type { QuestionMutate } from "@/api/models/questionMutate";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toastErrorMessage, toast } from "@/components/ui/toaster";
import baseConfig from "@/configs/base";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useGetApiV10Recruitment } from "@/api/endpoints/recruitment";
import type { Recruitment } from "@/api/models/recruitment";
import { useDebounce } from "@/hooks";
interface Job {
  id: string;
  department: string;
  title: string;
  count: number;
  link: string;
  deadline: string;
  experience: string | null;
  employment_type: string | null;
  file_id: string | null;
}

const isDeadlineExpired = (deadlineStr: string) => {
  if (!deadlineStr) return false;
  const now = new Date();
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const d = new Date(deadlineStr);
  const deadlineDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return deadlineDay < nowDay;
};

const applicationSchema = z.object({
  name: z.string().trim().min(1, "validation.nameRequired"),
  address: z.string().trim().min(1, "validation.addressRequired"),
  phone: z
    .string()
    .trim()
    .min(1, "validation.phoneRequired")
    .regex(/^[0-9+\-\s().]{8,15}$/, "validation.phoneInvalid"),
  email: z
    .string()
    .trim()
    .min(1, "validation.emailRequired")
    .email("validation.emailInvalid"),
  foreign_language: z.string().trim().min(1, "validation.foreignLanguageRequired"),
  it_skill: z.string().trim().min(1, "validation.itSkillRequired"),
  degree: z
    .enum(["Trung cấp", "Cao đẳng", "Đại học", "Thạc sĩ", "Tiến sĩ"])
    .refine((val) => !!val, "validation.degreeRequired"),
  major: z.string().trim().min(1, "validation.majorRequired"),
  position: z.string().trim().min(1, "validation.positionRequired"),
});

const MAX_FILES = 4;
const MAX_FILE_SIZE_BYTES = 10000 * 1024;
const ALLOWED_FILE_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "png",
  "jpg",
  "jpeg",
  "gif",
] as const;

const fileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE_BYTES, {
    message: "validation.fileSize",
  })
  .refine((file) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    return !!ext && ALLOWED_FILE_EXTENSIONS.includes(ext as (typeof ALLOWED_FILE_EXTENSIONS)[number]);
  }, {
    message: "validation.fileType",
  });

const filesSchema = z
  .array(fileSchema)
  .min(1, "validation.fileRequired")
  .max(MAX_FILES, `validation.fileMax`);

const EDUCATION_LEVEL_MAP: Record<string, string> = {
  "Trung cấp": "trung_cap",
  "Cao đẳng": "cao_dang",
  "Đại học": "dai_hoc",
  "Thạc sĩ": "thac_si",
  "Tiến sĩ": "tien_si",
};

type ApplicationFormValues = z.infer<typeof applicationSchema>;
type ApplicationFormErrors = Partial<Record<keyof ApplicationFormValues, string>>;

export default function CareersPage() {
  const { t } = useTranslation("pages/careers");
  const { mutateAsync: submitCandidate, isPending: isSubmittingCandidate } =
    usePostApiV10Candidate();
  const { mutateAsync: uploadFile, isPending: isUploadingCv } = usePostApiV10File();

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [positionSearchTerm, setPositionSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const debouncedPositionSearchTerm = useDebounce(positionSearchTerm, 250);

  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [appForm, setAppForm] = useState({
    name: "", address: "", phone: "", email: "", foreign_language: "",
    it_skill: "", degree: "", major: "", position: "", recruitment_id: ""
  });
  const [appErrors, setAppErrors] = useState<ApplicationFormErrors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const closeAppModal = () => {
    setIsApplicationModalOpen(false);
  };

  const resetAppForm = () => {
    setAppForm({name: "", address: "", phone: "", email: "", foreign_language: "", it_skill: "", degree: "", major: "", position: "", recruitment_id: ""});
    setAppErrors({});
    setFiles([]);
    setFileError("");
    setPositionSearchTerm("");
  };

  const buildCvUrl = (path: string) => {
    const domain = baseConfig.backendDomain.replace(/\/+$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${domain}${normalizedPath}`;
  };

  const handleAppSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = applicationSchema.safeParse(appForm);
    if (!result.success) {
      const nextErrors: ApplicationFormErrors = {};
      const fieldErrors = result.error.flatten().fieldErrors;

      if (fieldErrors.name?.[0]) nextErrors.name = t(fieldErrors.name[0]);
      if (fieldErrors.phone?.[0]) nextErrors.phone = t(fieldErrors.phone[0]);
      if (fieldErrors.email?.[0]) nextErrors.email = t(fieldErrors.email[0]);
      if (fieldErrors.address?.[0]) nextErrors.address = t(fieldErrors.address[0]);
      if (fieldErrors.position?.[0]) nextErrors.position = t(fieldErrors.position[0]);
      if (fieldErrors.degree?.[0]) nextErrors.degree = t(fieldErrors.degree[0]);
      if (fieldErrors.major?.[0]) nextErrors.major = t(fieldErrors.major[0]);
      if (fieldErrors.foreign_language?.[0]) nextErrors.foreign_language = t(fieldErrors.foreign_language[0]);
      if (fieldErrors.it_skill?.[0]) nextErrors.it_skill = t(fieldErrors.it_skill[0]);

      setAppErrors(nextErrors);
      toast.warning({
        title: t("toast.notice"),
        content: t("toast.checkFields"),
      });
      return;
    }

    setAppErrors({});

    const filesResult = filesSchema.safeParse(files);
    if (!filesResult.success) {
      const firstError = filesResult.error.issues[0]?.message || "validation.fileListInvalid";
      const firstErrorMsg = t(firstError, { count: MAX_FILES });
      setFileError(firstErrorMsg);
      toast.warning({ title: t("toast.notice"), content: firstErrorMsg });
      return;
    }

    setFileError("");

    try {
      const uploadedFile = await uploadFile({
        data: {
          file: filesResult.data[0],
          type: "file",
          title: filesResult.data[0].name,
          is_in_library: false,
        },
      });

      const uploadedPath = uploadedFile?.responseData?.path;
      if (!uploadedPath) {
        toast.error({
          title: t("toast.uploadError"),
          content: t("toast.uploadPathError"),
        });
        return;
      }

      const candidatePayload: CandidateMutate = {
        full_name: result.data.name.trim(),
        address: result.data.address.trim(),
        phone: result.data.phone.trim(),
        email: result.data.email.trim(),
        recruitment_id: appForm.recruitment_id || null,
        position: result.data.position.trim(),
        language_proficiency: result.data.foreign_language.trim(),
        it_proficiency: result.data.it_skill.trim(),
        education_level:
          EDUCATION_LEVEL_MAP[result.data.degree] ?? result.data.degree.trim(),
        major: result.data.major.trim(),
        cv_url: buildCvUrl(uploadedPath),
        cover_letter: null,
        status: "pending",
      };

      await submitCandidate({ data: candidatePayload });
    } catch (error) {
      toastErrorMessage(error);
      console.error("Candidate submission error:", error);
      return;
    }

    toast.success({
      title: t("toast.submitSuccess"),
      content: t("toast.submitSuccessDesc"),
    });
    closeAppModal();
    resetAppForm();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const incoming = Array.from(e.dataTransfer.files);
      const merged = [...files, ...incoming];
      const result = filesSchema.safeParse(merged);

      if (!result.success) {
        const firstError = result.error.issues[0]?.message || "validation.fileListInvalid";
        const firstErrorMsg = t(firstError, { count: MAX_FILES });
        setFileError(firstErrorMsg);
        toast.warning({ title: t("toast.notice"), content: firstErrorMsg });
        return;
      }

      setFileError("");
      setFiles(merged);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const incoming = Array.from(e.target.files);
      const merged = [...files, ...incoming];
      const result = filesSchema.safeParse(merged);

      if (!result.success) {
        const firstError = result.error.issues[0]?.message || "validation.fileListInvalid";
        const firstErrorMsg = t(firstError, { count: MAX_FILES });
        setFileError(firstErrorMsg);
        toast.warning({ title: t("toast.notice"), content: firstErrorMsg });
        return;
      }

      setFileError("");
      setFiles(merged);
    }

    e.currentTarget.value = "";
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      if (next.length > 0) {
        setFileError("");
      }
      return next;
    });
  };

  const { mutateAsync: submitQuestion, isPending: isSubmittingQuestion } =
    usePostApiV10Question();

  const [questionForm, setQuestionForm] = useState({
    name: "",
    phone_number: "",
    email: "",
    address: "",
    major: "",
    question: "",
  });

  const closeQuestionModal = () => {
    setIsQuestionModalOpen(false);
  };

  const resetQuestionForm = () => {
    setQuestionForm({
      name: "",
      phone_number: "",
      email: "",
      address: "",
      major: "",
      question: "",
    });
  };

  const handleQuestionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: QuestionMutate = {
      name: questionForm.name.trim(),
      phone_number: questionForm.phone_number.trim(),
      email: questionForm.email.trim(),
      address: questionForm.address.trim(),
      question: questionForm.question.trim(),
      ...(questionForm.major.trim()
        ? { major: questionForm.major.trim() }
        : {}),
    };

    try {
      await submitQuestion({ data: payload });
      toast.success({
        title: t("questionSuccess"),
        content: t("questionSuccessDesc"),
      });
      closeQuestionModal();
      resetQuestionForm();
    } catch (error) {
      toastErrorMessage(error);
      console.error("Question submission error:", error);
    }
  };

  const { data, isLoading: loading, refetch } = useGetApiV10Recruitment({
    page: 1,
    pageSize: 100,
    sortField: "created_at",
    sortOrder: "desc",
    filters: debouncedSearchTerm ? `title@=${debouncedSearchTerm}` : undefined,
  });

  const jobs: Job[] = ((data as unknown as { responseData?: { rows?: Recruitment[] } })?.responseData?.rows ?? []).map((r: Recruitment) => ({
    id: r.id ?? "",
    department: r.location ?? "",
    title: r.title ?? "",
    count: r.quantity ?? 0,
    link: `#recruitment-${r.id}`,
    deadline: r.deadline ?? "",
    experience: r.experience ?? null,
    employment_type: r.employment_type ?? null,
    file_id: r.file_id ?? null,
  }));

  // Show all jobs from API (backend does not require experience/employment_type fields)
  const visibleJobs = jobs;

  const normalizedPositionSearch = debouncedPositionSearchTerm.trim().toLowerCase();
  const filteredJobs = normalizedPositionSearch
    ? visibleJobs.filter((job) => job.title.toLowerCase().includes(normalizedPositionSearch))
    : visibleJobs;



  const handleSearch = () => {
    refetch();
  };

  const handleReset = () => {
    setSearchTerm("");
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="relative px-4 py-20 text-center text-primary-foreground bg-gradient-to-b from-[#1e3a8a] via-primary/80 to-background">
        <div className="mx-auto max-w-full pt-10">

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t("recruitmentTitle")}
          </h1>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            {t("hiringNow")}
          </div>
          {/* <p className="mx-auto mb-12 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl">
            Trung tâm Dịch vụ Phân tích thí nghiệm và Tiêu chuẩn Chất lượng
            Thành phố Hồ Chí Minh thông báo tuyển dụng nhân sự
          </p> */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-20">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold sm:text-5xl">{visibleJobs.length}</span>
              <span className="mt-2 text-sm text-primary-foreground/80">
                {t("positions")}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold sm:text-5xl">{visibleJobs.reduce((acc, job) => acc + job.count, 0)}</span>
              <span className="mt-2 text-sm text-primary-foreground/80">
                {t("quota")}
              </span>
            </div>
            {/* <div className="flex flex-col items-center">
              <span className="text-4xl font-bold sm:text-5xl">TP.HCM</span>
              <span className="mt-2 text-sm text-primary-foreground/80">
                Địa điểm
              </span>
            </div> */}
          </div>
        </div>
      </section>

      {/* Jobs Listing Section */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-col items-center gap-6 border-b pb-12">
            <div className="text-center">
              {/* <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Vị trí đang tuyển
              </h2>
              <p className="mt-2 text-muted-foreground">
                Căn cứ vào nhu cầu tuyển dụng
              </p> */}
            </div>
            
            <div className="flex w-full md:w-max flex-col md:flex-row items-center gap-2 rounded-2xl md:rounded-full bg-card p-2 border border-border shadow-md hover:shadow-lg transition-shadow mt-4">
              <div className="flex w-full md:w-[380px] items-center gap-3 px-4 h-12">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none w-full border-none shadow-none focus-visible:ring-0 px-0"
                />
              </div>

              <div className="flex items-center justify-end w-full md:w-auto gap-2 px-2 pt-2 md:pt-0 md:pr-2 md:pb-0 pb-2">
                <button onClick={handleSearch} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
                  <Search className="h-5 w-5" />
                </button>
                <button onClick={handleReset} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm">
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-1 md:col-span-2 py-20 text-center text-muted-foreground">
                {t("loadingJobs")}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="col-span-1 md:col-span-2 py-20 text-center text-muted-foreground">
                {t("noJobsFound")}
              </div>
            ) : (
             filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/careers/${job.id}`}
                // target="_blank"
                // rel="noopener noreferrer"
                className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex rounded bg-[#1589d9] px-3 py-1.5 text-sm font-bold text-white uppercase">
                    {job.title}
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary shrink-0" />
                </div>

                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{t("deadlineLabel")} {job.deadline ? new Date(job.deadline).toLocaleDateString("vi-VN") : t("updating")}</span>
                </div>

                <div className="mt-1 flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {t("quantity")}:{" "}
                      <strong className="text-foreground">
                        {job.count.toString().padStart(2, "0")}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#1589d9]">
                    <MapPin className="h-4 w-4" />
                    <span>{job.department}</span>
                  </div>
                </div>
              </Link>
             ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-8 pb-24">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] p-8 text-center sm:p-16 relative">
          <div className="relative z-10 text-primary-foreground">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              {t("ctaTitle")}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg opacity-90">
              {t("ctaDesc")}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                onClick={() => setIsApplicationModalOpen(true)}
                className="rounded-full bg-background text-primary hover:bg-background/90 h-14 px-8 text-base shadow-lg shadow-black/10"
              >
                {t("submitNow")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsQuestionModalOpen(true)}
                className="rounded-full border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm h-14 px-8 text-base"
              >
                <MessageCircleQuestionMark className="mr-2 h-5 w-5" />
                {t("askQuestion")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Question Modal */}
      {isQuestionModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeQuestionModal}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-background shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-[#4a55e6] to-[#3944d6] text-white p-6 relative">
              <button
                onClick={closeQuestionModal}
                className="absolute top-4 right-4 rounded-full p-2 text-white/80 hover:text-white transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                  <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                  <MessageCircleQuestionMark className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-2xl">{t("questionModalTitle")}</h3>
              </div>
              <p className="text-white/90 text-[15px] mt-2">{t("questionModalDesc")}</p>
            </div>
            
            <form className="p-6 md:p-8 space-y-6" onSubmit={handleQuestionSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[14px] font-semibold flex items-center gap-2 text-foreground/80">
                    <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    {t("fullName")} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={questionForm.name}
                    onChange={(e) =>
                      setQuestionForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Nguyễn Văn A"
                    required
                    className="h-12 bg-muted/40 border-muted-foreground/20 focus-visible:ring-[#4a55e6] focus-visible:border-[#4a55e6]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-semibold flex items-center gap-2 text-foreground/80">
                    <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> 
                    {t("phone")} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={questionForm.phone_number}
                    onChange={(e) =>
                      setQuestionForm((prev) => ({
                        ...prev,
                        phone_number: e.target.value,
                      }))
                    }
                    placeholder="0901 234 567"
                    required
                    className="h-12 bg-muted/40 border-muted-foreground/20 focus-visible:ring-[#4a55e6] focus-visible:border-[#4a55e6]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-semibold flex items-center gap-2 text-foreground/80">
                    <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={questionForm.email}
                    onChange={(e) =>
                      setQuestionForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    type="email"
                    placeholder="email@example.com"
                    required
                    className="h-12 bg-muted/40 border-muted-foreground/20 focus-visible:ring-[#4a55e6] focus-visible:border-[#4a55e6]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-semibold flex items-center gap-2 text-foreground/80">
                    <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    {t("address")} <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={questionForm.address}
                    onChange={(e) =>
                      setQuestionForm((prev) => ({ ...prev, address: e.target.value }))
                    }
                    placeholder="TP. Hồ Chí Minh"
                    required
                    className="h-12 bg-muted/40 border-muted-foreground/20 focus-visible:ring-[#4a55e6] focus-visible:border-[#4a55e6]"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[14px] font-semibold flex items-center gap-2 text-foreground/80">
                    <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8"></path><path d="M12 17v4"></path><path d="M7 4h10"></path><path d="M17 4v7a5 5 0 0 1-10 0V4"></path></svg>
                    {t("positionApplied")}
                  </label>
                  <Input
                    value={questionForm.major}
                    onChange={(e) =>
                      setQuestionForm((prev) => ({ ...prev, major: e.target.value }))
                    }
                    placeholder={t("positionPlaceholder")}
                    className="h-12 w-full bg-muted/40 border-muted-foreground/20 focus-visible:ring-[#4a55e6] focus-visible:border-[#4a55e6]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[14px] font-semibold flex items-center gap-2 text-foreground/80">
                  {t("questionContent")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={questionForm.question}
                  onChange={(e) =>
                    setQuestionForm((prev) => ({ ...prev, question: e.target.value }))
                  }
                  className="flex min-h-[140px] w-full rounded-xl border border-muted-foreground/20 bg-muted/40 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a55e6] focus-visible:border-[#4a55e6] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 resize-none shadow-sm transition-all"
                  placeholder={t("questionPlaceholder")} 
                  required
                />
              </div>
              <div className="pt-2">
                 <Button
                  type="submit"
                  disabled={isSubmittingQuestion}
                  className="w-full h-14 text-base font-semibold bg-[#4a55e6] hover:bg-[#3944d6] shadow-lg shadow-[#4a55e6]/20 rounded-xl transition-all"
                 >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                  {isSubmittingQuestion ? t("sending") : t("sendQuestion")}
                 </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {isApplicationModalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={closeAppModal}
        >
          <div
            className="relative w-full max-w-5xl bg-white shadow-2xl animate-in fade-in zoom-in duration-200 rounded-lg m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-1 border border-dashed border-foreground/30 rounded-lg m-2">
              <div className="p-6 md:p-10 overflow-y-auto max-h-[85vh]">
                <button
                  type="button"
                  onClick={closeAppModal}
                  className="absolute top-6 right-6 p-2 text-muted-foreground hover:bg-muted/20 rounded-full transition-colors z-10"
                >
                  <X className="h-5 w-5" />
                </button>

                <h2
                  className="text-center text-2xl md:text-3xl font-bold uppercase mb-8 text-[#1a1a1a]"
                  style={{ fontFamily: "'Times New Roman', serif" }}
                >
                  {t("appModalTitle")}
                </h2>

                <form onSubmit={handleAppSubmit} noValidate className="space-y-8">
                  {/* File Upload Zone */}
                  <div
                    className="border border-dashed border-blue-400 bg-[#f8fafc] rounded-xl p-8 text-center transition-colors hover:bg-blue-50/50"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="mx-auto w-12 h-12 bg-[#e0f2fe] text-blue-500 rounded-full flex items-center justify-center mb-4">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <p className="font-bold text-[15px] mb-1">{t("dragDrop")}</p>
                    <p className="text-[13px] text-muted-foreground mb-4">
                      {t("orChoose")}{" "}
                      <label className="text-blue-500 cursor-pointer hover:underline">
                        {t("chooseFromComputer")}
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif"
                        />
                      </label>
                    </p>
                    <p className="text-[12px] text-muted-foreground flex items-center justify-center gap-2">
                      {t("fileTypes")}
                    </p>
                    {fileError && (
                      <p className="text-xs text-red-500 mt-3">{fileError}</p>
                    )}
                  </div>

                  {files.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 border rounded-lg bg-background shadow-sm text-sm"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                            <span className="truncate text-foreground/80 font-medium">
                              {file.name}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-red-500 hover:text-red-700 ml-2 shrink-0 p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* separator */}
                  <div className="border-t border-dashed border-border my-6"></div>

                  {/* 3 cols Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-foreground/80">
                        {t("fullName")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={appForm.name}
                        onChange={(e) => {
                          setAppForm((p) => ({ ...p, name: e.target.value }));
                          setAppErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder={t("enterName")}
                        required
                        className="h-11 bg-background"
                      />
                      {appErrors.name && (
                        <p className="text-xs text-red-500">{appErrors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-foreground/80">
                        {t("phone")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={appForm.phone}
                        onChange={(e) => {
                          setAppForm((p) => ({ ...p, phone: e.target.value }));
                          setAppErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder={t("enterPhone")}
                        required
                        className="h-11 bg-background"
                      />
                      {appErrors.phone && (
                        <p className="text-xs text-red-500">{appErrors.phone}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-foreground/80">
                        {t("email")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        value={appForm.email}
                        onChange={(e) => {
                          setAppForm((p) => ({ ...p, email: e.target.value }));
                          setAppErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder={t("enterEmail")}
                        required
                        className="h-11 bg-background"
                      />
                      {appErrors.email && (
                        <p className="text-xs text-red-500">{appErrors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-foreground/80">
                        {t("address")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={appForm.address}
                        onChange={(e) => {
                          setAppForm((p) => ({ ...p, address: e.target.value }));
                          setAppErrors((prev) => ({ ...prev, address: undefined }));
                        }}
                        placeholder={t("enterAddress")}
                        required
                        className="h-11 bg-background"
                      />
                      {appErrors.address && (
                        <p className="text-xs text-red-500">{appErrors.address}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-foreground/80">
                        {t("positionApplied")} <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={appForm.recruitment_id || undefined}
                        onValueChange={(val) => {
                          const selected = jobs.find((job) => job.id === val);
                          const expired = selected && selected.deadline ? isDeadlineExpired(selected.deadline) : false;
                          setAppForm((p) => ({
                            ...p,
                            recruitment_id: val,
                            position: selected?.title ?? "",
                          }));
                          if (expired) {
                            setAppErrors((prev) => ({ ...prev, position: t("validation.positionExpired") }));
                          } else {
                            setAppErrors((prev) => ({ ...prev, position: undefined }));
                          }
                        }}
                        required
                      >
                        <SelectTrigger className="h-11 bg-background">
                          <SelectValue placeholder={t("selectPosition")} />
                        </SelectTrigger>
                        <SelectContent className="z-[70]">
                          <div className="p-2">
                            <Input
                              value={positionSearchTerm}
                              onChange={(e) => setPositionSearchTerm(e.target.value)}
                              placeholder={t("searchPosition")}
                              className="h-9 bg-background"
                              onKeyDown={(e) => e.stopPropagation()}
                            />
                          </div>
                          {filteredJobs.length > 0 ? (
                            filteredJobs.map((item) => (
                              <SelectItem key={item.id} value={item.id}>
                                {item.title}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="__empty" disabled>
                              {t("noPositionFound")}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      {appErrors.position && (
                        <p className="text-xs text-red-500">{appErrors.position}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-foreground/80">
                        {t("degree")} <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={appForm.degree || undefined}
                        onValueChange={(val) => {
                          setAppForm((p) => ({ ...p, degree: val }));
                          setAppErrors((prev) => ({ ...prev, degree: undefined }));
                        }}
                        required
                      >
                        <SelectTrigger className="h-11 bg-background">
                          <SelectValue placeholder={t("selectDegree")} />
                        </SelectTrigger>
                        <SelectContent className="z-[70]">
                          <SelectItem value="Trung cấp">1. {t("degreeAssociate")}</SelectItem>
                          <SelectItem value="Cao đẳng">2. {t("degreeCollege")}</SelectItem>
                          <SelectItem value="Đại học">3. {t("degreeBachelor")}</SelectItem>
                          <SelectItem value="Thạc sĩ">4. {t("degreeMaster")}</SelectItem>
                          <SelectItem value="Tiến sĩ">5. {t("degreePhD")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {appErrors.degree && (
                        <p className="text-xs text-red-500">{appErrors.degree}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-foreground/80">
                        {t("major")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={appForm.major}
                        onChange={(e) => {
                          setAppForm((p) => ({ ...p, major: e.target.value }));
                          setAppErrors((prev) => ({ ...prev, major: undefined }));
                        }}
                        placeholder={t("enterMajor")}
                        required
                        className="h-11 bg-background"
                      />
                      {appErrors.major && (
                        <p className="text-xs text-red-500">{appErrors.major}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-foreground/80">
                        {t("foreignLanguage")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={appForm.foreign_language}
                        onChange={(e) => {
                          setAppForm((p) => ({ ...p, foreign_language: e.target.value }));
                          setAppErrors((prev) => ({ ...prev, foreign_language: undefined }));
                        }}
                        placeholder={t("enterForeignLanguage")}
                        required
                        className="h-11 bg-background"
                      />
                      {appErrors.foreign_language && (
                        <p className="text-xs text-red-500">{appErrors.foreign_language}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[13px] font-medium text-foreground/80">
                        {t("itSkill")} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={appForm.it_skill}
                        onChange={(e) => {
                          setAppForm((p) => ({ ...p, it_skill: e.target.value }));
                          setAppErrors((prev) => ({ ...prev, it_skill: undefined }));
                        }}
                        placeholder={t("enterItSkill")}
                        required
                        className="h-11 bg-background"
                      />
                      {appErrors.it_skill && (
                        <p className="text-xs text-red-500">{appErrors.it_skill}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isUploadingCv || isSubmittingCandidate || (appForm.recruitment_id ? isDeadlineExpired(jobs.find((job) => job.id === appForm.recruitment_id)?.deadline || "") : false)}
                      className="w-full h-12 text-base font-bold bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] transition-colors rounded-md shadow-sm"
                    >
                      {isUploadingCv || isSubmittingCandidate
                        ? t("submitting")
                        : (appForm.recruitment_id ? isDeadlineExpired(jobs.find((job) => job.id === appForm.recruitment_id)?.deadline || "") : false)
                          ? t("expired")
                          : t("submit")}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
