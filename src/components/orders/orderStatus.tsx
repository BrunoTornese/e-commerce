import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        { "bg-red-500": isPaid === false },
        { "bg-green-500": isPaid === true }
      )}
    >
      <IoCardOutline size={30} />
      <span className="mx-2">
        {isPaid === false ? "Payment Incomplete" : "Payment Completed"}
      </span>
    </div>
  );
};
