import { useGetApiV10Calibration } from "@/api/endpoints/calibration";
import { useGetApiV10Service } from "@/api/endpoints/service";
import { useGetApiV10ReceiveMethod } from "@/api/endpoints/receive-method";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon, Package } from "lucide-react";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { QuotationFormValues } from "../../../libs/validation";

interface ResultReturnSectionProps {
  form: UseFormReturn<QuotationFormValues>;
}

export default function ResultReturnSection({
  form,
}: ResultReturnSectionProps) {
  const { t } = useTranslation("pages/quotation-form");
  const { data: serviceData, isLoading: isLoadingServices } = useGetApiV10Service({
    pageSize: 100,
  });
  const { data: calibrationData, isLoading: isLoadingCalibrations } =
    useGetApiV10Calibration({
      pageSize: 100,
    });
  const { data: receiveMethodData, isLoading: isLoadingReceiveMethods } =
    useGetApiV10ReceiveMethod();

  const services = useMemo(() => {
    if (!serviceData?.responseData?.rows) return [];

    return serviceData.responseData.rows
      .filter((service) => service.id && service.name)
      .map((service) => ({
        value: service.id as string,
        label: service.name as string,
      }));
  }, [serviceData]);

  const calibrations = useMemo(() => {
    if (!calibrationData?.responseData?.rows) return [];

    return calibrationData.responseData.rows
      .filter((calibration) => calibration.id && calibration.name)
      .map((calibration) => ({
        value: calibration.id as string,
        label: calibration.name as string,
      }));
  }, [calibrationData]);

  const receiveMethods = useMemo(() => {
    if (!receiveMethodData?.responseData?.rows) return [];

    return receiveMethodData.responseData.rows
      .filter((method) => method.id && method.name)
      .map((method) => ({
        value: method.id as string,
        label: method.name as string,
      }));
  }, [receiveMethodData]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          <Package className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900">
            {t("resultReturnTitle")}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {t("resultReturnSubtitle")}
          </p>
        </div>
      </div>

      {/* Row 0: Dịch vụ yêu cầu | Hiệu chuẩn */}
      <div className="grid md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="service_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t("requestedService")}{" "}
                <span className="text-red-500">{t("required")}</span>
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoadingServices}
              >
                <FormControl>
                  <SelectTrigger className="h-11 rounded-lg">
                    <SelectValue
                      placeholder={
                        isLoadingServices ? t("loading") : t("selectService")
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {services.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="hover:bg-blue-50 focus:bg-blue-50"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="calibration_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">{t("sampleType")}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoadingCalibrations}
              >
                <FormControl>
                  <SelectTrigger className="h-11 rounded-lg">
                    <SelectValue
                      placeholder={
                        isLoadingCalibrations
                          ? t("loading")
                          : t("selectSampleType")
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {calibrations.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="hover:bg-blue-50 focus:bg-blue-50"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 1: Chọn ngôn ngữ | Số bản kết quả */}
      <div className="grid md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t("selectLanguage")}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="h-11 rounded-lg">
                  <SelectValue placeholder={t("selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">{t("languageVi")}</SelectItem>
                  <SelectItem value="en">{t("languageEn")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="result_copies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t("resultCopies")}
              </FormLabel>
              <Input
                type="number"
                min="1"
                placeholder={t("resultCopiesPlaceholder")}
                className="h-11 rounded-lg border-gray-300 text-gray-700"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 2: Cách nhận kết quả | Hình thức thanh toán */}
      <div className="grid md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="result_receive_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t("resultReceiveMethod")}
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoadingReceiveMethods}
              >
                <SelectTrigger className="h-11 rounded-lg">
                  <SelectValue
                    placeholder={
                      isLoadingReceiveMethods
                        ? t("loading")
                        : t("selectReceiveMethod")
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {receiveMethods.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="payment_method"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t("paymentMethod")}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="h-11 rounded-lg">
                  <SelectValue placeholder={t("selectPaymentMethod")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transfer">
                    {t("paymentTransfer")}
                  </SelectItem>
                  <SelectItem value="cash">{t("paymentCash")}</SelectItem>
                  <SelectItem value="card">{t("paymentCard")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Row 3: Ngày trả kết quả | Tách phiếu kết quả theo mẫu */}
      <div className="grid md:grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name="result_return_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-gray-700">
                {t("resultReturnDate")}
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-11 rounded-lg pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", {
                          locale: vi,
                        })
                      ) : (
                        <span>{t("selectDate")}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString())}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="separate_results"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 h-10 mt-7">
              <FormLabel className="text-sm font-medium mb-0">
                {t("separateResults")}
              </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* Row 4: Thông tin nơi nhận (full width) */}
      <FormField
        control={form.control}
        name="result_receive_location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">
              {t("resultReceiveLocation")}
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("resultReceiveLocationPlaceholder")}
                className="min-h-[60px] resize-none rounded-lg text-gray-700"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Row 5: Ghi chú (full width) */}
      <FormField
        control={form.control}
        name="result_note"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">{t("note")}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("notePlaceholder")}
                className="min-h-[60px] resize-none rounded-lg text-gray-700"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
