"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/common/input";
import { CustomSelect } from "@/components/common/custom-select";
import { Button } from "@/components/ui/button";
import { Check, HardHat, Loader2, Phone, Wrench } from "lucide-react";

const PROJECT_TYPE_OPTIONS = [
  { value: "residential", label: "Residential Build" },
  { value: "commercial", label: "Commercial Fit-Out" },
  { value: "renovation", label: "Renovation / Remodel" },
  { value: "joinery", label: "Custom Joinery" },
  { value: "other", label: "Other" },
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP (within 1 month)" },
  { value: "1-3-months", label: "1 – 3 months" },
  { value: "3-6-months", label: "3 – 6 months" },
  { value: "flexible", label: "Flexible" },
];

const checklistItems = [
  "Free on-site assessment & quote",
  "Licensed trades crew — not day labor",
  "Transparent fixed-price bidding",
  "Licensed MD #113826 & insured",
];

interface ConstructionContactFormData {
  fullName: string;
  email: string;
  phone: string;
  projectAddress: string;
  projectType: string;
  timeline: string;
  message: string;
}

const initialFormData: ConstructionContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  projectAddress: "",
  projectType: "",
  timeline: "",
  message: "",
};

interface ConstructionContactFormProps {
  postTitle?: string;
}

export function ConstructionContactForm({ postTitle }: ConstructionContactFormProps) {
  const [formData, setFormData] = useState<ConstructionContactFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ConstructionContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: call API when available
    // eslint-disable-next-line no-console
    console.log("Construction contact submitted:", { ...formData, postTitle });
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-black-950 rounded-xl p-6 sm:p-8 md:p-10 text-center shadow-strong border-t-4 border-[#d8c29c]">
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-[#d8c29c] flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <Check className="w-7 sm:w-8 h-7 sm:h-8 text-black-950" />
        </div>
        <h3 className="font-serif text-[24px] sm:text-[28px] text-white mb-3 sm:mb-4">
          Request Received
        </h3>
        <p className="text-white/80 mb-5 sm:mb-6 text-sm sm:text-base max-w-md mx-auto">
          Thanks for reaching out. Our crew will review your project details and
          contact you within 24 hours to schedule a free on-site assessment.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setIsSubmitted(false);
            setFormData(initialFormData);
          }}
        >
          Send Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] rounded-xl overflow-hidden shadow-strong border border-line">
      {/* Left Side - Info (craftsman style) */}
      <div className="bg-black-950 p-5 sm:p-6 md:p-8 lg:p-10 relative">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#d8c29c]" />

        <div className="inline-flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#d8c29c] flex items-center justify-center">
            <HardHat className="w-5 h-5 text-black-950" />
          </div>
          <div>
            <h3 className="font-serif text-[20px] sm:text-[22px] text-white leading-tight">
              Talk to Our Crew
            </h3>
            <p className="text-white/60 text-[12px] mt-0.5">Direct. No middlemen.</p>
          </div>
        </div>

        <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
          {postTitle
            ? `Interested in the craftsmanship from "${postTitle}"? Tell us about your project and we'll send our crew for a free on-site assessment.`
            : "Tell us about your project. Our crew will assess the site, discuss your requirements, and provide a transparent fixed-price quote."}
        </p>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-start sm:items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-[#d8c29c] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                <Check className="w-3.5 h-3.5 text-black-950" />
              </div>
              <span className="text-white text-[13px] sm:text-[15px] leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Direct contact */}
        <div className="pt-5 border-t border-white/15 space-y-3">
          <div className="flex items-center gap-3 text-white/90">
            <Phone className="w-4 h-4 text-[#d8c29c] flex-shrink-0" />
            <span className="text-[13px] sm:text-[14px]">(443) 736-0577</span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <Wrench className="w-4 h-4 text-[#d8c29c] flex-shrink-0" />
            <span className="text-[13px] sm:text-[14px]">Licensed MD #113826</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="bg-white p-5 sm:p-6 md:p-8 lg:p-10">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              id="fullName"
              required
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
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
              label="Project Address"
              id="projectAddress"
              placeholder="123 Main St, Rockville MD"
              value={formData.projectAddress}
              onChange={(e) => handleChange("projectAddress", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomSelect
              label="Project Type"
              id="projectType"
              required
              value={formData.projectType}
              onChange={(value) => handleChange("projectType", value)}
              options={PROJECT_TYPE_OPTIONS}
              placeholder="Select project type"
            />
            <CustomSelect
              label="Timeline"
              id="timeline"
              value={formData.timeline}
              onChange={(value) => handleChange("timeline", value)}
              options={TIMELINE_OPTIONS}
              placeholder="When to start?"
            />
          </div>

          <Textarea
            label="Project Details"
            id="message"
            placeholder="Describe your project scope, what you need built, and any specific requirements..."
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Request Free Site Assessment"
            )}
          </Button>

          <p className="text-[11px] sm:text-[12px] text-gray-600 text-center">
            Our crew will contact you within 24 hours to schedule a site visit.
          </p>
        </form>
      </div>
    </div>
  );
}
