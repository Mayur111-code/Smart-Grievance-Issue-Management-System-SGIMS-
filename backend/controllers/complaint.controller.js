const Complaint = require("../models/Complaint");

// Create complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description, priority, location, department } = req.body;

    // Cloudinary image URLs
    const photoUrls = req.files?.map((file) => file.path) || [];

    const complaint = new Complaint({
      user: req.user?._id || null,
      title,
      category,
      description,
      priority: priority || "Low",
      photos: photoUrls,

      // FIX: department should default to category
      department: department || category,  

      location: location || { 
        type: "Point", 
        coordinates: [0, 0] 
      }
    });

    await complaint.save();

    res.status(201).json({
      message: "Complaint submitted successfully!",
      complaint
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single complaint
exports.getComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate("user", "name email phone");

    if (!complaint) return res.status(404).json({ message: "Complaint not found" });

    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// List my complaints
exports.listMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
