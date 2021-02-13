import axios, { AxiosInstance,AxiosError } from 'axios'


const baseURL = "http://localhost:5002/"

const missionProxy: AxiosInstance = axios.create({
    baseURL
})

export default missionProxy;