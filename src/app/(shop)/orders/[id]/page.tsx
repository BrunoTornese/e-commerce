import { PayPalButton, Title } from "@/components";
import Image from "next/image";
import { getOrderById } from "../getOrderById";
import { redirect } from "next/navigation";
import { CurrencyFormat } from "@/utils";
import { OrderStatus } from "@/components/orders/orderStatus";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok || !order) {
    redirect("/");
  }

  const {
    OrderAddress: address,
    OrderItem: items,
    isPaid,
    itemsInCart,
    subTotal,
    tax,
    total,
    id: orderId,
    createdAt,
    paidAt,
  } = order;

  return (
    <div className="flex justify-center items-center mb-72 px-5 sm:px-10">
      <div className="flex flex-col w-full max-w-4xl">
        <Title title={`Order ${id}`} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
          {/* Product List */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={isPaid} />
            {items.map((item) => (
              <div
                key={`${item.product.slug}-${item.size}`}
                className="flex flex-col sm:flex-row items-center mb-5"
              >
                {item.product.ProductImage[0]?.url && (
                  <Image
                    src={`/products/${item.product.ProductImage[0].url}`}
                    width={100}
                    height={100}
                    alt={item.product.title}
                    className="mb-3 sm:mb-0 sm:mr-5 rounded w-full sm:w-auto"
                    priority
                  />
                )}
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
                {address?.firstName} {address?.lastName}
              </p>
              <p>{address?.address}</p>
              {address?.address2 && <p>{address.address2}</p>}
              <p>{address?.postalCode}</p>
              <p>
                {address?.city}, {address?.countryId}
              </p>
              <p>{address?.phone}</p>
            </div>
            <div className="w-full h-0.5 rounded bg-gray-300 mb-5 sm:mb-10" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span className="text-right">
                  {itemsInCart === 1 ? "1 Item" : `${itemsInCart} Items`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal price</span>
                <span className="text-right">{CurrencyFormat(subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (15%)</span>
                <span className="text-right">{CurrencyFormat(tax)}</span>
              </div>
              <div className="flex justify-between mt-5">
                <span className="text-xl sm:text-2xl">Total:</span>
                <span className="text-right text-xl sm:text-2xl mt-1.5">
                  {CurrencyFormat(total)}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-lg font-semibold">Order Information</h3>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(createdAt).toLocaleString("en-US")}
              </p>
              {isPaid && (
                <p>
                  <strong>Paid On:</strong>{" "}
                  {new Date(paidAt!).toLocaleString("en-US")}
                </p>
              )}
            </div>

            <div className="mt-5">
              {isPaid ? (
                <OrderStatus isPaid={isPaid} />
              ) : (
                <>
                  <PayPalButton amount={total} orderId={orderId} />
                  <div className="mt-5 bg-yellow-100 p-5 border-l-4 border-yellow-600 text-center text-sm text-gray-800">
                    <p className="font-semibold">
                      If you want, you can pay with these PayPal Sandbox
                      accounts:
                    </p>
                    <p>
                      Email:
                      <strong> sb-x0aao30890133@personal.example.com</strong>
                    </p>
                    <p>
                      Password: <strong>12345678</strong>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
