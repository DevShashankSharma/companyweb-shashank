// src/components/AdminVerificationPage.jsx

import { useState } from "react";
import { FiKey, FiLock, FiDroplet, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminVerificationPage = ({
    setLogin,
    setUserLogin,
    setIsAdminAuthenticated,
    setSnackbar,
    setAdminVerification,
}) => {
    const [form, setForm] = useState({
        secretKey: "",
        favoriteColor: "",
        adminPIN: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleVerify = async () => {
        setError("");
        try {
            const res = await axios.post("http://localhost:5000/api/auth/admin/security", {
                secretKey: form.secretKey,
                favoriteColor: form.favoriteColor,
                adminPIN: form.adminPIN,
            });

            if (res.data.success && res.data.user) { 
                const userInfo = {
                    id: res.data.user.id,
                    username: res.data.user.username,
                    loggedin: true,
                };
                setIsAdminAuthenticated(true);
                setUserLogin(userInfo);
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                setSnackbar({
                    open: true,
                    message: "Admin verified successfully!",
                    severity: "success",
                });
                setLogin(false);
                setAdminVerification(false);
                navigate("/dashboard");
            } else { 
                setError(res.data.message || "Verification failed. Please check your answers.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed. Please check your answers.");
        }
    };

    return (
        <div className="fixed w-full h-full overflow-auto inset-0 bg-black/50 z-50 backdrop-blur-sm flex justify-center px-2 sm:px-4">
            <div className="bg-white h-fit w-full max-w-md my-auto p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200 space-y-6 relative animate-fade-in-down">
                {/* Close Button */}
                <button
                    onClick={() => setAdminVerification(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                    aria-label="Close"
                >
                    <FiXCircle size={24} />
                </button>

                <div className="flex flex-col items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                        Admin Verification
                    </h2>
                    <p className="text-center text-sm text-gray-500">
                        Please provide the required credentials to confirm admin access.
                    </p>
                </div>

                {/* Verification Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleVerify();
                    }}
                    className="space-y-5"
                >
                    <div className="space-y-4">
                        <div className="relative">
                            <FiKey className="absolute left-3 top-3 text-gray-500 text-lg" />
                            <input
                                type="password"
                                placeholder="Secret Key"
                                value={form.secretKey}
                                onChange={(e) =>
                                    setForm({ ...form, secretKey: e.target.value })
                                }
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 outline-none bg-white text-gray-800"
                                autoFocus
                            />
                        </div>

                        <div className="relative">
                            <FiDroplet className="absolute left-3 top-3 text-gray-500 text-lg" />
                            <input
                                type="text"
                                placeholder="Favorite Color"
                                value={form.favoriteColor}
                                onChange={(e) =>
                                    setForm({ ...form, favoriteColor: e.target.value })
                                }
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 outline-none bg-white text-gray-800"
                            />
                        </div>

                        <div className="relative">
                            <FiLock className="absolute left-3 top-3 text-gray-500 text-lg" />
                            <input
                                type="password"
                                placeholder="Admin PIN"
                                value={form.adminPIN}
                                onChange={(e) => setForm({ ...form, adminPIN: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 outline-none bg-white text-gray-800"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 text-center font-medium">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 shadow transition-all"
                        >
                            Verify Admin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminVerificationPage;
