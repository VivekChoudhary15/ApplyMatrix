import express from 'express';
import { applyForJob, getUserAppliedJobs, getUserData, updateUserResume } from '../controllers/userController.js';
import upload from '../config/multer.js';
import { protectUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user data
router.get('/user', protectUser, getUserData)

// Apply for a job
router.post('/apply', protectUser, applyForJob)

// Get applied jobs data
router.get('/applications', protectUser, getUserAppliedJobs)

router.post('/update-resume', protectUser, upload.single('resume'), updateUserResume)

export default router;
