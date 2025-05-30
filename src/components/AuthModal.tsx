import { useState } from 'react'
import { X, Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  nickname: string
  password: string
  confirmPassword: string
  mobileNumber: string
}

interface FormErrors {
  [key: string]: string
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    mobileNumber: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})

  if (!isOpen) return null

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (mode === 'register') {
      // Registration-specific validations
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required'
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
      }
      if (!formData.nickname.trim()) {
        newErrors.nickname = 'Nickname is required'
      } else if (formData.nickname.length < 3) {
        newErrors.nickname = 'Nickname must be at least 3 characters'
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
      
      // Mobile number validation (optional but if provided, should be valid)
      if (formData.mobileNumber && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = 'Please enter a valid mobile number'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (mode === 'login') {
        // Handle login
        console.log('Login attempt:', { email: formData.email, password: formData.password })
        alert('Login successful! (This would redirect to dashboard in a real app)')
      } else {
        // Handle registration
        console.log('Registration attempt:', {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          nickname: formData.nickname,
          mobileNumber: formData.mobileNumber,
          // Password would be hashed on the backend
        })
        alert('Account created successfully! Please check your email to verify your account.')
      }
      
      onClose()
    } catch (error) {
      console.error('Auth error:', error)
      setErrors({ general: 'An error occurred. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setErrors({})
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      mobileNumber: ''
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Welcome Back' : 'Join uPickGolf'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {errors.general}
            </div>
          )}

          {mode === 'register' && (
            <>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`input-field pl-10 ${errors.firstName ? 'border-red-300' : ''}`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`input-field pl-10 ${errors.lastName ? 'border-red-300' : ''}`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Nickname */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nickname *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className={`input-field pl-10 ${errors.nickname ? 'border-red-300' : ''}`}
                    placeholder="GolfPro2024"
                  />
                </div>
                {errors.nickname && <p className="text-red-600 text-sm mt-1">{errors.nickname}</p>}
                <p className="text-gray-500 text-sm mt-1">This will be displayed on leaderboards</p>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`input-field pl-10 ${errors.email ? 'border-red-300' : ''}`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  className={`input-field pl-10 ${errors.mobileNumber ? 'border-red-300' : ''}`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.mobileNumber && <p className="text-red-600 text-sm mt-1">{errors.mobileNumber}</p>}
              <p className="text-gray-500 text-sm mt-1">Optional - for tournament notifications</p>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-300' : ''}`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`input-field pl-10 pr-10 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full btn-primary py-3 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          {/* Switch Mode */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
              <button
                type="button"
                onClick={switchMode}
                className="ml-2 text-golf-green hover:text-golf-lightgreen font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
} 