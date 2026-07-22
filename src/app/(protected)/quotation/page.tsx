"use client";

import { useState } from "react";
import QuotationForm from "./components/quotation-form";
import QuotationList from "./components/quotation-list";

export default function QuotationPage() {
  const [isFormView, setIsFormView] = useState(false);

  if (isFormView) {
    return <QuotationForm onSuccess={() => setIsFormView(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <QuotationList onCreateNew={() => setIsFormView(true)} />
      </div>
    </div>
  );
}
