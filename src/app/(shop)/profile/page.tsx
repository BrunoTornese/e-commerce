import { getFavorites } from "@/app/actions";
import { auth } from "@/auth.config";
import { Title } from "@/components";
import FavoritesList from "@/components/favorites/FavoritesUser";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const { name, email, emailVerified, role, image } = session.user;

  const favorites = await getFavorites(session.user.id);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white-100 pt-12">
      <Title title="Profile" className="text-center" />

      <div className="max-w-md w-full bg-white rounded-lg shadow-lg border border-gray-200 p-6 sm:max-w-lg md:max-w-xl">
        {image ? (
          <Image
            src={image}
            alt={`${name}'s profile`}
            className="w-24 h-24 rounded-full mx-auto sm:w-32 sm:h-32 md:w-40 md:h-40"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-gray-500 text-2xl sm:w-32 sm:h-32 md:w-40 md:h-40">
            {name?.charAt(0).toUpperCase()}
          </div>
        )}

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mt-4">
          {name || "User"}
        </h2>

        <div className="mt-4 space-y-2">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Email:</span> {email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Email Verified:</span>{" "}
            {emailVerified ? (
              <span className="text-green-600">Verified</span>
            ) : (
              <span className="text-red-600">Not Verified</span>
            )}
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

      <div className="mt-12 w-full px-4 sm:px-6 md:px-8">
        <div className="mb-8">
          <Title title="Your Favorites" className="text-center" />
        </div>
        <FavoritesList favorites={favorites} />
      </div>
    </div>
  );
}
