import axios from "axios";

const http = axios.create({
  baseURL: `/api`,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthHeaders = ({ accessToken }) => {
  if (accessToken) {
    http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }

  return;
};

export default http;
