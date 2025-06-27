import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../../../shared/api/tmdb';

export const useSearchMovies = (query) => {
  return useQuery({
    queryKey: ['searchMovies', query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });
};
