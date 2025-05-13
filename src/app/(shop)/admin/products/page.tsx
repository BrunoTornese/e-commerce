export const revalidate = 0;

import { getPaginatedProductsWithImages } from "@/app/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { CurrencyFormat } from "@/utils";
import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
    sort?: "asc" | "desc";
    discount?: "desc";
  };
}

export default async function OrdersPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const sortOrder = searchParams.sort === "desc" ? "desc" : "asc";
  const discountOrder = searchParams.discount === "desc" ? "desc" : undefined;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page,
      tags: [],
      sort: sortOrder,
      discount: discountOrder,
    });

  const nextSortOrder = sortOrder === "asc" ? "desc" : "asc";

  const getSortLink = () => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("sort", nextSortOrder);
    return `?${params.toString()}`;
  };

  return (
    <>
      <Title title="All Products" />

      <div className="flex justify-between items-center mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          New Product
        </Link>
        {(searchParams.sort || searchParams.page || searchParams.discount) && (
          <Link
            href="/admin/products"
            className="btn-primary ml-4"
            prefetch={false}
          >
            Clear filters
          </Link>
        )}
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
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left cursor-pointer select-none"
                >
                  <Link
                    href={{
                      pathname: "/admin/products",
                      query: {
                        ...searchParams,
                        sort:
                          searchParams.sort === nextSortOrder
                            ? undefined
                            : nextSortOrder,
                        discount: undefined,
                        page: 1,
                      },
                    }}
                  >
                    Price
                    {searchParams.sort === "asc" && " ▲"}
                    {searchParams.sort === "desc" && " ▼"}
                  </Link>
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left cursor-pointer select-none"
                >
                  <Link
                    href={{
                      pathname: "/admin/products",
                      query: {
                        ...searchParams,
                        discount:
                          searchParams.discount === "desc" ? undefined : "desc",
                        sort: undefined, 
                        page: 1,
                      },
                    }}
                  >
                    Discount
                    {searchParams.discount === "desc" && <span> ▼</span>}
                  </Link>
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
                        src={product.ProductImage[0]?.url}
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
                  <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                    {CurrencyFormat(product.price)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.discount > 0 ? (
                      <>
                        <span className="text-red-500 font-bold">
                          -{product.discount}%
                        </span>{" "}
                        <span className="text-red-500">
                          ($
                          {CurrencyFormat(
                            product.price -
                              (product.price * product.discount) / 100
                          )}
                          )
                        </span>
                      </>
                    ) : (
                      <span>No Discount</span>
                    )}
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
                  {product.discount > 0 && (
                    <p className="text-sm text-red-500">
                      -{product.discount}% (
                      {CurrencyFormat(
                        product.price - (product.price * product.discount) / 100
                      )}
                      )
                    </p>
                  )}
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
                  <strong>Tags:</strong> {product.tags.join(", ")}
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
