import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" }
});

// Attach JWT token to every request
axiosClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default axiosClient;