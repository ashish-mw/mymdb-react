import http from "./index";

export function apiLogin({ payload, cancelToken }) {
  return http.post("/users/login", payload, { cancelToken });
}

export function apiGetUserInfo({ cancelToken }) {
  return http.get("/users/info", { cancelToken });
}
