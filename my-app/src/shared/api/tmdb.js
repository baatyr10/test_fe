const API_BASE = 'https://api.themoviedb.org/3';

const TMDB_HEADERS = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM2ZTU3NjgzM2MwNjg2M2ZhOWY4ZDI5ZjRjZDQ1ZSIsIm5iZiI6MTc1MDk1NDgxNi40MzgwMDAyLCJzdWIiOiI2ODVkNzM0MDg5OWFiNGIyYzUzNGYxOWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fzHuD6mh340x_NmVeiTXXCi-U71VsSIm6CAQP6VALiU`,
  accept: 'application/json',
};

export const fetchPopularMovies = async (page = 1) => {
  const res = await fetch(`${API_BASE}/movie/popular?page=${page}`, {
    headers: TMDB_HEADERS,
  });
  return res.json();
};

export const fetchMovieById = async (id) => {
  const res = await fetch(`${API_BASE}/movie/${id}`, {
    headers: TMDB_HEADERS,
  });
  return res.json();
};

export const searchMovies = async (query) => {
  const res = await fetch(`${API_BASE}/search/movie?query=${encodeURIComponent(query)}&include_adult=false`, {
    headers: TMDB_HEADERS,
  });
  return res.json();
};
