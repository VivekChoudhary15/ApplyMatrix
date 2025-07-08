/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import {assets} from '../assets/assets'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const Navbar = () => {
    // console.log(assets.logo)
    const {openSignIn} = useClerk()
    const {user} = useUser()
    const navigate = useNavigate()

    const { showRecruiterLogin, setShowRecruiterLogin } = useContext(AppContext);

    useEffect(() => {
    const createUserInBackend = async () => {
        if (!user) return;

        try {
            await axios.post("http://localhost:5000/api/users", {
                _id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.emailAddresses[0]?.emailAddress,
                image: user.imageUrl,
                resume: ""
            });
        } catch (err) {
            console.error("Failed to send user data to backend:", err);
        }
    };

    createUserInBackend();
}, [user]);


  return (
    <div className='shadow py-4'>
        <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
            <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
            {
                user ? (
                    <div className='flex items-center gap-3'>
                       <Link to="./applied-jobs">Applied Jobs</Link>
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