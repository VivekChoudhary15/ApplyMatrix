import React, { useEffect } from 'react'
import { useContext } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const ManageJobs = () => {

  const navigate = useNavigate()

  const [jobs, setJobs] = React.useState(false);

  const { backendUrl, companyToken } = useContext(AppContext);

  // Fn to fetch company job Application data
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + 'api/company/list-jobs', {
        headers: {
          token: companyToken
        }
      });
      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return (
    <div className="p-4 relative min-h-[70vh]">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-[900px] w-full border border-gray-300 rounded-xl bg-white">
            <thead>
              <tr className="bg-white">
                <th className="py-4 px-8 font-semibold text-left w-12">#</th>
                <th className="py-4 px-8 font-semibold text-left w-64">Job Title</th>
                <th className="py-4 px-8 font-semibold text-left w-48 max-sm:hidden">Date</th>
                <th className="py-4 px-8 font-semibold text-left w-48 max-sm:hidden">Location</th>
                <th className="py-4 px-8 font-semibold text-center w-40">Applicants</th>
                <th className="py-4 px-8 font-semibold text-left w-32">Visible</th>
              </tr>
            </thead>
            <tbody>
              {manageJobsData.map((job, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-8">{index + 1}</td>
                  <td className="py-4 px-8">{job.title}</td>
                  <td className="py-4 px-8 max-sm:hidden">{moment(job.date).format('DD MMM, YYYY')}</td>
                  <td className="py-4 px-8 max-sm:hidden">{job.location}</td>
                  <td className="py-4 px-8 text-center">{job.applicants}</td>
                  <td className="py-4 px-8">
                    <input 
                      type="checkbox"
                      checked={job.visible}
                      readOnly
                      className="accent-blue-500 w-5 h-5 cursor-pointer ml-4"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-6">
            <button onClick={() => navigate('/dashboard/add-jobs')} className="bg-black text-white px-8 py-2 rounded-md font-medium hover:bg-gray-900 transition shadow-lg cursor-pointer">
              Add new job
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageJobs