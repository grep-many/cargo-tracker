import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL|| "http://localhost:5000";

const axiosInstance = axios.create({
    baseURL,
    headers:{
        "Content-Type":"application/json"
    },
});

export default axiosInstance;