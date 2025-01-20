import { ProfileForm } from "@/components";
import { updateUserProfile } from "@/app/actions";
import { auth } from "@/auth.config";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return <div>Redirecting to login...</div>;
  }

  const user = {
    id: session.user.id,
    name: session.user.name || "",
    email: session.user.email || "",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Edit Profile
        </h1>
        <ProfileForm user={user} updateUser={updateUserProfile} />
      </div>
    </div>
  );
};

export default ProfilePage;
