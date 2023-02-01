import axios from "axios"
import Config from "react-native-config"

export const AxiosInstance = axios.create({
  baseURL: Config.SERVER_URL,
})
