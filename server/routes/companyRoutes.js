import express from 'express'
import { registerCompany,
    loginCompany,
    getCompanyData,
    getCompanyJobs,
    postJob,
    getJobApplicants,
    changeJobApplicationStatus,
    changeJobVisibility } from '../controllers/companyController.js'
import upload from '../config/multer.js'

const router = express.Router()

// Register a new company
router.post('/register',upload.single('image'), registerCompany)

// Company Login
router.post('/login', loginCompany)

// Get company data
router.get('/company', getCompanyData);

// Post a new Job
router.post('/post-job', postJob)
// Get Applicants for a company's job
router.get('/applicants', getJobApplicants)

// get company job list
router.get('/list-jobs', getCompanyJobs)

// Change application status
router.put('/change-status', changeJobApplicationStatus)

// change application visibility
router.put('/change-visibility', changeJobVisibility)

export default router