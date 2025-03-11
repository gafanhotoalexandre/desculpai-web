/* eslint-disable @typescript-eslint/no-explicit-any*/
import axios, { AxiosResponse } from 'axios'
import { ApiResponse } from '@/types/api'

// Criação da instância do axios
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 5000,
})

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para tratamento de respostas
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Retorna apenas o campo data da resposta
    return response.data
  },
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRoute = window.location.pathname.includes('/auth')
      // Só redireciona se NÃO estiver na rota de autenticação
      if (!isAuthRoute) {
        localStorage.removeItem('token')
        window.location.href = '/auth'
      }
    }

    const errorData = error.response?.data || {
      success: false,
      message: 'Erro de conexão com o servidor',
    }

    // Transformando o objeto em uma instância de Error
    const customError = new Error(errorData.message)
    // Anexando dados adicionais ao objeto de erro
    Object.assign(customError, errorData)
    return Promise.reject(customError)
  }
)

// Funções tipadas para facilitar o uso da API
export const apiService = {
  get: <T = any>(url: string, params?: any): Promise<ApiResponse<T>> => {
    return api.get(url, { params })
  },

  post: <T = any>(url: string, data?: any): Promise<ApiResponse<T>> => {
    return api.post(url, data)
  },

  put: <T = any>(url: string, data?: any): Promise<ApiResponse<T>> => {
    return api.put(url, data)
  },

  delete: <T = any>(url: string): Promise<ApiResponse<T>> => {
    return api.delete(url)
  },
}
