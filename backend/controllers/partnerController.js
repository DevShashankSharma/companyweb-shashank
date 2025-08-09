const Partner = require("../models/Partner.js");

// Create Partner
const createPartner = async (req, res) => {
    try {
        const { category, image, name } = req.body;

        if (!category || !name || !image) {
            return res.status(400).json({ success: false, message: "Category, name, and image are required" });
        }

        const partner = new Partner({ category, image, name });
        await partner.save();

        res.status(201).json({ success: true, message: "Partner created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating partner", error: error.message });
    }
};

// Get All Partners
const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find().sort({ createdAt: -1 });
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({ message: "Error fetching partners", error: error.message });
    }
}; 

// Update Partner
const updatePartner = async (req, res) => {
    try {
        const { category, image, name } = req.body;

        if (!category || !name || !image) {
            return res.status(400).json({ success: false, message: "Category, name, and image are required" });
        }

        const updatedPartner = await Partner.findByIdAndUpdate(
            req.params.id,
            { category, image, name },
            { new: true, runValidators: true }
        );

        if (!updatedPartner) return res.status(404).json({ success: false, message: "Partner not found" });

        res.status(200).json({ success: true, message: "Partner updated successfully"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating partner", error: error.message });
    }
};

// Delete Partner
const deletePartner = async (req, res) => {
    try {
        const deletedPartner = await Partner.findByIdAndDelete(req.params.id);
        if (!deletedPartner) return res.status(404).json({ success: false, message: "Partner not found" });

        res.status(200).json({ success: true, message: "Partner deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting partner", error: error.message });
    }
};

module.exports = {
    createPartner,
    getAllPartners, 
    updatePartner,
    deletePartner
};
