import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function OfficerDashboard() {
  const [complaints, setComplaints] = useState([]);

  const fetchAssignedComplaints = async () => {
    try {
      const res = await API.get("/officer/complaints");
      setComplaints(res.data);
    } catch (err) {
      toast.error("Failed to load assigned complaints");
    }
  };

  useEffect(() => {
    fetchAssignedComplaints();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-[#003366] mb-4">
        Officer Dashboard
      </h1>

      <div className="grid gap-4">
        {complaints.map((c) => (
          <div
            key={c._id}
            className="bg-white p-4 border shadow rounded cursor-pointer"
            onClick={() => (window.location.href = `/officer/complaint/${c._id}`)}
          >
            <h2 className="text-lg font-semibold text-[#003366]">
              {c.title}
            </h2>

            <p className="text-gray-700">{c.description}</p>

            <p className="mt-2">
              <strong>Status:</strong>{" "}
              <span className="text-blue-700">{c.status}</span>
            </p>

            <p className="text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
