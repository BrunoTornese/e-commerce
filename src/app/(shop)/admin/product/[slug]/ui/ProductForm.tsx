"use client";

import {
  createUpdateProduct,
  deleteProduct,
  deteleteImage,
} from "@/app/actions";
import { ProductImage, showErrorAlert, showSuccessAlert } from "@/components";
import {
  Category,
  Product,
  ProductImage as ProductWithImage,
} from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  gender: "men" | "women" | "kid" | "unisex";
  category: string;
  inStock: number;
  sizes: string[];
  tags: string;
  image: string;
  categoryId: string;
  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.size ?? [],
      images: undefined,
    },
  });

  watch("sizes");

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (!ok) {
      alert("An error occurred");
      return;
    }

    if (updatedProduct) {
      router.replace(`/admin/product/${updatedProduct.slug}`);
    }
  };

  const handleDeleteProduct = async () => {
    const confirmation = confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmation) return;

    try {
      const { ok } = await deleteProduct(product.id ?? "");

      if (ok) {
        showSuccessAlert("Product deleted successfully!");
        router.push("/admin/products");
      } else {
        showErrorAlert("An error occurred during deletion");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showErrorAlert("An error occurred during deletion");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:grid-cols-2 gap-3"
    >
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("gender", { required: true })}
          >
            <option value="">[select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register("categoryId", { required: true })}
          >
            <option value="">[select]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Size</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                  {
                    "bg-blue-800 text-white": getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col mb-2">
          <span>Images</span>
          <input
            type="file"
            {...register("images")}
            multiple
            className="p-2 border rounded-md bg-gray-200"
            accept="image/png, image/jpeg, image/avif"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {product.ProductImage?.map((image) => (
            <div key={image.id}>
              <ProductImage
                alt={product.title ?? ""}
                src={image.url}
                width={300}
                height={300}
                className="rounded shadow-md"
              />
              <button
                type="button"
                onClick={() => deteleteImage(image.id, image.url)}
                className="btn-danger rounded-b-xl w-full mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full mt-4 lg:mt-0">
        <button
          onClick={() =>
            showSuccessAlert("Product successfully created/modified!")
          }
          className="bg-blue-500 text-white py-2 px-4 rounded-md text-lg font-semibold hover:bg-blue-800"
        >
          Save
        </button>
      </div>
      <div className="w-full mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => {
            handleDeleteProduct();
          }}
          className="bg-red-500 text-white py-2 px-4 rounded-md text-lg font-semibold hover:bg-red-900"
        >
          <span>Delete Product</span>
        </button>
      </div>
    </form>
  );
};
