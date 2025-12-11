// import { useState } from "react";
// import API from "../services/api";
// import { toast } from "react-toastify";

// export default function AdminLogin() {
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await API.post("/auth/login", form);

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("role", res.data.user.role);
//     localStorage.setItem("name", res.data.user.name);

//     toast.success("Login Successful!");

//     setTimeout(() => {
//       if (res.data.user.role === "admin") {
//         window.location.href = "/admin/dashboard";
//       } else {
//         window.location.href = "/home";
//       }
//     }, 1200);

//   } catch (error) {
//     toast.error("Invalid Credentials!");
//   }
// };


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 shadow-md w-96 rounded border"
//       >
//         <h2 className="text-xl font-semibold text-center text-[#003366] mb-4">
//           Admin Login
//         </h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full border p-2 mb-4"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full border p-2 mb-4"
//         />

//         <button
//           type="submit"
//           className="w-full bg-[#003366] text-white py-2 rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      if (!res?.data?.token || !res?.data?.user) {
        toast.error("Invalid server response");
        return;
      }

      // Ensure backend user.role is admin
      if (res.data.user.role !== "admin") {
        toast.error("This account is not admin");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name || "");

      toast.success("Admin login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md w-96 rounded border">
        <h2 className="text-xl font-semibold text-center text-[#003366] mb-4">Admin Login</h2>

        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 mb-4" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 mb-4" />

        <button type="submit" className="w-full bg-[#003366] text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
