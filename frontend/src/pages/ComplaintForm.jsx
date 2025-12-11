import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  Camera, 
  MapPin, 
  AlertTriangle,
  FileText,
  Loader2,
  Upload,
  Tag,
  Clock
} from "lucide-react";

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
  const [locationLoading, setLocationLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setForm({
      ...form,
      photos: files
    });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location access not supported");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm({
          ...form,
          location: {
            type: "Point",
            coordinates: [longitude, latitude]
          }
        });
        toast.success("Location captured successfully!");
        setLocationLoading(false);
      },
      (error) => {
        toast.error("Failed to get location. Please enable location services.");
        setLocationLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#003366]">
            Submit Complaint
          </h1>
          <p className="text-gray-600 mt-2">
            File a public grievance with Government of India
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8"
        >
          {/* Title Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Complaint Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter complaint title (e.g., No Electricity)"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe your issue in detail"
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              required
            ></textarea>
          </div>

          {/* Category and Priority Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              >
                <option value="">Select category</option>
                <option value="Electricity">Electricity</option>
                <option value="Water">Water Supply</option>
                <option value="Road">Road & Transport</option>
                <option value="Drainage">Drainage</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Priority Level
              </label>
              <select
                name="priority"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              >
                <option value="">Select priority</option>
                <option value="Low" className="text-green-600">Low</option>
                <option value="Medium" className="text-yellow-600">Medium</option>
                <option value="High" className="text-red-600">High</option>
              </select>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <Camera className="w-4 h-4 mr-2" />
              Upload Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors inline-block"
              >
                Choose Files
              </label>
              <p className="text-sm text-gray-500 mt-2">
                {form.photos.length > 0 
                  ? `${form.photos.length} file(s) selected` 
                  : "Upload images of the issue (Max 5 files)"}
              </p>
            </div>
          </div>

          {/* Location Capture */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </label>
            <button
              type="button"
              onClick={detectLocation}
              disabled={locationLoading}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                locationLoading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
              }`}
            >
              {locationLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Capturing Location...</span>
                </>
              ) : (
                <>
                  <MapPin className="w-5 h-5" />
                  <span>Capture Current Location</span>
                </>
              )}
            </button>
            {form.location.coordinates.length > 0 && (
              <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                ✓ Location captured successfully
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#003366] to-[#004080] hover:from-[#002244] hover:to-[#003366] hover:shadow-lg"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                <span>Submit Complaint</span>
              </>
            )}
          </button>

          {/* Help Text */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <Clock className="w-4 h-4 inline-block mr-1" />
            Your complaint will be reviewed within 24-48 hours
          </div>
        </form>
      </div>
    </div>
  );
}