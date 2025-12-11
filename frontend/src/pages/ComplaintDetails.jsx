import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  ArrowLeft, 
  MapPin, 
  Camera, 
  AlertTriangle, 
  Calendar,
  Clock,
  Tag,
  User,
  CheckCircle,
  Loader2,
  Shield,
  FileText,
  Navigation,
  ExternalLink
} from "lucide-react";

export default function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/complaints/${id}`);
      setComplaint(res.data);
    } catch (err) {
      toast.error("Failed to load complaint details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
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

  const hasLocation =
    complaint?.location &&
    complaint.location.coordinates &&
    complaint.location.coordinates.length === 2;

  const lat = hasLocation ? complaint.location.coordinates[1] : null;
  const lng = hasLocation ? complaint.location.coordinates[0] : null;

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
            <p className="text-gray-600 mb-6">The complaint you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate("/my-complaints")}
              className="bg-gradient-to-r from-[#003366] to-[#004080] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              View All Complaints
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
            <span>Back to My Complaints</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#003366]">
                Complaint Details
              </h1>
              <p className="text-gray-600 mt-1">Complaint ID: {complaint._id?.slice(-8)}</p>
            </div>
            
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border mt-4 md:mt-0 ${getStatusColor(complaint.status)}`}>
              {getStatusIcon(complaint.status)}
              <span className="font-semibold capitalize">{complaint.status}</span>
            </div>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full mt-3"></div>
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
                    <p className="text-gray-600 text-sm">Filed by {complaint.user?.name || "User"}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full border ${getPriorityColor(complaint.priority)}`}>
                  <span className="font-semibold capitalize">{complaint.priority} Priority</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
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
                    <Tag className="w-4 h-4 text-blue-600" />
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
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Last Updated</span>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {new Date(complaint.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-800 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Location
                </h3>
                {hasLocation && (
                  <a
                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {!hasLocation ? (
                <div className="bg-gray-50 p-6 rounded-lg border text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Location data not available</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Navigation className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Coordinates</p>
                        <p className="font-mono text-gray-800">{lat.toFixed(6)}, {lng.toFixed(6)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-xl overflow-hidden">
                    <iframe
                      title="complaint-location"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=15`}
                    ></iframe>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Photos & Status */}
          <div className="space-y-6">
            {/* Status Timeline */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-600" />
                Status Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Complaint Filed</p>
                    <p className="text-sm text-gray-500">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Status: {complaint.status}</p>
                    <p className="text-sm text-gray-500">Last updated {new Date(complaint.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photos Section */}
            {complaint.photos && complaint.photos.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-800 flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-blue-600" />
                    Photos ({complaint.photos.length})
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {complaint.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Complaint evidence ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border group-hover:opacity-90 transition-opacity cursor-pointer"
                        onClick={() => window.open(photo, '_blank')}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Support Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-bold text-gray-800">Need Help?</h3>
                  <p className="text-sm text-gray-600">Contact support for this complaint</p>
                </div>
              </div>
              <button
                onClick={() => navigate("/support")}
                className="w-full bg-white text-blue-600 hover:bg-blue-50 border border-blue-300 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <span>Contact Support</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Complaint ID: {complaint._id} • सार्वजनिक शिकायत पोर्टल
          </p>
        </div>
      </div>
    </div>
  );
}