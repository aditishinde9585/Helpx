import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  FaHome,
  FaPlusCircle,
  FaSearch,
  FaClipboardList,
  FaCheckCircle,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Post Task", path: "/post-task", icon: <FaPlusCircle /> },
    { name: "Browse", path: "/browse-tasks", icon: <FaSearch /> },
    { name: "My Tasks", path: "/my-tasks", icon: <FaClipboardList /> },
    { name: "Accepted", path: "/accepted-tasks", icon: <FaCheckCircle /> },
    { name: "Profile", path: "/profile", icon: <FaUser /> }
  ];

  return (
    <>
      {/* TOP NAVBAR (Desktop + Tablet) */}

      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm px-4 py-3">

        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}

          <Link to="/dashboard" className="flex items-center gap-2 group">

            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-12 transition-transform">
              H
            </div>

            <span className="font-black text-xl tracking-tight text-slate-800">
              HelpX
            </span>

          </Link>


          {/* DESKTOP NAVIGATION */}

          <div className="hidden lg:flex items-center bg-slate-100/50 p-1 rounded-2xl">

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive(link.path)
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>

            ))}

          </div>


          {/* ACTIONS */}

          <div className="flex items-center gap-3">

            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-5 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-bold hover:bg-red-100 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>


            {/* MOBILE MENU BUTTON */}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 bg-slate-100 rounded-xl text-slate-600"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>

        </div>


        {/* MOBILE DROPDOWN MENU */}

        {isOpen && (

          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-4 space-y-2">

            {navLinks.map((link) => (

              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-4 rounded-2xl font-bold ${
                  isActive(link.path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>

            ))}

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-4 bg-red-50 text-red-600 rounded-2xl font-bold"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>

        )}

      </nav>


      {/* MOBILE BOTTOM NAVIGATION (APP STYLE) */}

      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-md flex justify-around py-2 z-50">

        {navLinks.slice(0,5).map((link) => (

          <Link
            key={link.path}
            to={link.path}
            className={`flex flex-col items-center text-xs ${
              isActive(link.path)
                ? "text-blue-600"
                : "text-slate-500"
            }`}
          >

            <div className="text-lg">{link.icon}</div>

            {link.name.split(" ")[0]}

          </Link>

        ))}

      </div>

    </>
  );
}

export default Navbar;