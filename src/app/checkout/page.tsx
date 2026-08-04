"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { PageHero } from "@/components/common";
import { usePostApiV10Order } from "@/api/endpoints/order";
import type { PostApiV10OrderBody } from "@/api/models";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  notes: string;
  paymentMethod: "cod" | "bank_transfer";
}

const INITIAL_FORM: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  notes: "",
  paymentMethod: "cod",
};

export default function CheckoutPage() {
  const { items, total, shippingFee, clearCart, getSubtotal } = useCartStore();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState('');

  const createOrderMutation = usePostApiV10Order();

  const isSubmitting = createOrderMutation.isPending;
  const orderError = createOrderMutation.error
    ? (createOrderMutation.error as { message?: string })?.message || "Failed to place order. Please try again."
    : "";

  const grandTotal = total; // total already includes shipping from cart-store

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email required";
    if (!form.phone.trim()) newErrors.phone = "Required";
    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.state.trim()) newErrors.state = "Required";
    if (!form.zip.trim()) newErrors.zip = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: PostApiV10OrderBody = {
      customer_name: `${form.firstName} ${form.lastName}`.trim(),
      customer_email: form.email,
      customer_phone: form.phone,
      shipping_address: form.address,
      shipping_city: form.city,
      shipping_state: form.state,
      shipping_zip: form.zip,
      notes: form.notes,
      payment_method: form.paymentMethod,
      items: items.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: Number(item.price) || 0,
      })),
    };

    try {
      const res = (await createOrderMutation.mutateAsync({ data: payload })) as unknown as {
        responseData?: { code?: string; order_code?: string; id?: string };
      };
      const code = res?.responseData?.code || res?.responseData?.order_code || res?.responseData?.id || "";
      setOrderCode(code);
      setIsSuccess(true);
      clearCart();
    } catch {
      // surfaced via createOrderMutation.error / orderError
    }
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <>
        <PageHero
          title="Checkout"
          breadcrumbs={[
            { label: "Home", href: "/home" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
        />
        <div className="py-16 sm:py-20 md:py-24 bg-gray-50">
          <div className="container-kosmo">
            <div className="max-w-md mx-auto text-center">
              <h2 className="font-serif text-[24px] sm:text-[28px] text-ink mb-3">
                Your cart is empty
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-600 mb-8">
                Add items to your cart before checking out.
              </p>
              <Link
                href="/solutions/construction"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-6 py-3 text-[14px] font-bold hover:bg-black-800 transition-colors"
              >
                Shop Materials
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <PageHero
          title="Order Confirmed"
          breadcrumbs={[
            { label: "Home", href: "/home" },
            { label: "Cart", href: "/cart" },
            { label: "Checkout" },
          ]}
        />
        <div className="py-16 sm:py-20 md:py-24 bg-gray-50">
          <div className="container-kosmo">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-serif text-[26px] sm:text-[30px] text-ink mb-3">
                Thank you for your order!
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-600 mb-3">
                Your order has been received. Our team will contact you within 24 hours to confirm details and arrange delivery.
              </p>
              <p className="text-[13px] text-gray-500 mb-8">
                Order reference: <span className="font-mono font-semibold">#{orderCode || 'PENDING'}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/home"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-6 py-3 text-[14px] font-bold hover:bg-black-800 transition-colors"
                >
                  Back to Home
                </Link>
                <Link
                  href="/solutions/construction"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-mutedLine text-ink px-6 py-3 text-[14px] font-bold hover:bg-cream transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Checkout"
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} noValidate>
                {/* Contact Information */}
                <div className="bg-white rounded-[--radius-md] border border-mutedLine p-5 sm:p-6 mb-6">
                  <h2 className="font-serif text-[20px] sm:text-[22px] text-ink mb-5">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-ink mb-1.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-gray-400 focus:outline-none transition-colors ${errors.firstName
                          ? "border-red-400 focus:border-red-500"
                          : "border-mutedLine focus:border-ink/60"
                          }`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-500 text-[12px] mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-ink mb-1.5">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-gray-400 focus:outline-none transition-colors ${errors.lastName
                          ? "border-red-400 focus:border-red-500"
                          : "border-mutedLine focus:border-ink/60"
                          }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-500 text-[12px] mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-ink mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-gray-400 focus:outline-none transition-colors ${errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-mutedLine focus:border-ink/60"
                          }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-[12px] mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-ink mb-1.5">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-gray-400 focus:outline-none transition-colors ${errors.phone
                          ? "border-red-400 focus:border-red-500"
                          : "border-mutedLine focus:border-ink/60"
                          }`}
                        placeholder="(301) 555-0123"
                      />
                      {errors.phone && <p className="text-red-500 text-[12px] mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-[--radius-md] border border-mutedLine p-5 sm:p-6 mb-6">
                  <h2 className="font-serif text-[20px] sm:text-[22px] text-ink mb-5">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-ink mb-1.5">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-gray-400 focus:outline-none transition-colors ${errors.address
                          ? "border-red-400 focus:border-red-500"
                          : "border-mutedLine focus:border-ink/60"
                          }`}
                        placeholder="123 Main Street, Apt 4B"
                      />
                      {errors.address && <p className="text-red-500 text-[12px] mt-1">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-[13px] font-semibold text-ink mb-1.5">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-gray-400 focus:outline-none transition-colors ${errors.city ? "border-red-400 focus:border-red-500" : "border-mutedLine focus:border-ink/60"
                            }`}
                          placeholder="Rockville"
                        />
                        {errors.city && <p className="text-red-500 text-[12px] mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-ink mb-1.5">
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={form.state}
                          onChange={handleChange}
                          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-gray-400 focus:outline-none transition-colors ${errors.state ? "border-red-400 focus:border-red-500" : "border-mutedLine focus:border-ink/60"
                            }`}
                          placeholder="MD"
                        />
                        {errors.state && <p className="text-red-500 text-[12px] mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-ink mb-1.5">
                          ZIP <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="zip"
                          value={form.zip}
                          onChange={handleChange}
                          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-gray-400 focus:outline-none transition-colors ${errors.zip ? "border-red-400 focus:border-red-500" : "border-mutedLine focus:border-ink/60"
                            }`}
                          placeholder="20850"
                        />
                        {errors.zip && <p className="text-red-500 text-[12px] mt-1">{errors.zip}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-[--radius-md] border border-mutedLine p-5 sm:p-6 mb-6">
                  <h2 className="font-serif text-[20px] sm:text-[22px] text-ink mb-5">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${form.paymentMethod === "cod"
                      ? "border-ink bg-cream"
                      : "border-mutedLine hover:border-ink/40"
                      }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={form.paymentMethod === "cod"}
                        onChange={handleChange}
                        className="w-4 h-4 text-ink"
                      />
                      <div>
                        <p className="text-[14px] font-semibold text-ink">Cash on Delivery</p>
                        <p className="text-[12px] text-gray-500">Pay when you receive your order</p>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${form.paymentMethod === "bank_transfer"
                      ? "border-ink bg-cream"
                      : "border-mutedLine hover:border-ink/40"
                      }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={form.paymentMethod === "bank_transfer"}
                        onChange={handleChange}
                        className="w-4 h-4 text-ink"
                      />
                      <div>
                        <p className="text-[14px] font-semibold text-ink">Bank Transfer</p>
                        <p className="text-[12px] text-gray-500">Pay via wire transfer — details sent after order confirmation</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-white rounded-[--radius-md] border border-mutedLine p-5 sm:p-6 mb-6">
                  <h2 className="font-serif text-[20px] sm:text-[22px] text-ink mb-5">
                    Order Notes
                  </h2>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-lg border border-mutedLine bg-white px-4 py-2.5 text-[14px] text-ink placeholder:text-gray-400 focus:outline-none focus:border-ink/60 transition-colors resize-none"
                    placeholder="Special delivery instructions, preferred time, etc."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/cart"
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-ink hover:text-gold transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Cart
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-8 py-3.5 text-[14px] font-bold hover:bg-black-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </button>
                </div>

                {orderError && (
                  <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[13px]">
                    {orderError}
                  </div>
                )}
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[--radius-md] border border-mutedLine p-5 sm:p-6 sticky top-24">
                <h3 className="font-serif text-[20px] sm:text-[22px] text-ink mb-5">
                  Order Summary
                </h3>

                {/* Items */}
                <div className="space-y-3 mb-5 max-h-[280px] overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-ink line-clamp-2">{item.name}</p>
                        <p className="text-[12px] text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-[13px] font-semibold text-ink">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-mutedLine pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-[13px] text-gray-600">
                    <span>Subtotal</span>
                    <span className="text-ink font-medium">${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-gray-600">
                    <span>Shipping</span>
                    <span className={shippingFee === 0 ? "text-green-600 font-medium" : "text-ink font-medium"}>
                      {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-mutedLine pt-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-[15px] sm:text-[16px] font-semibold text-ink">Total</span>
                    <span className="text-[18px] sm:text-[20px] font-bold text-ink">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[12px] text-gray-400">
                    Tax not included — will be calculated based on your location
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
