import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Ornament } from "./OrnamentHeading";

const sections = [
  {
    title: "Islamic Gifts for Every Occasion",
    body: "Finding a gift that feels both beautiful and meaningful can be simpler than it seems. Start with the occasion, then think about the person: a new home, a nikah, a Ramadan table, a friend returning from Umrah. Sujood brings together prayer essentials, modest fashion, and considered home pieces so you can choose something that fits the moment rather than something generic.",
  },
  {
    title: "Thoughtful Gifting, Made Simple",
    body: "Every Sujood piece is selected for the way it will be used, not just the way it looks. That means prayer mats with real cushioning, fabrics that breathe through an Indian summer, and home pieces that earn their place on a shelf. Our gift edit is arranged by occasion and relationship, so you can move from a vague idea to a considered present without scrolling for hours.",
  },
  {
    title: "Prayer Essentials for Daily Life",
    body: "The daily ritual deserves objects that support it: a mat that stays flat, a tasbeeh that feels balanced in the hand, a prayer cap finished with care. These are small details, but they shape how present you feel. Our prayer collection is intentionally compact — fewer, better pieces chosen for comfort, durability, and quiet beauty.",
  },
  {
    title: "Modest Fashion, Considered",
    body: "Modest dressing is not a trend to us. It is a way of moving through the world with ease and intention. We look for breathable natural fibres, clean silhouettes, and colours that work across seasons. Whether you are dressing for Jummah, a wedding, or an ordinary Tuesday, the aim is the same: pieces that feel like you, and that you will reach for again.",
  },
];

export function SeoContent() {
  return (
    <section className="bg-warm-white border-y border-sand/60 py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="text-center">
          <p className="font-body text-[10px] tracking-[0.26em] uppercase text-gold mb-4">
            The Sujood guide
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-forest-deep">
            Gifting with Meaning
          </h2>
          <Ornament className="mt-6" />
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display text-2xl font-light text-forest-deep">
                {section.title}
              </h3>
              <p className="font-body text-sm text-text-muted leading-relaxed mt-3">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-sand/70 pt-8">
          <h3 className="font-display text-2xl font-light text-forest-deep">
            Hamper Sets, Curated with Care
          </h3>
          <p className="font-body text-sm text-text-muted leading-relaxed mt-3 max-w-3xl">
            From a Janamaz and resin tasbeeh to an itr and tasbeeh pairing, our
            hamper sets are built around the person receiving them. Choose a
            starting point or ask us to create something entirely personal —
            every hamper is made to order and can include customised Janamaz,
            resin tasbeeh, calligraphy hijabs, and thoughtful wedding gifts.
          </p>
          <Link
            href="/shop/collections/hamper-sets"
            className="group inline-flex items-center gap-2 mt-4 font-body text-[10px] tracking-[0.18em] uppercase text-forest border-b border-forest/30 pb-1 hover:border-gold hover:text-gold transition-colors"
          >
            Explore hamper sets
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-12 border-t border-sand/70 pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="font-body text-xs text-text-muted leading-relaxed max-w-xl">
            Looking for something specific, or planning a bulk order for a
            wedding or community event? Write to us and we will help you put
            together something thoughtful.
          </p>
          <Link
            href="/about"
            className="group inline-flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-forest border-b border-forest/30 pb-1 hover:border-gold hover:text-gold transition-colors shrink-0"
          >
            Read our story
            <ArrowRight
              size={13}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
