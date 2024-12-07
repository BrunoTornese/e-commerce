import { getPaginetedOrders } from "@/app/actions";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function OrdersPage() {
  const { ok, orders } = await getPaginetedOrders();

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="All Orders" />

      <div className="mb-10">
        <table className="hidden sm:table min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Name
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                State
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.length ? (
              orders.map((order, index) => (
                <tr
                  key={index}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {order.OrderAddress?.firstName}
                  </td>
                  <td className="flex items-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <IoCardOutline
                      className={`${
                        order.isPaid ? "text-green-500" : "text-red-800"
                      }`}
                    />
                    <span
                      className={`mx-2 ${
                        order.isPaid ? "text-green-500" : "text-red-800"
                      }`}
                    >
                      {order.isPaid
                        ? "Payment Completed"
                        : "Payment Incomplete"}
                    </span>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6">
                    <Link
                      href={`/orders/${order.id}`}
                      className="hover:underline"
                    >
                      View order
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-pulse w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                    <p className="text-gray-500 text-sm mb-2">
                      No orders found!
                    </p>
                    <div className="animate-pulse w-full h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="animate-pulse w-3/4 h-4 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="sm:hidden">
          {orders?.length ? (
            orders.map((order, index) => (
              <div
                key={index}
                className="bg-white border-b p-4 mb-4 rounded-lg shadow-md"
              >
                <div className="mb-2">
                  <span className="font-semibold">ID:</span> {order.id}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Name:</span>{" "}
                  {order.OrderAddress?.firstName}
                </div>
                <div className="mb-2 flex items-center">
                  <IoCardOutline
                    className={`${
                      order.isPaid ? "text-green-500" : "text-red-500"
                    }`}
                  />
                  <span
                    className={`ml-2 ${
                      order.isPaid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {order.isPaid ? "Payment Completed" : "Payment Incomplete"}
                  </span>
                </div>
                <div>
                  <Link
                    href={`/orders/${order.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View order
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No orders found!</div>
          )}
        </div>
      </div>
    </>
  );
}
