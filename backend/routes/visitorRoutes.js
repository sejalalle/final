const express = require('express');
const {
    getVisitors,
    addVisitor,
    getVisitorBySrNo,
    updateVisitor,
    deleteVisitor,
    approveVisitor,
    rejectVisitor,
} = require('../controllers/visitorController'); // Import the controller functions

const router = express.Router();

// Route to get all visitors
router.get('/', getVisitors);

// Route to add a new visitor
router.post('/', addVisitor);

// Route to get a specific visitor by srNo
router.get('/:srNo', getVisitorBySrNo);

// Route to update visitor details by srNo
router.put('/:srNo', updateVisitor);

// Route to delete a visitor by srNo
router.delete('/:srNo', deleteVisitor);

// Route to approve a visitor by srNo
router.patch('/approve/:srNo', approveVisitor);

// Route to reject a visitor by srNo
router.patch('/reject/:srNo', rejectVisitor);

module.exports = router; // Export the router