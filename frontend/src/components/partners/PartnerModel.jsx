import { FaRegImage, FaTimes } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const PartnerModal = ({
    newPartner,
    setNewPartner,
    setShowModal,
    setUpdate,
    update,
    id,
    fetchPartners
}) => {
    const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
    const [uploading, setUploading] = useState(false);

    // Modal handlers
    const handleModalClose = () => {
        setShowModal(false);
        setUpdate(false); // <-- Ensure update is reset
        setNewPartner({
            name: '',
            category: '',
            image: null,
        });
    };

    const handleNewMediaChange = (e) => {
        const { name, value } = e.target;
        setNewPartner(prev => ({ ...prev, [name]: value }));
    };

    const handleNewPartnerImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Optional: show loading popup
        setPopup({ show: true, message: "Uploading image...", type: "success" });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_unsigned_preset"); // Cloudinary unsigned preset name
 

        try {
            const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );
 

            setNewPartner(prev => ({
                ...prev,
                image: res.data.secure_url // Set Cloudinary image URL
            }));


            setPopup({ show: true, message: "Image uploaded successfully!", type: "success" });

            // Hide popup after a short delay
            setTimeout(() => setPopup({ show: false, message: "", type: "success" }), 1200);

        } catch (err) {
            console.error("Cloudinary Upload Error:", err);
            setPopup({ show: true, message: "Image upload failed!", type: "error" });
            setTimeout(() => setPopup({ show: false, message: "", type: "error" }), 2000);
        }
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            let res, data;
            if (update) {
                res = await fetch(`http://localhost:5000/api/partners/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPartner)
                });
                data = await res.json();
                setPopup({ show: true, message: data.message, type: data.success ? "success" : "error" });
                setUpdate(false);
                await fetchPartners();
            } else {
                res = await fetch("http://localhost:5000/api/partners", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...newPartner, createdAt: new Date() })
                });
                data = await res.json();
                setPopup({ show: true, message: data.message, type: data.success ? "success" : "error" });
                await fetchPartners();
            }

        } catch (err) {
            setPopup({ show: true, message: err.message, type: "error" });
            setTimeout(() => setPopup({ show: false, message: "", type: "error" }), 1200);
        }
        setTimeout(() => {
            setShowModal(false);
            setUpdate(false);
            setNewPartner({
                name: '',
                category: '',
                image: null,
            });
            setPopup({ show: false, message: "", type: "success" });
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-1101 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white p-0 border border-blue-100 relative animate-fadeIn">
                {/* Popup */}
                {popup.show && (
                    <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[1105] px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition
                        ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                        {popup.message}
                    </div>
                )}
                <form
                    onSubmit={handleModalSubmit}
                    className="p-8 relative"
                >
                    <button
                        type="button"
                        onClick={handleModalClose}
                        className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-red-500 transition"
                        aria-label="Close"
                    >
                        <FaTimes />
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
                        <span className="inline-block w-2 h-6 bg-blue-500 rounded-full mr-2"></span>
                        {update ? "Update Partner" : "Add New Partner"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-700">Name</label>
                            <input
                                name="name"
                                value={newPartner.name}
                                onChange={handleNewMediaChange}
                                required
                                className="w-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-3 py-2 rounded-lg mb-4 transition text-gray-600"
                                placeholder="Partner Name"
                            />

                            <label className="block text-sm font-semibold mb-1 text-gray-700">Category</label>
                            <input
                                name="category"
                                value={newPartner.category}
                                onChange={handleNewMediaChange}
                                required
                                className="w-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-3 py-2 rounded-lg mb-4 transition text-gray-600"
                                placeholder="Category"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-700">Image</label>
                            <div className="flex items-center gap-4 mb-4">
                                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                                    <FaRegImage className="text-3xl text-blue-400 mb-1" />
                                    <span className="text-xs text-gray-500">{uploading ? "Uploading..." : "Upload"}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleNewPartnerImage}
                                        className="hidden"
                                    />
                                </label>
                                {newPartner.image && (
                                    <img src={newPartner.image} alt="Preview" className="h-24 w-24 rounded-lg object-cover border border-blue-200 shadow" />
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition active:scale-[.95]"
                    >
                        {update ? "Update Partner" : "Add Partner"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PartnerModal;
