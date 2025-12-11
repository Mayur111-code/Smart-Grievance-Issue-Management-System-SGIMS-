import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Loader2,
  MapPin,
  Camera,
  User,
  Calendar,
  Shield
} from "lucide-react";

export default function OfficerComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/officer/complaints/${id}`);
      setComplaint(res.data);
      setStatus(res.data.status);
    } catch {
      toast.error("Failed to load complaint");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    if (!status || status === complaint.status) {
      toast.info("Please select a different status");
      return;
    }

    try {
      setUpdating(true);
      await API.put(`/officer/complaints/${id}/status`, { status });
      toast.success("Status updated successfully!");
      fetchComplaint();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  const getStatusColor = (statusValue) => {
    switch (statusValue?.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (statusValue) => {
    switch (statusValue?.toLowerCase()) {
      case 'resolved':
        return <CheckCircle className="w-5 h-5" />;
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'in progress':
        return <Loader2 className="w-5 h-5 animate-spin" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading complaint details...</p>
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Complaint Not Found</h2>
            <p className="text-gray-600 mb-6">The complaint you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate("/officer/dashboard")}
              className="bg-gradient-to-r from-[#003366] to-[#004080] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#003366]">
                Complaint Details
              </h1>
              <p className="text-gray-600 mt-1">Officer View • ID: {complaint._id?.slice(-8)}</p>
            </div>
            
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border mt-4 md:mt-0 ${getStatusColor(complaint.status)}`}>
              {getStatusIcon(complaint.status)}
              <span className="font-semibold capitalize">{complaint.status}</span>
            </div>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaint Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{complaint.title}</h2>
                    <p className="text-gray-600 text-sm">Filed by: {complaint.user?.name || "User"}</p>
                  </div>
                </div>
                {complaint.priority === "High" && (
                  <div className="px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded-full font-medium">
                    High Priority
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Description
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Category</span>
                  </div>
                  <p className="font-semibold text-gray-800">{complaint.category}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Filed On</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">User</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {complaint.user?.name || "Anonymous"}
                  </p>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            {complaint.photos && complaint.photos.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-blue-600" />
                  Attached Photos ({complaint.photos.length})
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {complaint.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Complaint evidence ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border hover:opacity-90 transition-opacity cursor-pointer"
                        onClick={() => window.open(photo, '_blank')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Status Update */}
          <div className="space-y-6">
            {/* Status Update Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                Update Status
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Status
                  </label>
                  <div className={`flex items-center space-x-2 px-4 py-3 rounded-lg border ${getStatusColor(complaint.status)}`}>
                    {getStatusIcon(complaint.status)}
                    <span className="font-semibold capitalize">{complaint.status}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update to
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <button
                  onClick={updateStatus}
                  disabled={updating || status === complaint.status}
                  className={`w-full py-3.5 px-4 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center ${
                    updating || status === complaint.status
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#003366] to-[#004080] hover:from-[#002244] hover:to-[#003366] hover:shadow-lg"
                  }`}
                >
                  {updating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <span>Update Status</span>
                  )}
                </button>

                {status === complaint.status && (
                  <p className="text-sm text-gray-500 text-center">
                    Select a different status to update
                  </p>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-medium text-gray-800">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-medium text-gray-800">
                      {new Date(complaint.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Officer Portal • सार्वजनिक शिकायत पोर्टल • Government of India
          </p>
        </div>
      </div>
    </div>
  );
}