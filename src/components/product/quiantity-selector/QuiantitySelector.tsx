"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChange: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  const onQuiantityChange = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChange(quantity + value);
  };

  return (
    <div className="flex flex-col items-start">
      <h3 className="font-bold mb-2">Quantity</h3>
      <div className="flex items-center">
        <button
          onClick={() => onQuiantityChange(-1)}
          className="flex items-center"
        >
          <IoRemoveCircleOutline size={30} />
        </button>

        <span className="mx-5 text-center bg-gray-100 rounded px-4 py-2">
          {quantity}
        </span>

        <button
          onClick={() => onQuiantityChange(+1)}
          className="flex items-center"
        >
          <IoAddCircleOutline size={30} />
        </button>
      </div>
    </div>
  );
};
