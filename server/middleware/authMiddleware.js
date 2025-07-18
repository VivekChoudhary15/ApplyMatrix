import jwt from 'jsonwebtoken';
import Company from '../models/Company.js'
import { requireAuth } from '@clerk/express'

export const protectCompany = async (req, res, next) => {
    const token = req.headers.token

    if (!token){
       return res.json({
            success: false,
            message: 'Not authorized, login again'
       }) 
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.company = await Company.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        res.json({ message: error.message, success: false });
    }
}

// Clerk middleware for user authentication
export const protectUser = requireAuth()