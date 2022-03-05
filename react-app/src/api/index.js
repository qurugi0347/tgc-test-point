import axios from "axios";

export const baseURL = process.env.REACT_APP_API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Cache-Control": "no-cache",
  },
  withCredentials: true,
});
