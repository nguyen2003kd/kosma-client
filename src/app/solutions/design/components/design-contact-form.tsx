"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/common/input";
import { CustomSelect } from "@/components/common/custom-select";
import { Button } from "@/components/ui/button";
import { Check, Loader2, MessageCircle } from "lucide-react";

const CONTACT_METHOD_OPTIONS = [
  { value: "phone", label: "Phone Call" },
  { value: "email", label: "Email" },
  { value: "text", label: "Text Message" },
  { value: "video", label: "Video Consultation" },
];

const SERVICE_OPTIONS = [
  { value: "adapt", label: "Adapt this design to my space" },
  { value: "similar", label: "Looking for a similar design" },
  { value: "custom", label: "Want a fully custom design" },
  { value: "consultation", label: "Just need a consultation" },
];

const checklistItems = [
  "Free design consultation",
  "Custom adaptation to your space",
  "Quick response within 24 hours",
  "No commitment required",
];

interface DesignContactFormData {
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  preferredContact: string;
  message: string;
}

const initialFormData: DesignContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  serviceInterest: "",
  preferredContact: "",
  message: "",
};

interface DesignContactFormProps {
  designTitle?: string;
}

export function DesignContactForm({ designTitle }: DesignContactFormProps) {
  const [formData, setFormData] = useState<DesignContactFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof DesignContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: call API when available
    // eslint-disable-next-line no-console
    console.log("Design contact submitted:", { ...formData, designTitle });
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-black-900 rounded-2xl p-6 sm:p-8 md:p-10 text-center shadow-strong">
        <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-[#d8c29c] flex items-center justify-center mx-auto mb-5 sm:mb-6">
          <Check className="w-7 sm:w-8 h-7 sm:h-8 text-black-950" />
        </div>
        <h3 className="font-serif text-[24px] sm:text-[28px] text-white mb-3 sm:mb-4">
          Thank You!
        </h3>
        <p className="text-white mb-5 sm:mb-6 text-sm sm:text-base max-w-md mx-auto">
          Your request has been received. Our design team will review your
          requirements and contact you within 24 hours to discuss the details.
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
    <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.3fr] rounded-2xl overflow-hidden shadow-strong">
      {/* Left Side - Info */}
      <div className="bg-black-900 p-5 sm:p-6 md:p-8 lg:p-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#d8c29c] flex items-center justify-center">
            <MessageCircle className="w-4.5 h-4.5 text-black-950" />
          </div>
          <h3 className="font-serif text-[20px] sm:text-[22px] text-white leading-tight">
            Interested in This Design?
          </h3>
        </div>
        <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base">
          {designTitle
            ? `Tell us what you like about "${designTitle}" and we'll help you adapt it to your space.`
            : "Share your requirements and our design team will help you bring this design to life."}
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
              label="Email"
              id="email"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <Input
            label="Phone"
            id="phone"
            type="tel"
            required
            placeholder="(443) 736-0577"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CustomSelect
              label="What do you need?"
              id="serviceInterest"
              required
              value={formData.serviceInterest}
              onChange={(value) => handleChange("serviceInterest", value)}
              options={SERVICE_OPTIONS}
              placeholder="Select an option"
            />
            <CustomSelect
              label="Preferred Contact"
              id="preferredContact"
              value={formData.preferredContact}
              onChange={(value) => handleChange("preferredContact", value)}
              options={CONTACT_METHOD_OPTIONS}
              placeholder="How should we reach you?"
            />
          </div>

          <Textarea
            label="Your Message"
            id="message"
            placeholder="Tell us about your space, what you like about this design, and any specific requirements..."
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
              "Request Consultation"
            )}
          </Button>

          <p className="text-[11px] sm:text-[12px] text-gray-600 text-center">
            By submitting, you agree to our privacy policy. Our team will
            contact you within 24 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
