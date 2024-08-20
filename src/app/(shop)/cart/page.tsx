import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function () {
  //redirect("/empty");

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add products</span>
            <Link href="/" className="underline mb-5">
              Continue shopping
            </Link>

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div className="flex flex-col flex-grow">
                  <p className="font-semibold">{product.title}</p>
                  <p className="text-gray-700">${product.price}</p>
                  <QuantitySelector quantity={3} />
                </div>

                <button className="underline ml-4 text-red-500 hover:text-red-700 self-start">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div>
            <div className="flex justify-between">
              <span>No products</span>
              <span className="text-right">3 items</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal price</span>
              <span className="text-right">$100</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes (15%)</span>
              <span className="text-right">$100</span>
            </div>

            <div className="flex justify-between mt-5">
              <span className="text-2xl">Total:</span>
              <span className="text-right text-2xl mt-1.5">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
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
