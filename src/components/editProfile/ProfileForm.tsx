"use client";

import { useState, useEffect } from "react";
import { showErrorAlert, showSuccessAlert } from "../alerts/Alerts";
import { useRouter } from "next/navigation";

type ProfileFormProps = {
  user: { id: string; name: string; email: string };
  updateUser: (userData: {
    name: string;
    email: string;
    currentPassword: string;
    newPassword?: string;
  }) => Promise<{
    ok: boolean;
    message: string;
    user?: { id: string; name: string; email: string };
  }>;
};

export const ProfileForm = ({ user, updateUser }: ProfileFormProps) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState<
    string | null
  >(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [repeatNewPasswordError, setRepeatNewPasswordError] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Reset errors if passwords match
    if (newPassword && repeatNewPassword && newPassword !== repeatNewPassword) {
      setRepeatNewPasswordError("Passwords do not match");
    } else {
      setRepeatNewPasswordError(null);
    }
  }, [newPassword, repeatNewPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;

    // Validate current password
    if (!currentPassword) {
      setCurrentPasswordError("Current password is required");
      valid = false;
    } else {
      setCurrentPasswordError(null);
    }

    // Validate new password
    if (newPassword && newPassword !== repeatNewPassword) {
      setRepeatNewPasswordError("Passwords do not match");
      valid = false;
    } else {
      setRepeatNewPasswordError(null);
    }

    if (!valid) return;

    setLoading(true);
    try {
      const updatedData = {
        name,
        email,
        currentPassword,
        newPassword: newPassword || undefined, // Send newPassword only if not empty
      };

      const response = await updateUser(updatedData);

      if (response.ok) {
        showSuccessAlert("Profile updated successfully!");
        router.push("/profile");
      } else {
        showErrorAlert(response.message || "Error updating profile.");
      }
    } catch (error) {
      showErrorAlert("Error updating profile. Please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Update Your Profile
      </h2>

      <div>
        <label htmlFor="name" className="block text-gray-700 font-medium">
          Name:
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="currentPassword"
          className="block text-gray-700 font-medium"
        >
          Current Password:
        </label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {currentPasswordError && (
          <p className="text-red-500 text-sm mt-1">{currentPasswordError}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="block text-gray-700 font-medium"
        >
          New Password (optional):
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="repeatNewPassword"
          className="block text-gray-700 font-medium"
        >
          Repeat New Password (optional):
        </label>
        <input
          type="password"
          id="repeatNewPassword"
          value={repeatNewPassword}
          onChange={(e) => setRepeatNewPassword(e.target.value)}
          className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {repeatNewPasswordError && (
          <p className="text-red-500 text-sm mt-1">{repeatNewPasswordError}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
};
