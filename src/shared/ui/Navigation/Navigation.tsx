import { Home, Search } from 'lucide-react'
import { JSX } from 'react'
import { Link } from 'react-router'

import Button from '../Button/Button'

const Navigation = (): JSX.Element => {
  return (
    <nav className="hidden md:flex items-center gap-1">
            <Button>
              <Link to="/home" className="flex items-center gap-2">
                <Home size={16} />홈
              </Link>
            </Button>
            <Button>
              <Link to="/search" className="flex items-center gap-2">
                <Search size={16} />
                검색
              </Link>
            </Button>
      </nav>
  )
}

export default Navigation