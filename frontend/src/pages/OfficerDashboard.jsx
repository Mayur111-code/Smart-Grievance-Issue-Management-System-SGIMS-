import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  Eye
} from "lucide-react";

export default function OfficerDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAssignedComplaints = async () => {
    try {
      setLoading(true);
      const res = await API.get("/officer/complaints");
      setComplaints(res.data);
    } catch (err) {
      toast.error("Failed to load assigned complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#003366]">
            Officer Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage assigned complaints and track resolution progress
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full mt-3"></div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow border">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading assigned complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No complaints assigned
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't been assigned any complaints yet.
            </p>
          </div>
        ) : (
          /* Complaints Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaints.map((c) => (
              <div
                key={c._id}
                onClick={() => navigate(`/officer/complaint/${c._id}`)}
                className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer"
              >
                <div className="p-5">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(c.status)}`}>
                      {getStatusIcon(c.status)}
                      <span className="text-sm font-medium capitalize">{c.status}</span>
                    </div>
                    {c.priority === "High" && (
                      <div className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        High Priority
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-1">
                    {c.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {c.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{c.category}</span>
                    </div>
                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      Filed by: {c.user?.name || "User"}
                    </span>
                    <div className="flex items-center space-x-1 text-blue-600 text-sm font-medium">
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
              Showing {complaints.length} complaint{complaints.length !== 1 ? 's' : ''} • Officer Dashboard
            </p>
          </div>
        )}
      </div>
    </div>
  );
}