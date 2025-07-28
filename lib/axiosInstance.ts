import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8081/api/v1",
  withCredentials: true, // Enables cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
