import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";

// Define base URL
const baseURL = "http://localhost:8000/api/v1/";

interface CustomAxiosInstance extends AxiosInstance {
  postFormData: <T = any, R = AxiosResponse<T>>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig,
  ) => Promise<R>;
}

// @ts-ignore
const axiosInstance: CustomAxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add support for sending FormData with multipart/form-data content type
axiosInstance.postFormData = async <T = any, R = AxiosResponse<T>>(
  url: string,
  formData: FormData,
  config?: AxiosRequestConfig,
): Promise<R> => {
  try {
    const response = await axiosInstance.post(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return response as R;
  } catch (error) {
    return Promise.reject(error);
  }
};
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
