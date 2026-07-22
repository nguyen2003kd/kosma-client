"use client";

import { toast } from "@/components/ui/toaster";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ResetPasswordStep from "./_components/ResetPasswordStep";
import SendOtpStep from "./_components/SendOtpStep";
import VerifyOtpStep from "./_components/VerifyOtpStep";
import { useTranslation } from "react-i18next";

type Step = "sendOtp" | "verifyOtp" | "resetPassword";

export default function ForgotPasswordPage() {
  const { t } = useTranslation("pages/forgot-password");
  const [currentStep, setCurrentStep] = useState<Step>("sendOtp");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSendOtpSuccess = (userEmail: string) => {
    setEmail(userEmail);
    setCurrentStep("verifyOtp");
    toast.success({
      title: t("success"),
      content: t("otpSent"),
    });
  };

  const handleVerifyOtpSuccess = () => {
    setCurrentStep("resetPassword");
    toast.success({
      title: t("success"),
      content: t("otpVerified"),
    });
  };

  const handleResetPasswordSuccess = () => {
    toast.success({
      title: t("success"),
      content: t("passwordReset"),
    });

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  const handleResendOtp = () => {
    toast.success({
      title: t("success"),
      content: t("otpResent"),
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-8 px-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url(/images/bg-auth.png)" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="w-full max-w-6xl h-[520px] rounded-3xl shadow-2xl overflow-hidden relative z-10">
        <div className="flex flex-col lg:flex-row h-full">
          <div className="flex-1 p-6 lg:p-8 xl:p-10 flex items-center bg-white/80 backdrop-blur-lg">
            {/* Step 1: Send OTP */}
            {currentStep === "sendOtp" && (
              <SendOtpStep onSuccess={handleSendOtpSuccess} />
            )}

            {/* Step 2: Verify OTP */}
            {currentStep === "verifyOtp" && (
              <VerifyOtpStep
                email={email}
                onSuccess={handleVerifyOtpSuccess}
                onResend={handleResendOtp}
              />
            )}

            {/* Step 3: Reset Password */}
            {currentStep === "resetPassword" && (
              <ResetPasswordStep
                email={email}
                onSuccess={handleResetPasswordSuccess}
              />
            )}
          </div>

          <div className="hidden lg:flex flex-1 items-center justify-center bg-white/30 backdrop-blur-md relative overflow-hidden">
            <div className="relative z-10">
              <Image
                src="/images/logo-no-bg.png"
                alt="CASE-SMQ Logo"
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
