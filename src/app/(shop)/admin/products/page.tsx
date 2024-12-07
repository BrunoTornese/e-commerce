import { getPaginatedProductsWithImages } from "@/app/actions";
import { Pagination, Title } from "@/components";
import { CurrencyFormat } from "@/utils";
import Image from "next/image";
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
        <Link href={"/admin/product/new"} className="btn-primary mr-4">
          Add Product
        </Link>
      </div>

      <div className="mb-10">
        <table className="hidden sm:table min-w-full">
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
            </tr>
          </thead>
          <tbody>
            {products?.length ? (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={`/products/${product.ProductImage[0].url}`}
                        width={80}
                        height={80}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`admin/product/${product.slug}`}
                      className="hover:underline"
                    >
                      {product.title}
                    </Link>
                  </td>
                  <td className="text-sm font-bold text-gray-900  px-6 py-4 whitespace-nowrap">
                    {CurrencyFormat(product.price)}
                  </td>
                  <td className="text-sm font-white text-gray-900  px-6 py-4 whitespace-nowrap">
                    {product.gender}
                  </td>
                  <td className=" text-sm font-bold text-gray-900  px-6 py-4 whitespace-nowrap">
                    {product.inStock}
                  </td>
                  <td className="text-sm font-bold text-gray-900  px-6 py-4 whitespace-nowrap">
                    {product.size.join(", ")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="animate-pulse w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                    <p className="text-gray-500 text-sm mb-2">
                      No products found!
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
          {products?.length ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white border-b p-4 mb-4 rounded-lg shadow-md"
              >
                <div className="flex">
                  <Link href={`/products/${product.slug}`} className="w-1/4">
                    <Image
                      src={`/products/${product.ProductImage[0].url}`}
                      width={80}
                      height={80}
                      alt={product.title}
                      className="w-full h-auto object-cover rounded"
                    />
                  </Link>
                  <div className="ml-4 w-3/4">
                    <div className="text-sm font-semibold text-gray-900">
                      <Link
                        href={`admin/product/${product.slug}`}
                        className="hover:underline"
                      >
                        {product.title}
                      </Link>
                    </div>
                    <div className="text-sm text-gray-500">
                      Price {CurrencyFormat(product.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Gender {product.gender}
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.inStock} in stock
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No products found!</div>
          )}
        </div>
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
}
