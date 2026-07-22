"use client";

import { usePostApiV10AuthForgotPasswordConfirmReset } from "@/api/endpoints/authentication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";
import CryptoJS from "crypto-js";
import { Eye, EyeOff, XCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ResetPasswordStepProps {
  email: string;
  onSuccess: () => void;
}

export default function ResetPasswordStep({
  email,
  onSuccess,
}: ResetPasswordStepProps) {
  const { t } = useTranslation("pages/forgot-password");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { mutateAsync: resetPassword, isPending } =
    usePostApiV10AuthForgotPasswordConfirmReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      const message = t("passwordMismatch");
      setError(message);
      toast.error({
        title: t("error"),
        content: message,
      });
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      const message = t("passwordTooShort");
      setError(message);
      toast.error({
        title: t("error"),
        content: message,
      });
      return;
    }

    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      const hashedConfirmPassword = CryptoJS.SHA256(confirmPassword).toString();

      await resetPassword({
        data: {
          email,
          newPassword: hashedPassword,
          confirmPassword: hashedConfirmPassword,
        },
      });

      onSuccess();
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
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Title */}
      <div className="text-center space-y-1.5">
        <h1 className="text-3xl font-bold text-gray-900">{t("resetPasswordTitle")}</h1>
        <p className="text-sm text-gray-600">
          {t("resetPasswordDesc")}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Password Field */}
        <div className="space-y-1.5">
          <Label
            htmlFor="password"
            className="text-sm font-semibold text-gray-900"
          >
            {t("newPassword")}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("newPasswordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white pr-12 text-base focus:border-[#1e3a5f] focus:ring-4 focus:ring-[#1e3a5f]/10 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1e3a5f] transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <Label
            htmlFor="confirmPassword"
            className="text-sm font-semibold text-gray-900"
          >
            {t("confirmPassword")}
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="h-12 rounded-xl border-2 border-gray-200 bg-gray-50/50 focus:bg-white pr-12 text-base focus:border-[#1e3a5f] focus:ring-4 focus:ring-[#1e3a5f]/10 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#1e3a5f] transition-colors"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="px-3.5 py-2.5 bg-gradient-to-r from-blue-50/60 to-indigo-50/40 border border-blue-100/70 rounded-xl">
          <p className="text-xs font-semibold text-gray-700 mb-1">
            {t("passwordRequirements")}
          </p>
          <ul className="text-[11px] text-gray-600 space-y-0.5 leading-relaxed">
            <li>• {t("reqMinLength")}</li>
            <li>• {t("reqUpperLower")}</li>
            <li>• {t("reqNumber")}</li>
          </ul>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-2.5 bg-red-50/80 border-l-4 border-red-500 rounded-lg">
            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-800 leading-relaxed">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] hover:from-[#2d4a6f] hover:to-[#3d5a8f] text-white font-semibold text-base rounded-xl shadow-lg shadow-[#1e3a5f]/20 hover:shadow-xl hover:shadow-[#1e3a5f]/30 transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
        >
          {isPending ? t("processing") : t("confirm")}
        </Button>
      </form>
    </div>
  );
}
