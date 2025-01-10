import React from "react";
import { Plus, LogOut } from "lucide-react";
import { Container } from "./ui/Container";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/Services/authApi";
import Mylogo from "./ui/Mylogo";
import logo from "../assets/logo-main.png"

const Navbar = ({ onNewMemory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.profile.user);

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50 shadow-lg">
      <Container className="py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            {/* <Mylogo className="h-6 w-6 text-blue-500 hover:text-blue-300 transition duration-300" /> */}
            <img src={logo} alt="Logo"   className="h-12 w-12 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ease-in-out" />
            <span className="text-white text-2xl font-bold">SecondBrain</span>
          </div>

          {/* User Section & Action Buttons */}
          <div className="flex items-center gap-4">
            {/* New Memory Button */}
            <button
              onClick={onNewMemory}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl
                        flex items-center gap-2 transition-colors duration-300 
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Memory</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors 
                        focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>

          
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
