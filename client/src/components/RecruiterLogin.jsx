/* eslint-disable no-unused-vars */
import React, { useState, useRef, useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const RecruiterLogin = () => {
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false)
    const [logo, setLogo] = useState(null)
    const [logoPreview, setLogoPreview] = useState(null)
    const fileInputRef = useRef(null)
    const { setShowRecruiterLogin } = useContext(AppContext)

    // Freeze scroll when popup is open
    useEffect(() => {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }, [])

    const onSubmitHandler = (e) => {
      e.preventDefault()
      if (state === 'Sign up' && !isTextDataSubmitted) {
        // Go to logo upload step
        setIsTextDataSubmitted(true)
      } else if (state === 'Sign up' && isTextDataSubmitted) {
        // Final create account with logo
        console.log('Creating account with:', { name, email, password, logo })
        // Reset fields if needed
        setName('')
        setEmail('')
        setPassword('')
        setLogo(null)
        setLogoPreview(null)
        setIsTextDataSubmitted(false)
        setState('Login')
      } else {
        // Handle login
        console.log('Logging in with:', { email, password })
        setEmail('')
        setPassword('')
      }
    }

    const handleLogoChange = (e) => {
      const file = e.target.files[0]
      setLogo(file)
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => setLogoPreview(reader.result)
        reader.readAsDataURL(file)
      } else {
        setLogoPreview(null)
      }
    }

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
        <div className="absolute inset-0 backdrop-blur-[6px] bg-black/10"></div>
        <form
          onSubmit={onSubmitHandler}
          className="relative bg-white rounded-2xl shadow-xl w-full max-w-md px-8 py-8 flex flex-col items-center"
          autoComplete="off"
        >
          {/* Cross icon button */}
          <button
            type="button"
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
            onClick={() => setShowRecruiterLogin(false)}
            tabIndex={0}
            aria-label="Close"
          >
            <img src={assets.cross_icon} alt="Close" className="w-3 h-3" />
          </button>

          {/* Sign up: Step 1 - Text fields */}
          {state === 'Sign up' && !isTextDataSubmitted && (
            <>
              <h1 className="text-2xl font-semibold mb-2">Recruiter Sign up</h1>
              <p className="text-gray-500 mb-6 text-center">Welcome! Please fill in your details</p>
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <img src={assets.person_icon} alt="" className="w-5 h-5 mr-2 opacity-70" />
                  <input
                    type="text"
                    placeholder="Company name"
                    required
                    onChange={e => setName(e.target.value)}
                    value={name}
                    className="bg-transparent outline-none flex-1 text-gray-700"
                  />
                </div>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <img src={assets.email_icon} alt="" className="w-5 h-5 mr-2 opacity-70" />
                  <input
                    type="email"
                    placeholder="Email id"
                    required
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    className="bg-transparent outline-none flex-1 text-gray-700"
                  />
                </div>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <img src={assets.lock_icon} alt="" className="w-5 h-5 mr-2 opacity-70" />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    className="bg-transparent outline-none flex-1 text-gray-700"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full transition-colors text-lg shadow"
              >
                Next
              </button>
              <div className="w-full text-center mt-4 text-gray-500 text-sm">
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => {
                    setState('Login')
                    setIsTextDataSubmitted(false)
                  }}
                >
                  Login
                </button>
              </div>
            </>
          )}

          {/* Sign up: Step 2 - Logo upload */}
          {state === 'Sign up' && isTextDataSubmitted && (
            <>
              <h1 className="text-2xl font-semibold mb-2">Upload Company Logo</h1>
              <p className="text-gray-500 mb-6 text-center">Please upload your company logo to complete sign up</p>
              <div className="w-full flex flex-col items-center gap-4">
                <div
                  className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-400 transition"
                  onClick={() => fileInputRef.current.click()}
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-gray-400 text-sm text-center">Click to upload</span>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full transition-colors text-lg shadow ${!logo ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!logo}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  className="text-gray-500 text-sm mt-2 hover:underline"
                  onClick={() => setIsTextDataSubmitted(false)}
                >
                  &larr; Back
                </button>
              </div>
            </>
          )}

          {/* Login */}
          {state === 'Login' && (
            <>
              <h1 className="text-2xl font-semibold mb-2">Recruiter Login</h1>
              <p className="text-gray-500 mb-6 text-center">Welcome back! Please sign in to continue</p>
              <div className="w-full flex flex-col gap-4">
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <img src={assets.email_icon} alt="" className="w-5 h-5 mr-2 opacity-70" />
                  <input
                    type="email"
                    placeholder="Email id"
                    required
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    className="bg-transparent outline-none flex-1 text-gray-700"
                  />
                </div>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                  <img src={assets.lock_icon} alt="" className="w-5 h-5 mr-2 opacity-70" />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    className="bg-transparent outline-none flex-1 text-gray-700"
                  />
                </div>
              </div>
              <div className="w-full flex justify-start mt-2">
                <button type="button" className="text-blue-600 text-sm hover:underline focus:outline-none bg-transparent px-0 py-0">
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-full transition-colors text-lg shadow"
              >
                Login
              </button>
              <div className="w-full text-center mt-4 text-gray-500 text-sm">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-blue-600 hover:underline"
                  onClick={() => setState('Sign up')}
                >
                  Sign up
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    )
}

export default RecruiterLogin