"use client";

import { useState, useRef } from "react";
import { usePostApiV10Question } from "@/api/endpoints/question";
import { usePostApiV10File } from "@/api/endpoints/file";
import { Input, Textarea } from "@/components/common/input";
import { CustomSelect } from "@/components/common/custom-select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";
import { mainInstance } from "@/api/mutator/custom-instance";
import { Check, FileVideo, Image as ImageIcon, Loader2, Upload, X } from "lucide-react";

const IMAGE_MAX_MB = 5;
const VIDEO_MAX_MB = 100;
const IMAGE_MAX_BYTES = IMAGE_MAX_MB * 1024 * 1024;
const VIDEO_MAX_BYTES = VIDEO_MAX_MB * 1024 * 1024;

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif", ".webp"];
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".mov", ".avi", ".mkv"];
const ACCEPTED_EXTENSIONS = [...IMAGE_EXTENSIONS, ...VIDEO_EXTENSIONS];

function getFileKind(file: File): "image" | "video" | "other" {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (IMAGE_EXTENSIONS.includes(ext)) return "image";
  if (VIDEO_EXTENSIONS.includes(ext)) return "video";
  return "other";
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const PRODUCT_OPTIONS = [
  { value: "living-room", label: "Living Room Design" },
  { value: "kitchen", label: "Kitchen Renovation" },
  { value: "bedroom", label: "Bedroom Design" },
  { value: "bathroom", label: "Bathroom Remodel" },
  { value: "office", label: "Office / Workspace" },
  { value: "commercial", label: "Commercial Fit-Out" },
  { value: "custom-joinery", label: "Custom Joinery & Furniture" },
  { value: "full-home", label: "Full Home Renovation" },
  { value: "other", label: "Other" },
];

const BUDGET_OPTIONS = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-100k", label: "$50,000 - $100,000" },
  { value: "100k-plus", label: "$100,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP (within 1 month)" },
  { value: "1-3-months", label: "1 - 3 months" },
  { value: "3-6-months", label: "3 - 6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "flexible", label: "Flexible" },
];

const checklistItems = [
  "Free design consultation & quote",
  "3D renderings & material samples",
  "Custom product sourcing & pricing",
  "Licensed MD #113826 & insured",
];

interface CustomDesignFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  productInterest: string;
  budgetRange: string;
  timeline: string;
  message: string;
}

const initialFormData: CustomDesignFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  productInterest: "",
  budgetRange: "",
  timeline: "",
  message: "",
};

export function CustomDesignForm() {
  const [formData, setFormData] = useState<CustomDesignFormData>(initialFormData);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: submitQuestion, isPending: isSubmitting } = usePostApiV10Question({
    mutation: {
      onError: (error) => {
        toast.error({
          title: "Submission failed",
          content:
            error instanceof Error
              ? error.message
              : "Could not submit your inquiry. Please try again.",
        });
      },
    },
  });

  const { mutateAsync: uploadFile } = usePostApiV10File();

  const handleChange = (field: keyof CustomDesignFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const accepted: File[] = [];
    for (const file of selected) {
      const kind = getFileKind(file);
      if (kind === "image" && file.size > IMAGE_MAX_BYTES) {
        toast.error({
          title: "File too large",
          content: `"${file.name}" exceeds the ${IMAGE_MAX_MB}MB image limit.`,
        });
        continue;
      }
      if (kind === "video" && file.size > VIDEO_MAX_BYTES) {
        toast.error({
          title: "File too large",
          content: `"${file.name}" exceeds the ${VIDEO_MAX_MB}MB video limit.`,
        });
        continue;
      }
      if (kind === "other") {
        toast.error({
          title: "Unsupported file",
          content: `"${file.name}" is not a supported image or video format.`,
        });
        continue;
      }
      accepted.push(file);
    }
    if (accepted.length > 0) {
      setFiles((prev) => [...prev, ...accepted]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const contentParts = [formData.message];
    if (formData.productInterest) {
      const label = PRODUCT_OPTIONS.find((o) => o.value === formData.productInterest)?.label ?? formData.productInterest;
      contentParts.push(`Product/Service: ${label}`);
    }
    if (formData.budgetRange) {
      const label = BUDGET_OPTIONS.find((o) => o.value === formData.budgetRange)?.label ?? formData.budgetRange;
      contentParts.push(`Budget: ${label}`);
    }
    if (formData.timeline) {
      const label = TIMELINE_OPTIONS.find((o) => o.value === formData.timeline)?.label ?? formData.timeline;
      contentParts.push(`Timeline: ${label}`);
    }
    try {
      setIsUploading(true);
      const questionRes = (await submitQuestion({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone_number: formData.phone,
          address: formData.address,
          content: contentParts.filter(Boolean).join("\n"),
        },
      })) as { responseData?: { id?: string } } | undefined;

      const questionId = questionRes?.responseData?.id;

      // Upload files and link to question
      if (files.length > 0 && questionId) {
        const fileIds: string[] = [];
        for (const file of files) {
          const uploaded = (await uploadFile({
            data: {
              file,
              type: "file",
              title: file.name,
            },
          })) as { responseData?: { id?: string } } | undefined;
          const fileId = uploaded?.responseData?.id;
          if (fileId) fileIds.push(fileId);
        }

        if (fileIds.length > 0) {
          await mainInstance({
            url: "/api/v1.0/questionFile/bulk",
            method: "POST",
            data: {
              question_id: questionId,
              file_ids: fileIds,
            },
          });
        }
      }

      setIsSubmitted(true);
    } catch {
      // error handled in mutation.onError
    } finally {
      setIsUploading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-black-900 rounded-2xl p-6 sm:p-8 md:p-12 text-center shadow-strong">
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-[#d8c29c] flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <Check className="w-7 sm:w-8 h-7 sm:h-8 text-black-950" />
        </div>
        <h3 className="font-serif text-[24px] sm:text-[28px] text-white mb-3 sm:mb-4">
          Thank You!
        </h3>
        <p className="text-white mb-5 sm:mb-6 text-sm sm:text-base max-w-md mx-auto">
          Your design inquiry has been received. Our design team will review your
          requirements and contact you within 24 hours with next steps and a
          preliminary quote.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setIsSubmitted(false);
            setFormData(initialFormData);
            setFiles([]);
          }}
        >
          Submit Another Inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.4fr] rounded-2xl overflow-hidden shadow-strong">
      {/* Left Side - Info */}
      <div className="bg-black-900 p-5 sm:p-6 md:p-10 lg:p-12">
        <h3 className="font-serif text-[22px] sm:text-[26px] md:text-[28px] text-white mb-3 sm:mb-4 leading-tight">
          Tell Us About Your Project
        </h3>
        <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base">
          Share your design vision, budget, and product interests. We&apos;ll
          prepare a tailored proposal and reach out to discuss details.
        </p>

        <div className="space-y-3 sm:space-y-4">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-start sm:items-center gap-3">
              <div className="w-6 h-6 rounded-xl bg-[#d8c29c] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                <Check className="w-3.5 h-3.5 text-black-950" />
              </div>
              <span className="text-white text-[13px] sm:text-[15px] leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="bg-white p-5 sm:p-6 md:p-10 lg:p-12">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              id="firstName"
              required
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <Input
              label="Last Name"
              id="lastName"
              required
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              id="email"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
              label="Phone"
              id="phone"
              type="tel"
              required
              placeholder="(443) 736-0577"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <Input
            label="Address"
            id="address"
            required
            placeholder="123 Main St, Rockville, MD 20850"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />

          {/* Product Interest */}
          <CustomSelect
            label="Product / Service Interest"
            id="productInterest"
            required
            value={formData.productInterest}
            onChange={(value) => handleChange("productInterest", value)}
            options={PRODUCT_OPTIONS}
            placeholder="Select a product or service"
          />

          {/* Budget + Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomSelect
              label="Estimated Budget"
              id="budgetRange"
              required
              value={formData.budgetRange}
              onChange={(value) => handleChange("budgetRange", value)}
              options={BUDGET_OPTIONS}
              placeholder="Select budget range"
            />
            <CustomSelect
              label="Project Timeline"
              id="timeline"
              value={formData.timeline}
              onChange={(value) => handleChange("timeline", value)}
              options={TIMELINE_OPTIONS}
              placeholder="Select timeline"
            />
          </div>

          {/* Message */}
          <Textarea
            label="Content"
            id="message"
            placeholder="Describe your space, style preferences, products you're interested in, and any specific requirements..."
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />

          {/* File Upload (inspiration images / videos / floor plans) */}
          <div className="space-y-2">
            <label className="text-[12px] font-extrabold tracking-[0.04em] text-ink block">
              Inspiration Images / Videos / Floor Plans (optional)
            </label>
            <p className="text-xs text-gray-500">
              Upload reference photos, mood boards, videos, or floor plans (JPG, PNG, GIF, WebP — max 5MB; MP4, WebM, MOV — max 100MB)
            </p>
            <div
              className="border-2 border-dashed border-mutedLine rounded-[10px] p-4 text-center cursor-pointer hover:border-black-700 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload files</p>
              <p className="text-xs text-gray-400 mt-1">
                You can attach multiple images and videos
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                accept={ACCEPTED_EXTENSIONS.join(",")}
                onChange={handleFileSelect}
              />
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => {
                  const kind = getFileKind(file);
                  const Icon = kind === "video" ? FileVideo : ImageIcon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate flex-1">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {formatBytes(file.size)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting || isUploading}>
            {isSubmitting || isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Design Inquiry"
            )}
          </Button>

          <p className="text-[11px] sm:text-[12px] text-gray-600 text-center">
            By submitting, you agree to our privacy policy and terms of service.
            Our team will contact you within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
