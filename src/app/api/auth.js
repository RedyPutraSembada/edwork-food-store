import axios from "axios";
import { getUserToken } from "../../utils/token";

export const registerUser = async (data) => {
    return await axios.post('http://localhost:3000/auth/register', data, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}

export const loginUser = async (data) => {
    return await axios.post('http://localhost:3000/auth/login', data, { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}

export const logoutUser = async () => {
    const dataToken = getUserToken();

    try {
        let logout = await axios.post('http://localhost:3000/auth/logout', null, { headers: { Authorization: `Bearer ${dataToken}` } });
        localStorage.removeItem('auth');
        return logout;
    } catch (err) {
        console.log(err);
    }
}