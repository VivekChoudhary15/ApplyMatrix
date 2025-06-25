import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='relative container px-4 2xl:px-20 mx-auto my-20 flex items-center justify-center min-h-[400px]'>
      <div className='w-full bg-gradient-to-r from-violet-50 to-purple-50 p-12 sm:p-24 lg:p-32 rounded-lg flex flex-col lg:flex-row items-center justify-between relative overflow-hidden'>
        <div className='z-10 flex flex-col items-center lg:items-start w-full lg:w-1/2'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4 mt-4 lg:mt-0 text-center lg:text-left'>
            Download Mobile App For Better Experience
          </h1>
          <p className='text-gray-600 mb-8 text-center lg:text-left max-w-md'>
            Get instant access to thousands of jobs, apply on the go, and stay updated with the latest opportunities. Download now!
          </p>
          <div className='flex gap-4'>
            <a href="" className='inline-block shadow-lg rounded-lg overflow-hidden'>
              <img className='h-12' src={assets.play_store} alt="Get it on Google Play" />
            </a>
            <a href="" className='inline-block shadow-lg rounded-lg overflow-hidden'>
              <img className='h-12' src={assets.app_store} alt="Download on the App Store" />
            </a>
          </div>
        </div>
        <img
          className='absolute lg:static right-0 bottom-0 w-80 max-lg:hidden z-0'
          src={assets.app_main_img}
          alt=""
        />
      </div>
    </div>
  )
}

export default AppDownload