interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default async function Home() {
  const data = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}`);
  const data_json = await data.json();
  const movies = data_json.results;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trending Movies and TV Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border rounded-lg overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <h2 className="p-2 font-semibold">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
