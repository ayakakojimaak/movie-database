import React from "react";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface HomeProps {
  searchParams: { query?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const { query } = await searchParams;

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
    <>
      <h1 className="text-2xl font-bold mb-4">{query ? `Search Results: ${query}` : "Trending Movies"}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie: Movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id} className="border rounded-lg overflow-hidden">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-60 md:h-96 object-cover"
              />
            ) : (
              <div className="w-full h-60 md:h-96 flex justify-center items-center">{movie.title}</div>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
