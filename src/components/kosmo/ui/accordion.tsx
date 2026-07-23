"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-mutedLine">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-[22px] text-left"
      >
        <span className="font-serif text-[24px] text-ink pr-4">{question}</span>
        <span
          className={cn(
            "flex-shrink-0 w-[30px] h-[30px] rounded-xl bg-gray-100 flex items-center justify-center text-black-800 transition-transform duration-300",
            isOpen && "rotate-45"
          )}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[220px] pb-[22px]" : "max-h-0"
        )}
      >
        <p className="text-[15px] text-gray-700 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

interface FAQSectionProps {
  items: FAQItemProps[];
}

export function FAQSection({ items }: FAQSectionProps) {
  return (
    <div className="max-w-[900px] mx-auto">
      {items.map((item, index) => (
        <FAQItem key={index} {...item} />
      ))}
    </div>
  );
}

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function StyleTabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "min-h-[42px] px-[18px] rounded-xl text-[13px] font-extrabold transition-all duration-250",
            activeTab === tab.id
              ? "bg-black-800 text-white"
              : "border border-mutedLine text-black-800 hover:border-black-800"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

interface FeatureRowProps {
  features: { title: string; description: string }[];
}

export function FeatureRow({ features }: FeatureRowProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {features.map((feature, index) => (
        <div key={index} className="flex gap-3 sm:gap-4">
          <div className="flex-shrink-0 w-[40px] sm:w-[46px] h-[40px] sm:h-[46px] rounded-xl bg-[#d8c29c] flex items-center justify-center">
            <span className="text-black-950 font-bold text-sm">{index + 1}</span>
          </div>
          <div>
            <h4 className="font-semibold text-ink mb-1">{feature.title}</h4>
            <p className="text-[13px] sm:text-[14px] text-gray-700">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface SplitContentProps {
  image: string;
  eyebrow?: string;
  title: string;
  description?: string;
  features?: { title: string; description: string }[];
  cta?: { label: string; href: string };
  reverse?: boolean;
}

export function SplitContent({
  image,
  eyebrow,
  title,
  description,
  features,
  cta,
  reverse = false,
}: SplitContentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
      {/* Image */}
      <div className={cn("order-1", reverse && "md:order-2")}>
        <div
          className="rounded-xl overflow-hidden h-[260px] sm:h-[360px] md:h-[440px] lg:h-[500px] xl:h-[650px] bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      {/* Content */}
      <div className={cn("order-2 px-1 md:px-0", reverse && "md:order-1")}>
        {eyebrow && (
          <p className="text-[11px] sm:text-eyebrow text-black-700 font-extrabold uppercase tracking-[0.18em] mb-2 sm:mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[40px] lg:text-[44px] xl:text-h1 text-ink mb-3 sm:mb-4 leading-tight">{title}</h2>
        {description && (
          <p className="text-[14px] sm:text-[15px] md:text-[17px] text-gray-700 mb-5 sm:mb-6 leading-relaxed">
            {description}
          </p>
        )}
        {features && <FeatureRow features={features} />}
        {cta && (
          <a
            href={cta.href}
            className="inline-flex items-center gap-2 text-black-800 font-extrabold text-[13px] sm:text-[14px] hover:gap-3 transition-all mt-5 sm:mt-6"
          >
            {cta.label}
            <span>→</span>
          </a>
        )}
      </div>
    </div>
  );
}
