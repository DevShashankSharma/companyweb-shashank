import React, { useState } from 'react';
import { FaTimes, FaRegImage } from 'react-icons/fa';
import axios from 'axios';

const ProjectCategoryModel = ({ newProjectCategory, setNewProjectCategory, setShowModal, setUpdate, update, id, fetchProjectCategories }) => {
    const [popup, setPopup] = useState({ show: false, message: "", type: "success" });

    // Close modal & reset form
    const handleModalClose = () => {
        setShowModal(false);
        setNewProjectCategory({
            title: '',
            description: '',
            image: null,
            category: ''
        });
        setUpdate(false);
    };

    // Input change handler
    const handleNewCategoryChange = (e) => {
        const { name, value } = e.target;
        setNewProjectCategory(prev => ({ ...prev, [name]: value }));
    };

    // Image upload handler (Cloudinary)
    const handleNewCategoryImage = async (e) => {
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
 

            setNewProjectCategory(prev => ({
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


    // Submit handler
    const handleModalSubmit = async (e) => {
        e.preventDefault();

        try {
            if (update) {
                // UPDATE existing category 
                const res = await axios.put(`https://goklyn-backend.vercel.app/api/projects/category/${id}`, newProjectCategory);
                setPopup({ show: true, message: res.data.message, type: res.data.success ? "success" : "error" });
            } else {
                // ADD new category
                const res = await axios.post(`https://goklyn-backend.vercel.app/api/projects/category`, newProjectCategory);
 
                setPopup({ show: true, message: res.data.message, type: res.data.success ? "success" : "error" });
            }

            fetchProjectCategories();
            setTimeout(() => {
                setPopup({ show: false, message: "", type: "success" });
                handleModalClose();
            }, 1200);
        } catch (error) {
            setPopup({ show: true, message: "Error saving category!", type: "error" });
            setTimeout(() => setPopup({ show: false, message: "", type: "error" }), 2000);
            console.error("Error saving project category:", error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white p-0 border border-blue-100 relative animate-fadeIn">

                {/* Popup message */}
                {popup.show && (
                    <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[60] px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition
                                ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                        {popup.message}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleModalSubmit} className="p-8 relative">
                    <button
                        type="button"
                        onClick={handleModalClose}
                        className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-red-500 transition"
                        aria-label="Close"
                    >
                        <FaTimes />
                    </button>

                    <h2 className="text-2xl font-bold mb-6 text-blue-700">
                        {update ? "Update Project Category" : "Add New Project Category"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">Title</label>
                            <input
                                name="title"
                                value={newProjectCategory.title}
                                onChange={handleNewCategoryChange}
                                required
                                className="w-full border px-3 py-2 rounded-lg mb-4"
                                placeholder="Category Title"
                            />

                            <label className="block text-sm font-semibold mb-1">Description</label>
                            <textarea
                                name="description"
                                value={newProjectCategory.description}
                                onChange={handleNewCategoryChange}
                                required
                                className="w-full border px-3 py-2 rounded-lg mb-4 resize-none"
                                rows={4}
                                placeholder="Brief Category description"
                            />

                            <label className="block text-sm font-semibold mb-1">Category</label>
                            <input
                                name="category"
                                value={newProjectCategory.category}
                                onChange={handleNewCategoryChange}
                                required
                                className="w-full border px-3 py-2 rounded-lg mb-4"
                                placeholder="Unique Category Key (e.g. cyber, web, dsml)"
                            />
                        </div>

                        {/* Right Column */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">Image</label>
                            <div className="flex items-center gap-4 mb-4">
                                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition">
                                    <FaRegImage className="text-3xl mb-1 text-blue-400" />
                                    <span className="text-xs text-gray-500">Upload</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleNewCategoryImage}
                                        className="hidden"
                                    />
                                </label>
                                {newProjectCategory.image && (
                                    <img
                                        src={newProjectCategory.image}
                                        alt="Preview"
                                        className="h-24 w-24 rounded-lg object-cover border shadow"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition"
                    >
                        {update ? "Update Project Category" : "Add Project Category"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectCategoryModel;
