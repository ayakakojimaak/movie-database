import React from "react";
import Link from "next/link";

interface Genre {
  id: number;
  name: string;
}

interface MovieHeaderProps {
  title: string;
  tagline: string;
  overview?: string;
  posterPath?: string;
  genres: Genre[];
  textColor: string;
}

const MovieHeader: React.FC<MovieHeaderProps> = ({ title, tagline, overview, posterPath, genres, textColor }) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12 mb-0 md:mb-8" style={{ color: textColor }}>
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        className="hidden md:block w-full object-cover"
      />
      <div className="col-span-full md:col-span-2">
        <h1 className="text-4xl font-black mb-2">{title}</h1>
        <h2 className="text-lg font-black mb-2">{tagline}</h2>
        {genres?.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-2">
            {genres.map((genre) => (
              <li key={genre.id} className="bg-gray-700 bg-opacity-75 text-sm px-3 py-1 rounded-full">
                <Link href={`/genre/${genre.id}`}>#{genre.name}</Link>
              </li>
            ))}
          </ul>
        )}
        <p className="mb-4">{overview}</p>
      </div>
    </div>
  );
};

export default MovieHeader;
