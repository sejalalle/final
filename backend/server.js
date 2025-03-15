const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Import routes
const authRoutes = require('./routes/authRoutes');
const visitorRoutes = require('./routes/visitorRoutes');

// Connect to MongoDB
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://sejalalle:sejal%40v316@cluster1.o0o8t.mongodb.net/parksonspackaging?retryWrites=true&w=majority&appName=Cluster1';
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected...'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
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
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
require('./config/passport');

// Configure Nodemailer transporter for sending notifications
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send notification email to admin
const sendNotificationEmail = async (visitor, action) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // This will send to your email
    subject: `Visitor ${action}: ${visitor.visitorName}`,
    html: `
      <h2>Visitor ${action}</h2>
      <p>The visitor <strong>${visitor.visitorName}</strong> has been <strong>${action}</strong>.</p>
      <p><strong>Purpose:</strong> ${visitor.purpose}</p>
      <p><strong>Department:</strong> ${visitor.department}</p>
      <p><strong>Date:</strong> ${new Date(visitor.date).toLocaleDateString()}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent for ${action} action.`);
    return true;
  } catch (error) {
    console.error('Error sending notification email:', error);
    return false;
  }
};

// Import models
const Visitor = require('./models/Visitor');

// Mount routes
app.use("/api/auth", require("./routes/authRoutes")); // Ensure authRoutes is properly set up
app.use("/api/users", require("./routes/userRoutes")); // Ensure userRoutes is properly set up
app.use("/api/visitors", require("./routes/visitorRoutes")); // Ensure visitorRoutes is properly set up
app.use("/api/orders", require("./routes/orderRoutes")); // ✅ Ensured order routes are correctly imported

// Root route for visitor counter
app.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.findOneAndUpdate(
      { name: 'localhost' },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    res.send(`Counter: ${visitors.count}`);
    console.log(`Visitor arrived: ${visitors.count}`);
  } catch (error) {
    console.error('❌ Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 404 Route Handling (Catch-all)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

module.exports = app;