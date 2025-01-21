import { Sizes } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Sizes;
  availableSizes: Sizes[];
  onSizeChange: (size: Sizes) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChange,
}: Props) => {
  if (availableSizes.length === 0) {
    return null;
  }

  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Sizes available</h3>

      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={clsx(
              "p-3 border-2 cursor-pointer rounded-lg mr-3 mb-3 w-20 h-16 flex items-center justify-center transition-all text-center text-sm font-semibold",
              {
                "bg-blue-800 text-white border-blue-600": size === selectedSize,
                "bg-gray-200 text-gray-800 border-gray-400":
                  size !== selectedSize,
                "hover:bg-blue-600 hover:border-blue-500 hover:text-white":
                  size !== selectedSize,
                "focus:ring-2 focus:ring-blue-500": true,
              }
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
