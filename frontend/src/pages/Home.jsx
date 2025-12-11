// import React from 'react'
// export default function Home() {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold text-[#003366]">
//         Welcome to SGIMS Portal
//       </h1>

//       <p className="text-gray-700 mt-2">
//         Submit, track and manage your public grievances.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//         <div
//           className="bg-white shadow p-4 border rounded cursor-pointer"
//           onClick={() => (window.location.href = "/complaint/new")}
//         >
//           <h3 className="text-xl font-semibold text-[#003366]">Submit Complaint</h3>
//           <p className="text-gray-600 mt-2">Raise new public issue</p>
//         </div>

//         <div
//           className="bg-white shadow p-4 border rounded cursor-pointer"
//           onClick={() => (window.location.href = "/my-complaints")}
//         >
//           <h3 className="text-xl font-semibold text-[#003366]">My Complaints</h3>
//           <p className="text-gray-600 mt-2">Track your complaints</p>
//         </div>

//         <div className="bg-white shadow p-4 border rounded cursor-pointer">
//           <h3 className="text-xl font-semibold text-[#003366]">Support</h3>
//           <p className="text-gray-600 mt-2">Need help?</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { toast } from "react-toastify";

export default function Home() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    toast.success("Logged out successfully!");

    setTimeout(() => {
      window.location.href = "/";
    }, 800);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-[#003366]">
          Welcome to SGIMS Portal
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-700 mt-2">
        Submit, track and manage your public grievances.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div
          className="bg-white shadow p-4 border rounded cursor-pointer"
          onClick={() => (window.location.href = "/complaint/new")}
        >
          <h3 className="text-xl font-semibold text-[#003366]">
            Submit Complaint
          </h3>
          <p className="text-gray-600 mt-2">Raise new public issue</p>
        </div>

        <div
          className="bg-white shadow p-4 border rounded cursor-pointer"
          onClick={() => (window.location.href = "/my-complaints")}
        >
          <h3 className="text-xl font-semibold text-[#003366]">
            My Complaints
          </h3>
          <p className="text-gray-600 mt-2">Track your complaints</p>
        </div>

        <div className="bg-white shadow p-4 border rounded cursor-pointer">
          <h3 className="text-xl font-semibold text-[#003366]">Support</h3>
          <p className="text-gray-600 mt-2">Need help?</p>
        </div>
      </div>
    </div>
  );
}
