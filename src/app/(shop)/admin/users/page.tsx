import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { getPaginatedUsers } from "@/app/actions";
import { UseTable } from "./ui/UseTable";

export default async function OrdersPage() {
  const { ok, users, totalUsers } = await getPaginatedUsers();

  if (!ok) {
    redirect("/auth/login");
  }

  const totalUsersCount = totalUsers ?? 0;

  const usersPerPage = 10;
  const totalPages = Math.ceil(totalUsersCount / usersPerPage);
  return (
    <div>
      <Title title="All Users" />

      <div className="mb-10">
        <UseTable users={users || []} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
