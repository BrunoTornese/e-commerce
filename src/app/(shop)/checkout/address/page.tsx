import { Title } from "@/components";
import { AdressForm } from "./ui/AdressForm";
import { getCounties } from "@/app/actions";


export default async function Address() {
  const countries = await getCounties();


  return (
    <div className="flex flex-col items-center justify-center mb-72 px-10 sm:px-0">
      <div className="w-full xl:w-[1000px] flex flex-col text-left">
        <Title title="Direction" subtitle="Address" className="mb-5" />
        <AdressForm countries={countries} />
      </div>
    </div>
  );
}
