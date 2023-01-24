import axios from "axios";

const http = axios.create({
  baseURL: `/api`,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
