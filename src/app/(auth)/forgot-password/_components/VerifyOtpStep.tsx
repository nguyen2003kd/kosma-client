"use client";

import {
  usePostApiV10AuthForgotPasswordSendOtp,
  usePostApiV10AuthForgotPasswordVerifyOtp,
} from "@/api/endpoints/authentication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface VerifyOtpStepProps {
  email: string;
  onSuccess: (otpToken: string) => void;
  onResend: () => void;
}

export default function VerifyOtpStep({
  email,
  onSuccess,
  onResend,
}: VerifyOtpStepProps) {
  const { t } = useTranslation("pages/forgot-password");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const { mutateAsync: verifyOtp, isPending } =
    usePostApiV10AuthForgotPasswordVerifyOtp();
  const { mutateAsync: resendOtp, isPending: isResending } =
    usePostApiV10AuthForgotPasswordSendOtp();

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value.slice(-1);
    }

    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pastedData)) return;

    setOtp(pastedData.padEnd(6, ""));

    const focusIndex = Math.min(pastedData.length, 5);
    const targetInput = document.getElementById(`otp-${focusIndex}`);
    targetInput?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // API expects "code" not "otp"
      await verifyOtp({ data: { email, code: otp } });
      // Verification successful, proceed to next step
      onSuccess(otp);
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

  const handleResend = async () => {
    setError("");

    try {
      await resendOtp({ data: { email } });
      toast.success({
        title: t("success"),
        content: t("otpResent"),
      });
      // Reset countdown
      setCountdown(30);
      setCanResend(false);
      onResend();
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
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-5xl font-bold text-[#1e3a5f]">{t("verifyOtpTitle")}</h1>
        <p className="mt-4 text-base text-gray-600">
          {t("otpSentTo")} <strong>{email}</strong>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP Field */}
        <div className="space-y-5">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#1e3a5f]/5 to-[#1e3a5f]/10 rounded-full border border-[#1e3a5f]/20">
              <span className="text-sm text-gray-700 font-medium">
                {t("enter6Digits")}
              </span>
            </div>
            {/* <p className="text-xs text-gray-500 font-light">
              Mã xác thực đã được gửi đến email của bạn
            </p> */}
          </div>
          <div className="flex gap-3 justify-center pt-1">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={otp[index] || ""}
                placeholder="-"
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-16 h-16 text-center text-4xl font-bold rounded-xl border-2 border-gray-300 focus:border-[#1e3a5f] focus:ring-4 focus:ring-[#1e3a5f]/20 transition-all placeholder:text-gray-300 hover:border-gray-400 shadow-sm"
              />
            ))}
          </div>

          {/* Resend Section */}
          <div className="flex items-center justify-between pt-2 px-2">
            <p className="text-sm text-gray-600">{t("didNotReceiveCode")}</p>
            {canResend ? (
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-sm font-semibold text-[#1e3a5f] hover:text-[#2d4a6f] underline underline-offset-2 disabled:text-gray-400 disabled:no-underline transition-colors"
              >
                {isResending ? t("resending") : t("resendOtp")}
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                {t("resendAfter")}{" "}
                <span className="font-semibold text-[#1e3a5f]">
                  {countdown}s
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-sm text-red-600 text-center">{error}</div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending || otp.length !== 6}
          className="w-full h-12 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white font-medium rounded-lg text-base shadow-md hover:shadow-lg transition-all"
        >
          {isPending ? t("verifying") : t("verify")}
        </Button>
      </form>
    </div>
  );
}
