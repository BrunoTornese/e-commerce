import Link from "next/link";
import { Title } from "@/components";
import { ProductInCart } from "./ui/poductsInCart";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col w-full max-w-6xl">
        <Title title="Cart" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl font-semibold">Add items</span>
            <Link
              href="/"
              className="text-blue-700 flex items-center space-x-2 hover:text-blue-900 transition-colors"
            >
              <span>Continue Shopping</span>
              <IoArrowForwardOutline className="text-lg" />
            </Link>
            <div className="mt-5">
              <ProductInCart />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-5 md:p-7 h-fit">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
              <span>Number of items</span>
              <span className="text-right">3 items</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Taxes (15%)</span>
              <span className="text-right">$15</span>

              <span className="mt-5 text-xl md:text-2xl font-semibold">
                Total:
              </span>
              <span className="mt-5 text-xl md:text-2xl font-semibold text-right">
                $115
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex items-center justify-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-900 transition-colors"
                href="/checkout/address"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
