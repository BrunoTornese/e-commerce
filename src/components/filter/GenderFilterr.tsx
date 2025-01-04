"use client";

import { useRouter } from "next/navigation";

interface Props {
  genders: string[];
  selectedGender: string;
  onGenderChange: (gender: string) => void;
}

export const GenderFilter = ({
  genders,
  selectedGender,
  onGenderChange,
}: Props) => {
  const router = useRouter();

  const handleGenderClick = (gender: string) => {
    const updatedGender = selectedGender === gender ? "" : gender;
    onGenderChange(updatedGender);

    const queryParams = new URLSearchParams(window.location.search);
    if (updatedGender) {
      queryParams.set("gender", updatedGender);
    } else {
      queryParams.delete("gender");
    }
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="mb-6">
      <div className="text-sm font-medium text-gray-700 mb-3">
        Filter by Gender
      </div>
      <div className="flex flex-wrap gap-3">
        {genders.map((gender) => (
          <button
            key={gender}
            onClick={() => handleGenderClick(gender)}
            className={`${
              selectedGender === gender
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-800"
            } py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 transition-all duration-200`}
          >
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
