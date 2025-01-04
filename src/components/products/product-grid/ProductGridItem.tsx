import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const displayImage = product.images ? product.images[0] : "";

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
        />
        <div className="p-4 flex flex-col">
          <span className="hover:text-blue-700">{product.title}</span>
          <span className="font-bold">{product.price} $</span>
        </div>
      </Link>
    </div>
  );
};
