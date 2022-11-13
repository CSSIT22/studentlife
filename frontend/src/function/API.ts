import axios from "axios"

const API = axios.create({
    baseURL: import.meta.env.VITE_APP_ORIGIN,
    withCredentials: true,
})

export default API
