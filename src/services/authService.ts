import { apiClient } from './apiClient'
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants'
import type { User, AuthCredentials, RegisterFormData, AuthResponse } from '../types'

class AuthService {
  /**
   * Login user
   */
  async login(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials)
    
    if (response) {
      this.setAuthToken(response.token)
      if (response.refreshToken) {
        this.setRefreshToken(response.refreshToken)
      }
      this.setUserData(response.user)
    }
    
    return response
  }

  /**
   * Register new user
   */
  async register(data: RegisterFormData): Promise<AuthResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = data
    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REGISTER, registerData)
    
    if (response) {
      this.setAuthToken(response.token)
      if (response.refreshToken) {
        this.setRefreshToken(response.refreshToken)
      }
      this.setUserData(response.user)
    }
    
    return response
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT)
    } finally {
      this.clearAuth()
    }
  }

  /**
   * Refresh auth token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken,
    })

    if (response?.token) {
      this.setAuthToken(response.token)
      return response.token
    }

    throw new Error('Failed to refresh token')
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE)
  }

  /**
   * Get auth token from storage
   */
  getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  }

  /**
   * Set auth token in storage
   */
  private setAuthToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
  }

  /**
   * Get refresh token from storage
   */
  private getRefreshToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
  }

  /**
   * Set refresh token in storage
   */
  private setRefreshToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token)
  }

  /**
   * Get user data from storage
   */
  getUserData(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    return data ? JSON.parse(data) : null
  }

  /**
   * Set user data in storage
   */
  private setUserData(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user))
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAuthToken()
  }

  /**
   * Clear all auth data
   */
  private clearAuth(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
  }
}

export const authService = new AuthService()
