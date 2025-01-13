export interface Product {
  id: string;
  description: string;
  images?: string[];
  inStock: number;
  price: number;
  size: Sizes[];
  slug: string;
  tags: string[];
  title: string;
  gender: Category;
}

export interface CartProduct {
  stock: number;
  id: string;
  price: number;
  slug: string;
  size: Sizes | "N/A";
  quantity: number;
  title: string;
  image: string;
}

type Category = "men" | "women" | "kid" | "unisex";
export type Sizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "N_A";

export type Type = "shirts" | "pants" | "hoodies" | "hats";
