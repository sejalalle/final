const emailjs = require('emailjs-com'); // Use emailjs-com

const sendApprovalEmail = async (visitor) => {
    try {
        const templateParams = {
            to_email: visitor.contactEmail,
            to_name: visitor.contactPerson,
            visitor_name: visitor.name,
            visitor_purpose: visitor.purpose,
            visitor_date: visitor.date,
            visitor_time: visitor.timeIn,
            visitor_department: visitor.department,
            visitor_srNo: visitor.srNo, // Added srNo
            approval_link: `${process.env.FRONTEND_URL}/approve-visitor/${visitor.srNo}`,
            rejection_link: `${process.env.FRONTEND_URL}/reject-visitor/${visitor.srNo}`
        };

        // Initialize the emailjs server
        const server = emailjs.server.connect({
            user: process.env.EMAILJS_USER, // Your EmailJS user ID
            password: process.env.EMAILJS_PASS, // Your EmailJS password or API key
            host: 'allesejal@gmail.com', // Replace with your SMTP host
            ssl: true // Use SSL
        });

        // Send the email
        const response = await server.send({
            text: `Visitor Approval Request\n\nVisitor Name: ${visitor.name}\nPurpose: ${visitor.purpose}\nDepartment: ${visitor.department}\nApproval Link: ${templateParams.approval_link}\nRejection Link: ${templateParams.rejection_link}`,
            from: process.env.EMAILJS_FROM_EMAIL, // Sender email
            to: visitor.contactEmail, // Recipient email
            subject: 'Visitor Approval Request',
            attachment: [
                { data: `<html>${JSON.stringify(templateParams)}</html>`, alternative: true } // HTML email content
            ]
        });

        return response.status === 200;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = { sendApprovalEmail }; // Export the function