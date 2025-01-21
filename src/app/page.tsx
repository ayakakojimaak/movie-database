import React from "react";
import MovieList from "@/components/layout/MovieList";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

async function fetchMovies(page: number, query?: string): Promise<Movie[]> {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
    : `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();

  return data.results;
}

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const query = (await searchParams).query;
  const initialMovies = await fetchMovies(1, query);

  return <MovieList initialMovies={initialMovies} query={query || ""} />;
}
