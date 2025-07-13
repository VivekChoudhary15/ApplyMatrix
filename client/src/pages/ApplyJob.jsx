/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {assets, jobsData} from '../assets/assets'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import kconvert from 'k-convert';
import moment from 'moment';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobsData, setJobsData] = useState(null);
  const { jobs, backendUrl, userData, userApplications } = useContext(AppContext);

  const {getToken} = useAuth();

  const fetchJobs = async () => {
    try{
      const { data } = await axios.get(backendUrl + `api/jobs/${id}`);
      if (data.success) {
        setJobsData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }    
  };

  const applyHandler = async () => {
    try{
      if(!userData) {
        toast.error('Please login to apply for the job');
        return;
      }
      if (!userData.resume) {
        navigate('/applications');
        toast.error('Please upload your resume before applying');
        return;
      }

      const token = await getToken();
      const { data } = await axios.post(backendUrl + 'api/jobs/apply', {
        jobId: jobsData._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (data.success) {
        toast.success(data.message);
        navigate('/applications');
      } else {
        toast.error(data.message);
      }
    }catch (error) {
      toast.error(error.message);
    }
  }

  React.useEffect(() => {
      fetchJobs();
  }, []);

  return jobsData ? (
    <>
      <Navbar />
      <div className='container min-h-screen mx-auto px-4 py-8 flex flex-col 2xl:px-20'>
        <div className='bg-white text-black rounded-lg p-6 flex flex-col gap-6 w-full'>
          <div className='flex md:justify-between justify-center flex-wrap gap-8 px-4 py-20 bg-sky-50 border border-sky-200 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center gap-6'>
              <img className='w-24 h-24 rounded-lg p-4 mr-4 max-md:mb-4 border bg-white ' src={jobsData.companyId.image} alt="" />  
              <div className='text-center md:text-left text-neutral-800'>
                <h1 className='text-2xl sm:text-4xl font-medium'>{jobsData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 item-center text-gray-600 mt-2'>
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} alt="" />
                    {jobsData.companyId.name}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt="" />
                    {jobsData.location}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} alt="" />
                    {jobsData.level}
                  </span>
                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(`${jobsData.salary}`)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col items-center gap-4 justify-center text-end md:text-start'>
              <button onClick={applyHandler} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Apply Now</button>
              <p className='mt-1 text-gray-500'>Posted {moment(jobsData.date).fromNow()}</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row justify-between items-start'>
          <div className='w-full lg:w-3/3 '>
            <h2 className='font-bold text-2xl mb-4 '>Job Description</h2>
            <div className='rich-text' dangerouslySetInnerHTML={{ __html: jobsData.description }}></div>
            <button onClick={applyHandler} className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-10'>Apply Now</button>
            </div>
            <div>
              {/* right section  */}
              <div className='w-full lg:w-3/3 mt-8 lg-mt-0 lg:ml-8 space-y-6'>
                <h2>More Jobs from {jobsData.companyId.name}</h2>
                {jobs.filter(job => job._id !==jobsData && job.companyId._id === jobsData.companyId._id).filter( job => true).slice(0,4).map((job, index) => <JobCard key={index} job={job} />)}
              </div>
            </div>
        </div>
        <Footer/>
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob