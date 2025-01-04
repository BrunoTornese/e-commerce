"use client";

import { useRouter } from "next/navigation";

interface Props {
  tags: string[];
  selectedTags: string[];
  onTagChange: (updatedTags: string[]) => void;
}

export const TagFilter = ({ tags, selectedTags, onTagChange }: Props) => {
  const router = useRouter();

  const handleTagClick = (tag: string) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    onTagChange(updatedTags);

    const queryParams = new URLSearchParams(window.location.search);
    if (updatedTags.length > 0) {
      queryParams.set("tags", updatedTags.join(","));
    } else {
      queryParams.delete("tags");
    }
    router.push(`${window.location.pathname}?${queryParams.toString()}`);
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
