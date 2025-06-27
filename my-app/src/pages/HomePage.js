import React, { useState } from 'react';
import { usePopularMovies } from '../entities/movie/model/use-movies';
import { useSearchMovies } from '../entities/movie/model/use-search-movies';
import { useMovieById } from '../entities/movie/model/use-movie-by-id';
import MovieCard from '../entities/movie/ui/MovieCard';
import Modal from '../shared/ui/Modal';

export default function HomePage() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const { data: searchData } = useSearchMovies(searchTerm);
  const { data: popularData } = usePopularMovies(page);
  const { data: selectedMovie } = useMovieById(selectedId);

  const movies = searchTerm ? searchData?.results : popularData?.results;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Фильмы</h1>

      <input
        className="border p-2 mb-4 w-full max-w-md"
        type="text"
        placeholder="Поиск фильмов..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={() => setSelectedId(movie.id)} />
        ))}
      </div>

      {searchTerm === '' && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Назад
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setPage((p) => p + 1)}
          >
            Вперёд
          </button>
        </div>
      )}

      {selectedMovie && (
        <Modal onClose={() => setSelectedId(null)}>
          <h2 className="text-xl font-semibold mb-2">{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
            className="mt-4"
          />
        </Modal>
      )}
    </div>
  );
}
