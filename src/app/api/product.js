import axios from 'axios';
import { getUserToken } from '../../utils/token';

export const getProduct = async (q = '', category = '', tags = [], skip = 0, limit = 10) => {
    const dataUserLogin = getUserToken();
    return await axios.get(`http://localhost:3000/api/products?q=${q}&category=${category}&tags=${tags}&skip=${skip}&limit=${limit}`, { headers: { Authorization: dataUserLogin } });
}

export const createProduct = async (data) => {
    const dataUserLogin = getUserToken();
    return await axios.post(`http://localhost:3000/api/products`, data, {
        headers: {
            Authorization: dataUserLogin,
            'Content-Type': 'multipart/form-data'
        }
    });
}
export const showProduct = async (id) => {
    const dataUserLogin = getUserToken();
    return await axios.get(`http://localhost:3000/api/products/${id}`, {
        headers: {
            Authorization: dataUserLogin
        }
    });
}

export const updateProduct = async (id, data) => {
    const dataUserLogin = getUserToken();
    return await axios.put(`http://localhost:3000/api/products/${id}`, data, {
        headers: {
            Authorization: dataUserLogin,
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const deleteProduct = async (id) => {
    const dataUserLogin = getUserToken();
    return await axios.delete(`http://localhost:3000/api/products/${id}`, {
        headers: {
            Authorization: dataUserLogin
        }
    });
}