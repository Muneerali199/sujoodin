import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { AccountLogoutButton } from "@/components/account/AccountLogoutButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your account | Sujood",
  description: "View your Sujood account and order requests.",
};

const statusLabels: Record<string, string> = {
  requested: "Request received",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(value);
}

export default async function AccountPage() {
  const customer = await getCurrentCustomer();
  if (!customer) redirect("/account/login?next=/account");

  const orders = await prisma.order.findMany({
    where: { customerId: customer.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="pt-20">
      <section className="py-14 px-6 lg:px-12 max-w-[1200px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-sand pb-8">
          <div>
            <p className="font-body text-[10px] tracking-[0.28em] uppercase text-earth mb-3">
              Account
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light">
              {customer.name}
            </h1>
            <p className="font-body text-sm text-text-muted mt-2">
              {customer.email}
              {customer.phone ? ` · ${customer.phone}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/shop"
              className="font-body text-xs tracking-[0.14em] uppercase text-earth hover:text-dark transition-colors"
            >
              Continue shopping
            </Link>
            <AccountLogoutButton />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mt-10">
          <aside className="lg:col-span-1">
            <div className="border border-sand bg-warm-white p-6">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-earth mb-4">
                Account details
              </p>
              <dl className="space-y-4">
                <div>
                  <dt className="font-body text-[10px] tracking-[0.12em] uppercase text-text-muted">
                    Name
                  </dt>
                  <dd className="font-body text-sm text-dark mt-1">
                    {customer.name}
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-[10px] tracking-[0.12em] uppercase text-text-muted">
                    Email
                  </dt>
                  <dd className="font-body text-sm text-dark mt-1 break-all">
                    {customer.email}
                  </dd>
                </div>
                <div>
                  <dt className="font-body text-[10px] tracking-[0.12em] uppercase text-text-muted">
                    Mobile
                  </dt>
                  <dd className="font-body text-sm text-dark mt-1">
                    {customer.phone || "Not added"}
                  </dd>
                </div>
              </dl>
              <p className="font-body text-xs text-text-muted leading-relaxed mt-6 pt-5 border-t border-sand">
                Need to update your details? Email{" "}
                <a
                  href="mailto:hello@sujood.in"
                  className="text-earth hover:text-dark underline underline-offset-4"
                >
                  hello@sujood.in
                </a>
                .
              </p>
            </div>
          </aside>

          <div id="orders" className="scroll-mt-24 lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl font-light">Order requests</h2>
              <span className="font-body text-[10px] tracking-[0.14em] uppercase text-text-muted">
                {orders.length} total
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="border border-sand bg-warm-white p-10 text-center">
                <Package className="w-8 h-8 text-sand mx-auto mb-4" />
                <p className="font-display text-xl font-light mb-2">
                  No orders yet
                </p>
                <p className="font-body text-sm text-text-muted mb-6">
                  When you send an order request, it will appear here.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-dark text-cream font-body text-xs tracking-[0.14em] uppercase px-5 py-3 hover:bg-earth transition-colors"
                >
                  Explore the collection
                  <ArrowRight size={14} />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <article
                    key={order.id}
                    className="border border-sand bg-warm-white"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-sand">
                      <div>
                        <p className="font-body text-[10px] tracking-[0.16em] uppercase text-text-muted">
                          Order {order.number}
                        </p>
                        <p className="font-body text-xs text-text-muted mt-1">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-body text-[10px] tracking-[0.1em] uppercase bg-gold/15 text-earth px-2.5 py-1">
                          {statusLabels[order.status] ?? order.status}
                        </span>
                        <span className="font-display text-xl">
                          ₹{order.total}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-4"
                        >
                          <div className="font-body text-sm text-earth">
                            {item.name}
                            <span className="text-text-muted">
                              {" "}
                              × {item.quantity}
                            </span>
                            {(item.size || item.color) && (
                              <span className="block text-xs text-text-muted mt-0.5">
                                {[item.size, item.color].filter(Boolean).join(" · ")}
                              </span>
                            )}
                          </div>
                          <span className="font-body text-sm whitespace-nowrap">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="px-5 pb-5 flex flex-wrap gap-x-6 gap-y-1 font-body text-xs text-text-muted">
                      <span>Subtotal ₹{order.subtotal}</span>
                      {order.discount > 0 && (
                        <span>Discount −₹{order.discount}</span>
                      )}
                      <span>
                        Shipping {order.shipping === 0 ? "Free" : `₹${order.shipping}`}
                      </span>
                      <span className="text-earth">
                        Total ₹{order.total}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <p className="font-body text-xs text-text-muted leading-relaxed mt-6">
              Order requests are confirmed by email. We&apos;ll share a secure
              payment link once stock and delivery are confirmed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
