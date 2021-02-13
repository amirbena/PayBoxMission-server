import axios, { AxiosInstance } from 'axios'


const baseURL = process.env.MISSIONS_API

const missionProxy: AxiosInstance = axios.create({
    baseURL
})

export default missionProxy;