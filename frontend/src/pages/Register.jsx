import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", form);

      // Save token + user details
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      toast.success("Registration Successful!");

      // Smooth redirect
      setTimeout(() => {
        window.location.href = "/home";
      }, 1200);

    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Registration Failed!"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-md border w-96 rounded"
      >
        <h2 className="text-xl font-semibold mb-5 text-center text-[#003366]">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        />

        <button className="w-full bg-[#003366] text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
