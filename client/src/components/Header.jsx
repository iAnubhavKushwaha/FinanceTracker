import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl text-blue-700 font-bold cursor-pointer">
          FinanceTracker
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/income">Income</Link>
          </li>
          <li>
            <Link to="/expenses">Expenses</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-lg shadow-md"
            >
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="md:hidden bg-blue-50 text-blue-700 font-medium space-y-2 px-6 py-4 shadow-md">
          <li>
            <Link
              to="/dashboard"
              className="block py-2 border-b border-blue-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/income"
              className="block py-2 border-b border-blue-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Income
            </Link>
          </li>
          <li>
            <Link
              to="/expenses"
              className="block py-2 border-b border-blue-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Expenses
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block py-2 border-b border-blue-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
