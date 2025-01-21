import { ShoeSize } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: ShoeSize;
  availableSizes: ShoeSize[];
  onSizeChange: (shoeSize: ShoeSize) => void;
}

export const SizeShoesSelector = ({
  selectedSize,
  availableSizes,
  onSizeChange,
}: Props) => {
  if (availableSizes.length === 0) {
    return null;
  }

  return (
    <div className="my-5">
      <h3 className="font-bold text-2xl mb-4">Available Shoe Sizes</h3>

      <div className="flex flex-wrap gap-3">
        {availableSizes.map((shoeSize) => (
          <div
            key={shoeSize.toString()}
            onClick={() => onSizeChange(shoeSize)}
            className={clsx(
              "p-3 border-2 cursor-pointer rounded-lg mr-3 mb-3 w-20 h-16 flex items-center justify-center transition-all text-center text-sm font-semibold",
              {
                "bg-blue-800 text-white border-blue-600":
                  shoeSize === selectedSize,
                "bg-gray-200 text-gray-800 border-gray-400":
                  shoeSize !== selectedSize,
                "hover:bg-blue-600 hover:border-blue-500 hover:text-white":
                  shoeSize !== selectedSize,
                "focus:ring-2 focus:ring-blue-500": true,
              }
            )}
          >
            <span className="whitespace-nowrap">{shoeSize}</span>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};
