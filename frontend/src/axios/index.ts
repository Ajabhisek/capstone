import axios from 'axios';

export const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export default function AXIOS() {

    const userId = parseInt(localStorage.getItem("userId") ?? "0");

    return axios.create({
        baseURL: API_BASE_URL,
        headers: {
            userId,
            "Content-Type": "application/json"
        }
    });

}