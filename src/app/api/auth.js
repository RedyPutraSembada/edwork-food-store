import axios from "axios";

export const registerUser = async (data) => {
    return await axios.post('http://localhost:3000/auth/register', data, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}

export const loginUser = async (data) => {
    return await axios.post('http://localhost:3000/auth/login', data, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}

export const logoutUser = async () => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    try {
        let logout = await axios.post('http://localhost:3000/auth/logout', null, { headers: { Authorization: `Bearer ${token}` } });
        localStorage.removeItem('auth');
        return logout;
    } catch (err) {
        console.log(err);
    }
}