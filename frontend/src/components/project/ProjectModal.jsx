import { FaRegImage, FaTimes } from "react-icons/fa";
import { useState } from "react";
import axios from 'axios';

const ProjectModal = ({
    newProject,
    setNewProject,
    setShowModal,
    setUpdate,
    update,
    id,
    fetchProjects
}) => {
    const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
    const [uploading, setUploading] = useState(false);

    // Close modal
    const handleModalClose = () => {
        setShowModal(false);
        setNewProject({
            title: '',
            objective: '',
            goals: [''],
            category: newProject.category,
            image: '',
        });
        setUpdate(false);
    };

    // Input change handler
    const handleNewProjectChange = (e) => {
        const { name, value } = e.target;
        setNewProject(prev => ({ ...prev, [name]: value }));
    };

    // Cloudinary upload
    const handleNewProjectImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setPopup({ show: true, message: "Uploading image...", type: "success" });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_unsigned_preset");

        try {
            const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );
            setNewProject(prev => ({
                ...prev,
                image: res.data.secure_url
            }));
            setPopup({ show: true, message: "Image uploaded successfully!", type: "success" });
        } catch (err) {
            console.error("Image upload error:", err);
            setPopup({ show: true, message: "Image upload failed!", type: "error" });
        } finally {
            setUploading(false);
            setTimeout(() => setPopup({ show: false, message: "", type: "success" }), 1200);
        }
    };

    // Submit form
    const handleModalSubmit = async (e) => {
        e.preventDefault();

        const goalsArr = (typeof newProject.goals === "string"
            ? newProject.goals.split(',').map(t => t.trim()).filter(Boolean)
            : newProject.goals);

        const projectToSave = { ...newProject, goals: goalsArr };

        try {
            if (update) {
                const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(projectToSave)
                });
                const data = await res.json();
                setPopup({ show: true, message: data.message, type: data.success ? "success" : "error" });
            } else {
                const res = await fetch(`http://localhost:5000/api/projects`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(projectToSave)
                });
                const data = await res.json();
                setPopup({ show: true, message: data.message, type: data.success ? "success" : "error" });
            }

            fetchProjects();
            setTimeout(() => {
                handleModalClose();
                setPopup({ show: false, message: "", type: "success" });
            }, 1200);
        } catch (err) {
            console.error(err);
            setPopup({ show: true, message: " Something went wrong!", type: "error" });
            setTimeout(() => setPopup({ show: false, message: "", type: "error" }), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white p-0 border border-blue-100 relative animate-fadeIn">

                {/* Popup */}
                {popup.show && (
                    <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[60] px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition
                        ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                        {popup.message}
                    </div>
                )}

                <form onSubmit={handleModalSubmit} className="p-8 relative">
                    <button
                        type="button"
                        onClick={handleModalClose}
                        className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-red-500 transition"
                    >
                        <FaTimes />
                    </button>

                    <h2 className="text-2xl font-bold mb-6 text-blue-700">
                        {update ? "Update Project" : "Add New Project"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left column */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">Title</label>
                            <input
                                name="title"
                                value={newProject.title}
                                onChange={handleNewProjectChange}
                                required
                                className="w-full border px-3 py-2 rounded-lg mb-4"
                                placeholder="Project Title"
                            />

                            <label className="block text-sm font-semibold mb-1">Category</label>
                            <input
                                name="category"
                                value={newProject.category}
                                readOnly
                                disabled
                                className="w-full border px-3 py-2 rounded-lg mb-4 bg-gray-100 text-gray-500 cursor-not-allowed"
                            />

                            <label className="block text-sm font-semibold mb-1">Objective</label>
                            <textarea
                                name="objective"
                                value={newProject.objective}
                                onChange={handleNewProjectChange}
                                required
                                className="w-full border px-3 py-2 rounded-lg mb-4 resize-none"
                                rows={4}
                                placeholder="Brief project objective"
                            />
                        </div>

                        {/* Right column */}
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                Goals <span className="text-xs text-gray-400">(comma separated)</span>
                            </label>
                            <textarea
                                name="goals"
                                value={typeof newProject.goals === "string" ? newProject.goals : newProject.goals.join(', ')}
                                onChange={handleNewProjectChange}
                                className="w-full border px-3 py-2 rounded-lg mb-4"
                                placeholder="Goal 1, Goal 2, ..."
                            />

                            <label className="block text-sm font-semibold mb-1">Image</label>
                            <div className="flex items-center gap-4 mb-4">
                                <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 transition">
                                    <FaRegImage className="text-3xl text-blue-400 mb-1" />
                                    <span className="text-xs text-gray-500">{uploading ? "Uploading..." : "Upload"}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleNewProjectImage}
                                        className="hidden"
                                    />
                                </label>
                                {newProject.image && (
                                    <img
                                        src={newProject.image}
                                        alt="Preview"
                                        className="h-24 w-24 rounded-lg object-cover border shadow"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={uploading}
                        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition"
                    >
                        {update ? "Update Project" : "Add Project"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectModal;
