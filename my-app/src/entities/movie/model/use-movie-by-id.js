import { useQuery } from '@tanstack/react-query';
import { fetchMovieById } from '../../../shared/api/tmdb';

export const useMovieById = (id) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieById(id),
    enabled: !!id,
  });
};
