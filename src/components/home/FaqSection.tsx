import Link from "next/link";
import { Plus } from "lucide-react";
import { OrnamentHeading } from "./OrnamentHeading";

const faqs = [
  {
    question: "What are the best Islamic gifts?",
    answer:
      "The best gift depends on the person and the occasion. Prayer essentials, a beautifully made prayer mat, a tasbeeh, modest layers, or a considered home piece are all thoughtful choices. If you are unsure, start with our gift edit or write to us with a budget and we will suggest something.",
  },
  {
    question: "Where can I buy Islamic gifts online in India?",
    answer:
      "You are in the right place. Sujood ships across India from our online store. Browse by occasion, category, or relationship, and checkout sends us an order request so we can confirm stock and delivery before payment.",
  },
  {
    question: "Can I send a gift directly to someone else?",
    answer:
      "Yes. Add their address at checkout and let us know it is a gift in the order notes. We will keep the pricing out of the parcel and can include a handwritten note if you email us after ordering.",
  },
  {
    question: "Do you offer bulk or corporate gifting?",
    answer:
      "We can help with bulk orders for weddings, Ramadan events, and community gifting. Email hello@sujood.in with the quantity, budget, and delivery date and our team will put together a proposal.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are packed within 24 hours of payment and delivered in 5–7 business days. Remote PIN codes may take a little longer. You will receive a tracking link as soon as your parcel is collected.",
  },
  {
    question: "Can I return or exchange a gift?",
    answer:
      "Unworn items with tags and original packaging can be returned within 7 days of delivery. Return pickup is free, and you can choose a refund or an exchange. Opened candles and fragrances are not returnable for hygiene reasons.",
  },
];

export function FaqSection() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-10 max-w-[1440px] mx-auto">
      <OrnamentHeading
        eyebrow="Good to know"
        title="FAQs on Islamic Gifts"
        subtitle="A few answers before you choose. If your question is not here, we are one message away."
        action={{ label: "All FAQs", href: "/faq" }}
      />

      <div className="max-w-3xl mx-auto mt-12 border-t border-sand/70">
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-sand/70">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-lg font-light text-dark group-hover:text-earth transition-colors">
                {faq.question}
              </span>
              <Plus
                size={18}
                className="mt-1 shrink-0 text-earth transition-transform duration-300 group-open:rotate-45"
              />
            </summary>
            <p className="font-body text-sm text-text-muted leading-relaxed pb-6 pr-10 max-w-2xl">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>

      <p className="text-center mt-8 font-body text-xs text-text-muted">
        Still unsure?{" "}
        <Link
          href="/about#contact"
          className="text-forest border-b border-forest/30 hover:border-gold hover:text-gold transition-colors"
        >
          Talk to our gifting team
        </Link>
      </p>
    </section>
  );
}
