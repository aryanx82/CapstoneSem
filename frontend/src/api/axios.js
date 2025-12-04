import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
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
        if (error.response) {
            // Handle 401 Unauthorized - token expired or invalid
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                // You can redirect to login here if needed
                // window.location.href = '/login';
            }
        }
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

// Course API calls
export const fetchCourses = () => {
    return api.get("/courses");
};

export const createCourse = (courseData) => {
    return api.post("/courses", courseData);
};

export const updateCourse = (id, courseData) => {
    return api.put(`/courses/${id}`, courseData);
};

export const deleteCourse = (id) => {
    return api.delete(`/courses/${id}`);
};

// Bookmark API calls
export const fetchBookmarks = () => {
    return api.get("/bookmarks");
};

export const toggleBookmark = (coursePayload) => {
    return api.post("/bookmarks/toggle", coursePayload);
};

export default api;
