/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
// import { Quill } from 'react-quill'

const AddJobs = () => {

  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("Programming")
  const [level, setLevel] = useState("Entry Level")
  const [salary, setSalary] = useState(0)

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  return (
    <form className="max-w-2xl px-6 pt-6" action="">
      <div className="mb-5">
        <p className="mb-2 font-medium">Job Title</p>
        <input
          type="text"
          placeholder='Type here'
          onChange={e => setTitle(e.target.value)}
          value={title}
          required
          className="w-full border border-gray-400 rounded-md px-3 py-2 outline-none focus:border-black transition"
        />
      </div>

      <div className="mb-5">
        <p className="mb-2 font-medium">Job Description</p>
        <div
          ref={editorRef}
          className="min-h-[90px] border border-gray-400 rounded-md px-3 py-2 bg-white"
        ></div>
      </div>

      <div className="flex flex-wrap gap-4 mb-5">
        <div className="flex-1 min-w-[180px]">
          <p className="mb-2 font-medium">Job Category</p>
          <select
            onChange={e => setCategory(e.target.value)}
            value={category}
            className="w-full border border-gray-400 rounded-md px-3 py-2 outline-none focus:border-black transition bg-white"
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <p className="mb-2 font-medium">Job Location</p>
          <select
            onChange={e => setLocation(e.target.value)}
            value={location}
            className="w-full border border-gray-400 rounded-md px-3 py-2 outline-none focus:border-black transition bg-white"
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[180px]">
          <p className="mb-2 font-medium">Job Level</p>
          <select
            onChange={e => setLevel(e.target.value)}
            value={level}
            className="w-full border border-gray-400 rounded-md px-3 py-2 outline-none focus:border-black transition bg-white"
          >
            <option value="Entry Level">Entry Level</option>
            <option value="Mid Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>
      </div>

      <div className="mb-7">
        <p className="mb-2 font-medium">Salary</p>
        <input
          type="number"
          placeholder='0'
          onChange={e => setSalary(e.target.value)}
          value={salary}
          required
          className="w-32 border border-gray-400 rounded-md px-3 py-2 outline-none focus:border-black transition"
        />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-7 py-2 rounded-md font-medium hover:bg-gray-900 transition"
      >
        ADD
      </button>
    </form>
  )
}

export default AddJobs