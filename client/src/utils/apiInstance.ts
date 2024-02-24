import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// Define base URL
const baseURL = "http://localhost:8000/api/v1/";

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something with successful response
    return response.data;
  },
  (error: AxiosError) => {
    // Handle errors globally
    return Promise.reject(error);
  },
);

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent, like adding headers or authentication tokens
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

// Export Axios instance
export default axiosInstance;
