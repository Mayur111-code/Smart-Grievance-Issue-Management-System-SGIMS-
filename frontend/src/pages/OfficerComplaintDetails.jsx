import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function OfficerComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");

  const fetchComplaint = async () => {
    try {
      const res = await API.get(`/officer/complaints/${id}`);
      setComplaint(res.data);
      setStatus(res.data.status);
    } catch {
      toast.error("Failed to load complaint");
    }
  };

  const updateStatus = async () => {
    try {
      await API.put(`/officer/complaints/${id}/status`, { status });
      toast.success("Status updated!");
      fetchComplaint();
    } catch {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  if (!complaint) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-[#003366] mb-4">
        Complaint Details (Officer)
      </h1>

      <div className="bg-white border p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-[#003366]">
          {complaint.title}
        </h2>

        <p className="mt-2">{complaint.description}</p>

        <p><strong>Category:</strong> {complaint.category}</p>
        <p><strong>Priority:</strong> {complaint.priority}</p>
        <p><strong>Status:</strong> {complaint.status}</p>

        <div className="mt-5">
          <h3 className="font-semibold mb-2">Update Status</h3>

          <select
            className="border p-2 rounded w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <button
            onClick={updateStatus}
            className="mt-3 bg-[#003366] text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
