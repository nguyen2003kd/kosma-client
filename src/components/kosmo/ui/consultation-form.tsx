"use client";

import { useState } from "react";
import { Input, Textarea, Select } from "./input";
import { Button } from "./button";
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
      <div className="bg-black-900 rounded-2xl p-8 md:p-12 text-center shadow-strong">
        <div className="w-16 h-16 rounded-xl bg-[#d8c29c] flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-black-950" />
        </div>
        <h3 className="font-serif text-[28px] text-white mb-4">
          Thank You!
        </h3>
        <p className="text-white mb-6">
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
    <div className="grid md:grid-cols-[0.9fr_1.1fr] rounded-2xl overflow-hidden shadow-strong">
      {/* Left Side - Info */}
      <div className="bg-black-900 p-8 md:p-12">
        <h3 className="font-serif text-[28px] text-white mb-4">{title}</h3>
        <p className="text-white mb-8">{subtitle}</p>

        {/* Checklist */}
        <div className="space-y-4">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-xl bg-[#d8c29c] flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-black-950" />
              </div>
              <span className="text-white text-[15px]">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="bg-white p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ZIP Code"
              id="zipCode"
              required
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
            />
            <Select
              label="Project Type"
              id="spaceType"
              required
              value={formData.spaceType}
              onChange={(e) =>
                setFormData({ ...formData, spaceType: e.target.value })
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

          <p className="text-[12px] text-gray-600 text-center">
            By submitting, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </div>
    </div>
  );
}
