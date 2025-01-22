import React from "react";
import MovieList from "@/components/layout/MovieList";

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const query = (await searchParams).query;
  return <MovieList query={query || ""} />;
}
