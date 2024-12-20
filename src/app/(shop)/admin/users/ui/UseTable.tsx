"use client";

import { changeRole } from "@/app/actions";
import type { User } from "@/interfaces";

interface Props {
  users: User[];
}

export const UseTable = ({ users }: Props) => {
  return (
    <div>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Name
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.length ? (
            users.map((user) => (
              <tr
                key={user.email}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.email}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    className="text-sm text-gray-900 w-full p-2"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="animate-pulse w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
                  <p className="text-gray-500 text-sm mb-2">No users found!</p>
                  <div className="animate-pulse w-full h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="animate-pulse w-3/4 h-4 bg-gray-200 rounded"></div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
