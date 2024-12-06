import { PayPalButton, Title } from "@/components";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "../getOrderById";
import { redirect } from "next/navigation";
import { CurrencyFormat } from "@/utils";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const addres = order!.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-10">
      <div className="flex flex-col w-full max-w-4xl">
        <Title title={`Order ${id}`} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                { "bg-red-500": order!.isPaid === false },
                { "bg-green-500": order!.isPaid === true }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">
                {order!.isPaid === false
                  ? "Payment Incomplete"
                  : "Payment Completed"}
              </span>
            </div>

            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex flex-col sm:flex-row items-center mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  className="mb-3 sm:mb-0 sm:mr-5 rounded w-full sm:w-auto"
                  priority
                />

                <div className="flex flex-col flex-grow text-center sm:text-left">
                  <p className="font-semibold">{item.product.title}</p>
                  <p className="text-gray-700">
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal price: {CurrencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-5 sm:p-7">
            <h2 className="text-xl sm:text-2xl mb-3">Delivery Address</h2>
            <div className="mb-5">
              <p className="text-lg sm:text-xl">
                {addres!.firstName} {addres!.lastName}
              </p>
              <p>{addres!.address}</p>
              {addres!.address2 && <p>{addres!.address2}</p>}
              <p>{addres!.postalCode}</p>
              <p>
                {addres!.city}, {addres!.countryId}
              </p>
              <p>{addres!.phone}</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-300 mb-5 sm:mb-10" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span className="text-right">
                  {order?.itemsInCart === 1
                    ? "1 Item"
                    : `${order?.itemsInCart} Items`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal price</span>
                <span className="text-right">
                  {CurrencyFormat(order!.subTotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Taxes (15%)</span>
                <span className="text-right">{CurrencyFormat(order!.tax)}</span>
              </div>

              <div className="flex justify-between mt-5">
                <span className="text-xl sm:text-2xl">Total:</span>
                <span className="text-right text-xl sm:text-2xl mt-1.5">
                  {CurrencyFormat(order!.total)}
                </span>
              </div>
            </div>
            <PayPalButton amount={order!.total} orderId={order!.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
