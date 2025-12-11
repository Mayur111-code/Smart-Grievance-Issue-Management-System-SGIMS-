import { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function ComplaintForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    photos: [],
    location: { type: "Point", coordinates: [] }
  });

  const [loading, setLoading] = useState(false);

  // Handle basic input fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle photo upload
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    setForm({
      ...form,
      photos: files
    });
  };

  // Auto Detect Location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location access not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;

      setForm({
        ...form,
        location: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      });

      toast.success("Location captured!");
    });
  };

  // Submit Complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare form data for backend
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("priority", form.priority);
      data.append("location", JSON.stringify(form.location));

      form.photos.forEach((file) => {
        data.append("photos", file);
      });

      const res = await API.post("/complaints", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Complaint submitted successfully!");

      setTimeout(() => {
        window.location.href = "/my-complaints";
      }, 1200);

    } catch (error) {
      toast.error("Failed to submit complaint");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md border w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-[#003366] mb-5">
          Submit a Complaint
        </h1>

        <label className="font-semibold">Title</label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <label className="font-semibold">Description</label>
        <textarea
          name="description"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        ></textarea>

        <label className="font-semibold">Category</label>
        <select
          name="category"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        >
          <option value="">Select category</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Road">Road</option>
          <option value="Drainage">Drainage</option>
        </select>

        <label className="font-semibold">Priority</label>
        <select
          name="priority"
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        >
          <option value="">Select priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label className="font-semibold">Upload Photos</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border p-2 w-full mb-3"
        />

        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded mb-3"
          onClick={detectLocation}
        >
          Capture Location
        </button>

        <button
          disabled={loading}
          className="w-full bg-[#003366] text-white py-2 rounded mt-3 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
}
