// Register a new company
import Company from '../models/Company.js';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from '../utils/generateToken.js';
import Job from '../models/Job.js';

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
            image: imageUpload.secure_url
        });

        res.json({
            success: true,
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
    const {email, password} = req.body;

    try {
        const company = await Company.findOne({ email });

        if (company && await bcrypt.compareSync(password, company.password)) {
            res.json({
                success: true,
                message: 'Login successful',
                company: {
                    _id: company._id,
                    name: company.name,
                    email: company.email,
                    image: company.image
                },
                token: generateToken(company._id)
            });
        }else{
            res.json({
                success: false,
                message: 'Invalid email or password'
            })
        }

    } catch (error) {
        res.json({
            success: false,
            message: 'Server error',
            error: error.message
        })
    }
};

// Get company data
export const getCompanyData = async (req, res) => {
    try{
        const company = req.company;
        res.json({
            success: true,
            company
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Error fetching company data',
            error: error.message
        });
    }
};

// Post a new Job
export const postJob = async (req, res) => {
    const { title, description, location, salary, level, category } = req.body;

    const companyId = req.company._id;
    // console.log('Company ID:', companyId, {title, description, location, salary});

    try{
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date: Date.now(),
            isVisible: true,
            level,
            category
        })

        await newJob.save();
        res.json({
            success: true,
            message: 'Job posted successfully',
            job: newJob
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};

// Get company job applicants
export const getJobApplicants = async (req, res) => {

};

// Get company posted jobs
export const getCompanyJobs = async (req, res) => {
    try{
        const companyId = req.company._id;

        // Find jobs posted by the company
        const jobs = await Job.find({ companyId })

        const jobsData = await Promise.all(jobs.map(async (job) => {
            const applicants = await Job.find({ jobId: job._id });

            return {...job.toObject(), applicants: applicants.length};
        }));

        res.json({
            success: true,
            jobsData
        });

    } catch (error) {
        res.json({
            success: false,
            message:error.message
        })
    }
};

// change job application status
export const changeJobApplicationStatus = async (req, res) => {
    
};

// change job visibility
export const changeJobVisibility = async (req, res) => {
    try{
        const {id} = req.body;

        const companyId = req.company._id;

        const job = await Job.findOne({ _id: id })

        if (companyId.toString() === job.companyId.toString()) {
            job.visible = !job.visible;
        }

        await job.save();

        res.json({
            success: true,
            job
        })
    }catch(error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};