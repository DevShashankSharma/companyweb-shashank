const express = require("express");
const { createEnquiry, getEnquiries } = require("../controllers/enquiryController.js");

const router = express.Router();

// POST: Create new enquiry
router.post("/", createEnquiry);

// GET: Fetch enquiries based on user role
router.get("/", getEnquiries);

module.exports = router;
