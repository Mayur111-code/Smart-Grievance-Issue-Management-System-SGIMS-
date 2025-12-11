import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff,
  Building2,
  Shield,
  User
} from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);

      if (!res?.data?.token || !res?.data?.user) {
        toast.error("Invalid server response");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name || "");

      toast.success("Login Successful!");

      const role = res.data.user.role;
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "department") navigate("/officer/dashboard");
      else navigate("/");
    } catch (error) {
      toast.error("Invalid Credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl">
        
        {/* LEFT SIDE - GOVERNMENT BRANDING */}
        <div className="md:w-2/5 bg-gradient-to-b from-[#003366] to-[#004080] text-white p-8 md:p-12 flex flex-col justify-between">
          <div>
            {/* Government Logo/Emblem */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-white p-3 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-green-600 rounded-full relative">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">सार्वजनिक शिकायत पोर्टल</h1>
                <p className="text-sm md:text-base text-blue-200 mt-1">Government of India</p>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-6 mt-8">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure & Confidential</h3>
                  <p className="text-sm text-blue-200">Your complaints are protected</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Direct to Departments</h3>
                  <p className="text-sm text-blue-200">Complaints reach concerned authorities</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-2 rounded-lg">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Track Status</h3>
                  <p className="text-sm text-blue-200">Real-time tracking of your grievances</p>
                </div>
              </div>
            </div>
          </div>

          {/* Indian Flag Stripes */}
          <div className="mt-8">
            <div className="h-2 rounded-full overflow-hidden flex">
              <div className="flex-1 bg-[#FF9933]"></div>
              <div className="flex-1 bg-white"></div>
              <div className="flex-1 bg-[#138808]"></div>
            </div>
            <p className="text-center text-xs text-blue-200 mt-2">
              Official Grievance Redressal System
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="md:w-3/5 bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your official email"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#003366] to-[#004080] hover:from-[#002244] hover:to-[#003366] hover:shadow-lg"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              {/* Role Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center mb-3">Login as:</p>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Citizen</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Department Officer</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Admin</span>
                  </div>
                </div>
              </div>

              {/* Registration Link */}
              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}