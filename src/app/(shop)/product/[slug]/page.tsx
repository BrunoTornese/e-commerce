export const revalidate = 604800; //7 days

import { getProductBySlug } from "@/app/actions";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";

import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 ">
      <div className="col-span-1 md:col-span-2 ">
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          classname="block md:hidden"
        />

        <ProductSlideshow
          title={product.title}
          images={product.images}
          classname="hidden md:block"
        />
      </div>

      <div className="col-span-1 px-5">
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          Stock: {product.inStock}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <SizeSelector
          selectedSize={product.size[1]}
          availableSizes={product.size}
        />

        <QuantitySelector quantity={2} />

        <button className="btn-primary my-5">Agregar al carrito</button>

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
