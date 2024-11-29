import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Checkout order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Order summary</span>
            <Link href="/cart" className="underline mb-5">
              Edit cart
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
                  <p className="text-gray-700">${product.price} x 3</p>
                  <p className="font-bold">
                    Subtotal price: ${product.price * 3}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Delivery address</h2>
            <h3 className="font-bold mb-2">Check your data</h3>

            <div className="mb-10">
              <p>Name: Jhon Doe</p>
              <p>State: California</p>
              <p>City: Beverly Hills</p>
              <p>Street: Rodeo Drive, 90210</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-300 mb-10" />
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
              <p className="mb-5">
                <span className="text-xs">
                  By clicking &quot;Finalize Order&quot;, you agree to our{" "}
                  <a href="#" className="underline">
                    terms and conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    privacy policies
                  </a>
                  .
                </span>
              </p>

              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Finalize Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
