import axios from "axios";
import { getUserToken } from "../../utils/token";

export const cartUpdate = async (data) => {
    const dataUserLogin = getUserToken();
    return await axios.put(`http://localhost:3000/api/carts`, data, {
        headers: {
            Authorization: dataUserLogin,
            'Content-Type': 'application/json; charset=utf-8'
        }
    });
}

export const cartGet = async () => {
    const dataUserLogin = getUserToken();
    return await axios.get(`http://localhost:3000/api/carts`, {
        headers: {
            Authorization: dataUserLogin,
        }
    });
}