import Link from "next/link";

const mentions = [
  {
    label: "Instagram",
    href: "https://instagram.com/sujood.in",
    external: true,
  },
  { label: "The Sujood Journal", href: "/journal" },
  { label: "Community Stories", href: "/#reviews" },
  { label: "Gift Guides", href: "/journal" },
  { label: "Sujood Letters", href: "/#newsletter" },
];

export function SeenAndShared() {
  return (
    <section className="border-y border-sand/60 bg-warm-white py-11">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="font-body text-[9px] tracking-[0.26em] uppercase text-text-muted">
          As Seen On
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 sm:gap-x-14">
          {mentions.map((mention) => {
            const className =
              "font-display text-xl sm:text-2xl font-light text-earth/65 hover:text-forest transition-colors";

            return mention.external ? (
              <a
                key={mention.label}
                href={mention.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {mention.label}
              </a>
            ) : (
              <Link
                key={mention.label}
                href={mention.href}
                className={className}
              >
                {mention.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
