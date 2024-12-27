export const revalidate = 0;

import { getPaginatedProductsWithImages } from "@/app/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { CurrencyFormat } from "@/utils";

import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="All Products" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <div className="hidden sm:block">
          <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Sizes
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/product/${product.slug}`}>
                      <ProductImage
                        src={product.images ? product.images[0] : ""}
                        width={80}
                        height={80}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/admin/product/${product.slug}`}
                      className="hover:underline"
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className="text-sm font-bold  text-gray-900 px-6 py-4 whitespace-nowrap">
                    {CurrencyFormat(product.price)}
                  </td>

                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.gender}
                  </td>

                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {product.inStock}
                  </td>

                  <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {product.size.join(", ")}
                  </td>

                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.tags.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border-b p-4 mb-4 rounded-md shadow-sm"
            >
              <div className="flex items-center mb-4">
                <Link href={`/product/${product.slug}`}>
                  <ProductImage
                    src={product.images ? product.images[0] : ""}
                    width={80}
                    height={80}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                </Link>
                <div className="ml-4">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="text-lg font-semibold hover:underline"
                  >
                    {product.title}
                  </Link>
                  <p className="text-sm text-gray-600">
                    {CurrencyFormat(product.price)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Gender:</strong> {product.gender}
                </div>
                <div>
                  <strong>Stock:</strong> {product.inStock}
                </div>
                <div>
                  <strong>Sizes:</strong> {product.size.join(", ")}
                </div>
                <div>
                  <strong>Category:</strong> {product.tags.join(", ")}{" "}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
