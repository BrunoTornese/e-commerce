import { Title } from "@/components";
import { AdressForm } from "./ui/AdressForm";
import { getCounties, getUserAddress } from "@/app/actions";
import { auth } from "@/auth.config";

export default async function Address() {
  const countries = await getCounties();
  const session = await auth();

  if (!session?.user) {
    return (
      <h3 className="text-5xl bg-red-500">
        ERROR 500 - Please login to continue
      </h3>
    );
  }

  const userAddress = (await getUserAddress(session.user.id)) ?? undefined;

  return (
    <div className="flex flex-col items-center justify-center mb-72 px-10 sm:px-0">
      <div className="w-full xl:w-[1000px] flex flex-col text-left">
        <Title title="Direction" subtitle="Address" className="mb-5" />
        <AdressForm countries={countries} userStoreAddress={userAddress} />
      </div>
    </div>
  );
}
