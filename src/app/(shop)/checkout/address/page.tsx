import { Title } from "@/components";
import Link from "next/link";

export default function NamePage() {
  return (
    <div className="flex flex-col items-center justify-center mb-72 px-10 sm:px-0">
      <div className="w-full xl:w-[1000px] flex flex-col text-left">
        <Title title="Direction" subtitle="Address" className="mb-5" />

        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
          <div className="flex flex-col mb-2">
            <span>Name</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Last name</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Address 2 (optional)</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Postal code</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>City</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>Country</span>
            <select className="p-2 border rounded-md bg-gray-200">
              <option value="">[ Seleccione ]</option>
              <option value="CRI">Spain</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>Phone</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex justify-center col-span-full mt-10">
            <Link
              href="/checkout"
              className="btn-primary flex justify-center w-full sm:w-1/2"
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
