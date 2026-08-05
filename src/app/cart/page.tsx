"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { PageHero } from "@/components/common";

export default function CartPage() {
  const { items, total, shippingFee, updateQuantity, removeItem, clearCart } = useCartStore();

  const grandTotal = total; // total already includes shipping from cart-store

  if (items.length === 0) {
    return (
      <>
        <PageHero
          title="Your Cart"
          subtitle="Start shopping for construction materials and furniture."
          breadcrumbs={[
            { label: "Home", href: "/home" },
            { label: "Cart" },
          ]}
          backgroundImage="/images/living.jpg"
        />
        <div className="py-16 sm:py-20 md:py-24 bg-gray-50">
          <div className="container-kosmo">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="font-serif text-[24px] sm:text-[28px] text-ink mb-3">
                Your cart is empty
              </h2>
              <p className="text-[14px] sm:text-[15px] text-gray-600 mb-8">
                Browse our construction materials or furniture designs to find what you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/solutions/construction"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-6 py-3 text-[14px] font-bold hover:bg-black-800 transition-colors"
                >
                  Shop Materials
                </Link>
                <Link
                  href="/solutions/design"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-mutedLine text-ink px-6 py-3 text-[14px] font-bold hover:bg-cream transition-colors"
                >
                  Browse Furniture
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
        title="Your Cart"
        subtitle="Review your items before checkout."
        breadcrumbs={[
          { label: "Home", href: "/home" },
          { label: "Cart" },
        ]}
      />

      <div className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container-kosmo">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-serif text-[22px] sm:text-[26px] text-ink">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </h2>
                <button
                  onClick={clearCart}
                  className="text-[13px] text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                  Clear cart
                </button>
              </div>

              <div className="bg-white rounded-[--radius-md] border border-mutedLine overflow-hidden">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex gap-4 p-4 sm:p-5 ${index !== items.length - 1 ? "border-b border-mutedLine" : ""
                      }`}
                  >
                    {/* Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-[15px] sm:text-[17px] text-ink line-clamp-2 mb-1">
                        {item.name}
                      </p>
                      <p className="text-[15px] sm:text-[18px] font-semibold text-ink mb-3">
                        ${item.price.toFixed(2)}
                      </p>

                      <div className="flex items-center justify-between">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border border-mutedLine flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-[14px] font-medium text-ink">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border border-mutedLine flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Subtotal + Remove */}
                        <div className="flex items-center gap-4">
                          <span className="text-[15px] sm:text-[17px] font-semibold text-ink">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <Link
                href="/solutions/construction"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-ink hover:text-gold transition-colors mt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[--radius-md] border border-mutedLine p-5 sm:p-6 sticky top-24">
                <h3 className="font-serif text-[20px] sm:text-[22px] text-ink mb-5">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-[14px] text-gray-600">
                    <span>Subtotal</span>
                    <span className="text-ink font-medium">${(grandTotal - shippingFee).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[14px] text-gray-600">
                    <span>Shipping</span>
                    <span className={shippingFee === 0 ? "text-green-600 font-medium" : "text-ink font-medium"}>
                      {shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="border-t border-mutedLine pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[16px] sm:text-[18px] font-semibold text-ink">Total</span>
                    <span className="text-[18px] sm:text-[20px] font-bold text-ink">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink text-white px-6 py-3.5 text-[14px] font-bold hover:bg-black-800 transition-colors"
                >
                  Proceed to Checkout
                </Link>

                <p className="text-[12px] text-gray-400 text-center mt-3">
                  Secure checkout — no payment required yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
