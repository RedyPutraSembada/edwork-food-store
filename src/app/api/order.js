import axios from "axios";
import { getUserToken } from "../../utils/token";

export const orderProduct = async (data) => {
    const dataUserLogin = getUserToken();
    return await axios.post(`http://localhost:3000/api/orders`, data, {
        headers: {
            Authorization: dataUserLogin,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}

export const getOrderProduct = async (limit = 10, skip = 0) => {
    const dataUserLogin = getUserToken();
    return await axios.get(`http://localhost:3000/api/orders?limit=${limit}&skip=${skip}`, {
        headers: {
            Authorization: dataUserLogin,
        }
    });
}