import React from "react";
import Link from "next/link";

interface TVshow {
  id: number;
  title: string;
  poster_path?: string;
}

export default async function TVshow({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const query = (await searchParams).query;

  let url;
  if (query) {
    url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
  } else {
    url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
  }
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  const data = await fetch(url, options);
  const data_json = await data.json();
  const TVList: TVshow[] = data_json.results;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl dark:text-white font-bold mb-4">
        {query ? `Search Results: ${query}` : "Trending TV show"}
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
        {TVList.map((list: TVshow) => (
          <Link
            href={`/`}
            key={list.id}
            className="rounded-lg overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105">
            {list.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${list.poster_path}`}
                alt={list.title}
                className="w-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-900 dark:bg-white flex justify-center items-center">
                {list.title}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
