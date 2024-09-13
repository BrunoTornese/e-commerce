import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={80} className="mx-5" />
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Your cart is empty</h1>
        <Link href={"/"} className="text-blue-600 mt-2 text-4xl">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
