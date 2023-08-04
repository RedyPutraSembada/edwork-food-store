import axios from "axios";
import { getUserToken } from "../../utils/token";

export const getCategory = async () => {
    const dataToken = getUserToken();
    return await axios.get('http://localhost:3000/api/categories', { headers: { Authorization: dataToken } });
}

export const deleteCategory = async (id) => {
    const dataToken = getUserToken();
    return await axios.delete(`http://localhost:3000/api/categories/${id}`, { headers: { Authorization: dataToken } });
}

export const createCategory = async (data) => {
    const dataToken = getUserToken();
    return await axios.post('http://localhost:3000/api/categories', data, {
        headers: {
            Authorization: dataToken,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}

export const updateCategory = async (id, data) => {
    const dataToken = getUserToken();
    return await axios.put(`http://localhost:3000/api/categories/${id}`, data, {
        headers: {
            Authorization: dataToken,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}