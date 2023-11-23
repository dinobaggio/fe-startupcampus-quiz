import axios from 'axios'
import contants from '../libs/contants';

export default function newAxios(isAuth = false) {
    const headers = {}
    if (isAuth === true) {
        const token = localStorage.getItem("token")
        headers["Authorization"] = `Bearer ${token}`
    }

    const instance = axios.create({
        baseURL: contants.BASE_API,
        headers,
    });

    return instance
}