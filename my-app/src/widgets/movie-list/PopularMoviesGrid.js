export default function PopularMoviesGrid({ movies, onSelect }) {
  return (
    <section className="p-4">
      <h2 className="text-xl font-semibold mb-2">Популярные фильмы</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded shadow p-2 cursor-pointer"
            onClick={() => onSelect(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 object-cover rounded"
            />
            <h3 className="mt-2 font-medium">{movie.title}</h3>
            <p className="text-sm text-gray-500">{movie.release_date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
