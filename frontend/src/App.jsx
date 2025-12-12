// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
// import ComplaintForm from "./pages/ComplaintForm";
// import ComplaintDetails from "./pages/ComplaintDetails";
// import MyComplaints from "./pages/MyComplaints";

// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminComplaintDetails from "./pages/AdminComplaintDetails";

// import OfficerDashboard from "./pages/OfficerDashboard";
// import OfficerComplaintDetails from "./pages/OfficerComplaintDetails";

// import ProtectedRoute from "./components/ProtectedRoute";
// import Support from "./pages/Support";
// import AdminProfile from "./pages/AdminProfile";
// import OfficerProfile from "./pages/OfficerProfile";
// import UserProfile from "./pages/UserProfile";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <ToastContainer position="top-right" autoClose={2000} />

//       <Routes>
//         {/* PUBLIC ROUTES */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* USER ROUTES */}
//         <Route path="/" element={<Home />} />
//         <Route path="/my-complaints" element={<MyComplaints />} />
//         <Route path="/complaint/new" element={<ComplaintForm />} />
//         <Route path="/complaint/:id" element={<ComplaintDetails />} />

//         {/* ADMIN LOGIN */}
//         <Route path="/admin/login" element={<AdminLogin />} />

//         {/* ADMIN PROTECTED */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/complaint/:id"
//           element={
//             <ProtectedRoute role="admin">
//               <AdminComplaintDetails />
//             </ProtectedRoute>
//           }
//         />

//         {/* OFFICER PROTECTED */}
//         <Route
//           path="/officer/dashboard"
//           element={
//             <ProtectedRoute role="department">
//               <OfficerDashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/officer/complaint/:id"
//           element={
//             <ProtectedRoute role="department">
//               <OfficerComplaintDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/support" element={<Support />} />

// <Route path="/profile/user" element={<UserProfile />} />
// <Route path="/profile/officer" element={<OfficerProfile />} />
// <Route path="/profile/admin" element={<AdminProfile />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;








import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// USER PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MyComplaints from "./pages/MyComplaints";
import ComplaintForm from "./pages/ComplaintForm";
import ComplaintDetails from "./pages/ComplaintDetails";

// ADMIN PAGES
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaintDetails from "./pages/AdminComplaintDetails";

// OFFICER PAGES
import OfficerDashboard from "./pages/OfficerDashboard";
import OfficerComplaintDetails from "./pages/OfficerComplaintDetails";

// SHARED
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Support from "./pages/Support";

// PROFILES
import AdminProfile from "./pages/AdminProfile";
import OfficerProfile from "./pages/OfficerProfile";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* USER PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <ProtectedRoute role="user">
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <ProtectedRoute role="user">
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaint/new"
          element={
            <ProtectedRoute role="user">
              <ComplaintForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaint/:id"
          element={
            <ProtectedRoute role="user">
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/complaint/:id"
          element={
            <ProtectedRoute role="admin">
              <AdminComplaintDetails />
            </ProtectedRoute>
          }
        />

        {/* OFFICER PROTECTED ROUTES */}
        <Route
          path="/officer/dashboard"
          element={
            <ProtectedRoute role="department">
              <OfficerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/officer/complaint/:id"
          element={
            <ProtectedRoute role="department">
              <OfficerComplaintDetails />
            </ProtectedRoute>
          }
        />

        {/* EVERYONE AFTER LOGIN */}
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          }
        />

        {/* PROFILE ROUTES */}
        <Route
          path="/profile/user"
          element={
            <ProtectedRoute role="user">
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/officer"
          element={
            <ProtectedRoute role="department">
              <OfficerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
