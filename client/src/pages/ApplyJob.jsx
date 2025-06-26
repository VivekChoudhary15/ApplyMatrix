/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import {assets, jobsData} from '../assets/assets'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import kconvert from 'k-convert';

const ApplyJob = () => {
  const { id } = useParams();
  const [jobsData, setJobsData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchJobs = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length > 0) {
      setJobsData(data[0]);
      console.log(data[0]);
    } else {
      setJobsData(null);
    }
  };

  React.useEffect(() => {
    if (jobs.length > 0) {
      fetchJobs();
    }
  }, [id, jobs]);

  return jobsData ? (
    <>
      <Navbar />
      <div>
        <div>
          <div>
            <div>
              <img src={jobsData.companyId.image} alt="" />  
              <div>
                <h1>{jobsData.title}</h1>
                <div>
                  <span>
                    <img src={assets.suitcase_icon} alt="" />
                    {jobsData.companyId.name}
                  </span>
                  <span>
                    <img src={assets.location_icon} alt="" />
                    {jobsData.location}
                  </span>
                  <span>
                    <img src={assets.person_icon} alt="" />
                    {jobsData.level}
                  </span>
                  <span>
                    <img src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(`${jobsData.salary}`)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob