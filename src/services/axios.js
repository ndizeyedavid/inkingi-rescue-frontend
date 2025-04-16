import axios from "axios";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: false, // Changed to false since we're using token-based auth
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Add request interceptor to include token
Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default Axios;
