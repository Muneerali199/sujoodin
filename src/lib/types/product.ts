export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  badge?: "New" | "Bestseller" | "Sale";
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  itemCount: number;
  image: string;
  pattern?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  date: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
}
