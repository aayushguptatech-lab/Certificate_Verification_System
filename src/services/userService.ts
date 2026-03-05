import { apiClient } from './apiClient'
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants'
import type { User } from '../types'

class UserService {
  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.USERS.PROFILE)
  }

  /**
   * Update user profile
   */
  async updateProfile(data: Partial<User>): Promise<User> {
    return apiClient.put<User>(API_ENDPOINTS.USERS.UPDATE, data)
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    return apiClient.post<void>(API_ENDPOINTS.USERS.CHANGE_PASSWORD, {
      currentPassword,
      newPassword,
    })
  }

  /**
   * Delete user account
   */
  async deleteAccount(password: string): Promise<void> {
    return apiClient.post<void>(API_ENDPOINTS.USERS.DELETE, { password })
  }

  /**
   * Get cached user data
   */
  getCachedUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER_DATA)
    return data ? JSON.parse(data) : null
  }

  /**
   * Cache user data locally
   */
  cacheUserData(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user))
  }
}

export const userService = new UserService()
