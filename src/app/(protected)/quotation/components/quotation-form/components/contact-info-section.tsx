import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Mail, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { BaseContactValues } from "../../../libs/validation";

interface ContactInfoSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
}

export default function ContactInfoSection({
  form,
}: ContactInfoSectionProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { t } = useTranslation("pages/quotation-form");
  // Section chỉ thao tác các field thuộc base contact; alias cho FormField nhận Path<BaseContactValues>.
  const baseForm = form as unknown as UseFormReturn<BaseContactValues>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900">
            {t("contactInfoTitle")}
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            {t("contactInfoSubtitle")}
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <FormField
          control={baseForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t("customerName")}{" "}
                <span className="text-red-500">{t("required")}</span>
              </FormLabel>
              <div className="relative">
                <User
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "name" || field.value
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <Input
                  placeholder={t("customerNamePlaceholder")}
                  className="pl-10 h-12 bg-white border-gray-300 text-gray-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600"
                  {...field}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={baseForm.control}
          name="organization_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t("organizationName")}{" "}
                <span className="text-red-500">{t("required")}</span>
              </FormLabel>
              <div className="relative">
                <Building2
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "organization_name" || field.value
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <Input
                  placeholder={t("organizationNamePlaceholder")}
                  className="pl-10 h-12 bg-white border-gray-300 text-gray-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600"
                  {...field}
                  onFocus={() => setFocusedField("organization_name")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <FormField
          control={baseForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t("emailContact")}{" "}
                <span className="text-red-500">{t("required")}</span>
              </FormLabel>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "email" || field.value
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="pl-10 h-12 bg-white border-gray-300 text-gray-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600"
                  {...field}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={baseForm.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t("phone")}{" "}
                <span className="text-red-500">{t("required")}</span>
              </FormLabel>
              <div className="relative">
                <Phone
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "phone_number" || field.value
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                />
                <Input
                  placeholder={t("phonePlaceholder")}
                  className="pl-10 h-12 bg-white border-gray-300 text-gray-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600"
                  {...field}
                  onFocus={() => setFocusedField("phone_number")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={baseForm.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700">
              {t("address")}{" "}
              <span className="text-red-500">{t("required")}</span>
            </FormLabel>
            <div className="relative">
              <MapPin
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                  focusedField === "address" || field.value
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              />
              <Input
                placeholder={t("addressPlaceholder")}
                className="pl-10 h-12 bg-white border-gray-300 text-gray-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600"
                {...field}
                onFocus={() => setFocusedField("address")}
                onBlur={() => setFocusedField(null)}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid md:grid-cols-2 gap-3">
        <FormField
          control={baseForm.control}
          name="tax_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">{t("taxCode")}</FormLabel>
              <Input
                placeholder={t("taxCodePlaceholder")}
                className="h-12 bg-white border-gray-300 text-gray-700 rounded-lg"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={baseForm.control}
          name="contact_person"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                {t("contactPerson")}
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="h-12 bg-white rounded-lg">
                  <SelectValue placeholder={t("selectContactPerson")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={t("contactPersonSelf")}>{t("contactPersonSelf")}</SelectItem>
                  <SelectItem value={t("contactPersonOther")}>{t("contactPersonOther")}</SelectItem>
                  <SelectItem value={t("serviceEnvironmentMonitoring")}>{t("serviceEnvironmentMonitoring")}</SelectItem>
                  <SelectItem value={t("serviceConsulting")}>{t("serviceConsulting")}</SelectItem>
                  <SelectItem value={t("serviceTraining")}>{t("serviceTraining")}</SelectItem>
                  <SelectItem value={t("serviceRadiationSafety")}>{t("serviceRadiationSafety")}</SelectItem>
                  <SelectItem value={t("serviceResearch")}>{t("serviceResearch")}</SelectItem>
                  <SelectItem value={t("serviceCertification")}>{t("serviceCertification")}</SelectItem>
                  <SelectItem value={t("serviceOther")}>{t("serviceOther")}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
