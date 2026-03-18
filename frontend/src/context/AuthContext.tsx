import React, { createContext, useState, useCallback, useEffect } from 'react'
import { authService } from '../services'
import type { User, AuthCredentials, RegisterFormData } from '../types'

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: AuthCredentials) => Promise<void>
  register: (data: RegisterFormData) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (authService.isAuthenticated()) {
          const cachedUser = authService.getUserData()
          if (cachedUser) {
            setUser(cachedUser)
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = useCallback(async (credentials: AuthCredentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authService.login(credentials)
      setUser(response.user)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = useCallback(async (data: RegisterFormData) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await authService.register(data)
      setUser(response.user)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await authService.logout()
      setUser(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
