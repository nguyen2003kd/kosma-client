import { z } from "zod";
import type { UseFormReturn } from "react-hook-form";

export const baseContactSchema = z.object({
  name: z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(100, "Tên không được quá 100 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone_number: z
    .string()
    .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số")
    .min(10, "Số điện thoại phải có ít nhất 10 số"),
  organization_name: z
    .string()
    .min(2, "Tên công ty phải có ít nhất 2 ký tự")
    .max(200, "Tên công ty không được quá 200 ký tự"),
  address: z
    .string()
    .min(5, "Địa chỉ phải có ít nhất 5 ký tự")
    .max(500, "Địa chỉ không được quá 500 ký tự"),
  tax_code: z.string().max(50, "Mã số thuế không được quá 50 ký tự").optional(),
  contact_person: z.string().optional(),
  description: z
    .string()
    .max(2000, "Mô tả không được quá 2000 ký tự")
    .optional(),
});

export type BaseContactValues = z.infer<typeof baseContactSchema>;

export const quotationSchema = baseContactSchema.extend({
  post_id: z.string().min(1, "Vui lòng chọn dịch vụ"),
  service_id: z.string().min(1, "Vui lòng chọn dịch vụ"),
  receive_method_id: z
    .string()
    .min(1, "Vui lòng chọn phương thức nhận kết quả"),
  calibration_id: z.string().optional(),
  invoice_same_as_delivery: z.boolean(),
  certificate_info_type: z.enum([
    "same_as_delivery",
    "same_as_invoice",
    "other",
  ]),
  execution_location_type: z.enum([
    "same_as_delivery",
    "same_as_invoice",
    "same_as_certificate",
    "at_smeq",
    "other",
  ]),
  language: z.enum(["vi", "en"]),
  result_copies: z.string().optional(),
  result_receive_method: z.string().optional(),
  result_return_date: z.string().optional(),
  payment_method: z.enum(["transfer", "cash", "card"]),
  separate_results: z.boolean(),
  result_receive_location: z.string().max(500).optional(),
  result_note: z.string().max(500).optional(),
  internal_recipient: z.string().max(200).optional(),
});

export const quotationPopupSchema = baseContactSchema;

export type QuotationFormValues = z.infer<typeof quotationSchema>;
export type QuotationPopupFormValues = z.infer<typeof quotationPopupSchema>;

/** Form return type cho section chỉ truy cập các field thuộc base contact. */
export type BaseContactFormReturn<T extends BaseContactValues = BaseContactValues> =
  UseFormReturn<T>;
