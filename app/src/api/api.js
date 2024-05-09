import axios from 'axios';

const API_URL = 'http://localhost:3006/';

const api = axios.create({
    baseURL: API_URL,
});

const apis = {
    insertUser: (payload) => api.post('/users', payload),
    getAllUsers: () => api.get('/users'),
    updateUserById: (id, payload) => api.put(`/users/${id}`, payload),
    deleteUserById: (id) => api.delete(`/users/${id}`),
    getUserById: (id) => api.get(`/users/${id}`),
};

export default apis;