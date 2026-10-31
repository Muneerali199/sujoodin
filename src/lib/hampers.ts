export interface HamperSet {
  slug: string;
  name: string;
  description: string;
  includes: string[];
  image: string;
}

export const hamperSets: HamperSet[] = [
  {
    slug: "janamaz-resin-tasbeeh",
    name: "Janamaz & Resin Tasbeeh",
    description:
      "A soft prayer mat paired with a hand-finished resin tasbeeh for a quieter daily ritual.",
    includes: ["Premium Janamaz", "Personalised resin tasbeeh"],
    image:
      "https://images.unsplash.com/photo-1761958150507-7bcc80840cf9?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "itr-tasbeeh",
    name: "Itr & Tasbeeh",
    description:
      "A gentle fragrance and a balanced tasbeeh — a small, beautiful reminder of remembrance.",
    includes: ["Alcohol-free itr", "Hand-finished tasbeeh"],
    image:
      "https://images.unsplash.com/photo-1772805498407-69163cc34bc9?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "hadiya-resin-gift",
    name: "Hadiya Set & Resin Gift",
    description:
      "A thoughtful hadiya set finished with a personalised resin keepsake for someone dear.",
    includes: ["Curated hadiya set", "Personalised resin gift"],
    image:
      "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "janamaz-hijab-bouquet",
    name: "Janamaz, Hijab & Bouquet",
    description:
      "A complete gifting moment: a soft Janamaz, a beautifully wrapped hijab, and a bouquet.",
    includes: ["Premium Janamaz", "Wrapped hijab", "Hand-tied bouquet"],
    image:
      "https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=1200&q=85",
  },
  {
    slug: "janamaz-calligraphy-hijab-resin-tasbeeh",
    name: "Janamaz, Calligraphy Hijab & Resin Tasbeeh",
    description:
      "Our most layered hamper: a Janamaz, calligraphy hijab, and personalised resin tasbeeh.",
    includes: ["Premium Janamaz", "Calligraphy hijab", "Resin tasbeeh"],
    image:
      "https://images.unsplash.com/photo-1771909752761-d26abe4e60ba?auto=format&fit=crop&w=1200&q=85",
  },
];
