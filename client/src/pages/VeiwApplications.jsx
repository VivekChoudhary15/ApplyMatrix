import React, { useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const VeiwApplications = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-xl shadow bg-white">
          <thead>
            <tr className="bg-white">
              <th className="py-4 px-4 font-semibold text-left">#</th>
              <th className="py-4 px-4 font-semibold text-left">User name</th>
              <th className="py-4 px-4 font-semibold text-left">Job Title</th>
              <th className="py-4 px-4 font-semibold text-left">Location</th>
              <th className="py-4 px-4 font-semibold text-left">Resume</th>
              <th className="py-4 px-4 font-semibold text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {viewApplicationsPageData.map((application, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img src={application.imgSrc} alt="" className="w-9 h-9 rounded-full object-cover" />
                    <span className="font-medium">{application.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4">{application.jobTitle}</td>
                <td className="py-4 px-4">{application.location}</td>
                <td className="py-4 px-4">
                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-200 transition cursor-pointer"
                  >
                    Resume
                    <img src={assets.resume_download_icon} alt="" className="w-4 h-4 ml-2 cursor-pointer" />
                  </a>
                </td>
                <td className="py-4 px-4 relative">
                  <button
                    className="px-2 py-1 rounded hover:bg-gray-100 transition"
                    onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                  >
                    <span className="text-2xl font-bold text-gray-500">...</span>
                  </button>
                  {openDropdown === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setOpenDropdown(null)}
                      >
                        Accept
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50 cursor-pointer"
                        onClick={() => setOpenDropdown(null)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VeiwApplications