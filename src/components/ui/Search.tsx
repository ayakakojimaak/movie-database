"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="hidden sm:block relative">
      <input
        type="text"
        className="text-gray-400 bg-white w-64 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none transition-all duration-300 ease-in-out w-12"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
        <svg className="text-gray-400 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
        </svg>
      </button>
    </div>
  );
};

export const Search = () => (
  <Suspense fallback={<div>Loading search...</div>}>
    <SearchComponent />
  </Suspense>
);
