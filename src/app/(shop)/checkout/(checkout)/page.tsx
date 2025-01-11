import { Title } from "@/components";
import Link from "next/link";
import { PlaceOrder } from "./ui/PlaceOrder";
import { ProductInCart } from "./ui/ProductsInCart";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center px-5 sm:px-10 lg:px-20 mb-20">
      <div className="flex flex-col w-full max-w-5xl">
        <Title title="Checkout order" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-semibold">
              Order summary
            </span>
            <Link
              href="/cart"
              className="underline text-sm sm:text-base text-blue-600 hover:text-blue-800 mb-5"
            >
              Edit cart
            </Link>
            <ProductInCart />
          </div>
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
