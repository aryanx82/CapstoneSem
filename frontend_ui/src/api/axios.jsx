import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000, // 10 second timeout
});

// Request interceptor to add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle network errors (backend not reachable)
        if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
            const networkError = new Error('Unable to connect to server. Please make sure the backend server is running on http://localhost:5000');
            networkError.isNetworkError = true;
            return Promise.reject(networkError);
        }
        
        // Handle timeout errors
        if (error.code === 'ECONNABORTED') {
            const timeoutError = new Error('Request timed out. Please check your connection and try again.');
            timeoutError.isNetworkError = true;
            return Promise.reject(timeoutError);
        }
        
        if (error.response) {
            // Handle 401 Unauthorized - token expired or invalid
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
            // Return the error with response data
            return Promise.reject(error);
        }
        
        // Handle other errors
        return Promise.reject(error);
    }
);

// Auth API calls
export const LoginUser = (userData) => {
    return api.post("/auth/login", userData);
};

export const SignupUser = (userData) => {
    return api.post("/auth/signup", userData);
};

export default api;
