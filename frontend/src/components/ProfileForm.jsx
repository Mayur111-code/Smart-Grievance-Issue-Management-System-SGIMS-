import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Shield,
  Save,
  Loader2
} from "lucide-react";

export default function ProfileForm({ role }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: ""
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/auth/me");
      setForm(res.data);
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setUpdating(true);
      await API.put("/auth/update", form);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-blue-100 rounded-2xl">
              <User className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#003366]">
            {role} Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Update your personal information
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full mx-auto mt-3"></div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          {/* Name Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Full Name
            </label>
            <input
              name="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Email Field (Read-only) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email Address
            </label>
            <input
              name="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
              value={form.email}
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              Phone Number
            </label>
            <input
              name="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          {/* Department Field (Only for Officers) */}
          {role === "Officer" && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                Department
              </label>
              <input
                name="department"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Enter your department"
                value={form.department}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Role Badge */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Role
            </label>
            <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="font-semibold text-blue-700 capitalize">{role}</span>
            </div>
          </div>

          {/* Update Button */}
          <button
            onClick={updateProfile}
            disabled={updating}
            className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
              updating
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#003366] to-[#004080] hover:from-[#002244] hover:to-[#003366] hover:shadow-lg"
            }`}
          >
            {updating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                <span>Update Profile</span>
              </>
            )}
          </button>

          {/* Info Note */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              सार्वजनिक शिकायत पोर्टल • Government of India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}