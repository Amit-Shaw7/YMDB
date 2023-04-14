import axios from "axios";

const API_SERVER = process.env.REACT_APP_API_BASE_URL;
const  axiosInstance = axios.create({
  baseURL: API_SERVER || "",
  // baseURL: "http://localhost:4000",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;