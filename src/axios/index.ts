import axios from 'axios'

export const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
})
