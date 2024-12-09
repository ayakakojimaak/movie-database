import React from "react";
import Link from "next/link";
import { YouTubePlayer } from "@/components/features/YouTubePlayer";
// import { getDominantColors, determineTextColor } from "@/lib/colorUtils";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetail {
  id: number;
  title: string;
  tagline: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  genres: Genre[];
}

interface MovieVideos {
  id: string;
  key: string;
}

interface SimilarMovie {
  id: number;
  title: string;
  poster_path?: string;
}

export default async function MovieDetails({ params }: { params: Promise<{ movieId: string }> }) {
  const movieId = (await params).movieId;
  console.log(process.env.ACCESS_TOKEN);
  const options = {
    headers: {
      method: "GET",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  };

  const detailURL = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const detailRes = await fetch(detailURL, options);
  const detailData: MovieDetail = await detailRes.json();

  const videosURL = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
  const videosRes = await fetch(videosURL, options);
  const videosDataArray = await videosRes.json();
  const videosData: MovieVideos[] = videosDataArray.results;

  const similarURL = `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`;
  const similarRes = await fetch(similarURL, options);
  const similarDataArray = await similarRes.json();
  const similarData: SimilarMovie[] = similarDataArray.results;

  // const imageUrl = `https://image.tmdb.org/t/p/w500${detailData.backdrop_path}`;
  // const dominantColors = await getDominantColors(imageUrl);
  // const textColor = determineTextColor(dominantColors[0]);

  return (
    <div
    // style={{ background: dominantColors[0], color: textColor }}
    >
      <div
        className="w-full h-96 object-cover"
        // style={{
        //   background: `linear-gradient(to bottom, transparent 10%, ${dominantColors[0]}), url(https://image.tmdb.org/t/p/original${detailData.backdrop_path}) no-repeat center/cover`,
        // }}
      />
      <div className="container mx-auto p-4 -mt-20">
        {/* title */}
        <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12 mb-0 md:mb-8">
          <img
            src={`https://image.tmdb.org/t/p/w500${detailData.poster_path}`}
            alt={detailData.title}
            className="hidden md:block w-full object-cover"
          />
          <div className="col-span-full md:col-span-2">
            <h1 className="text-4xl font-black mb-2">{detailData.title}</h1>
            <h2 className="text-lg font-black mb-2">{detailData.tagline}</h2>
            {detailData?.genres?.length > 0 && (
              <ul className="flex flex-wrap gap-2 mb-2">
                {detailData.genres.map((genre) => (
                  <li key={genre.id}>
                    <Link href={`/genre/${genre.id}`}>#{genre.name}</Link>
                  </li>
                ))}
              </ul>
            )}
            <p className="mb-4">{detailData.overview}</p>
          </div>
        </div>
        <div>
          {/* {videosData.map((video) => ( */}
          {videosData.length > 0 && (
            <YouTubePlayer
              key={videosData[0].id}
              videoId={videosData[0].key}
              placeholder={`https://image.tmdb.org/t/p/w500${detailData.poster_path}`}
            />
          )}
          {/* ))} */}
        </div>
      </div>
      {similarData.length > 0 && (
        <div
          style={
            {
              // background: `linear-gradient(to bottom, ${dominantColors[0]}, ${dominantColors[1]}`,
            }
          }>
          <div className="container mx-auto p-4">
            {/* Similar Movies */}
            <h3 className="text-2xl font-black mb-4">You May Also Like</h3>
            <div className="md:overflow-x-auto mt-4 mb-8">
              <div className="grid grid-cols-3 gap-2 md:flex md:gap-4">
                {similarData.map((movie) => (
                  <Link href={`/movie/${movie.id}`} key={movie.id} className="rounded-lg flex-shrink-0 md:w-40">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full bg-gray-900 dark:bg-white flex justify-center items-center">
                        {movie.title}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
