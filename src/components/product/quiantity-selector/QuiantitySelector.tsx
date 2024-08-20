"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const onQuiantityChange = (value: number) => {
    if (count + value < 1) return;
    if (count + value > 10) return;

    setCount(count + value);
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
          {count}
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
