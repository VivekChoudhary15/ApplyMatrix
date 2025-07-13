/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    // console.log(assets.logo)
    const {openSignIn} = useClerk()
    const {user} = useUser()
    const navigate = useNavigate()

    const { backendUrl } = useContext(AppContext);

    const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);


  return (
    <div className='shadow py-4'>
        <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
            <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
            {
                user ? (
                    <div className='flex items-center gap-3'>
                       <Link to="/applications">Applied Jobs</Link>
                       <p>|</p>
                       <p className='max-sm:hidden'>Hi, {user.firstName + ' ' + user.lastName}</p>
                          <UserButton />
                    </div>
                ) : (
                    <div className='flex items-center gap-4'>
                        <button className='text-gray-700 hover:text-blue-500 transition-colors' onClick={e => setShowRecruiterLogin(true)}>
                            Recruiter Login
                        </button>
                        <button onClick={e => openSignIn()} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                            Login
                        </button>
                    </div>
                )
            }
            
        </div>
    </div>
  )
}

export default Navbar