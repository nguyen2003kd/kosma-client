"use client";

import { useGetApiV10Quotation } from "@/api/endpoints/quotation";
import { useState } from "react";
import type { ExtendedQuotation } from "../../libs/types";
import QuotationDetails from "./components/quotation-details";
import QuotationTable from "./components/quotation-table";

interface QuotationListProps {
  onCreateNew: () => void;
}

export default function QuotationList({ onCreateNew }: QuotationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedQuotation, setSelectedQuotation] =
    useState<ExtendedQuotation | null>(null);
  const [page] = useState(1);
  const [pageSize] = useState(100);

  const { data, isLoading, error, refetch } = useGetApiV10Quotation({
    page,
    pageSize,
  });

  return (
    <>
      <QuotationTable
        data={data?.responseData?.rows || []}
        isLoading={isLoading}
        error={error as Error | null}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        onSearchChange={setSearchQuery}
        onStatusFilterChange={setStatusFilter}
        onViewDetails={setSelectedQuotation}
        onCreateNew={onCreateNew}
        onRefetch={refetch}
      />
      <QuotationDetails
        quotation={selectedQuotation}
        onClose={() => setSelectedQuotation(null)}
      />
    </>
  );
}
