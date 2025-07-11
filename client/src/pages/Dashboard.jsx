import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {
    const navigate = useNavigate();

    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

    // Function to handle logout
    const handleLogout = () => {
        setCompanyToken(null);
        localStorage.removeItem('companyToken');
        setCompanyData(null);
        navigate('/');
    }

    useEffect(() => {
        if (companyData && location.pathname === '/dashboard'){
            navigate('/dashboard/manage-jobs');
        }
    }, [companyData, navigate]);

  return (
    <div className='min-h-screen'>
        {/* Navbar for Recruiter Panel  */}
        <div className='shadow py-4'>
            <div className='container mx-auto flex justify-between items-center'>

                <img onClick={e => navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.logo} alt="" />
                { companyData && (
                    <div className='flex items-center gap-3'>
                        <p className='max-sm:hidden'>Welcome, {companyData.name}</p>
                        <div className='relative group'>
                            <img className='w-8 border rounded-full' src={companyData.image} alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12 '>
                                <ul className='list-none bg-white shadow-lg rounded p-4 m-0'>
                                    <li onClick={handleLogout} className='py-2 px-1 cursor-pointer pr-10'>Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Sidebar  */}
        <div className='flex items-start'>
            <div className='inline-block min-h-screen border-r-2'>
                <ul className='flex flex-col items-start pt-5 text-gray-600'>
                    <NavLink to='/dashboard/add-jobs' className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 hover:text-black ${isActive ? 'bg-blue-500 border-r-4 border-blue-500 text-white' : ''}`}>
                        <img className='min-w-4' src={assets.add_icon} alt="" />
                        <p className='max-sm:hidden'>Add Job</p>
                    </NavLink>

                    <NavLink to='/dashboard/manage-jobs' className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 hover:text-black ${isActive ? 'bg-blue-500 border-r-4 border-blue-500 text-white' : ''}`}>
                        <img className='min-w-4' src={assets.home_icon} alt="" />
                        <p className='max-sm:hidden'>Manage Jobs</p>
                    </NavLink>

                    <NavLink to='/dashboard/view-applications' className={({isActive}) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 hover:text-black ${isActive ? 'bg-blue-500 border-r-4 border-blue-500 text-white' : ''}`}>
                        <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                        <p className='max-sm:hidden'>View Applications</p>
                    </NavLink>
                </ul>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Dashboard