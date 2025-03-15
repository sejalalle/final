// approvalRoutes.js
import express from 'express';
import { db } from './firebase'; // Assuming Firebase, adjust as needed
import nodemailer from 'nodemailer'; // For sending notification emails

const router = express.Router();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Approval endpoint
router.get('/approve-visitor/:id', async (req, res) => {
  try {
    const visitorId = req.params.id;
    
    // Update visitor status in database
    await db.collection('visitors').doc(visitorId).update({
      status: 'approved',
      approvedAt: new Date()
    });
    
    // Fetch visitor data to include in notification
    const visitorDoc = await db.collection('visitors').doc(visitorId).get();
    const visitorData = visitorDoc.data();
    
    // Send notification email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: visitorData.adminEmail, // The email of the person who sent the approval request
      subject: `Visitor Approval Notification - ${visitorData.name}`,
      html: `
        <h2>Visitor Approval Notification</h2>
        <p>The following visitor has been <strong>approved</strong>:</p>
        <ul>
          <li>Name: ${visitorData.name}</li>
          <li>Purpose: ${visitorData.purpose}</li>
          <li>Date: ${visitorData.date}</li>
          <li>Time: ${visitorData.time}</li>
          <li>Department: ${visitorData.department}</li>
        </ul>
        <p>Approved by: ${visitorData.contactPerson}</p>
      `
    });
    
    // Render success page or redirect
    res.render('approval-success', { visitor: visitorData });
  } catch (error) {
    console.error('Error processing approval:', error);
    res.status(500).send('Error processing approval');
  }
});

// Rejection endpoint (similar to approval)
router.get('/reject-visitor/:id', async (req, res) => {
  try {
    const visitorId = req.params.id;
    
    // Update visitor status in database
    await db.collection('visitors').doc(visitorId).update({
      status: 'rejected',
      rejectedAt: new Date()
    });
    
    // Fetch visitor data
    const visitorDoc = await db.collection('visitors').doc(visitorId).get();
    const visitorData = visitorDoc.data();
    
    // Send notification email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: visitorData.adminEmail,
      subject: `Visitor Rejection Notification - ${visitorData.name}`,
      html: `
        <h2>Visitor Rejection Notification</h2>
        <p>The following visitor has been <strong>rejected</strong>:</p>
        <ul>
          <li>Name: ${visitorData.name}</li>
          <li>Purpose: ${visitorData.purpose}</li>
          <li>Date: ${visitorData.date}</li>
          <li>Time: ${visitorData.time}</li>
          <li>Department: ${visitorData.department}</li>
        </ul>
        <p>Rejected by: ${visitorData.contactPerson}</p>
      `
    });
    
    // Render rejection page or redirect
    res.render('rejection-success', { visitor: visitorData });
  } catch (error) {
    console.error('Error processing rejection:', error);
    res.status(500).send('Error processing rejection');
  }
});

export default router;