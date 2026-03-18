/**
 * String utility functions
 */

/**
 * Capitalize first letter of string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Convert snake_case to camelCase
 */
export const toCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase())
}

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Truncate string to specified length
 */
export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

/**
 * Get initials from full name
 */
export const getInitials = (fullName: string): string => {
  return fullName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase()
}

/**
 * Format currency
 */
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}
