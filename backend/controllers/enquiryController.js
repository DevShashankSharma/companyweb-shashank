const Enquiry = require("../models/Enquiry.js"); // Assuming you have an Enquiry schema
const User = require("../models/User.js"); // Assuming you have a User schema
const Admin = require("../models/Admin.js"); // Assuming you have an Admin schema

// Create new enquiry
const createEnquiry = async (req, res) => {
    try {
        const { name, email, service, subject, message, userId } = req.body;

        if (!name || !email || !subject || !message || !userId) {
            return res.status(400).json({ success: false, message: "Required fields missing" });
        }

        const newEnquiry = new Enquiry({
            name,
            email,
            service,
            subject,
            message,
            userId
        });

        await newEnquiry.save();

        res.status(201).json({ success: true, message: "Enquiry created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating enquiry" });
    }
};

// Fetch enquiries (admin sees all, user sees their own)
const getEnquiries = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        let enquiries;
        const admin = await Admin.findById(userId);
        if (!admin) {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }
            enquiries = await Enquiry.find({ userId }).sort({ createdAt: -1 });
        } else {
            enquiries = await Enquiry.find().sort({ createdAt: -1 });
        } 
        res.json(enquiries);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching enquiries", error });
    }
};

module.exports = {
    createEnquiry,
    getEnquiries
};
