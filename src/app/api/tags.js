import axios from "axios";

export const getTag = async () => {
    const dataUserLogin = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    return await axios.get('http://localhost:3000/api/tags', { headers: { Authorization: dataUserLogin.token } });
}

export const deleteTag = async (id) => {
    const dataUserLogin = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    return await axios.delete(`http://localhost:3000/api/tags/${id}`, { headers: { Authorization: dataUserLogin.token } });
}

export const createTag = async (data) => {
    const dataUserLogin = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    return await axios.post(`http://localhost:3000/api/tags`, data, {
        headers: {
            Authorization: dataUserLogin.token,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}

export const updateTag = async (id, data) => {
    const dataUserLogin = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null;
    return await axios.put(`http://localhost:3000/api/tags/${id}`, data, {
        headers: {
            Authorization: dataUserLogin.token,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}