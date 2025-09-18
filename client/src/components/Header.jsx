import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-teal-400 hover:text-teal-300"
        >
          PollApp
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            to="/login"
            className="hover:text-teal-300 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
