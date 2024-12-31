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
  const totalPages =
    totalUsersCount > 0 ? Math.ceil(totalUsersCount / usersPerPage) : 1;

  return (
    <div>
      <Title title="All Users" />

      <div className="mb-10">
        {users && users.length > 0 ? (
          <UseTable users={users} />
        ) : (
          <p>No users available</p>
        )}

        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}
