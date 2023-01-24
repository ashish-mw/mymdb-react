import http from "./index";

export function apiGetMovieList({ cancelToken }) {
  return http.get("/movies", { cancelToken });
}
