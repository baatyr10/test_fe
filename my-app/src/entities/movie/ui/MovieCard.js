import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="bg-white rounded-lg shadow p-4 hover:shadow-md cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-72 object-cover rounded"
        />
        <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
      </div>
    </Link>
  );
}
