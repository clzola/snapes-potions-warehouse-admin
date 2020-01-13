import axios from 'axios'
import store from '../store'

const httpClient = axios.create({
  baseURL: 'http://localhost:8000'
})

httpClient.interceptors.request.use(
  (config) => {
    let excludedRoutes = [
      '/auth/token',
      '/auth/forgot-password',
      '/auth/reset-password '
    ]

    for (let i = 0; i < excludedRoutes.length; i++) {
      if (excludedRoutes[i] === config.url) {
        return config
      }
    }

    let accessToken = store.state.auth.accessToken
    if (accessToken) {
      config.headers.common['Authorization'] = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

httpClient.interceptors.response.use(
  (response) => { return response },
  (error) => {
    const originalRequest = error.config

    // Route `/auth/token/refresh` also returns 401 when provided access token is not valid.
    // This prevents infinite loop
    if (originalRequest.url === '/auth/token/refresh') {
      return Promise.reject(error)
    }

    // Route `/auth/token` will respond with 401 if credentials are not valid.
    // This prevents infinite loop
    if (originalRequest.url === '/auth/token') {
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      return store.dispatch('refreshAccessToken').then(() => httpClient(originalRequest))
    }

    return Promise.reject(error)
  }
)

export default httpClient
