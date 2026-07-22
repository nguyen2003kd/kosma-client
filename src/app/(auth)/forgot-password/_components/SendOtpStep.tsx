"use client";

import { usePostApiV10AuthForgotPasswordSendOtp } from "@/api/endpoints/authentication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";
import { Loader2, LockKeyhole, Mail, XCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface SendOtpStepProps {
  onSuccess: (email: string) => void;
}

export default function SendOtpStep({ onSuccess }: SendOtpStepProps) {
  const { t } = useTranslation("pages/forgot-password");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { mutateAsync: sendOtp, isPending } =
    usePostApiV10AuthForgotPasswordSendOtp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await sendOtp({ data: { email } });
      onSuccess(email);
    } catch (err: unknown) {
      const message =
        err &&
        typeof err === "object" &&
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response &&
        err.response.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data &&
        typeof err.response.data.message === "string"
          ? err.response.data.message
          : err &&
              typeof err === "object" &&
              "message" in err &&
              typeof err.message === "string"
            ? err.message
            : t("errorOccurred");
      setError(message);
      toast.error({
        title: t("error"),
        content: message,
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      {/* Title */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1e3a5f]/10 to-[#1e3a5f]/5 rounded-2xl mb-2">
          <LockKeyhole className="w-10 h-10 text-[#1e3a5f]" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
          <p className="text-base text-gray-600">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2.5">
          <Label
            htmlFor="email"
            className="text-sm font-semibold text-gray-900"
          >
            {t("email")}
          </Label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#1e3a5f] transition-colors" />
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-14 pl-12 pr-4 text-base rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white focus:border-[#1e3a5f] focus:ring-4 focus:ring-[#1e3a5f]/10 transition-all"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50/80 border-l-4 border-red-500 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 leading-relaxed">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending || !email}
          className="w-full h-14 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#3d5a8f] text-white font-semibold text-base rounded-xl shadow-lg shadow-[#1e3a5f]/20 hover:shadow-xl hover:shadow-[#1e3a5f]/30 transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              {t("sending")}
            </span>
          ) : (
            t("submit")
          )}
        </Button>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <a
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#1e3a5f] transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            {t("back")}
          </a>
        </div>
      </form>
    </div>
  );
}
