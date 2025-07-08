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
import { protectCompany } from '../middleware/authMiddleware.js'

const router = express.Router()

// Register a new company
router.post('/register',upload.single('image'), registerCompany)

// Company Login
router.post('/login', loginCompany)

// Get company data
router.get('/company', protectCompany, getCompanyData);

// Post a new Job
router.post('/post-job', protectCompany, postJob)
// Get Applicants for a company's job

router.get('/applicants', protectCompany, getJobApplicants)

// get company job list
router.get('/list-jobs', protectCompany, getCompanyJobs);

// Change application status
router.put('/change-status', protectCompany, changeJobApplicationStatus);

// change application visibility
router.post('/change-visibility', protectCompany, changeJobVisibility);

export default router