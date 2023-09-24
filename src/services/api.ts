/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://13.48.1.191',
})

api.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem('@MjTele:token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
