import React from "react";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default async function Home() {
  const data = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`);
  const data_json = await data.json();
  const movies: Movie[] = data_json.results;
  console.log(movies);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie: Movie) => (
          <Link href={`/movie/${movie.id}`} key={movie.id} className="border rounded-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 md:h-96 object-cover"
            />
          </Link>
        ))}
      </div>
    </>
  );
}
