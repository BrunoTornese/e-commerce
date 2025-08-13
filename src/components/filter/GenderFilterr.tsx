"use client";

import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  const handleGenderClick = (gender: string) => {
    const updatedGender = selectedGender === gender ? "" : gender;
    onGenderChange(updatedGender);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedGender) {
      params.set("gender", updatedGender);
    } else {
      params.delete("gender");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <div className="text-sm font-semibold text-gray-700 mb-4">
        Filter by Gender
      </div>
      <div className="flex flex-wrap gap-3">
        {genders.map((gender) => (
          <button
            key={gender}
            onClick={() => handleGenderClick(gender)}
            className={`py-2 px-5 rounded-full text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-800
              ${
                selectedGender === gender
                  ? "bg-blue-800 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500"
              }`}
          >
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
