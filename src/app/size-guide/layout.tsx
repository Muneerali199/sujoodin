import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide",
  description:
    "Find your perfect fit. Detailed measurement charts for abayas, thobes, hijabs and prayer wear at Sujood.",
};

export default function SizeGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
