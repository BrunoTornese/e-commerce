import { auth } from "@/auth.config";
import { Title } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const { name, email, emailVerified, role, image } = session.user;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white-100 pt-12">
      <Title title="Profile" />
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        {image ? (
          <Image
            src={image}
            alt={`${name}'s profile`}
            className="w-24 h-24 rounded-full mx-auto"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-gray-500 text-2xl">
            {name?.charAt(0).toUpperCase()}
          </div>
        )}
        <h2 className="text-xl font-semibold text-gray-800 text-center mt-4">
          {name || "User"}
        </h2>
        <div className="mt-4 space-y-2">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Email:</span> {email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Email Verified:</span>{" "}
            {emailVerified ? "Yes" : "No"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Role:</span> {role}
          </p>
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-blue-800 text-white rounded-md shadow hover:bg-blue-600"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
