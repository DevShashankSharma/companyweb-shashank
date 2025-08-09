import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiGrid, FiChevronDown } from "react-icons/fi";

const UserDropdown = ({ userlogin, handleLogout }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center st:gap-2 px-1 st:px-4 py-2 bg-white border border-gray-300 rounded-xl st:rounded-full shadow-sm hover:bg-gray-100 transition text-sm font-medium text-gray-700 cursor-pointer"
            >
                {/* Avatar Logo */}
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white uppercase
            ${userlogin.username === 'admin' ? 'bg-red-600' : 'bg-blue-500'}
        `}
                >
                    {userlogin.username?.charAt(0).toUpperCase()}
                </div>
                <span
                    className={`hidden st:inline truncate font-semibold tracking-wide capitalize transition
                        ${userlogin.username === 'admin'
                            ? 'text-red-600 hover:text-red-700'
                            : 'text-blue-800 hover:text-indigo-700'}
                `}
                    title={userlogin.username}
                >
                    {userlogin.username}
                </span>
                <FiChevronDown
                    className={`ml-1 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>

            {/* Dropdown */}
            <div
                className={`absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl z-50 border border-gray-200 transform transition-all duration-200 origin-top-right
                ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
            >
                {/* Dropdown Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-xs text-gray-500">Logged in as</p>
                    <p className="font-medium text-gray-900 capitalize">{userlogin.username}</p>
                </div>

                {/* Dropdown Actions */}
                <div className="py-2 px-2">
                    <button
                        onClick={() => {
                            navigate('/dashboard');
                            setOpen(false);
                        }}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 text-sm rounded-md transition-all duration-200 cursor-pointer"
                    >
                        <FiGrid className="text-lg" />
                        Dashboard
                    </button>

                    <button
                        onClick={() => {
                            handleLogout();
                            navigate('/');
                            setOpen(false);
                        }}
                        className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 text-sm rounded-md transition-all duration-200 cursor-pointer"
                    >
                        <FiLogOut className="text-lg" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDropdown;
