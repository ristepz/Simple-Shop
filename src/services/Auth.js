import axios from 'axios';

export const AdminApi = axios.create({
    baseURL: 'http://localhost:3300',
    headers: { 'Token': localStorage.getItem('token') }
});

export const PublicApi = axios.create({
    baseURL: 'http://localhost:3300',
});
/**
 * 
 * @param {*} email 
 * @param {*} password 
 */
export const AdminLogin = (email, password) => {
    return AdminApi.post('/user/auth', { email, password, role: 'admin' });
}