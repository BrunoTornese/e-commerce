import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const displayImage = product.images?.[0] || "";
  const hoverImage = product.images?.[1] || "";

  const isCloudinaryImage = (imageUrl: string) => {
    return imageUrl.startsWith("https://res.cloudinary.com/");
  };

  const getImageSrc = (image: string) => {
    if (isCloudinaryImage(image)) {
      return image;
    } else {
      return `/products/${image}`;
    }
  };

  return (
    <div className="rounded-md overflow-hidden fade-in group">
      <Link href={`/product/${product.slug}`}>
        <div className="relative w-full h-64">
          <Image
            src={getImageSrc(displayImage)}
            alt={product.title}
            className="w-full h-full object-cover rounded transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            width={500}
            height={500}
          />

          <Image
            src={getImageSrc(hoverImage)}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-cover rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            width={500}
            height={500}
          />
        </div>
        <div className="p-4 flex flex-col">
          <span className="hover:text-blue-700">{product.title}</span>
          <span className="font-bold">{product.price} $</span>
        </div>
      </Link>
    </div>
  );
};
