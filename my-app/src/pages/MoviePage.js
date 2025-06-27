import { useParams } from 'react-router-dom';
import MovieDetail from '../widgets/movie-detail/MovieDetail';

export default function MoviePage() {
  const { id } = useParams();
  return <MovieDetail movieId={id} />;
}
