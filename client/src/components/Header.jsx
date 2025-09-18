import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-white">
            Voting App
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/my-polls" className="text-gray-300 hover:text-white">
                  My Polls
                </Link>
                {user.role === "admin" && (
                  <Link to="/admin" className="text-gray-300 hover:text-white">
                    Admin Dashboard
                  </Link>
                )}
                <span className="text-gray-300">Welcome, {user.name}!</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 text-sm font-semibold text-white bg-teal-500 rounded hover:bg-teal-600"
                >
                  Login
                </Link>
                <Link to="/register" className="text-gray-300 hover:text-white">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
