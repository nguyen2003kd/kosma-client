import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { QuotationFormValues } from "../../../libs/validation";

interface ExecutionLocationSectionProps {
  form: UseFormReturn<QuotationFormValues>;
}

export default function ExecutionLocationSection({
  form,
}: ExecutionLocationSectionProps) {
  const { t } = useTranslation("pages/quotation-form");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900">
            {t("executionLocationTitle")}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {t("executionLocationSubtitle")}
          </p>
        </div>
      </div>
      <FormField
        control={form.control}
        name="execution_location_type"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="same_as_delivery" id="exec-delivery" />
                  <Label htmlFor="exec-delivery" className="text-sm">
                    {t("sameAsDelivery")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="same_as_invoice" id="exec-invoice" />
                  <Label htmlFor="exec-invoice" className="text-sm">
                    {t("sameAsInvoice")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="same_as_certificate" id="exec-cert" />
                  <Label htmlFor="exec-cert" className="text-sm">
                    {t("sameAsCertificate")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="at_smeq" id="exec-smeq" />
                  <Label htmlFor="exec-smeq" className="text-sm">
                    {t("atSmeq")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="exec-other" />
                  <Label htmlFor="exec-other" className="text-sm">
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
