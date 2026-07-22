"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "@/i18n";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function UserPage() {
  const { t } = useTranslation("pages/user");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Title */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#1e3a5f]">{t("title")}</h1>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
            >
              {t("edit")}
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Thông tin khách hàng */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("customerInfo")}
            </h2>

            {/* Tên khách hàng */}
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-sm">
                {t("companyName")} <span className="text-red-600">*</span>
              </Label>
              <Input
                id="company-name"
                placeholder={t("placeholder")}
                required
                disabled={!isEditing}
                className="h-10"
              />
            </div>

            {/* Tên đăng nhập & Mật khẩu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm">
                  {t("username")}
                </Label>
                <Input
                  id="username"
                  placeholder={t("placeholder")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm">
                  {t("password")}
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("placeholder")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
            </div>

            {/* Email & Số điện thoại */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("placeholder")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">
                  {t("phone")} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder={t("placeholder")}
                  required
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
            </div>

            {/* Fax & Mã số thuế */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fax" className="text-sm">
                  {t("fax")}
                </Label>
                <Input
                  id="fax"
                  placeholder={t("placeholder")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-code" className="text-sm">
                  {t("taxCode")}
                </Label>
                <Input
                  id="tax-code"
                  placeholder={t("placeholder")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
            </div>

            {/* Lĩnh vực kinh doanh & Quốc gia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-field" className="text-sm">
                  {t("businessField")}
                </Label>
                <Input
                  id="business-field"
                  placeholder={t("placeholder")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm">
                  {t("country")} <span className="text-red-600">*</span>
                </Label>
                <Select required disabled={!isEditing}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={t("placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vn">Việt Nam</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tỉnh thành, Quận huyện, Phường xã */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="province" className="text-sm">
                  {t("province")} <span className="text-red-600">*</span>
                </Label>
                <Select required disabled={!isEditing}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={t("placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hn">Hà Nội</SelectItem>
                    <SelectItem value="hcm">Hồ Chí Minh</SelectItem>
                    <SelectItem value="dn">Đà Nẵng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="district" className="text-sm">
                  {t("district")}
                </Label>
                <Select disabled={!isEditing}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={t("placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="district1">Quận 1</SelectItem>
                    <SelectItem value="district2">Quận 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ward" className="text-sm">
                  {t("ward")}
                </Label>
                <Select disabled={!isEditing}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={t("placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ward1">Phường 1</SelectItem>
                    <SelectItem value="ward2">Phường 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2">
              <Label htmlFor="address1" className="text-sm">
                {t("address")}
              </Label>
              <Input
                id="address1"
                placeholder={t("placeholder")}
                disabled={!isEditing}
                className="h-10"
              />
            </div>
          </div>

          {/* Thông tin người liên hệ */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("contactInfo")}
            </h2>

            {/* Tên người liên hệ & Tên đăng nhập */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="text-sm">
                  {t("contactName")} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="contact-name"
                  placeholder={t("placeholder")}
                  required
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-username" className="text-sm">
                  {t("username")} <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="contact-username"
                  placeholder={t("placeholder")}
                  required
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
            </div>

            {/* Email & Số điện thoại */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-sm">
                  {t("email")}
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder={t("placeholder")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone" className="text-sm">
                  {t("phone")}
                </Label>
                <Input
                  id="contact-phone"
                  placeholder={t("placeholder")}
                  disabled={!isEditing}
                  className="h-10"
                />
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2">
              <Label htmlFor="contact-address" className="text-sm">
                {t("address")}
              </Label>
              <Input
                id="contact-address"
                placeholder={t("placeholder")}
                disabled={!isEditing}
                className="h-10"
              />
            </div>
          </div>

          {/* Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="px-8 h-10 border-gray-300 hover:bg-gray-50"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="px-8 h-10 bg-[#1e3a5f] hover:bg-[#2d4a6f] text-white"
              >
                {isLoading ? t("saving") : t("save")}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
