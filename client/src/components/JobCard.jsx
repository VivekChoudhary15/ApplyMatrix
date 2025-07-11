import React from 'react'
import { useNavigate } from 'react-router-dom'

const JobCard = ({job}) => {
    const navigate = useNavigate();
  return (
    <div className='border p-6 shadow rounded'>
        <div className='flex items-center gap-4 mb-4 justify-between'>
            <img className='h-8' src={job.companyId.image} alt="" />
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
            <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0, 0)}} className='bg-blue-500 text-white px-4 py-2 rounded'>Apply Now</button>
            <button onClick={() => {navigate(`/apply-job/${job._id}`); scrollTo(0, 0)}} className='bg-gray-200 text-gray-700 px-4 py-2 rounded'>Learn more</button>
        </div>
    </div>
  )
}

export default JobCard