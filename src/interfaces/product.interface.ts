export interface Product {
  id: string;
  description: string;
  images?: string[];
  inStock: number;
  price: number;
  size: Sizes[];
  shoeSize: ShoeSize[];
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
  shoeSize: ShoeSize | "N/A";
  quantity: number;
  title: string;
  image: string;
}

type Category = "men" | "women" | "kid" | "unisex";
export type Sizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "N_A";

export type ShoeSize =
  | "EU_36"
  | "EU_36_5"
  | "EU_37"
  | "EU_37_5"
  | "EU_38"
  | "EU_38_5"
  | "EU_39"
  | "EU_39_5"
  | "EU_40"
  | "EU_40_5"
  | "EU_41"
  | "EU_41_5"
  | "EU_42"
  | "EU_42_5"
  | "EU_43"
  | "EU_43_5"
  | "EU_44"
  | "EU_44_5"
  | "EU_45"
  | "EU_45_5"
  | "EU_46"
  | "EU_46_5"
  | "EU_47"
  | "EU_47_5"
  | "N_A";

export type Type = "shirts" | "pants" | "hoodies" | "hats";
