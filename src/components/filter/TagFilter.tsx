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
      <div className="text-sm font-medium text-gray-700 mb-3">
        Filter by Tags
      </div>
      <div className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`${
              selectedTags.includes(tag)
                ? "bg-blue-800 text-white"
                : "bg-gray-200 text-gray-800"
            } py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};
