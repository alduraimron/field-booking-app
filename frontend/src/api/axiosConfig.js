import axios from "axios";

export const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    //withCredentials: true,
});

export const privateApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    //withCredentials: true,
});
// Interceptor untuk privateApi: menambahkan token ke setiap request
privateApi.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('sanctumToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Jika tidak ada token tapi request membutuhkan autentikasi, tolak request
            // atau arahkan ke halaman login
            console.warn("Attempted private API request without token.");
            return Promise.reject(new axios.Cancel('No authentication token found.')); // Batalkan request
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk privateApi: menangani respons 401 (Unauthorized)
privateApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized request for private API. Clearing session...");
            sessionStorage.removeItem('sanctumToken');
            sessionStorage.removeItem('user');
            // Redirect ke halaman login. Gunakan window.location.href untuk redirect langsung.
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);