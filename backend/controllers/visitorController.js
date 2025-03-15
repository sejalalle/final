const Visitor = require('../models/Visitor');
const { sendApprovalEmail } = require('../utils/email');

// Helper function to convert "HH:mm" to a Date object
const convertTimeToDate = (timeString) => {
    if (!timeString) return new Date();
    
    const today = new Date();
    const [hours, minutes] = timeString.split(":");
    
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
};

// Get all visitors
const getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.find();
        res.status(200).json({ success: true, data: visitors });
    } catch (error) {
        console.error('Error fetching visitors:', error);
        res.status(500).json({ success: false, message: 'Error fetching visitors', error: error.message });
    }
};

// Add a new visitor
const addVisitor = async (req, res) => {
    try {
        const { srNo, visitorName, contactEmail, phone, purpose, department, contactPerson, idNumber, checkInTime, checkOutTime } = req.body;

        // Convert checkInTime if it's in "HH:mm" format
        const formattedCheckInTime = checkInTime && typeof checkInTime === "string" ? convertTimeToDate(checkInTime) : checkInTime;
        const formattedCheckOutTime = checkOutTime && typeof checkOutTime === "string" ? convertTimeToDate(checkOutTime) : checkOutTime;

        // Create new visitor
        const newVisitor = new Visitor({
            srNo,
            visitorName,
            contactEmail,
            phone,
            purpose,
            department,
            contactPerson,
            idNumber,
            checkInTime: formattedCheckInTime,
            checkOutTime: formattedCheckOutTime,
        });

        // Save the visitor to the database
        await newVisitor.save();

        // Send approval email
        const emailSent = await sendApprovalEmail(newVisitor);

        if (!emailSent) {
            console.error('Failed to send approval email');
        }

        res.status(201).json({ success: true, message: "Visitor added successfully", data: newVisitor });
    } catch (error) {
        console.error('Error adding visitor:', error);
        res.status(500).json({ success: false, message: 'Error adding visitor', error: error.message });
    }
};

// Get a specific visitor by srNo
const getVisitorBySrNo = async (req, res) => {
    try {
        const visitor = await Visitor.findOne({ srNo: req.params.srNo });
        if (!visitor) {
            return res.status(404).json({ success: false, message: 'Visitor not found' });
        }
        res.status(200).json({ success: true, data: visitor });
    } catch (error) {
        console.error('Error fetching visitor:', error);
        res.status(500).json({ success: false, message: 'Error fetching visitor', error: error.message });
    }
};

// Update visitor details by srNo
const updateVisitor = async (req, res) => {
    try {
        const { checkInTime, checkOutTime, ...otherFields } = req.body;

        // Convert checkInTime and checkOutTime if they are in "HH:mm" format
        const formattedCheckInTime = checkInTime && typeof checkInTime === "string" ? convertTimeToDate(checkInTime) : checkInTime;
        const formattedCheckOutTime = checkOutTime && typeof checkOutTime === "string" ? convertTimeToDate(checkOutTime) : checkOutTime;

        const updatedVisitor = await Visitor.findOneAndUpdate(
            { srNo: req.params.srNo },
            { ...otherFields, checkInTime: formattedCheckInTime, checkOutTime: formattedCheckOutTime },
            { new: true, runValidators: true }
        );

        if (!updatedVisitor) {
            return res.status(404).json({ success: false, message: 'Visitor not found' });
        }
        res.status(200).json({ success: true, message: 'Visitor updated successfully', data: updatedVisitor });
    } catch (error) {
        console.error('Error updating visitor:', error);
        res.status(500).json({ success: false, message: 'Error updating visitor', error: error.message });
    }
};

// Delete a visitor by srNo
const deleteVisitor = async (req, res) => {
    try {
        const deletedVisitor = await Visitor.findOneAndDelete({ srNo: req.params.srNo });
        if (!deletedVisitor) {
            return res.status(404).json({ success: false, message: 'Visitor not found' });
        }
        res.status(200).json({ success: true, message: 'Visitor deleted successfully' });
    } catch (error) {
        console.error('Error deleting visitor:', error);
        res.status(500).json({ success: false, message: 'Error deleting visitor', error: error.message });
    }
};

// Approve a visitor by srNo
const approveVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findOneAndUpdate(
            { srNo: req.params.srNo },
            { status: 'Approved' }, // Update the status to "Approved"
            { new: true } // Return the updated document
        );

        if (!visitor) {
            return res.status(404).json({ success: false, message: 'Visitor not found' });
        }

        res.status(200).json({ success: true, message: 'Visitor approved successfully', data: visitor });
    } catch (error) {
        console.error('Error approving visitor:', error);
        res.status(500).json({ success: false, message: 'Failed to approve visitor', error: error.message });
    }
};

// Reject a visitor by srNo
const rejectVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findOneAndUpdate(
            { srNo: req.params.srNo },
            { status: 'Rejected' }, // Update the status to "Rejected"
            { new: true } // Return the updated document
        );

        if (!visitor) {
            return res.status(404).json({ success: false, message: 'Visitor not found' });
        }

        res.status(200).json({ success: true, message: 'Visitor rejected successfully', data: visitor });
    } catch (error) {
        console.error('Error rejecting visitor:', error);
        res.status(500).json({ success: false, message: 'Failed to reject visitor', error: error.message });
    }
};

module.exports = {
    getVisitors,
    addVisitor,
    getVisitorBySrNo,
    updateVisitor,
    deleteVisitor,
    approveVisitor,
    rejectVisitor,
};