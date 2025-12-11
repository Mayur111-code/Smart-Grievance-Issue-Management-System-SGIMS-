import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function AdminComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [officers, setOfficers] = useState([]);
  const [selectedOfficer, setSelectedOfficer] = useState("");

  // Fetch complaint
  const fetchComplaint = async () => {
    try {
      const res = await API.get(`/admin/complaints/${id}`);
      setComplaint(res.data);
    } catch (err) {
      if (err?.response?.status === 403) {
        toast.error("Access denied. Login as admin.");
        return navigate("/admin/login");
      }
      toast.error("Failed to load complaint");
    }
  };

  // Fetch officers
  const fetchOfficers = async () => {
    try {
      const res = await API.get("/admin/officers");
      setOfficers(res.data || []);
    } catch (err) {
      toast.error("Failed to load officers");
    }
  };

  // Assign officer
  const assignOfficer = async () => {
    if (!selectedOfficer) 
      return toast.error("Select an officer");

    try {
      await API.put(`/admin/complaints/${id}/assign`, {
        officerId: selectedOfficer  // FIXED 🔥
      });

      toast.success("Complaint Assigned!");
      fetchComplaint();
    } catch (err) {
      toast.error("Assignment failed");
    }
  };

  useEffect(() => {
    fetchComplaint();
    fetchOfficers();
  }, [id]);

  if (!complaint) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-[#003366] mb-4">Complaint Details</h1>

      <div className="bg-white border p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-[#003366]">
          {complaint.title}
        </h2>

        <p className="mt-2">{complaint.description}</p>

        <p><strong>Category:</strong> {complaint.category}</p>
        <p><strong>Department:</strong> {complaint.department}</p>
        <p><strong>Status:</strong> {complaint.status}</p>

        {/* ASSIGN OFFICER */}
        <div className="mt-5">
          <h3 className="font-semibold mb-2">Assign to Officer</h3>

          <select
            className="border p-2 rounded w-full"
            value={selectedOfficer}
            onChange={(e) => setSelectedOfficer(e.target.value)}
          >
            <option value="">-- Select Officer --</option>

            {officers
              .filter(o =>
                o.department?.toLowerCase() === complaint.department?.toLowerCase()
              )
              .map(o => (
                <option key={o._id} value={o._id}>
                  {o.name} ({o.department})
                </option>
              ))}
          </select>

          <button
            onClick={assignOfficer}
            className="mt-3 bg-[#003366] text-white px-4 py-2 rounded"
          >
            Assign Officer
          </button>
        </div>
      </div>
    </div>
  );
}
