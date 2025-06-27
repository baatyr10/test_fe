export default function FeaturedMovies({ movies, onSelect }) {
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-2">Избранные фильмы</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded shadow overflow-hidden cursor-pointer"
            onClick={() => onSelect(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm text-gray-500">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
