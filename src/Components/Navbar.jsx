import React from 'react';
import { Plus, LogOut } from 'lucide-react';
import { Container } from './ui/Container';

// import { logout } from '../Services/AuthAPI'; // Import logout action
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Services/authApi';

const Navbar = ({ onNewMemory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout(navigate));
  };

  return (
    <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-50">
      <Container className="py-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">My Memories</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={onNewMemory}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl
                        flex items-center gap-2 transition-colors duration-300"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Memory</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors"
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
