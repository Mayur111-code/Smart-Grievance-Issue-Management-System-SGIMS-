// import { useState } from "react";
// import API from "../services/api";
// import { toast } from "react-toastify";


// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await API.post("/auth/login", form);

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("role", res.data.user.role);
//     localStorage.setItem("name", res.data.user.name);

//     toast.success("Login Successful!");
// setTimeout(() => {
//   if (res.data.user.role === "admin") {
//     window.location.href = "/admin/dashboard";
//   } 
//   else if (res.data.user.role === "department") {
//     window.location.href = "/officer/dashboard";
//   } 
//   else {
//     window.location.href = "/home";
//   }
// }, 1200);

//   } catch (error) {
//     toast.error("Invalid Credentials!");
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 shadow-md border w-96 rounded"
//       >
//         <h2 className="text-xl font-semibold mb-5 text-center text-[#003366]">
//           User Login
//         </h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="w-full border p-2 mb-3"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="w-full border p-2 mb-4"
//         />

//         <button className="w-full bg-[#003366] text-white py-2 rounded">
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

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      // Ensure response contains user and token
      if (!res?.data?.token || !res?.data?.user) {
        toast.error("Invalid server response");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name || "");

      toast.success("Login Successful!");

      // route based on role
      const role = res.data.user.role;
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "department") navigate("/officer/dashboard");
      else navigate("/home");
    } catch (error) {
      toast.error("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md border w-96 rounded">
        <h2 className="text-xl font-semibold mb-5 text-center text-[#003366]">User Login</h2>

        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 mb-3" />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border p-2 mb-4" />

        <button type="submit" className="w-full bg-[#003366] text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
