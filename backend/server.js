const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Load environment variables
dotenv.config();

// Import database configuration
const connectDB = require('./config/db');

// Import models
const User = require('./models/User'); // Ensure you have a User model
const Visitor = require('./models/Visitor'); 

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB().catch((err) => {
  console.error('❌ Database connection failed:', err);
  process.exit(1); 
});

// Middleware
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', 
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
require('./config/passport');

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Ensure authRoutes is properly set up
app.use('/api/users', require('./routes/userRoutes')); // Ensure userRoutes is properly set up
app.use('/api/visitors', require('./routes/visitorRoutes')); // Ensure visitorRoutes is properly set up

// Root route for visitor counter
app.get('/', async (req, res) => {
  try {
    let visitors = await Visitor.findOneAndUpdate(
      { name: 'localhost' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    res.send(`Counter: ${visitors.count}`);
    console.log(`Visitor arrived: ${visitors.count}`);
  } catch (error) {
    console.error("❌ Error occurred:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 404 Route Handling (Catch-all)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;