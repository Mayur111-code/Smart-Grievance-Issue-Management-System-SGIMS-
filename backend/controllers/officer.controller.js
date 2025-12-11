const Complaint = require("../models/Complaint");

// Officer Dashboard: Get all assigned OR department complaints
exports.getOfficerComplaints = async (req, res) => {
  try {
    const officerId = req.user._id;
    const officerDept = req.user.department;

    if (!officerDept)
      return res.status(400).json({ message: "Officer department missing" });

    const complaints = await Complaint.find({
      $or: [
        { assignedTo: officerId },      // ✔ Admin assigned
        { department: officerDept }     // ✔ Same department
      ]
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Officer: Get a single complaint
exports.getSingleOfficerComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    res.json(complaint);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Officer: Update status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { status } = req.body;

    const validStatus = ["In Progress", "Resolved"];
    if (!validStatus.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );

    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    res.json({ message: "Status updated", complaint });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
