"use client";

import { changeRole, deleteUser } from "@/app/actions";
import type { User } from "@/interfaces";
import { FaTrash } from "react-icons/fa";
import { revalidatePath } from "next/cache";

interface Props {
  users: User[];
}

export const UseTable = ({ users }: Props) => {
  const handleDelete = async (userId: string) => {
    await deleteUser(userId);
    revalidatePath("/admin/users");
  };

  return (
    <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {users?.length ? (
        users.map((user) => (
          <div
            key={user.email}
            className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm flex flex-col"
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <label
                htmlFor={`role-${user.id}`}
                className="text-sm text-gray-700"
              >
                Role
              </label>
              <select
                id={`role-${user.id}`}
                value={user.role}
                onChange={(e) => changeRole(user.id, e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <button
              onClick={() => handleDelete(user.id)}
              className="mt-4 text-red-500 hover:text-red-700 flex items-center space-x-2"
              aria-label="Delete user"
            >
              <FaTrash size={20} />
              <span className="text-sm">Delete</span>
            </button>
          </div>
        ))
      ) : (
        <div className="col-span-full px-6 py-4 text-center">
          <div className="flex flex-col items-center">
            <div className="animate-pulse w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
            <p className="text-gray-500 text-sm mb-2">No users found!</p>
          </div>
        </div>
      )}
    </div>
  );
};
