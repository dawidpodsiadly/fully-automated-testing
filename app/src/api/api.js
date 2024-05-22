import axios from 'axios';
import Cookies from 'js-cookie';

export const API_URL = 'http://localhost:3013/';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const apis = {
    insertUser: (payload) => api.post('/users', payload),
    getAllUsers: () => api.get('/users'),
    updateUserById: (id, payload) => api.put(`/users/${id}`, payload),
    deleteUserById: (id) => api.delete(`/users/${id}`),
    getUserById: (id) => api.get(`/users/${id}`),
    loginUser: (credentials) => api.post('/auth', credentials),
};

export default apis;
