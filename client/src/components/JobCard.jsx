import React from 'react'
import {assets} from '../assets/assets'
const JobCard = ({job}) => {
  return (
    <div className='border p-6 shadow rounded'>
        <div className='flex items-center gap-4 mb-4 justify-between'>
            <img className='h-8' src={assets.company_icon} alt="" />
        </div>
        <h4 className='text-xl font-semibold mt-2'>
            {job.title}
        </h4>
        <div className='flex items-center gap-4 text-gray-600 mt-2'>
            <span className='bg-blue-50 border border-blue-200 text-blue-600 px-2 py-1 rounded'>
                {job.location}
            </span>
            <span className='bg-green-50 border border-green-200 text-green-600 px-2 py-1 rounded'>{job.level}</span>
        </div>
        <p className='text-gray-600 mt-2' dangerouslySetInnerHTML={{__html: job.description.slice(0, 150)}}></p>
        <div className='flex items-center gap-4 mt-4'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'>Apply Now</button>
            <button className='bg-gray-200 text-gray-700 px-4 py-2 rounded'>Learn more</button>
        </div>
    </div>
  )
}

export default JobCard