import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  const fetchComplaint = async () => {
    try {
      const res = await API.get(`/complaints/${id}`);
      setComplaint(res.data);
    } catch (err) {
      toast.error("Failed to load complaint");
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  if (!complaint) return <div className="p-6">Loading...</div>;

  // SAFE LOCATION EXTRACTION
  const hasLocation =
    complaint.location &&
    complaint.location.coordinates &&
    complaint.location.coordinates.length === 2;

  const lat = hasLocation ? complaint.location.coordinates[1] : null;
  const lng = hasLocation ? complaint.location.coordinates[0] : null;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-[#003366] mb-5">
        Complaint Details
      </h1>

      <div className="bg-white p-6 rounded shadow border">
        <h2 className="text-xl font-semibold text-[#003366] mb-3">
          {complaint.title}
        </h2>

        <p className="text-gray-700 mb-3">{complaint.description}</p>

        <p><strong>Category:</strong> {complaint.category}</p>
        <p><strong>Priority:</strong> {complaint.priority}</p>
        <p><strong>Status:</strong> {complaint.status}</p>

        {/* LOCATION SECTION */}
        <div className="mt-5">
          <h3 className="font-semibold mb-2">Location</h3>

          {!hasLocation && (
            <p className="text-red-600">Location not available</p>
          )}

          {hasLocation && (
            <iframe
              title="map"
              width="100%"
              height="250"
              className="border rounded"
              src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
            ></iframe>
          )}
        </div>

        {/* PHOTOS SECTION */}
        {complaint.photos && complaint.photos.length > 0 && (
          <div className="mt-5">
            <h3 className="font-semibold mb-2">Photos</h3>
            <div className="grid grid-cols-2 gap-3">
              {complaint.photos.map((p, index) => (
                <img
                  key={index}
                  src={p}
                  alt="complaint"
                  className="rounded shadow"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
