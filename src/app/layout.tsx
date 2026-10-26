import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Providers } from "@/components/Providers";
import { ToastProvider } from "@/components/ui/Toast";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sujood — Islamic Lifestyle Brand | Modest Fashion & Home Decor",
    template: "%s | Sujood",
  },
  description:
    "Discover modest fashion, Islamic home decor, and prayer essentials. Handcrafted quality, ethically sourced, mindful living. India's premium Islamic lifestyle brand.",
  keywords: [
    "modest fashion",
    "Islamic clothing",
    "Islamic home decor",
    "prayer essentials",
    "Muslim fashion India",
    "ethical fashion",
  ],
  authors: [{ name: "Sujood" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sujood.in",
    siteName: "Sujood",
    title: "Sujood — Islamic Lifestyle Brand",
    description: "Modest fashion, Islamic home decor & prayer essentials.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujood — Islamic Lifestyle Brand",
    description: "Modest fashion, Islamic home decor & prayer essentials.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-dark antialiased overflow-x-hidden">
        <ToastProvider>
          <Providers>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </Providers>
        </ToastProvider>
      </body>
    </html>
  );
}
