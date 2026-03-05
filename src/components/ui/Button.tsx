import React from 'react'
import type { ButtonProps } from '../../types'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2'

    const variantStyles = {
      primary: 'bg-primary text-white hover:bg-blue-700 disabled:bg-gray-400',
      secondary: 'bg-secondary text-white hover:bg-purple-700 disabled:bg-gray-400',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:border-gray-400 disabled:text-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
    }

    const sizeStyles = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-6 py-2 text-base',
      lg: 'px-8 py-3 text-lg',
    }

    const width = fullWidth ? 'w-full' : ''
    const opacity = isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${width} ${opacity} ${className}`}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <span className="animate-spin">⏳</span>}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
