import axios from 'axios';

const AdminApi = axios.create({
    baseURL: 'http://localhost:3300'
});

/**
 * 
 * @param {*} email 
 * @param {*} password 
 */
export const AdminLogin = (email, password) => {
    return AdminApi.post('/user/auth', { email, password, role: 'admin' });
}