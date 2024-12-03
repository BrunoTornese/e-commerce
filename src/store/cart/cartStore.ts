import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;

  addProductToCart: (product: CartProduct) => void;

  updateProductQuiantity: (product: CartProduct, quantity: number) => void;

  removeProduct: (product: CartProduct) => void;

  getSumaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  cleaCart: () => void;
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

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        // 1 - Check if the product with the selected size is already in the cart
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );
        // 2 - Update the cart state
        set({ cart: updatedCartProducts });
      },

      getSumaryInformation: () => {
        const { cart } = get();
        // 1 - Calculate the subtotal
        const subTotal = cart.reduce((subTotal, product) => {
          return product.price * product.quantity + subTotal;
        }, 0);
        // 2 - Calculate the taxes
        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return { subTotal, tax, total, itemsInCart };
      },
      cleaCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
