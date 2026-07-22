"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/toaster";
import useSignInHandler from "@/hooks/use-sign-handler";
import "@/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import CryptoJS from "crypto-js";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGetApiV10Logo } from "@/api/endpoints/logo";
import type { Logo } from "@/api/models/logo";
import { getResponsiveImage } from "@/lib/responsive-image";
import links from "@/lib/links";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(""),
  password: z.string().min(1, ""),
});

type LoginForm = z.infer<typeof loginSchema>;

interface LogoWithFile extends Logo {
  file?: {
    path?: string;
    compress_info?: Record<string, string>;
  };
}

export default function LoginPage() {
  const { t } = useTranslation("pages/login");
  const [userType, setUserType] = useState("company");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signInHandler } = useSignInHandler();
  const router = useRouter();

  const { data: logoData } = useGetApiV10Logo({
    filters: "is_active==true",
  });

  const logoInfo = logoData?.responseData?.rows?.[0] as LogoWithFile;
  const logoUrl = logoInfo?.file?.compress_info
    ? getResponsiveImage(logoInfo.file.compress_info)
    : logoInfo?.file?.path
      ? `${links.storageEndpoint}${logoInfo.file.path}`
      : "/images/logo-no-bg.png";

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      const encryptedPassword = CryptoJS.SHA256(data.password).toString();
      await signInHandler({ email: data.email, password: encryptedPassword });
      toast.success({
        title: t("success"),
        content: t("welcomeBack"),
      });
      router.push("/");
    } catch (error: unknown) {
      const err = error as {
        message?: string;
        data?: { message?: string };
        response?: { data?: { message?: string } };
      };
      const message =
        err?.message ||
        err?.data?.message ||
        err?.response?.data?.message ||
        t("error");

      toast.error({
        title: t("loginFailed"),
        content: message,
      });
      form.setError("root", { message });
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

      {/* Content */}
      <div className="w-full max-w-6xl h-full rounded-3xl shadow-2xl overflow-hidden relative z-10">
        <div className="flex flex-col lg:flex-row h-full">
          <div className="flex-1 p-6 lg:p-8 xl:p-10 flex items-center bg-white/80 backdrop-blur-lg">
            <div className="w-full max-w-md mx-auto space-y-8">
              {/* Title */}
              <div className="text-center">
                <h1 className="text-5xl font-bold text-[#1e3a5f]">
                  {t("title")}
                </h1>
              </div>

              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* User Type Radio Buttons */}
                  <RadioGroup
                    value={userType}
                    onValueChange={setUserType}
                    className="flex gap-8"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="company"
                        id="company"
                        className="border-gray-900"
                      />
                      <Label
                        htmlFor="company"
                        className="text-base font-normal text-gray-900 cursor-pointer"
                      >
                        {t("company", { defaultValue: "Công ty" })}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="contact"
                        id="contact"
                        className="border-gray-400"
                      />
                      <Label
                        htmlFor="contact"
                        className="text-base font-normal text-gray-900 cursor-pointer"
                      >
                        {t("contact", { defaultValue: "Người liên hệ" })}
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={`text-base font-normal ${form.formState.errors.root ? "text-red-600" : "text-gray-900"}`}
                        >
                          {t("email")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={t("emailPlaceholder", {
                              defaultValue: "tn10@gmail.com",
                            })}
                            className="h-12 rounded-lg border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500 text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={`text-base font-normal ${form.formState.errors.root ? "text-red-600" : "text-gray-900"}`}
                        >
                          {t("password")}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder={t("passwordPlaceholder", {
                                defaultValue: "Nhập nội dung",
                              })}
                              className="h-12 rounded-lg bg-white pr-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                              {showPassword ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Forgot Password Link */}
                  <div className="flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-[#1e3a5f] hover:underline"
                    >
                      {t("forgotPassword")}
                    </Link>
                  </div>

                  {/* Error Message */}
                  {form.formState.errors.root && (
                    <div className="text-sm text-red-600 text-center">
                      {form.formState.errors.root.message}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-medium rounded-lg text-base shadow-md hover:shadow-lg transition-all"
                  >
                    {isLoading ? t("loggingIn") : t("login")}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center bg-white/30 backdrop-blur-md relative overflow-hidden">
            <div className="relative z-10">
              <Image
                src={logoUrl}
                alt={logoInfo?.name || "CASE-SMQ Logo"}
                width={400}
                height={150}
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
