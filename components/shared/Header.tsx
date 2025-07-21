import React from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
  gradient?: boolean
  centered?: boolean
  highlightColor?: 'purple' | 'blue' | 'pink' | 'green'
}

const Header = ({ 
  title, 
  subtitle, 
  gradient = true,
  centered = false,
  highlightColor = 'purple'
}: HeaderProps) => {
  // Color gradients based on selection
  const gradientColors = {
    purple: 'from-purple-600 to-indigo-600',
    blue: 'from-blue-600 to-cyan-600',
    pink: 'from-pink-600 to-rose-600',
    green: 'from-emerald-600 to-teal-600'
  }

  return (
    <div className={`${centered ? 'text-center' : 'text-left'} mb-8`}>
      <h2 
        className={`text-3xl md:text-4xl font-bold tracking-tight ${
          gradient 
            ? `bg-clip-text text-transparent bg-gradient-to-r ${gradientColors[highlightColor]}`
            : 'text-gray-900 dark:text-white'
        }`}
      >
        {title}
      </h2>
      
      {subtitle && (
        <p className={`mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl ${
          centered ? 'mx-auto' : ''
        }`}>
          {subtitle}
        </p>
      )}
      
      {/* Decorative element */}
      <div className={`mt-6 h-1 w-20 rounded-full ${
        gradient 
          ? `bg-gradient-to-r ${gradientColors[highlightColor]}`
          : 'bg-gray-300 dark:bg-gray-600'
      } ${centered ? 'mx-auto' : ''}`} />
    </div>
  )
}

export default Header