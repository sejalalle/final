const express = require('express');
<<<<<<< HEAD
const bcrypt = require('bcryptjs'); // Updated to bcryptjs
=======
const bcrypt = require('bcrypt');
>>>>>>> dc6d9be (More things fixed)
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Sign-Up Route
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

<<<<<<< HEAD
    // Hash password using bcryptjs
    const hashedPassword = await bcrypt.hashSync(password, 10); // Use hashSync for synchronous hashing
=======
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
>>>>>>> dc6d9be (More things fixed)

    // Create new user
    const user = new User({ fullName, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error('Sign-up error:', error);
    res.status(500).json({ success: false, message: 'Sign-up failed' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

<<<<<<< HEAD
    // Validate password using bcryptjs
    const isPasswordValid = await bcrypt.compareSync(password, user.password); // Use compareSync for synchronous comparison
=======
    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
>>>>>>> dc6d9be (More things fixed)
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '1h',
    });

    res.json({ success: true, token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;