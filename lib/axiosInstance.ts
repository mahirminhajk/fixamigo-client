import axios from "axios";
import { OPEN_AUTH_SHEET_EVENT } from "@/lib/authEvents";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "https://api.fixamigo.com/api/v1",
  withCredentials: true, // Enables cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

// Attach a response interceptor to open auth sheet on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(OPEN_AUTH_SHEET_EVENT));
      }
    }
    return Promise.reject(error);
  }
);
