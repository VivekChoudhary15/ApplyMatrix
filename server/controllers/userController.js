import User from "../models/User.js"
import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import {v2 as cloudinary} from 'cloudinary'

// Get user Data

export const getUserData = async (req, res) => {
  const userId = req.auth.userId

  try{
    
    const user = await User.findById(userId)
    if (!user){
      return res.json({
        success: false,
        message: 'User not found'
      })
    }

    res.json({
      success: true,
      message: 'User data fetched successfully',
      user
    })

  }catch(error){

    return res.json({
      success: false,
      message: 'Error fetching user data',
      error: error.message
    })

  }
}

// Apply for a job
export const applyForJob = async (req, res) => {
  const { jobId } = req.body
  const userId = req.auth.userId

  try{
    const existingApplication = await JobApplication.findOne({ userId, jobId })
    if (existingApplication) {
      return res.json({
        success: false,
        message: 'You have already applied for this job'
      })
    }
    
    const jobData = await Job.findById(jobId)
    if (!jobData) {
      return res.json({
        success: false,
        message: 'Job not found'
      })
    }

    await JobApplication.create({
      userId,
      companyId: jobData.companyId,
      jobId,
      status: "Pending",
      date: Date.now()
    })

    return res.json({
      success: true,
      message: 'Job application submitted successfully'
    })

  }catch(error){

    return res.json({
      success: false,
      message: 'Error applying for job',
      error: error.message
    })

  }
}

// Get user applied jobs
export const getUserAppliedJobs = async (req, res) => {
  try{
    const userId = req.auth.userId

    const applications = await JobApplication.find({ userId }).populate('jobId', 'title description location category level salary').populate('companyId', 'name email, image').exec()

    if (!applications || applications.length === 0) {
      return res.json({
        success: false,
        message: 'No job applications found'
      })
    }

    return res.json({
      success: true,
      message: 'Job applications fetched successfully',
      applications
    })
  }catch(error) {
    
    return res.json({
      success: false,
      message: 'Error fetching job applications',
      error: error.message
    })
  }

}

// Update user profile (resume)
export const updateUserResume = async (req, res) => {
  try{
    const userId = req.auth.userId
    const resumeFile = req.resumeFile

    const userData = await User.findById(userId)

    if (resumeFile){
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)

      userData.resume = resumeUpload.secure_url
      

    }

    await userData.save()
      return res.json({
        success: true,
        message: 'Resume updated successfully',
        user: userData
    })
      
  }catch(error){
    return res.json({
      success: false,
      message: 'Error updating resume',
      error: error.message
    })
  }
}





