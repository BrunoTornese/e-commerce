import { Product } from "@/interfaces";

import Link from "next/link";
import { ProductImage } from "../product/ProductImage/ProductImage";
import Image from "next/image";

interface FavoritesListProps {
  favorites: Product[];
}

export default function FavoritesList({ favorites }: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg mt-6">
        You have no favorites yet. ❤️
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {favorites.map((product) => (
        <Link key={product.id} href={`/product/${product.slug}`}>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer">
            <div className="relative w-full h-48 group">
              {product.images?.length ? (
                <ProductImage
                  src={product.images[0]}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full group-hover:opacity-80 transition-opacity duration-300"
                />
              ) : (
                <div className="bg-gray-200 flex items-center justify-center w-full h-full text-gray-400 text-lg">
                  <Image
                    src="/imgs/placeholder.jpg"
                    alt="No image"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
            <div className="p-4 mt-4">
              <h4 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors duration-300">
                {product.title}
              </h4>
              <p className="text-gray-600 mt-2">{`$${product.price.toFixed(
                2
              )}`}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
