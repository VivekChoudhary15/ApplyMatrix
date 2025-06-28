import React from 'react'
import { assets } from '../assets/assets'

const Dashboard = () => {
  return (
    <div className='min-h-screen'>
        {/* Navbar for Recruiter Panel  */}
        <div className='shadow py-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <img src={assets.logo} alt="" />
                <div>
                    <p>Welcome, Recruiter</p>
                    <div>
                        <img src={assets.company_icon} alt="" />
                        <div>
                            <ul>
                                <li>Logout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard