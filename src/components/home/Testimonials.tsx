import Link from "next/link";
import { BadgeCheck, Star } from "lucide-react";
import { OrnamentHeading } from "./OrnamentHeading";
import { products, testimonials } from "@/lib/data";

const extraReviews = [
  {
    id: "5",
    name: "Sana Rahman",
    location: "Lucknow",
    rating: 5,
    quote:
      "The tasbeeh arrived in the loveliest box. It feels substantial in the hand and the crystals catch the light beautifully. A gift I was proud to give.",
  },
  {
    id: "6",
    name: "Imran Qureshi",
    location: "Pune",
    rating: 5,
    quote:
      "The oud candle is warm rather than overpowering, exactly what I wanted for our living room after Maghrib. Packaging was immaculate.",
  },
  {
    id: "7",
    name: "Aaliya S.",
    location: "Chennai",
    rating: 5,
    quote:
      "Ordered the kids thobe for Eid and it fit perfectly. The cotton is soft, the finish is neat, and my son actually wants to wear it.",
  },
  {
    id: "8",
    name: "Noor Jahan",
    location: "Kolkata",
    rating: 5,
    quote:
      "A small order that felt incredibly considered. The prayer cap is beautifully finished and arrived earlier than expected. Will be back.",
  },
];

const reviewProducts = [
  products[1],
  products[3],
  products[2],
  products[4],
  products[7],
  products[5],
  products[6],
  products[0],
];

export function Testimonials() {
  const reviews = [...testimonials, ...extraReviews].map((review, index) => ({
    ...review,
    product: reviewProducts[index].name,
    image: reviewProducts[index].images[0],
  }));

  return (
    <section
      id="reviews"
      className="scroll-mt-20 sm:scroll-mt-32 bg-[#F7F2E8] py-20 lg:py-28 border-y border-sand/60"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <OrnamentHeading
            align="left"
            eyebrow="In their words"
            title="Customer Reviews"
            subtitle="The pieces our community keeps coming back to — and the words they send us after."
          />

          <div className="flex items-center gap-5 border border-sand/80 bg-warm-white px-5 py-4 lg:mb-2">
            <span className="font-display text-4xl font-light text-forest-deep">
              4.9
            </span>
            <div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={13}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>
              <p className="font-body text-[9px] tracking-[0.14em] uppercase text-text-muted mt-1.5">
                From our community
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="group flex flex-col border border-sand/70 bg-warm-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                <img
                  src={review.image}
                  alt={review.product}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-cream/90 px-2 py-1 font-body text-[8px] tracking-[0.12em] uppercase text-forest">
                  <BadgeCheck size={11} />
                  Verified
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star
                      key={index}
                      size={11}
                      className="fill-gold text-gold"
                    />
                  ))}
                </div>
                <blockquote className="font-body text-xs text-dark/75 leading-relaxed mt-3 line-clamp-4">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <div className="mt-auto pt-5">
                  <p className="font-body text-[11px] font-medium text-dark">
                    {review.name}
                  </p>
                  <p className="font-body text-[9px] tracking-[0.1em] uppercase text-text-muted mt-1">
                    {review.location} · {review.product}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/shop/collections/best-sellers"
            className="font-body text-[10px] tracking-[0.2em] uppercase text-forest border-b border-forest/30 pb-1 hover:border-gold hover:text-gold transition-colors"
          >
            Shop the reviewed pieces
          </Link>
        </div>
      </div>
    </section>
  );
}
