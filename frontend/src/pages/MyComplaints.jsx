import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/user/me/list");
      setComplaints(res.data);
    } catch (err) {
      toast.error("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-[#003366] mb-5">
        My Complaints
      </h1>

      <div className="grid gap-4">
        {complaints.map((c) => (
          <div
            key={c._id}
            className="bg-white p-4 rounded shadow border cursor-pointer"
            onClick={() => (window.location.href = `/complaint/${c._id}`)}
          >
            <h2 className="text-lg font-semibold text-[#003366]">
              {c.title}
            </h2>

            <p className="text-gray-700 text-sm">{c.description}</p>

            <div className="mt-2 text-sm">
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-blue-700">{c.status}</span>
            </div>

            <div className="text-xs text-gray-500">
              {new Date(c.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
