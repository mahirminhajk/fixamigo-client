import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL
    ? process.env.API_URL
    : "https://api.fixamigo.com/api/v1",
  withCredentials: true, // Enables cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
