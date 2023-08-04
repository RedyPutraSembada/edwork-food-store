import axios from "axios";
import { getUserToken } from "../../utils/token";

export const getTag = async () => {
    const dataUserLogin = getUserToken();
    return await axios.get('http://localhost:3000/api/tags', { headers: { Authorization: dataUserLogin } });
}

export const deleteTag = async (id) => {
    const dataUserLogin = getUserToken();
    return await axios.delete(`http://localhost:3000/api/tags/${id}`, { headers: { Authorization: dataUserLogin } });
}

export const createTag = async (data) => {
    const dataUserLogin = getUserToken();
    return await axios.post(`http://localhost:3000/api/tags`, data, {
        headers: {
            Authorization: dataUserLogin,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}

export const updateTag = async (id, data) => {
    const dataUserLogin = getUserToken();
    return await axios.put(`http://localhost:3000/api/tags/${id}`, data, {
        headers: {
            Authorization: dataUserLogin,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}