export function MarqueeStrip() {
  const items = [
    "Modest Fashion",
    "Islamic Home Decor",
    "Prayer Essentials",
    "Handcrafted Quality",
    "Mindful Living",
    "Ethically Sourced",
  ];

  return (
    <div className="bg-dark py-4 overflow-hidden">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center mx-6">
            <span className="font-body text-sm text-cream/80 tracking-wide">
              {item}
            </span>
            <span className="text-gold mx-6 text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
