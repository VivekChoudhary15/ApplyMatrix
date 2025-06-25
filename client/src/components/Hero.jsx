/* eslint-disable no-unused-vars */
import React, { use, useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'
import { useRef } from 'react'

const Hero = () => {
    const { setSearchFilter, setIsSearched } = useContext(AppContext);

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSearch = () => {
        const title = titleRef.current.value;
        const location = locationRef.current.value;

        setSearchFilter({ title, location });
        setIsSearched(true);
        // console.log({title, location})
    };

  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg shadow-md'>
        <div className='bg-gradient-to-r from-purple-800 to-purple-950 text-center text-white p-6 rounded-lg shadow-lg mb-6'>  
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center'>Over 10,000+ jobs to apply</h2>
            <p className='mb-8 max-w-xl mx-auto  text-gray-200 text-center'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
            {/* // add css to the div to make the hero component a flex container with column direction */}
            <div className='flex items-center justify-between bg-white rounded text-gray-700'>
                <div className='flex items-center'>
                    <img src={assets.search_icon} alt="" className='h-4 sm:h-5' />
                    <input type="text" placeholder="Job Title" className='max-sm:text-xs p-2 rounded outline-none w-full' ref={titleRef} />
                </div>
                <div className='flex items-center'>
                    <img src={assets.location_icon} alt="" className='h-4 sm:h-5' />
                    <input type="text" placeholder="Location" className='max-sm:text-xs p-2 rounded outline-none w-full' ref={locationRef} />
                </div>
                <button className='bg-blue-600 px-6 py-3 rounded text-white font-medium hover:bg-blue-700 transition-colors' onClick={onSearch}>
                    Search
                </button>
            </div>
            {/* // button to search */}
            
        </div>
        <div className='border border-gray-300 p-6 rounded-lg mx-2 mt-5 shadow-md flex'>
            <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
            <p className='font-medium'>
                Trusted by
            </p>
            <img className='h-6' src={assets.microsoft_logo} alt="" />
            <img className='h-6' src={assets.walmart_logo} alt="" />
            <img className='h-6' src={assets.amazon_logo} alt="" />
            <img className='h-6' src={assets.samsung_logo} alt="" />
            <img className='h-6' src={assets.accenture_logo} alt="" />
            <img className='h-6' src={assets.adobe_logo} alt="" />
        </div>
        </div>
        
        
    </div>
  )
}

export default Hero

// import React from "react";

// const Hero = () => {
//   return (
//     <div className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-20 px-4 rounded-3xl shadow-md text-center max-w-5xl mx-auto">
//       <h1 className="text-4xl md:text-5xl font-bold mb-4">
//         Over 10,000+ jobs to apply
//       </h1>
//       <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
//         Your Next Big Career Move Starts Right Here – Explore The Best Job Opportunities And Take The First Step Toward Your Future!
//       </p>

//       <div className="flex flex-col md:flex-row items-center justify-center gap-4">
//         <div className='flex flex-col'>
            //     <div className='flex items-center mb-4'>
            //         <img src={assets.search_icon} alt="" className='mr-2' />
            //         <input type="text" placeholder="Job Title" className='border border-gray-300 p-2 rounded-md max:sm' />
            //     </div>
            //     <div className='flex items-center mb-4'>
            //         <img src={assets.location_icon} alt="" className='mr-2' />
            //         <input type="text" placeholder="Location" className='border border-gray-300 p-2 rounded-md max:sm' />
            //     </div>
            // </div>
//         <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium">
//           Search
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Hero;
