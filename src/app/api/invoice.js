import axios from "axios";
import { getUserToken } from "../../utils/token";


export const getInvoice = async (id) => {
    const dataUserLogin = getUserToken();
    return await axios.get(`http://localhost:3000/api/invoices/${id}`, { headers: { Authorization: dataUserLogin } });
}