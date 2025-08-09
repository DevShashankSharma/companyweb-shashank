import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiUserPlus } from "react-icons/fi";
import logo from "../assets/logo.png";
import UserDropdown from "./UserDropdown";


const navItems = [
  { name: "Overview", id: "overview", path: "/" },
  { name: "About Us", id: "about", path: "/about" }, 
  { name: "Services", id: "services", path: "/services" }, 
  { name: "Projects", id: "projects", path: "/projects" },
  { name: "Contact", id: "contact", path: "/contact" },
];

const Header = ({ handleLogout, setLogin, userlogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto flex flex-col">
        <nav className="flex items-center justify-between m:px-4 py-2 border-b-2 border-b-gray-300">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-12 h-8 object-contain" />
            <span className="hidden xs:flex text-base m:text-lg font-bold bg-gradient-to-r from-blue-800 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Goklyn Private Limited
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`relative px-3 py-1 text-sm font-medium transition-colors duration-2000
                ${location.pathname === item.path
                    ? "text-blue-700"
                    : "text-gray-700 hover:text-blue-700"}
                group
              `}
              >
                {item.name}
                {/* Underline animation */}
                <span
                  className={`
                  absolute left-0 -bottom-0.5 h-0.5 w-full rounded bg-blue-700
                  transition-all duration-300
                  ${location.pathname === item.path ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}
                  origin-left
                `}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center"> 
            {userlogin.loggedin ? (

              <div className="flex items-center gap-2"> 
                <UserDropdown userlogin={userlogin} handleLogout={handleLogout} />
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setLogin(true);
                }}
                title="Create Account"
                className="ml-2 flex items-center justify-center gap-2 sm:px-6 sm:h-10 rounded-full border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-all duration-300 font-semibold text-sm text-blue-700 shadow-sm group cursor-pointer"
              >
                {/* Desktop text */}
                <span className="hidden sm:inline ">Create Account</span>

                {/* Mobile icon */}
                <span className="sm:hidden flex items-center justify-center p-2 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-all duration-300 shadow-md">
                  <FiUserPlus className="text-xl text-blue-700 group-hover:text-blue-900 transform group-hover:scale-110 transition-all duration-300" />
                </span>
              </button>

            )}

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-blue-50 transition"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FiMenu className="text-2xl text-blue-700" />
            </button>
          </div>
        </nav>
        {/* Desktop Nav */}
        <div className="hidden sm:flex lg:hidden items-center px-4 py-2 justify-center gap-2 w-full mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`relative px-3 py-1 text-sm font-medium transition-colors duration-200
                ${location.pathname === item.path
                  ? "text-blue-700"
                  : "text-gray-700 hover:text-blue-700"}
                group
              `}
            >
              {item.name}
              {/* Underline animation */}
              <span
                className={`
                  absolute left-0 -bottom-0.5 h-0.5 w-full rounded bg-blue-700
                  transition-all duration-2000
                  ${location.pathname === item.path ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}
                  origin-left
                `}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`
          md:hidden fixed top-0 left-0 w-full h-screen bg-black/40 z-50 transition-opacity duration-300
          ${showMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setShowMenu(false)}
      >
        <div
          className={`
            bg-white w-64 h-full shadow-lg flex flex-col transition-transform duration-300
            ${showMenu ? "translate-x-0" : "-translate-x-80"}
            overflow-y-auto
          `}
          style={{ scrollbarWidth: "none" }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="font-bold text-blue-700">Menu</span>
            <button
              className="text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setShowMenu(false)}
            >
              &times;
            </button>
          </div>
          <nav className="flex-1 flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setShowMenu(false)}
                className={`relative block px-3 py-2 rounded text-sm font-medium transition group
                  ${location.pathname === item.path
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"}
                `}
              >
                {item.name}
                {/* Underline animation */}
                <span
                  className={`
                    absolute left-3 -bottom-0.5 h-0.5 w-[90%] rounded bg-blue-700
                    transition-all duration-300
                    ${location.pathname === item.path ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"}
                    origin-left
                  `}
                />
              </Link>
            ))}
          </nav> 
        </div>
      </div>
    </header>
  );
};

export default Header;
