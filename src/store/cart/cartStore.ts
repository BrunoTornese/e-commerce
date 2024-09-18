import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;
  updateProductQuiantity: (product: CartProduct, quantity: number) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        // Calculate the total number of items in the cart
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // 1 - Check if the product with the selected size is already in the cart
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        // 2 - If the product is not in the cart, add it to the cart
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        // 3 - If the product is in the cart, update the quantity
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        // 4 - Update the cart state
        set({ cart: updatedCart });
      },
      updateProductQuiantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        // 1 - Check if the product with the selected size is already in the cart
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        // 2 - Update the cart state
        set({ cart: updatedCartProducts });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
