import { useMovieById } from '../../entities/movie/model/use-movie-by-id';

export default function MovieDetail({ movieId }) {
  const { data, isLoading, error } = useMovieById(movieId);

  if (isLoading) return <div className="text-center py-10">Загрузка...</div>;
  if (error) return <div className="text-red-500">Ошибка загрузки</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
        className="w-full md:w-96 mx-auto rounded-lg"
      />
      <h2 className="text-3xl font-bold mt-4">{data.title}</h2>
      <p className="mt-2 text-gray-700">{data.overview}</p>
      <p className="mt-2 text-sm text-gray-500">Дата выхода: {data.release_date}</p>
      <p className="mt-2 text-sm text-gray-500">Оценка: {data.vote_average}</p>
    </div>
  );
}
