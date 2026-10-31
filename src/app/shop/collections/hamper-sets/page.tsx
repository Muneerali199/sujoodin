import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Gift, Sparkles } from "lucide-react";
import { hamperSets } from "@/lib/hampers";

export const metadata: Metadata = {
  title: "Hamper Sets",
  description:
    "Thoughtful Islamic hamper sets for weddings, Eid, new homes, and the people you love. Each Sujood hamper is curated and made to order.",
};

const enquiryHref =
  "mailto:hello@sujood.in?subject=Hamper%20Set%20Enquiry&body=Assalamu%20alaikum%2C%20I%20would%20like%20to%20enquire%20about%20a%20Sujood%20hamper%20set.%0A%0AHamper%3A%20%0ABudget%3A%20%0ADelivery%20date%3A%20%0A";

export default function HamperSetsPage() {
  return (
    <div className="pt-20">
      <section className="border-b border-sand/60 bg-parchment px-6 py-14 lg:px-12 lg:py-20">
        <div className="max-w-[1440px] mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-body text-[10px] tracking-[0.12em] uppercase text-text-muted"
          >
            <Link href="/" className="hover:text-forest transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-forest transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-earth">Hamper Sets</span>
          </nav>

          <div className="mt-9 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-end">
            <div>
              <p className="font-body text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                Curated with care
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-forest-deep">
                Hamper Sets
              </h1>
              <p className="font-body text-sm text-text-muted mt-5 max-w-xl leading-relaxed">
                Five thoughtful combinations for the moments that matter — a
                quiet prayer ritual, a new beginning, or a gift that says what
                words sometimes cannot. Every hamper is made to order and can be
                personalised.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={enquiryHref}
                  className="group inline-flex items-center gap-3 bg-forest text-cream px-6 py-3.5 font-body text-[10px] tracking-[0.2em] uppercase hover:bg-forest-deep transition-colors"
                >
                  Build your hamper
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>
                <Link
                  href="/about#contact"
                  className="font-body text-[10px] tracking-[0.18em] uppercase text-forest border-b border-forest/30 pb-1 hover:border-gold hover:text-gold transition-colors"
                >
                  Ask us for help
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                <img
                  src={hamperSets[0].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden bg-stone mt-8">
                <img
                  src={hamperSets[3].image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <p className="font-body text-[10px] tracking-[0.26em] uppercase text-gold mb-3">
              The collection
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-light text-forest-deep">
              Choose a starting point
            </h2>
          </div>
          <p className="font-body text-xs text-text-muted max-w-sm leading-relaxed">
            Have something else in mind? We can create a custom hamper around
            your budget, occasion, and the person receiving it.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {hamperSets.map((hamper, index) => (
            <article
              key={hamper.slug}
              className={`group flex flex-col border border-sand/70 bg-warm-white overflow-hidden ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className={`relative overflow-hidden bg-stone ${
                  index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                }`}
              >
                <img
                  src={hamper.image}
                  alt={hamper.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-cream/95 px-3 py-1.5 font-body text-[9px] tracking-[0.16em] uppercase text-forest">
                  <Gift size={12} />
                  Hamper
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-display text-2xl font-light text-forest-deep">
                  {hamper.name}
                </h3>
                <p className="font-body text-sm text-text-muted leading-relaxed mt-2">
                  {hamper.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {hamper.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 font-body text-xs text-earth"
                    >
                      <Check size={13} className="text-gold mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 flex items-center justify-between gap-4 border-t border-sand/60">
                  <span className="inline-flex items-center gap-1.5 font-body text-[9px] tracking-[0.16em] uppercase text-gold">
                    <Sparkles size={12} />
                    Made to order
                  </span>
                  <a
                    href={enquiryHref}
                    className="group/link inline-flex items-center gap-2 font-body text-[10px] tracking-[0.16em] uppercase text-forest hover:text-gold transition-colors"
                  >
                    Enquire
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 border border-forest/30 px-6 py-3.5 font-body text-[10px] tracking-[0.2em] uppercase text-forest hover:bg-forest hover:text-cream transition-colors"
          >
            <ArrowLeft
              size={13}
              className="transition-transform group-hover:-translate-x-1"
            />
            Browse all gifts
          </Link>
        </div>
      </section>

      <section className="bg-forest text-cream">
        <div className="max-w-4xl mx-auto px-6 py-16 lg:py-20 text-center">
          <p className="font-body text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
            At Sujood.in
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">
            A gift can be more than just a present.
          </h2>
          <p className="font-body text-sm text-cream/70 leading-relaxed mt-6 max-w-2xl mx-auto">
            It can be a reminder of faith, a source of comfort, and a memory to
            cherish forever. Tell us who you are gifting and what you would like
            to say — we will help you put it together with care.
          </p>
          <a
            href={enquiryHref}
            className="group inline-flex items-center gap-3 mt-8 bg-cream text-forest px-6 py-3.5 font-body text-[10px] tracking-[0.2em] uppercase hover:bg-gold hover:text-forest-deep transition-colors"
          >
            Start a hamper enquiry
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </section>
    </div>
  );
}
