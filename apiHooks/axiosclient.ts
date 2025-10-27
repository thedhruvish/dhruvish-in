import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1` || "http://localhost:1337/",
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling 401 errors
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
