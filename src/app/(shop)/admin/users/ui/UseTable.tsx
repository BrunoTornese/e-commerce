"use client";

import { changeRole, deleteUser } from "@/app/actions";
import type { User } from "@/interfaces";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { showErrorAlert, showSuccessAlert } from "@/components";

interface Props {
  users: User[];
}

export const UseTable = ({ users }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userList, setUserList] = useState<User[]>(users);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  const handleDelete = async (userId: string): Promise<boolean> => {
    try {
      await deleteUser(userId);
      setUserList(userList.filter((user) => user.id !== userId));
      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await changeRole(userId, newRole);
      setUserList((prevState) =>
        prevState.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.error("Error changing role:", error);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {userList.length > 0 ? (
        userList.map((user) => {
          const isOwnAccount = session?.user?.email === user.email;

          return (
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
                  onChange={(e) =>
                    !isOwnAccount && handleRoleChange(user.id, e.target.value)
                  }
                  disabled={isOwnAccount}
                  className="p-2 border border-gray-300 rounded-md"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                onClick={async () => {
                  if (!isOwnAccount) {
                    try {
                      const isDeleted = await handleDelete(user.id);
                      if (isDeleted) {
                        showSuccessAlert("User successfully deleted!");
                      } else {
                        showErrorAlert("Error: User could not be deleted.");
                      }
                    } catch (error) {
                      showErrorAlert(
                        "An error occurred while deleting the user."
                      );
                    }
                  }
                }}
                disabled={isOwnAccount}
                className="mt-4 text-red-500 hover:text-red-700 flex items-center space-x-2"
                aria-label="Delete user"
              >
                <FaTrash size={20} />
                <span className="text-sm">Delete</span>
              </button>
            </div>
          );
        })
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
