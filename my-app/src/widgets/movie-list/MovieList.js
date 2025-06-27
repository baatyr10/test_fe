import { useState } from 'react';
import { usePopularMovies } from '../../entities/movie/model/use-movies';
import MovieCard from '../../entities/movie/ui/MovieCard';
import MovieModal from '../movie-detail/MovieModal';

export default function MovieList() {
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, error } = usePopularMovies(page);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => p + 1);

  if (isLoading) return <div className="text-center py-10">Загрузка...</div>;
  if (error) return <div className="text-red-500">Ошибка при загрузке.</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.results.map((movie) => (
          <div key={movie.id} onClick={() => setSelectedId(movie.id)}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Назад
        </button>
        <span className="text-lg font-medium">Страница {page}</span>
        <button
          onClick={handleNext}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Вперёд
        </button>
      </div>

      {selectedId && (
        <MovieModal movieId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}
