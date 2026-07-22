"use client";

import { usePostApiV10Contact } from "@/api/endpoints/contact";
import { Contact } from "@/api/models/contact";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";
import { usePageConfigByKey } from "@/lib/page-config-helpers";
import {
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface AddressItem {
  id: number;
  name: string;
  address: string;
  phone: string;
  email?: string;
  hotline?: string;
}

export default function ContactRegistrationSection() {
  const { t, ready, i18n } = useTranslation("pages/contact");
  const [mounted, setMounted] = useState(false);

  // Fetch contact addresses from pageConfig API - language-specific key
  const contactKey = i18n.language?.startsWith("en") ? "CONTACT_EN" : "CONTACT";
  const { data: pageConfigData } = usePageConfigByKey(contactKey);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse addresses from API or use fallback
  const fallbackAddresses: AddressItem[] = [
    {
      id: 1,
      name: "Trụ sở chính",
      address: "Số 2 Nguyễn Văn Thủ, Phường Tân Định, Thành phố Hồ Chí Minh",
      phone: "028 38295087 – 38 291744",
      hotline: "1800 1105",
      email: "casehcm@case.vn",
    },
    {
      id: 2,
      name: "Trụ sở 1",
      address: "Số 263 Điện Biên Phủ, Phường Xuân Hòa, Thành phố Hồ Chí Minh",
      phone: "028 3930 2733 – 3933 3533",
    },
    {
      id: 3,
      name: "Trụ sở 3",
      address: "Số 26 Huỳnh Văn Nghệ, Phường Phú Lợi, Thành phố Hồ Chí Minh",
      phone: "0274 3897 574 – 3883 186",
    },
    {
      id: 4,
      name: "Trụ sở 4",
      address: "Số 379 Hà Huy Tập, Phường Bà Rịa, Thành phố Hồ Chí Minh",
      phone: "0254 3717 636",
    },
    {
      id: 5,
      name: "Chi nhánh Cần Thơ",
      address:
        "Số F2.67-F2.68 Nguyễn Thị Sáu, Phường Hưng Phú, Thành phố Cần Thơ",
      phone: "0292. 3918 217 – 3918 218",
    },
    {
      id: 6,
      name: "Văn phòng đại diện Miền Trung",
      address:
        "Số STH 27.18, Đường 8E, Khu đô Thị mới Lê Hồng Phong II, Phường Nam Nha Trang, Tỉnh Khánh Hòa",
      phone: "0258. 2465 255 – 2465 355",
    },
  ];

  const configValue = pageConfigData?.responseData?.rows?.[0]?.value;

  let addresses: AddressItem[] = fallbackAddresses;

  if (configValue && typeof configValue === "string") {
    try {
      const parsed = JSON.parse(configValue);
      // Check if parsed data has locations property
      if (parsed && parsed.locations && Array.isArray(parsed.locations)) {
        addresses = parsed.locations;
      } else if (Array.isArray(parsed)) {
        addresses = parsed;
      }
    } catch (error) {
      console.error("Failed to parse contact addresses:", error);
      addresses = fallbackAddresses;
    }
  }

  const { mutate: submitContact, isPending } = usePostApiV10Contact({
    mutation: {
      onSuccess: () => {
        toast.success({
          title: t("success"),
          content: t("successMessage"),
        });
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          content: "",
        });
      },
      onError: (error) => {
        toast.error({
          title: t("error"),
          content: t("errorMessage"),
        });
        console.error("Contact submission error:", error);
      },
    },
  });

  const [formData, setFormData] = useState<Omit<Contact, "id" | "created_at">>({
    name: "",
    email: "",
    phone_number: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    submitContact({
      data: formData,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "phone_number") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (!mounted || !ready) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-xl overflow-hidden border-0 rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 bg-white">
              <div className="mb-8 border-b border-blue-100 pb-6">
                <div className="flex gap-3 mb-2">
                  <div className="px-3.5 py-2.5 bg-blue-100 rounded-lg flex items-center">
                    <Mail className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-blue-600 mb-1">
                      {t("title")}
                    </h2>
                    <p className="text-sm text-gray-600">{t("subtitle")}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm text-gray-700 font-medium flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-gray-600" />
                    {t("name")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={handleChange}
                    className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm text-gray-700 font-medium flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-gray-600" />
                    {t("email")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm text-gray-700 font-medium flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-gray-600" />
                    {t("phone")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone_number"
                    type="tel"
                    required
                    placeholder={t("phonePlaceholder")}
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="h-12 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="content"
                    className="text-sm text-gray-700 font-medium flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-gray-600" />
                    {t("content")} <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    required
                    placeholder={t("contentPlaceholder")}
                    value={formData.content}
                    onChange={handleChange}
                    rows={4}
                    className="resize-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all hover:border-gray-400"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-lg h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isPending ? t("sending") : t("submit")}
                  </Button>
                </div>
              </form>
            </div>

            {/* Address List */}
            <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] p-8 lg:p-10 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="mb-6">
                  <div className="flex gap-3">
                    <div className="px-3.5 py-2.5 bg-blue-500/20 rounded-lg flex items-center">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {t("contactInfo")}
                      </h3>
                      <p className="text-gray-300 text-sm">
                        {t("branchesOffices")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
                  {/* Trụ sở chính - Full width */}
                  {addresses[0] && (
                    <div className="group bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-4 transition-all duration-300">
                      <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        {addresses[0].name}
                      </h4>
                      <div className="space-y-1.5 pl-3 text-xs">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                          <p className="text-gray-200 leading-snug">
                            {addresses[0].address}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-white flex-shrink-0" />
                          <a
                            href={`tel:${addresses[0].phone.replace(/[^\d]/g, "")}`}
                            className="text-gray-200 hover:text-white transition-colors hover:underline"
                          >
                            {addresses[0].phone}
                          </a>
                        </div>
                        {addresses[0].hotline && (
                          <div className="flex items-center gap-2">
                            <Headphones className="w-3 h-3 text-white flex-shrink-0" />
                            <span className="text-gray-400">{t("hotline")}: </span>
                            <a
                              href={`tel:${addresses[0].hotline.replace(/[^\d]/g, "")}`}
                              className="text-blue-200 hover:text-white transition-colors font-medium hover:underline"
                            >
                              {addresses[0].hotline}
                            </a>
                          </div>
                        )}
                        {addresses[0].email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-white flex-shrink-0" />
                            <a
                              href={`mailto:${addresses[0].email}`}
                              className="text-gray-200 hover:text-white transition-colors hover:underline"
                            >
                              {addresses[0].email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Trụ sở 1-4 - 2 columns nhe */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {addresses.slice(1, 5).map((addr) => (
                      <div
                        key={addr.id}
                        className="group bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-4 transition-all duration-300"
                      >
                        <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          {addr.name}
                        </h4>
                        <div className="space-y-1.5 pl-3 text-xs">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                            <p className="text-gray-200 leading-snug">
                              {addr.address}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 text-white flex-shrink-0" />
                            <a
                              href={`tel:${addr.phone.replace(/[^\d]/g, "")}`}
                              className="text-gray-200 hover:text-white transition-colors hover:underline"
                            >
                              {addr.phone}
                            </a>
                          </div>
                          {addr.hotline && (
                            <div className="flex items-center gap-2">
                              <Headphones className="w-3 h-3 text-white flex-shrink-0" />
                              <span className="text-gray-400">{t("hotline")}: </span>
                              <a
                                href={`tel:${addr.hotline.replace(/[^\d]/g, "")}`}
                                className="text-blue-200 hover:text-white transition-colors font-medium hover:underline"
                              >
                                {addr.hotline}
                              </a>
                            </div>
                          )}
                          {addr.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 text-white flex-shrink-0" />
                              <a
                                href={`mailto:${addr.email}`}
                                className="text-gray-200 hover:text-white transition-colors hover:underline"
                              >
                                {addr.email}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Địa chỉ thứ 6 nằm full nhe */}
                  {addresses[5] && (
                    <div className="group bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg p-4 transition-all duration-300">
                      <h4 className="font-semibold text-white text-sm mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-400" />
                        {addresses[5].name}
                      </h4>
                      <div className="space-y-1.5 pl-3 text-xs">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3 h-3 text-white mt-0.5 flex-shrink-0" />
                          <p className="text-gray-200 leading-snug">
                            {addresses[5].address}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-white flex-shrink-0" />
                          <a
                            href={`tel:${addresses[5].phone.replace(/[^\d]/g, "")}`}
                            className="text-gray-200 hover:text-white transition-colors hover:underline"
                          >
                            {addresses[5].phone}
                          </a>
                        </div>
                        {addresses[5].hotline && (
                          <div className="flex items-center gap-2">
                            <Headphones className="w-3 h-3 text-white flex-shrink-0" />
                            <span className="text-gray-400">{t("hotline")}: </span>
                            <a
                              href={`tel:${addresses[5].hotline.replace(/[^\d]/g, "")}`}
                              className="text-blue-200 hover:text-white transition-colors font-medium hover:underline"
                            >
                              {addresses[5].hotline}
                            </a>
                          </div>
                        )}
                        {addresses[5].email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-white flex-shrink-0" />
                            <a
                              href={`mailto:${addresses[5].email}`}
                              className="text-gray-200 hover:text-white transition-colors hover:underline"
                            >
                              {addresses[5].email}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
