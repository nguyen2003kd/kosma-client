import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Receipt } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { QuotationFormValues } from "../../../libs/validation";

interface InvoiceInfoSectionProps {
  form: UseFormReturn<QuotationFormValues>;
}

export default function InvoiceInfoSection({ form }: InvoiceInfoSectionProps) {
  const { t } = useTranslation("pages/quotation-form");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          <Receipt className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900">
            {t("invoiceInfoTitle")}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {t("invoiceInfoSubtitle")}
          </p>
        </div>
      </div>
      <FormField
        control={form.control}
        name="invoice_same_as_delivery"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                value={field.value ? "true" : "false"}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="invoice-same" />
                  <Label htmlFor="invoice-same" className="text-sm">
                    {t("sameAsDelivery")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="invoice-other" />
                  <Label htmlFor="invoice-other" className="text-sm">
                    {t("other")}
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
