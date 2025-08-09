const express = require("express")
const {
    createPartner,
    getAllPartners, 
    updatePartner,
    deletePartner
} = require("../controllers/partnerController");

const router = express.Router();

router.post("/", createPartner);        // Create Partner
router.get("/", getAllPartners);        // Get All Partners 
router.put("/:id", updatePartner);      // Update Partner
router.delete("/:id", deletePartner);   // Delete Partner

module.exports = router;
