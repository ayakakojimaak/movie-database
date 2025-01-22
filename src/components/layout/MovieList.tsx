"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function MovieList({ query }: { query: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(2); // 次のページをロードする
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchMovies = async (page: number, reset: boolean = false) => {
    setLoading(true);

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

    setMovies((prevMovies) => {
      const uniqueMovies = data.results.filter((movie: Movie) => !prevMovies.some((m) => m.id === movie.id));
      return reset ? uniqueMovies : [...prevMovies, ...uniqueMovies];
    });

    setHasMore(page < data.total_pages); // データがまだある場合
    setLoading(false);
  };

  // 初回レンダリングと `query` の変化時に初期化
  useEffect(() => {
    setPage(2); // ページ番号をリセット
    setHasMore(true); // 全てのデータが取得済みの状態をリセット
    fetchMovies(1, true); // 新しいクエリでデータを取得し直す
  }, [query]);

  // スクロールで次のページを取得
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMovies(page);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0, rootMargin: "200px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, hasMore, loading, page]);

  return (
    <div className="container min-h-screen mx-auto p-4">
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
      {loading && <p className="text-center my-4">Loading...</p>}
      <div ref={loaderRef} className="h-8"></div>
    </div>
  );
}
