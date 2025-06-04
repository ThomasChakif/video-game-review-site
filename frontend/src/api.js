import axios from "axios"
import {ACCESS_TOKEN} from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL //allows us to get import variable from .env file
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization = `Bearer ${token}` //authorization header
        }
    return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api //we'll use api instead of axios from now on 