import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout | Sujood",
  description: "Review your order and send a request to Sujood.",
};

export default async function CheckoutPage() {
  const customer = await getCurrentCustomer();
  if (!customer) redirect("/account/login?next=/checkout");

  return <CheckoutClient customer={customer} />;
}
