import { useQuery } from '@tanstack/react-query';
import { fetchPopularMovies } from '../../../shared/api/tmdb';

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => fetchPopularMovies(page),
  });
};
