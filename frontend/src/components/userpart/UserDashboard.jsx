import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiMail, FiPhone, FiHome, FiUser, FiFileText } from "react-icons/fi";
import axios from 'axios';

const UserDashboard = ({ userId, handleLogout, isAdminAuthenticated }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [appliedServices, setAppliedServices] = useState([]);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('userInfo'));  
        if (!savedUser) { 
            navigate('/login');
            return;
        }
        const fetchUser = async () => {
            try {
                // Fetch user from MongoDB backend
                const endpoint = `http://localhost:5000/api/auth/${savedUser.id}`;
                const res = await axios.get(endpoint); 
                if (res.data && res.data.data) {
                    setUser(res.data.data);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                navigate('/login');
            }
        };

        const fetchAppliedServices = async () => {
            try {
                const endpoint = `http://localhost:5000/api/enquiries?userId=${savedUser.id}`;
                const res = await axios.get(endpoint); 
                if (res.data) {
                    setAppliedServices(res.data);
                }
            } catch (error) {
                console.error("Error fetching applied services:", error);
            }
        };
        fetchUser();
        fetchAppliedServices();
    }, [navigate, isAdminAuthenticated, userId]);

    if (!user) return null; 

    return (
        <div className="min-h-screen flex items-center justify-center pt-22 px-6 pb-6">
            <div className="bg-white p-4 sm:p-8 max-w-7xl w-full transition-all duration-300">
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-10">
                    {/* Profile Image */}
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden flex items-center justify-center border-4 border-indigo-400 shadow-lg bg-gradient-to-br from-blue-400 via-indigo-400 to-pink-300">
                        <div
                            className={`w-full h-full text-6xl sm:text-8xl rounded-full flex items-center justify-center font-extrabold select-none
                            ${user.name === 'Admin' ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white'}`}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full">
                        <div className="flex gap-2 items-center px-3 py-2 sm:px-4 sm:py-3">
                            <FiUser className="text-blue-400 text-xl" />
                            <div>
                                <h4 className="text-xs text-gray-500">Name</h4>
                                <p className="text-base sm:text-lg font-bold text-blue-900">{user.name}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center px-3 py-2 sm:px-4 sm:py-3 ">
                            <FiUser className="text-indigo-400 text-xl" />
                            <div>
                                <h4 className="text-xs text-gray-500">Username</h4>
                                <p className="text-base sm:text-lg font-bold text-indigo-900">{user.username}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center px-3 py-2 sm:px-4 sm:py-3  ">
                            <FiMail className="text-pink-400 text-xl" />
                            <div>
                                <h4 className="text-xs text-gray-500">Email</h4>
                                <p className="text-base sm:text-lg font-bold text-pink-900">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center px-3 py-2 sm:px-4 sm:py-3 ">
                            <FiPhone className="text-blue-400 text-xl" />
                            <div>
                                <h4 className="text-xs text-gray-500">Phone</h4>
                                <p className="text-base sm:text-lg font-bold text-blue-900">{user.phone}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center px-3 py-2 sm:px-4 sm:py-3 sm:col-span-2">
                            <FiHome className="text-indigo-400 text-xl" />
                            <div>
                                <h4 className="text-xs text-gray-500">Address</h4>
                                <p className="text-base sm:text-lg font-bold text-indigo-900">{user.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applied Services */}
                <div className="mt-8 flex flex-col items-center w-full">
                    <h2 className="text-xl font-bold text-indigo-800 mb-4">
                        {isAdminAuthenticated ? 'All Submitted Services' : 'Your Applied Services'}
                    </h2>
                    {appliedServices.length > 0 ? (
                        <div className="space-y-4 w-full">
                            {appliedServices.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-white to-blue-50 border-l-4 border-blue-500 p-5 shadow rounded-2xl transition-all hover:scale-[1.01] duration-200 space-y-3"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-blue-900 font-semibold text-lg">
                                            <FiFileText className="text-blue-500 text-xl" />
                                            <span>{service.service}</span>
                                        </div>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                                            {new Date(service.createdAt).toLocaleString('en-IN', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short',
                                            })}
                                        </span>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-800">
                                        <p>
                                            <span className="font-bold text-gray-900">Name:</span> {service.name}
                                        </p>
                                        <p>
                                            <span className="font-bold text-gray-900">Email:</span> {service.email}
                                        </p>
                                    </div>

                                    {/* Subject */}
                                    <p className="text-sm text-gray-800">
                                        <span className="font-bold text-gray-900">Subject:</span> {service.subject}
                                    </p>

                                    {/* Message */}
                                    <p className="text-sm text-gray-800 whitespace-pre-wrap">
                                        <span className="font-bold text-gray-900">Message:</span> {service.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-gray-500 italic">No services applied yet.</div>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={() => {
                            handleLogout();
                            navigate('/');
                        }}
                        className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white text-base rounded-full font-semibold shadow hover:scale-105 hover:shadow-lg transition-all cursor-pointer"
                    >
                        <FiLogOut className="text-lg" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
