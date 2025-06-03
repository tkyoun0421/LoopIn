import { Music } from 'lucide-react'
import { JSX } from 'react'

import Navigation from '@shared/ui/Navigation/Navigation'

const sizeClasses = {
    small: "text-2xl",
    default: "text-4xl",
    large: "text-6xl",
  }

const iconSizes = {
    small: 24,
    default: 32,
    large: 48,
  }

const Header = ({ size = "default" }: { size?: "small" | "default" | "large" }): JSX.Element => {
  return (
    
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm opacity-75 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
          <Music size={iconSizes[size]} className="text-white" />
        </div>
      </div>
      <div
        className={`font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ${sizeClasses[size]}`}
      >
        Loop<span className="text-purple-800 dark:text-purple-300">In</span>
      </div>
      <Navigation / >
    </div>
  )
}

export default Header