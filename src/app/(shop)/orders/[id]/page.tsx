import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function ProductBySlugPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order ${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                { "bg-red-500": true },
                { "bg-green-500": false }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Payment Incomplete</span>
              <span className="mx-2">Payment Completed</span>
            </div>

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
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  { "bg-red-500": true },
                  { "bg-green-500": false }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2">Payment Incomplete</span>
                <span className="mx-2">Payment Completed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
