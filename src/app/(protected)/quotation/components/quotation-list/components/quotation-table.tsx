"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  Eye,
  FileText,
  ListChecks,
  Loader2,
  RefreshCw,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ExtendedQuotation } from "../../../libs/types";

interface QuotationTableProps {
  data: ExtendedQuotation[];
  isLoading: boolean;
  error: Error | null;
  searchQuery: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onViewDetails: (quotation: ExtendedQuotation) => void;
  onCreateNew: () => void;
  onRefetch: () => void;
}

export default function QuotationTable({
  data,
  isLoading,
  error,
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onViewDetails,
  onCreateNew,
  onRefetch,
}: QuotationTableProps) {
  const { t, ready } = useTranslation("pages/quotation");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !ready) return null;

  const formatDate = (isoDate?: string) => {
    if (!isoDate) return t("notAvailable");
    const date = new Date(isoDate);
    return date.toLocaleDateString("vi-VN");
  };

  const getStatusBadgeColor = (statusName: string) => {
    switch (statusName) {
      case "Đã hoàn tất":
      case "Completed":
        return "bg-green-50 text-green-700 border border-green-300 hover:bg-green-100 hover:text-green-800";
      case "Mới tạo":
      case "New":
        return "bg-yellow-50 text-yellow-700 border border-yellow-300 hover:bg-yellow-100 hover:text-yellow-800";
      case "Đã từ chối":
      case "Rejected":
        return "bg-red-50 text-red-700 border border-red-300 hover:bg-red-100 hover:text-red-800";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-gray-800";
    }
  };

  const stats = {
    total: data.length,
    newRequests: data.filter(
      (r) =>
        r.quotation_status?.name === "Mới tạo" ||
        r.quotation_status?.name === "New",
    ).length,
    rejected: data.filter(
      (r) =>
        r.quotation_status?.name === "Đã từ chối" ||
        r.quotation_status?.name === "Rejected",
    ).length,
    completed: data.filter(
      (r) =>
        r.quotation_status?.name === "Đã hoàn tất" ||
        r.quotation_status?.name === "Completed",
    ).length,
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organization_name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.quotation_status?.name === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("listTitle")}</h1>
          <p className="text-sm text-gray-500 mt-1">{t("listSubtitle")}</p>
        </div>
        <Button
          onClick={onCreateNew}
          className="h-11 bg-blue-600 hover:bg-blue-700"
        >
          <FileText className="mr-2 h-4 w-4" />
          {t("createNew")}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ListChecks className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("totalRequests")}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Loader2 className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("newRequests")}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.newRequests}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("rejectedRequests")}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.rejected}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={t("allStatuses")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="Mới tạo">{t("statusNew")}</SelectItem>
            <SelectItem value="Đã từ chối">{t("statusRejected")}</SelectItem>
            <SelectItem value="Đã hoàn tất">{t("statusCompleted")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t("loadingTitle")}
            </h3>
            <p className="text-gray-500 text-center">{t("loadingMessage")}</p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="bg-red-50 p-8 rounded-full mb-6">
              <AlertCircle className="w-20 h-20 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {t("errorTitle")}
            </h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              {t("errorMessage")}
            </p>
            <Button
              onClick={onRefetch}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("retry")}
            </Button>
          </div>
        ) : filteredData.length === 0 ? (
          /* Empty State */
          data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-full mb-6">
                <FileText className="w-20 h-20 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t("emptyTitle")}
              </h3>
              <p className="text-gray-500 text-center max-w-md mb-8">
                {t("emptyMessage")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-full mb-6">
                <Search className="w-20 h-20 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t("noResultsTitle")}
              </h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                {t("noResultsMessage")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                {searchQuery && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-50 px-4 py-2 text-sm font-normal"
                  >
                    <span className="text-gray-600">{t("filterKeyword")}</span>
                    <span className="ml-2 font-semibold">
                      &ldquo;{searchQuery}&rdquo;
                    </span>
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-50 px-4 py-2 text-sm font-normal"
                  >
                    <span className="text-gray-600">{t("filterStatus")}</span>
                    <span className="ml-2 font-semibold">{statusFilter}</span>
                  </Badge>
                )}
              </div>
            </div>
          )
        ) : (
          <>
            <Table>
              <TableHeader className="bg-gray-50 border-b border-gray-200">
                <TableRow className="hover:bg-gray-50">
                  <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[33%] after:w-px after:bg-gray-300">
                    {t("tableCustomer")}
                  </TableHead>
                  <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[33%] after:w-px after:bg-gray-300">
                    {t("tableService")}
                  </TableHead>
                  <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[33%] after:w-px after:bg-gray-300">
                    {t("tableReceiveMethod")}
                  </TableHead>
                  <TableHead className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[33%] after:w-px after:bg-gray-300">
                    {t("tableSentDate")}
                  </TableHead>
                  <TableHead className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[33%] after:w-px after:bg-gray-300">
                    {t("tableStatus")}
                  </TableHead>
                  <TableHead className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t("tableActions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
                    <TableCell className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.name || t("notAvailable")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.organization_name || t("notAvailable")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {item.post?.title || t("serviceUnknown")}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">
                        {item.receive_method?.name || t("notAvailable")}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm text-gray-500">
                        {formatDate(item.created_at)}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-center">
                      <Badge
                        className={`${getStatusBadgeColor(
                          item.quotation_status?.name || "",
                        )} px-3 py-1 rounded-full`}
                      >
                        {item.quotation_status?.name || t("statusPending")}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(item)}
                        className="hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 text-gray-400 group-hover:text-blue-600 hover:text-blue-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                {t("paginationShowing")} {filteredData.length > 0 ? 1 : 0}-
                {filteredData.length} {t("paginationOf")} {data.length}{" "}
                {t("paginationRecords")}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
