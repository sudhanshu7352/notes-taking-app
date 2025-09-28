import axios from "axios";
import Cookies from "js-cookie";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000", // Use relative path for docker
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "X-CSRFToken": Cookies.get("csrftoken") || "", 
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const csrfToken = Cookies.get("csrftoken");
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken; // casing matters
  }
  return config;
});

export default api;
