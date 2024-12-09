import React from "react";
import Link from "next/link";
import { YouTubePlayer } from "@/components/features/YouTubePlayer";
import { getDominantColors, determineTextColor } from "@/lib/colorUtils";

interface MovieDetail {
  id: number;
  title: string;
  tagline: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  genres: [];
}
interface MovieVideos {
  key: string;
}
interface Props {
  params: { movieId?: string };
}

export default async function MovieDetails({ params }: Props) {
  const { movieId } = await params;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  const detailURL = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const detailRes = await fetch(detailURL, options);
  const detailData: MovieDetail = await detailRes.json();
  console.log(detailData);

  const videosURL = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
  const videosRes = await fetch(videosURL, options);
  const videosDataArray = await videosRes.json();
  const videosData: MovieVideos[] = videosDataArray.results;

  const similarURL = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
  const similarRes = await fetch(similarURL, options);
  const similarDataArray = await similarRes.json();
  const similarData = similarDataArray.results;
  console.log(similarData);

  // pick color
  const imageUrl = `https://image.tmdb.org/t/p/w500${detailData.backdrop_path}`;
  const dominantColors = await getDominantColors(imageUrl);
  const textColor = determineTextColor(dominantColors[0]);

  return (
    <div style={{ background: dominantColors[0] }}>
      <div>
        <div
          className="w-full h-96 object-cover"
          style={{
            background: `linear-gradient(to bottom, transparent 20%, ${dominantColors[0]}), url(https://image.tmdb.org/t/p/original${detailData.backdrop_path}) no-repeat top/cover`,
          }}
        />
        <div className="container mx-auto p-4 -mt-20">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12 md:gap-16">
            <img
              src={`https://image.tmdb.org/t/p/w500${detailData.poster_path}`}
              alt={detailData.title}
              className="hidden md:block w-full object-cover"
            />
            <div className={`col-span-full md:col-span-2 text-${textColor}`}>
              <h1 className="text-4xl font-black">{detailData.title}</h1>
              <h2 className="text-lg font-black">{detailData.tagline}</h2>
              {detailData.genres.length && (
                <ul>
                  {detailData.genres.map((genre) => (
                    <li key={genre.id}>
                      <Link
                        href={`/movie/${genre.id}`}
                        className="rounded-lg overflow-hidden transition-transform duration-200 ease-in-out hover:scale-105">
                        #{genre.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <p>{detailData.overview}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4">
            {similarData.map((movie) => (
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
      </div>
      <div
        style={{
          background: `linear-gradient(to bottom, ${dominantColors[0]}, ${dominantColors[1]}`,
        }}>
        <YouTubePlayer videoId={videosData[0].key} placeholder={"placeholder"} />
      </div>
    </div>
  );
}
