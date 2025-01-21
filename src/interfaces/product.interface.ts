export interface Product {
  id: string;
  description: string;
  images?: string[];
  inStock: number;
  price: number;
  size: Sizes[];
  shoeSize: ShoeSizes[];
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
  shoeSize: ShoeSizes | "N/A";
  quantity: number;
  title: string;
  image: string;
}

type Category = "men" | "women" | "kid" | "unisex";
export type Sizes = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | "N_A";

export type ShoeSizes =
  | "EU_36"
  | "EU_36.5"
  | "EU_37"
  | "EU_37.5"
  | "EU_38"
  | "EU_38.5"
  | "EU_39"
  | "EU_39.5"
  | "EU_40"
  | "EU_40.5"
  | "EU_41"
  | "EU_41.5"
  | "EU_42"
  | "EU_42.5"
  | "EU_43"
  | "EU_43.5"
  | "EU_44"
  | "EU_44.5"
  | "EU_45"
  | "EU_45.5"
  | "EU_46"
  | "EU_46.5"
  | "EU_47"
  | "EU_47.5"
  | "N_A";

export type Type = "shirts" | "pants" | "hoodies" | "hats";
