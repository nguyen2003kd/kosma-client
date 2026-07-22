"use client";

import { usePostApiV10AuthRegister } from "@/api/endpoints/authentication";
import type { PostApiV10AuthRegister200 } from "@/api/models/postApiV10AuthRegister200";
import { Button } from "@/components/ui/button";
import { FallbackSpinner } from "@/components/ui/fallbackspinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";
import "@/i18n";
import CryptoJS from "crypto-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type RegisterResponse = PostApiV10AuthRegister200 & {
  status?: string;
};

export default function RegisterPage() {
  const { t } = useTranslation("pages/register");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
  });

  const { mutateAsync: registerUser } = usePostApiV10AuthRegister();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const hashedPassword = CryptoJS.SHA256(formData.password).toString();

      const userData = {
        email: formData.email,
        password: hashedPassword,
        username: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
      };

      const response = await registerUser({ data: userData });

      const isSuccess =
        (response as RegisterResponse).status === "success" ||
        response.success === true;

      if (isSuccess) {
        toast.success({
          title: t("success"),
          content: t("successDesc"),
        });

        setIsRedirecting(true);

        setTimeout(() => {
          router.push("/login");
        }, 600);
      } else {
        throw new Error(
          (typeof response.message === "string"
            ? response.message
            : response.message?.vi || response.message?.en) ||
            t("registerFailed"),
        );
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : (
              error as {
                response?: { data?: { message?: string } };
                message?: string;
              }
            )?.response?.data?.message ||
            (error as { message?: string })?.message ||
            t("error");

      toast.error({
        title: t("registerFailed"),
        content: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url(/images/bg-auth.png)" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {isRedirecting && <FallbackSpinner fullScreen={true} />}

      {/* Content */}
      <div className="w-full max-w-2xl relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#1e3a5f]">{t("title")}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Họ và tên - 2 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name" className="text-sm font-medium">
                  {t("firstName")} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder={t("firstNamePlaceholder")}
                  required
                  disabled={isRedirecting}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="last_name" className="text-sm font-medium">
                  {t("lastName")} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder={t("lastNamePlaceholder")}
                  required
                  disabled={isRedirecting}
                  className="h-12"
                />
              </div>
            </div>

            {/* Email - 1 row  */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                {t("email")} <span className="text-red-600">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t("emailPlaceholder")}
                required
                disabled={isRedirecting}
                className="h-12"
              />
            </div>

            {/* Mật khẩu + Số điện thoại  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  {t("password")} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t("passwordPlaceholder")}
                  required
                  disabled={isRedirecting}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  {t("phone")} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t("phonePlaceholder")}
                  required
                  disabled={isRedirecting}
                  className="h-12"
                />
              </div>
            </div>

            {/* Công ty  */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">
                {t("company")} <span className="text-red-600">*</span>
              </Label>
              <Input
                id="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder={t("companyPlaceholder")}
                required
                disabled={isRedirecting}
                className="h-12"
              />
            </div>

            {/* Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isLoading || isRedirecting}
                className="px-8 h-10 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
              >
                {isLoading ? t("registering") : t("register")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
