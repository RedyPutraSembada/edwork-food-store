import axios from "axios";
import { getUserToken } from "../../utils/token";

export const getAddress = async () => {
    const dataUserLogin = getUserToken();
    return await axios.get('http://localhost:3000/api/delivery-addresses', { headers: { Authorization: dataUserLogin } });
}

export const getWhereAddress = async (id) => {
    const dataUserLogin = getUserToken();
    return await axios.get(`http://localhost:3000/api/delivery-addresses/${id}`, { headers: { Authorization: dataUserLogin } });
}

export const deleteAddress = async (id) => {
    const dataUserLogin = getUserToken();
    return await axios.delete(`http://localhost:3000/api/delivery-addresses/${id}`, { headers: { Authorization: dataUserLogin } });
}

export const createAddress = async (data) => {
    const dataUserLogin = getUserToken();
    return await axios.post(`http://localhost:3000/api/delivery-addresses`, data, {
        headers: {
            Authorization: dataUserLogin,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}

export const updateAddress = async (id, data) => {
    const dataUserLogin = getUserToken();
    return await axios.put(`http://localhost:3000/api/delivery-addresses/${id}`, data, {
        headers: {
            Authorization: dataUserLogin,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}