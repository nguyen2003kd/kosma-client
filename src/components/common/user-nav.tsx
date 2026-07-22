"use client";

import { postApiV10AuthLogout } from "@/api/endpoints/authentication";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toaster";
import { useAuthStore } from "@/stores";
import { Calendar, Loader2, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Can from "@/acl/Can";
interface UserNavProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserNav({ user }: UserNavProps) {
  const { t } = useTranslation("header");
  const router = useRouter();
  const resetStore = useAuthStore((state) => state.resetStore);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await postApiV10AuthLogout();
      toast.success({
        title: t("logoutSuccess"),
        content: t("logoutSuccessMessage"),
      });
    } catch (err) {
      console.error("Logout API error:", err);
      toast.error({
        title: t("logoutError"),
        content: t("logoutErrorMessage"),
      });
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-token");
      }
      // Reset auth store
      resetStore();
      router.push("/login");
      setIsLoading(false);
    }
  };

  const userName = user?.name || "User";
  const userEmail = user?.email || "";

  const initials =
    userName
      .split(" ")
      .filter((n) => n.length > 0)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={isLoading}>
        <Button
          variant="ghost"
          className="relative p-1 h-auto rounded-full hover:bg-blue-50/80 transition-all duration-200 group disabled:opacity-100"
          disabled={isLoading}
        >
          <div className="relative">
            {isLoading ? (
              <div className="h-9 w-9 ring-2 ring-blue-100 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              </div>
            ) : (
              <>
                <Avatar className="h-9 w-9 ring-2 ring-blue-100 group-hover:ring-blue-300 group-hover:ring-offset-1 group-data-[state=open]:ring-blue-300 group-data-[state=open]:ring-offset-1 transition-all duration-300 cursor-pointer group-hover:scale-110 group-hover:shadow-lg group-data-[state=open]:scale-110 group-data-[state=open]:shadow-lg">
                  <AvatarImage src={user?.avatar} alt={user?.name || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-white group-hover:scale-125 group-data-[state=open]:scale-125 transition-transform duration-300" />
              </>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 p-2 shadow-lg border-gray-200"
        align="center"
        forceMount
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
              <AvatarImage src={user?.avatar} alt={userName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {userName}
              </p>
              <p className="text-xs text-gray-600 truncate">{userEmail}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <div className="space-y-1">
          <DropdownMenuItem
            onClick={() => router.push("/user")}
            className="cursor-pointer rounded-md px-3 py-2.5 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
          >
            <User className="mr-3 h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
            <span className="font-medium">{t("profile")}</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push("/user/settings")}
            className="cursor-pointer rounded-md px-3 py-2.5 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
          >
            <Settings className="mr-3 h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
            <span className="font-medium">{t("settings")}</span>
          </DropdownMenuItem>
          <Can I="view" a="work-schedule">
            <DropdownMenuItem
              onClick={() => router.push("/work-schedule")}
              className="cursor-pointer rounded-md px-3 py-2.5 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
            >
              <Calendar className="mr-3 h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
              <span className="font-medium">Lịch công tác</span>
            </DropdownMenuItem>
          </Can>
        </div>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoading}
          className="cursor-pointer rounded-md px-3 py-2.5 hover:bg-red-50 hover:text-red-700 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="mr-3 h-4 w-4 animate-spin text-gray-500" />
          ) : (
            <LogOut className="mr-3 h-4 w-4 text-gray-500 group-hover:text-red-600 transition-colors" />
          )}
          <span className="font-medium">
            {isLoading ? t("loggingOut") : t("logout")}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
