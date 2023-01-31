import http from "./index";

export function apiGetMovieList({ cancelToken }) {
  return http.get("/movies", { cancelToken });
}

export function apiAddMovie({ payload, cancelToken }) {
  return http.post("/movies", payload, { cancelToken });
}

export function apiGetMovieInfo({ movieId, cancelToken }) {
  return http.get(`/movies/${movieId}`, { cancelToken });
}