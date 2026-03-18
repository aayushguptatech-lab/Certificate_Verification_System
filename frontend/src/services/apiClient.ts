import axios, { AxiosInstance, AxiosError } from 'axios'
import { API_CONFIG, STORAGE_KEYS } from '../constants'
import type { ApiResponse } from '../types'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - logout user
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * GET request
   */
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    try {
      const response = await this.client.get<ApiResponse<T>>(url, { params })
      return response.data.data as T
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: Record<string, any>): Promise<T> {
    try {
      const response = await this.client.post<ApiResponse<T>>(url, data)
      return response.data.data as T
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: Record<string, any>): Promise<T> {
    try {
      const response = await this.client.put<ApiResponse<T>>(url, data)
      return response.data.data as T
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * DELETE request
   */
  async delete<T = void>(url: string): Promise<T> {
    try {
      const response = await this.client.delete<ApiResponse<T>>(url)
      return response.data.data as T
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return new Error(`Cannot connect to backend at ${API_CONFIG.BASE_URL}. Ensure backend is running and frontend env is reloaded.`)
      }
      const message = error.response?.data?.error || error.message
      return new Error(message)
    }
    return error instanceof Error ? error : new Error('An error occurred')
  }
}

export const apiClient = new ApiClient()
