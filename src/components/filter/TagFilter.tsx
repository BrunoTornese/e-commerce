"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  tags: string[];
  selectedTags: string[];
  onTagChange: (updatedTags: string[]) => void;
}

export const TagFilter = ({ tags, selectedTags, onTagChange }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onTagChange(updatedTags);

    const params = new URLSearchParams(searchParams.toString());
    if (updatedTags.length > 0) {
      params.set("tags", updatedTags.join(","));
    } else {
      params.delete("tags");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <div className="text-sm font-semibold text-gray-700 mb-4">
        Filter by Tags
      </div>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`py-2 px-5 rounded-full text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-800
              ${
                selectedTags.includes(tag)
                  ? "bg-blue-800 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
