const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  getOfficerComplaints,
  getSingleOfficerComplaint,
  updateComplaintStatus
} = require("../controllers/officer.controller");

// Officer: Get all complaints (assigned OR department)
router.get("/complaints", protect, getOfficerComplaints);

// Officer: Get single complaint
router.get("/complaints/:id", protect, getSingleOfficerComplaint);

// Officer: Update complaint status
router.put("/complaints/:id/status", protect, updateComplaintStatus);

module.exports = router;
