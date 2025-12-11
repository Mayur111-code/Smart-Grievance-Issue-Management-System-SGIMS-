const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false  // anonymous case allowed
  },

  title: {
    type: String,
    required: false
  },

  category: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  photos: [
    {
      type: String,
      required: false // image URLs or base64
    }
  ],

  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      default: [0, 0]   // longitude, latitude
    }
  },

  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Low"
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"
  },

  department: {
    type: String,
    required: false
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
   },
//   notes: [
//   {
//     text: { type: String, required: true },
//     addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     date: { type: Date, default: Date.now }
//   }
// ],

});

complaintSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Complaint", complaintSchema);
