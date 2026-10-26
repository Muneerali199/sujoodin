"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { cartItemKey, useCartStore } from "@/lib/store/cart";
import { useStoreHydrated } from "@/lib/store/use-store-hydrated";
import { fadeIn } from "@/lib/framer-variants";

const ORDER_EMAIL = "hello@sujood.in";

interface Details {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

const emptyDetails: Details = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

export default function CheckoutPage() {
  const hydrated = useStoreHydrated(useCartStore);
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice());
  const discount = useCartStore((state) => state.discount());
  const shipping = useCartStore((state) => state.shipping());
  const total = useCartStore((state) => state.grandTotal());
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof Details, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!details.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))
      next.email = "Please enter a valid email.";
    if (!/^\d{10}$/.test(details.phone.replace(/\D/g, "")))
      next.phone = "Enter a 10-digit mobile number.";
    if (details.address.trim().length < 10)
      next.address = "Please enter your full address.";
    if (!details.city.trim()) next.city = "Please enter your city.";
    if (!details.state.trim()) next.state = "Please enter your state.";
    if (!/^\d{6}$/.test(details.pincode))
      next.pincode = "Enter a 6-digit PIN code.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildOrderText = () => {
    const lines = [
      `Order request — Sujood`,
      ``,
      `Name: ${details.name}`,
      `Email: ${details.email}`,
      `Phone: ${details.phone}`,
      `Address: ${details.address}`,
      `${details.city}, ${details.state} — ${details.pincode}`,
      details.notes ? `Notes: ${details.notes}` : "",
      ``,
      `Items:`,
      ...items.map(
        (item) =>
          `• ${item.name} × ${item.quantity} — ₹${item.price * item.quantity}` +
          (item.selectedSize ? ` | Size: ${item.selectedSize}` : "") +
          (item.selectedColor ? ` | Color: ${item.selectedColor}` : "")
      ),
      ``,
      `Subtotal: ₹${totalPrice}`,
      discount > 0 ? `Discount: −₹${discount}` : "",
      `Shipping: ${shipping === 0 ? "Free" : `₹${shipping}`}`,
      `Total: ₹${total}`,
      ``,
      `Please confirm availability and share payment options.`,
    ];
    return lines.filter(Boolean).join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = `Order request — ${details.name}`;
    const body = buildOrderText();
    window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (!hydrated) {
    return <div className="pt-32 min-h-[60vh]" aria-hidden="true" />;
  }

  if (items.length === 0 && !sent) {
    return (
      <div className="pt-32 min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl font-light mb-4">
          Your cart is empty
        </h1>
        <p className="font-body text-sm text-text-muted mb-8">
          Add a piece to your cart before checking out.
        </p>
        <Link
          href="/shop"
          className="bg-dark text-cream font-body text-xs tracking-[0.15em] uppercase px-6 py-3 hover:bg-earth transition-colors"
        >
          Explore the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="py-16 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to cart
        </Link>
        <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-4">
          Checkout
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-light">
          {sent ? "Order request sent" : "Delivery details"}
        </h1>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-24">
        {sent ? (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <div className="flex items-start gap-4 border border-gold/40 bg-gold/5 p-6">
              <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display text-2xl font-light">
                  We&apos;ve prepared your order email
                </h2>
                <p className="font-body text-sm text-text-muted leading-relaxed mt-3">
                  Your email app should open with the order details. Send it to{" "}
                  <span className="text-dark">{ORDER_EMAIL}</span> and we&apos;ll
                  confirm availability and share payment options within 24 hours.
                </p>
                <p className="font-body text-xs text-text-muted mt-3">
                  If your mail app didn&apos;t open, use the button below.
                </p>
                <a
                  href={`mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(
                    `Order request — ${details.name}`
                  )}&body=${encodeURIComponent(buildOrderText())}`}
                  className="inline-flex items-center gap-2 mt-5 bg-dark text-cream font-body text-xs tracking-[0.15em] uppercase px-5 py-3 hover:bg-earth transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Open order email
                </a>
              </div>
            </div>
            <Link
              href="/shop"
              className="inline-block mt-8 font-body text-xs tracking-[0.15em] uppercase text-earth hover:text-dark transition-colors"
            >
              Continue shopping
            </Link>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-3 gap-12 lg:gap-16"
          >
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Full name"
                  value={details.name}
                  onChange={(v) => update("name", v)}
                  error={errors.name}
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  type="email"
                  value={details.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>
              <Field
                label="Mobile number"
                type="tel"
                value={details.phone}
                onChange={(v) => update("phone", v)}
                error={errors.phone}
                autoComplete="tel"
                placeholder="10-digit number"
              />
              <Field
                label="Address"
                value={details.address}
                onChange={(v) => update("address", v)}
                error={errors.address}
                autoComplete="street-address"
                textarea
              />
              <div className="grid sm:grid-cols-3 gap-5">
                <Field
                  label="City"
                  value={details.city}
                  onChange={(v) => update("city", v)}
                  error={errors.city}
                  autoComplete="address-level2"
                />
                <Field
                  label="State"
                  value={details.state}
                  onChange={(v) => update("state", v)}
                  error={errors.state}
                  autoComplete="address-level1"
                />
                <Field
                  label="PIN code"
                  value={details.pincode}
                  onChange={(v) => update("pincode", v)}
                  error={errors.pincode}
                  autoComplete="postal-code"
                  inputMode="numeric"
                />
              </div>
              <Field
                label="Order notes (optional)"
                value={details.notes}
                onChange={(v) => update("notes", v)}
                autoComplete="off"
                textarea
              />

              <p className="font-body text-xs text-text-muted leading-relaxed">
                This is an order request, not a payment. We&apos;ll confirm stock
                and send you a secure payment link by email.
              </p>
            </div>

            <aside>
              <div className="bg-warm-white p-8 sticky top-28">
                <h2 className="font-display text-xl font-light mb-6">
                  Order Summary
                </h2>
                <div className="flex flex-col gap-4 pb-6 border-b border-sand">
                  {items.map((item) => (
                    <div
                      key={cartItemKey(item)}
                      className="flex items-start justify-between gap-4"
                    >
                      <div className="font-body text-sm text-earth">
                        {item.name}
                        <span className="text-text-muted">
                          {" "}
                          × {item.quantity}
                        </span>
                        {(item.selectedSize || item.selectedColor) && (
                          <span className="block text-xs text-text-muted mt-0.5">
                            {[item.selectedSize, item.selectedColor]
                              .filter(Boolean)
                              .join(" · ")}
                          </span>
                        )}
                      </div>
                      <span className="font-body text-sm whitespace-nowrap">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pt-5">
                  <Row label="Subtotal" value={`₹${totalPrice}`} />
                  {discount > 0 && (
                    <Row label="Discount" value={`−₹${discount}`} accent />
                  )}
                  <Row
                    label="Shipping"
                    value={shipping === 0 ? "Free" : `₹${shipping}`}
                  />
                  <div className="flex items-center justify-between pt-4 border-t border-sand">
                    <span className="font-body text-base">Total</span>
                    <span className="font-display text-2xl">₹{total}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-6 bg-dark text-cream font-body text-sm tracking-wide px-6 py-4 hover:bg-earth transition-colors duration-300"
                >
                  Send Order Request
                </button>
                <p className="font-body text-[10px] text-text-muted text-center mt-3">
                  Opens your email app — no payment taken online.
                </p>
              </div>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-body text-sm text-earth">{label}</span>
      <span
        className={`font-body text-sm ${accent ? "text-gold" : "text-dark"}`}
      >
        {value}
      </span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  textarea = false,
  autoComplete,
  inputMode,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
  placeholder?: string;
}) {
  const shared = `w-full bg-transparent border px-4 py-3 font-body text-sm placeholder:text-text-muted focus:outline-none transition-colors ${
    error ? "border-red-400 focus:border-red-500" : "border-sand focus:border-gold"
  }`;

  return (
    <label className="block">
      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-earth">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          rows={3}
          className={`${shared} mt-2 resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          className={`${shared} mt-2`}
        />
      )}
      {error && (
        <span className="font-body text-xs text-red-600 mt-1 block">{error}</span>
      )}
    </label>
  );
}
