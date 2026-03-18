/**
 * Validation utility functions
 */

import { VALIDATION_PATTERNS, VALIDATION_LIMITS } from '../constants'

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  return VALIDATION_PATTERNS.EMAIL.test(email)
}

/**
 * Validate password strength
 */
export const validatePassword = (password: string): boolean => {
  return VALIDATION_PATTERNS.PASSWORD.test(password)
}

/**
 * Validate password length
 */
export const validatePasswordLength = (password: string): boolean => {
  return (
    password.length >= VALIDATION_LIMITS.MIN_PASSWORD_LENGTH &&
    password.length <= VALIDATION_LIMITS.MAX_PASSWORD_LENGTH
  )
}

/**
 * Validate URL format
 */
export const validateUrl = (url: string): boolean => {
  return VALIDATION_PATTERNS.URL.test(url)
}

/**
 * Validate certificate ID format
 */
export const validateCertificateId = (id: string): boolean => {
  return VALIDATION_PATTERNS.CERTIFICATE_ID.test(id)
}

/**
 * Validate name
 */
export const validateName = (name: string): boolean => {
  return (
    name.length >= VALIDATION_LIMITS.MIN_NAME_LENGTH &&
    name.length <= VALIDATION_LIMITS.MAX_NAME_LENGTH
  )
}

/**
 * Check if passwords match
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword
}
