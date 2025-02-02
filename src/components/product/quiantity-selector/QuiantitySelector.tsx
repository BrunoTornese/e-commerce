"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  stock: number;
  onQuantityChange: (value: number) => void;
}

export const QuantitySelector = ({
  quantity,
  stock,
  onQuantityChange,
}: Props) => {
  if (typeof stock !== "number") {
    console.error("Stock debe ser un número válido.");
    return null;
  }

  const handleQuantityChange = (value: number) => {
    if (quantity + value < 1 || quantity + value > stock) return;

    onQuantityChange(quantity + value);
  };

  return (
    <div className="flex flex-col items-start">
      <h3 className="font-bold mb-2">Quantity</h3>
      <div className="flex items-center">
        <button
          onClick={() => handleQuantityChange(-1)}
          className="flex items-center"
          disabled={quantity <= 1}
        >
          <IoRemoveCircleOutline size={30} />
        </button>

        <span className="mx-5 text-center bg-gray-100 rounded px-4 py-2">
          {quantity}
        </span>

        <button
          onClick={() => handleQuantityChange(1)}
          className="flex items-center"
          disabled={quantity >= stock}
        >
          <IoAddCircleOutline size={30} />
        </button>
      </div>
      <p
        className={`text-sm mt-2 font-semibold ${
          quantity >= stock ? "text-red-500" : "text-green-500"
        }`}
      >
        {quantity >= stock
          ? "No more items available"
          : `Stock: ${stock} items`}
      </p>
    </div>
  );
};
