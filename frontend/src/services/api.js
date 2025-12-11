import axios from "axios";

const API = axios.create({
  baseURL: "https://sgims-backend.onrender.com/" || "http://127.0.0.1:5000/api",
});

// Always attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

// Auto-handle unauthorized errors
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      console.warn("Token removed due to auth error", error.response.data);

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
    }
    return Promise.reject(error);
  }
);

export default API;
