import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL
    ? process.env.API_URL
    : "http://localhost:8080/api/v1",
  withCredentials: true, // Enables cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
