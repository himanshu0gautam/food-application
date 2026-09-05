import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api"
    : "http://192.168.1.43:3000/api";

    
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
