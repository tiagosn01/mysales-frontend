/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://api.sellevision.com.br/',
  baseURL: 'http://localhost:8080/',
})

api.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem('@MjTele:token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
