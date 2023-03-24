import axios from 'axios'

const request = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 30 * 1000,
})

request.defaults.withCredentials = true

export { request }
