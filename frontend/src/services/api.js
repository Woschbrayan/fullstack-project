import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Atualize conforme o backend
});

// Intercepta requisições para incluir o Token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
