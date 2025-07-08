// routes/user.routes.js

import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// POST /api/users
router.post('/', async (req, res) => {
  const { email, name, resume, image } = req.body;

  try {
    // Check if user already exists by email
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({ email, name, resume, image });
      console.log("✅ User created:", user);
    } else {
      console.log("ℹ️ User already exists:", user);
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("❌ User creation failed:", err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

export default router;
