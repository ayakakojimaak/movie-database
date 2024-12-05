import React from "react";
import Link from "next/link";
import YouTubePlayer from "@/components/features/YouTubePlayer";
import { getDominantColors } from "@/lib/colorUtils";

interface MovieDetail {
  id: number;
  title: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
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

  // pick color
  const imageUrl = `https://image.tmdb.org/t/p/w500${detailData.backdrop_path}`;
  const dominantColors = await getDominantColors(imageUrl);

  console.log(dominantColors);

  return (
    <div style={{ background: dominantColors[0] }}>
      <div>
        <div
          className="w-full h-96 object-cover"
          style={{
            background: `linear-gradient(to bottom, transparent 20%, ${dominantColors[0]}), url(https://image.tmdb.org/t/p/w500${detailData.backdrop_path}) no-repeat top/cover`,
          }}
        />
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${detailData.poster_path}`}
              alt={detailData.title}
              className="w-full object-cover"
            />
            <h1>{detailData.title}</h1>
            <p>{detailData.overview}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          background: `linear-gradient(to bottom, ${dominantColors[0]}, ${dominantColors[1]}`,
        }}>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
            <YouTubePlayer videoId={videosData[0].key} placeholder={"placeholder"} />
          </div>
        </div>
      </div>
    </div>
  );
}
