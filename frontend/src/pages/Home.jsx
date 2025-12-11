import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FilePlus, 
  List, 
  HelpCircle,
  AlertTriangle,
  Clock,
  CheckCircle
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#003366]">
          Welcome to SGIMS Portal
        </h1>
        <p className="text-gray-700 mt-2 text-lg">
          Submit, track and manage your public grievances with Government of India
        </p>
        
        {/* Indian Flag Stripes */}
        <div className="flex items-center mt-4">
          <div className="h-2 flex-1 rounded-full overflow-hidden flex">
            <div className="flex-1 bg-[#FF9933]"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-[#138808]"></div>
          </div>
          <span className="ml-3 text-sm text-gray-600 font-medium">सार्वजनिक शिकायत पोर्टल</span>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div
          className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group"
          onClick={() => navigate("/complaint/new")}

          
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
              <FilePlus className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700">
              Submit Complaint
            </h3>
            <p className="text-gray-600 mb-4">Raise new public issue or grievance</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Start Now
            </button>
          </div>
        </div>

        <div
          className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group"
          onClick={() => navigate("/my-complaints")}
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
              <List className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-700">
              My Complaints
            </h3>
            <p className="text-gray-600 mb-4">Track and manage your complaints</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              View All
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 cursor-pointer transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl group"
         onClick={() => navigate("/support")}
        >
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors">
              <HelpCircle className="w-10 h-10 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-700">
              Support
            </h3>
            <p className="text-gray-600 mb-4">Need help? Contact support team</p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Get Help
            </button>
          </div>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="mt-12 bg-gradient-to-r from-[#003366] to-[#004080] text-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h3 className="text-xl font-bold mb-2">24/7 Government Support</h3>
            <p className="text-blue-200">
              Your complaints are handled with priority by concerned government departments
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">1800-11-7000</div>
              <div className="text-sm text-blue-200">Helpline</div>
            </div>
            <div className="h-10 w-px bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">24-48 Hrs</div>
              <div className="text-sm text-blue-200">Initial Response</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          सार्वजनिक शिकायत पोर्टल • Government of India • Secure & Confidential
        </p>
      </div>
    </div>
  );
}