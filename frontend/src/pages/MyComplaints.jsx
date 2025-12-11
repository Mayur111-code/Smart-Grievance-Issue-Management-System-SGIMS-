import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  FileText,
  Loader2,
  MapPin,
  RefreshCw,
  Tag,
  Calendar
} from "lucide-react";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await API.get("/complaints/user/me/list");
      setComplaints(res.data);
    } catch (err) {
      toast.error("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'in progress':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#003366]">
                My Complaints
              </h1>
              <p className="text-gray-600 mt-2">
                Track all your submitted grievances
              </p>
            </div>
            <button
              onClick={fetchComplaints}
              disabled={loading}
              className="mt-4 md:mt-0 flex items-center space-x-2 bg-white text-blue-600 hover:bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full mt-3"></div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-800">{complaints.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-600">Resolved</p>
            <p className="text-2xl font-bold text-gray-800">
              {complaints.filter(c => c.status?.toLowerCase() === 'resolved').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-gray-800">
              {complaints.filter(c => c.status?.toLowerCase() === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 border-l-4 border-blue-400">
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-gray-800">
              {complaints.filter(c => c.status?.toLowerCase() === 'in progress').length}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading your complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="bg-white rounded-xl shadow border p-8 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No complaints found</h3>
            <p className="text-gray-500 mb-6">You haven't submitted any complaints yet.</p>
            <button
              onClick={() => window.location.href = "/complaints/new"}
              className="bg-gradient-to-r from-[#003366] to-[#004080] text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              Submit First Complaint
            </button>
          </div>
        ) : (
          /* Complaints List */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {complaints.map((c) => (
              <div
                key={c._id}
                onClick={() => (window.location.href = `/complaint/${c._id}`)}
                className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 line-clamp-1">
                        {c.title}
                      </h2>
                    </div>
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(c.status)}`}>
                      {getStatusIcon(c.status)}
                      <span className="text-sm font-medium capitalize">{c.status}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {c.description}
                  </p>

                  {/* Meta Info */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-gray-100 rounded">
                        <Tag className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <span className="text-sm text-gray-700">{c.category}</span>
                    </div>
                    <div className={`flex items-center justify-center space-x-1 px-3 py-1 rounded-full border ${getPriorityColor(c.priority)}`}>
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span className="text-sm font-medium capitalize">{c.priority} Priority</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      {c.location?.coordinates?.length > 0 && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>Location</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-blue-600 text-sm font-medium group-hover:text-blue-700">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        {complaints.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Showing {complaints.length} complaint{complaints.length !== 1 ? 's' : ''} • 
              Click on any complaint to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}