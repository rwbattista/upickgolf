import { Link, useLocation } from 'react-router-dom'
import { Trophy, Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { AuthModal } from './AuthModal'

export function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from auth context in a real app
  const [userNickname] = useState('GolfPro2024') // This would come from auth context

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tournaments', href: '/tournaments' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'My Team', href: '/my-team' },
    { name: 'Rules', href: '/rules' },
  ]

  const isActive = (path: string) => location.pathname === path

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsMenuOpen(false)
    // In a real app, this would clear auth tokens and redirect
  }

  return (
    <>
      <header className="bg-white shadow-lg border-b-4 border-golf-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-golf-green" />
              <span className="text-2xl font-bold text-golf-green">uPickGolf</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-golf-green text-white'
                      : 'text-gray-700 hover:text-golf-green hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{userNickname}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-golf-green transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-sm font-medium text-gray-700 hover:text-golf-green transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Join Now
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-golf-green p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-golf-green text-white'
                        : 'text-gray-700 hover:text-golf-green hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 px-3 py-2">
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{userNickname}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-golf-green transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => handleAuthClick('login')}
                        className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-golf-green transition-colors"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => handleAuthClick('register')}
                        className="block w-full text-left px-3 py-2 btn-primary text-sm"
                      >
                        Join Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  )
} 