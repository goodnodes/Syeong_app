import axios from "axios"
import { SERVER_URL } from "../../config"

export const AxiosInstance = axios.create({
  baseURL: SERVER_URL,
})
