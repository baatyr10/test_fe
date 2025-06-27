import { useMovieById } from '../../entities/movie/model/use-movie-by-id';

export default function MovieModal({ movieId, onClose }) {
  const { data, isLoading, error } = useMovieById(movieId);

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          &times;
        </button>
        {isLoading && <p>Загрузка...</p>}
        {error && <p>Ошибка загрузки</p>}
        {data && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
              className="rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{data.release_date}</p>
            <p className="text-gray-700">{data.overview}</p>
          </>
        )}
      </div>
    </div>
  );
}
