const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin.middleware");

const {
  getAllComplaints,
  assignComplaint,
  updateStatusAdmin,
  getComplaintAdmin,
  getAllOfficers
} = require("../controllers/admin.controller");

// Get all officers
router.get("/officers", protect, adminOnly, getAllOfficers);
// Get all complaints
router.get("/complaints", protect, adminOnly, getAllComplaints);

// Get single complaint by ID
router.get("/complaints/:id", protect, adminOnly, getComplaintAdmin);

// Assign complaint to officer
router.put("/complaints/:id/assign", protect, adminOnly, assignComplaint);

// Update complaint status by admin
router.put("/complaints/:id/status", protect, adminOnly, updateStatusAdmin);



module.exports = router;
