"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/common/input";
import { CustomSelect } from "@/components/common/custom-select";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const checklistItems = [
  "Free project consultation & quote",
  "Concept design with 3D renderings",
  "Design-build under one roof",
  "Licensed MD #113826 & insured",
];

interface ConsultationFormProps {
  title?: string;
  subtitle?: string;
}

export function ConsultationForm({
  title = "Ready to Start Your Project?",
  subtitle = "Request a free project quote today and let our team help you design, build and brand your space.",
}: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    spaceType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
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
        <p className="text-white mb-5 sm:mb-6 text-sm sm:text-base">
          Your consultation request has been submitted. Our team will contact you within 24 hours.
        </p>
        <Button
          variant="secondary"
          onClick={() => setIsSubmitted(false)}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] rounded-2xl overflow-hidden shadow-strong">
      {/* Left Side - Info */}
      <div className="bg-black-900 p-5 sm:p-6 md:p-10 lg:p-12">
        <h3 className="font-serif text-[22px] sm:text-[26px] md:text-[28px] text-white mb-3 sm:mb-4 leading-tight">{title}</h3>
        <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base">{subtitle}</p>

        {/* Checklist */}
        <div className="space-y-3 sm:space-y-4">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-start sm:items-center gap-3">
              <div className="w-6 h-6 rounded-xl bg-[#d8c29c] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0">
                <Check className="w-3.5 h-3.5 text-black-950" />
              </div>
              <span className="text-white text-[13px] sm:text-[15px] leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="bg-white p-5 sm:p-6 md:p-10 lg:p-12">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <Input
              label="Last Name"
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>

          <Input
            label="Email"
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <Input
            label="Phone"
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="ZIP Code"
              id="zipCode"
              required
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
            />
            <CustomSelect
              label="Project Type"
              id="spaceType"
              required
              value={formData.spaceType}
              onChange={(value) =>
                setFormData({ ...formData, spaceType: value })
              }
              options={[
                { value: "commercial", label: "Commercial Fit-Out" },
                { value: "nail-salon", label: "Nail Salon Design" },
                { value: "residential", label: "Residential Renovation" },
                { value: "kitchen", label: "Kitchen Renovation" },
                { value: "joinery", label: "Custom Joinery" },
                { value: "branding", label: "Branding" },
                { value: "other", label: "Other" },
              ]}
              placeholder="Select project type"
            />
          </div>

          <Textarea
            label="Tell us about your project"
            id="message"
            placeholder="Describe your project scope and goals..."
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />

          <Button type="submit" className="w-full">
            Request a Free Quote
          </Button>

          <p className="text-[11px] sm:text-[12px] text-gray-600 text-center">
            By submitting, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </div>
    </div>
  );
}
