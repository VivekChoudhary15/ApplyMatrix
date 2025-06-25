import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto py-8 flex items-center justify-between gap-4 py-3 mt-2'>
        <img width={160} src={assets.logo} alt="" />
        <p className='text-gray-400 flex-1 border-1 pl-4 text-sm  max-sm:hidden'>All rights reserved. Copyright @job-portal</p>
        <div className='flex gap-2.5 mt-4'>
            <img width={24} height={24} src={assets.facebook_icon} alt="Facebook" />
            <img width={24} height={24} src={assets.twitter_icon} alt="Twitter" />
            <img width={24} height={24} src={assets.instagram_icon} alt="Instagram" />
        </div>
    </div>
  )
}

export default Footer