// Register a new company
import Company from '../models/Company.js';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from '../utils/generateToken.js';

export const registerCompany = async (req, res) => {
    const { name, email, password } = req.body;

    const imageFile = req.file;
        
    // Validate input
    if (!name || !email || !password || !imageFile) {
        return res.status(400).json({ message: 'Name, email, password, and company logo are required' });
    }

    try {
        const companyExists = await Company.findOne({ email });
        if (companyExists) {
            return res.status(400).json({ message: 'Company with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);

        const company = await Company.create({
            name,
            email,
            password: hashedPassword,
            logo: imageUpload.secure_url
        });

        res.json({
            message: 'Company registered successfully',
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image
                },
                token: generateToken(company._id)
        });

    }catch(error){
        res.json({success: false, message: error.message});
    }
};

// Company Login
export const loginCompany = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find company by email
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Check password
        const isMatch = await company.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', company });
    } catch (error) {
        console.error('Error logging in company:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get company data
export const getCompanyData = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Find company by ID
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        res.status(200).json(company);
    } catch (error) {
        console.error('Error fetching company data:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Post a new Job
export const postJob = async (req, res) => {
    try {
        const { title, description, companyId } = req.body;

        // Validate input
        if (!title || !description || !companyId) {
            return res.status(400).json({ message: 'Title, description, and company ID are required' });
        }

        // Create new job
        const newJob = await Job.create({ title, description, company: companyId });

        res.status(201).json(newJob);
    } catch (error) {
        console.error('Error posting job:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get company job applicants
export const getJobApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find job by ID
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Get applicants for the job
        const applicants = await Applicant.find({ job: jobId });
        res.status(200).json(applicants);
    } catch (error) {
        console.error('Error fetching job applicants:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get company posted jobs
export const getCompanyJobs = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Find jobs by company ID
        const jobs = await Job.find({ company: companyId });
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching company jobs:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// change job application status
export const changeJobApplicationStatus = async (req, res) => {
    try {
        const { applicationId, status } = req.body;

        // Validate input
        if (!applicationId || !status) {
            return res.status(400).json({ message: 'Application ID and status are required' });
        }

        // Find job application by ID
        const application = await Applicant.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Update application status
        application.status = status;
        await application.save();

        res.status(200).json({ message: 'Application status updated', application });
    } catch (error) {
        console.error('Error changing job application status:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// change job visibility
export const changeJobVisibility = async (req, res) => {
    try {
        const { jobId, visibility } = req.body;

        // Validate input
        if (!jobId || typeof visibility !== 'boolean') {
            return res.status(400).json({ message: 'Job ID and visibility are required' });
        }

        // Find job by ID
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Update job visibility
        job.isVisible = visibility;
        await job.save();

        res.status(200).json({ message: 'Job visibility updated', job });
    } catch (error) {
        console.error('Error changing job visibility:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};