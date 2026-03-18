import React from 'react'
import type { CardProps } from '../../types'

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', hover = false, className = '', children, ...props }, ref) => {
    const paddingStyles = {
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    }

    const hoverStyle = hover ? 'hover:shadow-xl transition duration-300 transform hover:-translate-y-2' : ''

    return (
      <div
        ref={ref}
        className={`bg-white rounded-lg shadow-lg ${paddingStyles[padding]} ${hoverStyle} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
