import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  FilePlus,
  List,
  User,
  LogOut,
  Menu,
  X,
  Shield,
  Building2,
  Settings,
  HelpCircle,
  UserCircle,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ------------------ NAVIGATION ITEMS ------------------
  const getNavItems = () => {
    const commonItems = [
      { label: "Home", path: "/", icon: <Home size={18} /> },
    ];

    if (role === "user") {
      return [
        ...commonItems,
        { label: "New Complaint", path: "/complaint/new", icon: <FilePlus size={18} /> },
        { label: "My Complaints", path: "/my-complaints", icon: <List size={18} /> },
        { label: "Track Status", path: "/track-complaint", icon: <Shield size={18} /> },
      ];
    }

    if (role === "department") {
      return [
        //...commonItems,
        { label: "Officer Dashboard", path: "/officer/dashboard", icon: <Building2 size={18} /> },
      ];
    }

    if (role === "admin") {
      return [
        //...commonItems,
        { label: "Admin Dashboard", path: "/admin/dashboard", icon: <Shield size={18} /> },
        { label: "Manage Users", path: "/admin/users", icon: <User size={18} /> },
      ];
    }

    return commonItems;
  };

  const navItems = getNavItems();

  // ------------------ PROFILE DROPDOWN ITEMS ------------------
  const profileItems = {
    user: [
      { label: "My Profile", path: "/profile/user", icon: <UserCircle size={16} /> },
      { label: "Settings", path: "/settings", icon: <Settings size={16} /> },
      { label: "Help", path: "/help", icon: <HelpCircle size={16} /> },
    ],
    department: [
      { label: "Officer Profile", path: "/profile/officer", icon: <UserCircle size={16} /> },
      { label: "Help Desk", path: "/officer/help", icon: <HelpCircle size={16} /> },
    ],
    admin: [
      { label: "Admin Profile", path: "/profile/admin", icon: <UserCircle size={16} /> },
      { label: "Settings", path: "/admin/settings", icon: <Settings size={16} /> },
      { label: "Help", path: "/admin/help", icon: <HelpCircle size={16} /> },
    ],
  };

  const profileMenu = profileItems[role] || [];

  return (
    <nav className="bg-gradient-to-r from-[#003366] to-[#004080] text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">

          {/* ---------- LEFT LOGO + TITLE ---------- */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="bg-white p-2 rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-600 to-green-600 rounded relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                सार्वजनिक शिकायत पोर्टल
              </h1>
              <p className="text-xs text-gray-300">
                Public Grievance Portal - Government of India
              </p>
            </div>
          </div>

          {/* ---------- CENTER NAV ITEMS ---------- */}
          <div className="hidden md:flex items-center space-x-1 mx-auto">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 hover:text-yellow-300 transition"
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* ---------- RIGHT PROFILE DROPDOWN ---------- */}
          <div className="hidden md:block relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30 transition"
            >
              <User size={18} />
              <span>{name}</span>
            </button>

            {/* PROFILE MENU */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black w-48 rounded-lg shadow-lg overflow-hidden z-50">
                {profileMenu.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="w-full flex items-center space-x-2 p-3 hover:bg-gray-200 text-left"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}

                {/* Logout */}
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-2 p-3 bg-red-600 text-white hover:bg-red-700"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            className="md:hidden p-2 rounded hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/10 p-4 rounded-lg mt-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => { navigate(item.path); setIsMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded hover:bg-white/10"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            {/* Profile Section */}
            <div className="border-t border-white/20 mt-3 pt-3">
              <p className="text-sm mb-2">Signed in as <b>{name}</b></p>

              {profileMenu.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { navigate(item.path); setIsMenuOpen(false); }}
                  className="w-full flex items-center space-x-2 p-3 hover:bg-white/10"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}

              <button
                onClick={logout}
                className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 py-3 rounded-lg mt-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NATIONAL FLAG STRIP */}
      <div className="h-2 flex">
        <div className="flex-1 bg-[#FF9933]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#138808]"></div>
      </div>
    </nav>
  );
}
