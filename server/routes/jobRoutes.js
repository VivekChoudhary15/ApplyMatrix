import express from 'express';
import { getJobs, getJobById } from '../controllers/jobController.js';

const router = express.Router();

//Routes to get all the jobs
router.get('/', getJobs)


// Routes to get a single job by ID
router.get('/:id', getJobById);

export default router;