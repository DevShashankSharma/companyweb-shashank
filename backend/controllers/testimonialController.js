const Testimonial = require('../models/Testimonial');

// Create testimonial
const createTestimonial = async (req, res) => {
    try {
        const { name, quote, role } = req.body;
        if (!name || !quote || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const testimonial = new Testimonial({
            name,
            quote,
            role  
        });
        await testimonial.save();
        res.status(201).json({ success: true, message: "Testimonial created!" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Fetch all testimonials
const getAllTestimonials = async (req, res) => { 
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json({ testimonials });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update testimonial
const updateTestimonial = async (req, res) => {
    try {
        const { name, quote, role } = req.body;
        if (!name || !quote || !role) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const updated = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { name, quote, role },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }
        res.status(200).json({ success: true, message: "Testimonial updated!" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// Delete testimonial
const deleteTestimonial = async (req, res) => {
    try {
        const deleted = await Testimonial.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: "Testimonial not found" });
        }
        res.status(200).json({ success: true, message: "Testimonial deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = {
    createTestimonial,
    getAllTestimonials,
    updateTestimonial,
    deleteTestimonial
};
