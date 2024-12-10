import React from "react";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
}

export default async function Movie({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const query = (await searchParams).query;

  let url;
  if (query) {
    url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  } else {
    url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
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
  const movies: Movie[] = data_json.results;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl dark:text-white font-bold mb-4">
        {query ? `Search Results: ${query}` : "Trending Movies"}
      </h1>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
        {movies.map((movie: Movie) => (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="rounded-lg overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-900 dark:bg-white flex justify-center items-center">
                {movie.title}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
