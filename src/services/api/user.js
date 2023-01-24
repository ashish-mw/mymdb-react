import http from "./index";

export function apiLogin({ payload, cancelToken }) {
  return http.post("/users/login", payload, { cancelToken });
}
