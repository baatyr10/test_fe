// HomePageLayout.jsx – комплексный макет главной страницы под дизайн из скрина
// Включает: поисковую строку, горизонтальный список избранного, сетку категорий и
// двухколоночный блок популярных фильмов. Все стили — TailwindCSS.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePopularMovies } from '@/entities/movie/model/use-movies';
import { useSearchMovies } from '@/entities/movie/model/use-search-movies';
import MovieModal from '@/widgets/movie-detail/MovieModal';

// --------------- SearchBar -----------------
function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
      className="w-full flex justify-center py-4"
    >
      <input
        type="text"
        placeholder="Поиск фильмов..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-11/12 md:w-2/3 lg:w-1/2 border rounded-full px-4 py-2 shadow focus:outline-none"
      />
    </form>
  );
}

// --------------- FeaturedCarousel -----------------
function FeaturedCarousel({ movies, onSelect }) {
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-2">Избранные фильмы</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {movies.map((m) => (
          <div
            key={m.id}
            onClick={() => onSelect(m.id)}
            className="min-w-[250px] cursor-pointer shrink-0"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${m.backdrop_path || m.poster_path}`}
              alt={m.title}
              className="w-full h-40 object-cover rounded-lg"/>
            <p className="mt-2 text-sm font-medium line-clamp-1">{m.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// --------------- CategoryGrid -----------------
const genreList = [
  { id: 28, name: 'Экшн' },
  { id: 35, name: 'Комедия' },
  { id: 18, name: 'Драма' },
  { id: 10749, name: 'Романтика' },
  { id: 27, name: 'Хоррор' },
  { id: 16, name: 'Анимация' },
  { id: 80, name: 'Криминал' },
  { id: 14, name: 'Фэнтези' },
  { id: 99, name: 'Документальные' },
  { id: 53, name: 'Триллеры' },
];

function CategoryGrid() {
  return (
    <section className="px-4 mt-6">
      <h2 className="text-xl font-semibold mb-3">Откройте для себя жанры</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {genreList.map((g) => (
          <div key={g.id} className="relative group cursor-pointer">
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/genre_${g.id}.jpg`}
              onError={(e) => (e.currentTarget.style.display = 'none')}
              alt=""
              className="w-full h-24 object-cover rounded"/>
            <div className="absolute inset-0 bg-black/50 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-sm font-medium">{g.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// --------------- PopularSection -----------------
function MovieMini({ movie, onSelect }) {
  return (
    <div onClick={() => onSelect(movie.id)} className="flex gap-3 cursor-pointer group">
      <img
        src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
        alt={movie.title}
        className="w-20 h-28 object-cover rounded"/>
      <div className="flex-1">
        <h3 className="font-semibold text-sm group-hover:underline line-clamp-2">{movie.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">{movie.overview}</p>
      </div>
    </div>
  );
}

function PopularSection({ movies, onSelect }) {
  const left = movies.slice(0, 5);
  const right = movies[5];

  return (
    <section className="px-4 mt-8 grid md:grid-cols-3 gap-8">
      {/* Левая колонка */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold">Популярные фильмы</h2>
        {left.map((m) => (
          <MovieMini key={m.id} movie={m} onSelect={onSelect} />
        ))}
      </div>

      {/* Правая колонка */}
      {right && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Популярный фильм</h2>
          <div
            onClick={() => onSelect(right.id)}
            className="cursor-pointer"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${right.backdrop_path || right.poster_path}`}
              alt={right.title}
              className="w-full h-48 object-cover rounded"/>
            <h3 className="font-semibold mt-2 line-clamp-2">{right.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-3">{right.overview}</p>
          </div>
        </div>
      )}
    </section>
  );
}

// --------------- Главная страница -----------------
export default function HomePage() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [page] = useState(1);

  const { data: popularData, isLoading: popularLoading } = usePopularMovies(page);
  const { data: searchData, isLoading: searchLoading } = useSearchMovies(query);

  const popularMovies = popularData?.results ?? [];
  const featured = popularMovies.slice(0, 4);

  const displayedMovies = query ? searchData ?? [] : popularMovies;

  return (
    <div className="max-w-7xl mx-auto">
      <SearchBar onSubmit={setQuery} />

      {popularLoading || searchLoading ? (
        <p className="text-center py-10">Загрузка...</p>
      ) : (
        <>
          {!query && <FeaturedCarousel movies={featured} onSelect={setSelectedId} />}
          {!query && <CategoryGrid />}
          <PopularSection movies={displayedMovies} onSelect={setSelectedId} />
        </>
      )}

      {selectedId && (
        <MovieModal movieId={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </div>
  );
}

// Примечание: изображения жанров genre_{id}.jpg – заглушки. Можно заменить на дефолт или убрать <img>.
