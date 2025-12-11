const Complaint = require("../models/Complaint");
const User = require("../models/User");

// =========================
// GET ALL COMPLAINTS
// =========================
exports.getAllComplaints = async (req, res) => {
  try {
    const { department, status, priority } = req.query;
    let filter = {};

    if (department) filter.department = department;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const complaints = await Complaint.find(filter)
      .populate("user", "name email")
      .populate("assignedTo", "name email");

    res.json(complaints);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================
// GET A SINGLE COMPLAINT BY ID
// =========================
exports.getComplaintAdmin = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email")
      .populate("assignedTo", "name email");

    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// =========================
// ASSIGN COMPLAINT
// =========================
exports.assignComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { officerId } = req.body; // FRONTEND SE YAHI AA RAHA HAI

    const officer = await User.findById(officerId);

    if (!officer || officer.role !== "department") {
      return res.status(400).json({ message: "Invalid officer ID" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        assignedTo: officerId,
        status: "In Progress"
      },
      { new: true }
    );

    res.json({
      message: "Complaint assigned successfully",
      complaint
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================
// UPDATE STATUS
// =========================
exports.updateStatusAdmin = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { status } = req.body;

    const validStatus = ["Pending", "In Progress", "Resolved"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );

    res.json({
      message: "Status updated",
      complaint
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================
// GET ALL OFFICERS
// =========================
exports.getAllOfficers = async (req, res) => {
  try {
    const officers = await User.find({ role: "department" });
    res.json(officers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
