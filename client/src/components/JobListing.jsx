/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'
import {assets, JobCategories, JobLocations} from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
  const {searchFilter, setSearchFilter, jobs} = useContext(AppContext);
  const [showFilters, setShowFilters] = React.useState(false);

  const [currentPage, setCurrentPage] = React.useState(1);
  const jobsPerPage = 6; // Number of jobs to display per page
  
  return (
    <div className='container 2xl:px-20 px-4 py-10 flex gap-10 flex-col lg:flex-row max-lg:space-y-8'>
      {/* sidebar */}
      <div className='w-full lg:w-1/4 bg-white rounded-lg shadow-lg px-4'>
        {
            <>
              <h3 className='font-medium text-lg mb-4'>Current Search</h3>
              <div className='mb-4 text-gray-600'>
                {searchFilter.title &&(
                  <span className='inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600 px-2 py-1'>
                    {searchFilter.title}
                    <img onClick={ e => setSearchFilter(prev => ({...prev, title:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                  </span>
                )}
                {searchFilter.location &&(
                  <span className='inline-flex items-center gap-2 bg-red-50 border border-red-200 text-blue-600 px-2 py-1 ml-2'>
                    {searchFilter.location}
                    <img onClick={ e => setSearchFilter(prev => ({...prev, location:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                  </span>
                )}

                <button
                  className='px-4 py-2 rounded border border-gray-300 text-gray-600 ml-4 lg:hidden'
                  onClick={e => setShowFilters(!showFilters)}
                >
                  {showFilters ? "Close Filters" : "Show Filters"}
                </button>

                {/* Category filter  */}
                <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                  <h4 className='font-medium text-lg py-4'>Search by Category</h4>
                  <ul className='space-y-4 text-gray-600'>
                    {
                      JobCategories.map((category, index) => (
                        <li key={index} className='flex items-center gap-3 my-2'>
                          <input  type="checkbox" name="" id={`category-${index}`} className='scale-125' />
                          <label htmlFor={`category-${index}`} className='text-sm'>{category}</label>
                        </li>
                      ))
                    }
                  </ul>
                </div>

                {/* Location Filter  */}
                <div className={`${showFilters ? 'block' : 'hidden'} lg:block pt-14`}>
                  <h4 className='font-medium text-lg py-4'>Search by Location</h4>
                  <ul className='space-y-4 text-gray-600'>
                    {
                      JobLocations.map((category, index) => (
                        <li key={index} className='flex items-center gap-3 my-2'>
                          <input  type="checkbox" name="" id={`location-${index}`} className='scale-125' />
                          <label htmlFor={`location-${index}`} className='text-sm'>{category}</label>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </>
          
        }
      </div>

      {/* Job Listings  */}
      <section className='w-full lg:w-3/4 text-gray-700 max-lg:px-4 py-6'>
        <h3 className='font-medium text-3xl py-2 ' id='job-list'>Latest Jobs</h3>
        <p className='mb-4'>Get your desired job from top companies</p>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {jobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/* Pagination */}
        {jobs.length > 0 && (
          <div className='flex items-center justify-center gap-4 mt-8'>
            <a href="">
              <img onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} src={assets.left_arrow_icon} alt="" />
            </a>
            {Array.from({ length: Math.ceil(jobs.length / jobsPerPage) }, (_, i) => (
              <a href="#job-list">
                <button onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {i + 1}
                </button>
              </a>
            ))}
            <a href="">
              <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(jobs.length / jobsPerPage)))} src={assets.right_arrow_icon} alt="" />
            </a>
          </div>
        )}
      </section>
    </div>
  )
}

export default JobListing