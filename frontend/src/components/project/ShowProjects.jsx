import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProjectCard from "../project/ProjectCard";
import ProjectModal from "../project/ProjectModal";

const ShowProjects = ({ isAdminAuthenticated }) => {
    const { type } = useParams();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({
        title: "", 
        objective: "",
        goals: [""], 
        image: null, 
        category: type,
    });
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState(null); 

    // Popup states
    const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
    const [confirmPopup, setConfirmPopup] = useState({ show: false, project: null });

    // Fetch projects from backend
    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/projects/?category=${type}`);
            setProjects(res.data || []);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            setProjects([]);
        }
        setLoading(false);
    }, [type]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Edit project
    const handleEdit = (project) => {
        setNewProject({ ...project });
        setId(project._id);
        setUpdate(true);
        setShowModal(true);
    };

    // Delete project
    const handleDelete = (project) => {
        setConfirmPopup({ show: true, project });
    };

    const confirmDelete = async () => {
        const project = confirmPopup.project;
        setConfirmPopup({ show: false, project: null });
        try {
            const res = await axios.delete(`http://localhost:5000/api/projects/${project._id}`);
            setProjects((prev) => prev.filter((p) => p._id !== project._id));
            setPopup({ show: true, message: res.data.message || "Project deleted!", type: "success" });
        } catch (error) {
            setPopup({ show: true, message: "Error deleting project!", type: "error" });
            console.error("Delete error:", error);
        }
    };

    const cancelDelete = () => {
        setConfirmPopup({ show: false, project: null });
    };

    // Auto-hide popup
    useEffect(() => {
        if (popup.show) {
            const timer = setTimeout(() => setPopup({ ...popup, show: false }), 1500);
            return () => clearTimeout(timer);
        }
    }, [popup]);

    return (
        <section className="py-20 bg-gray-50 text-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                {/* Popup */}
                {popup.show && (
                    <div
                        className={`fixed top-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition z-[1105]
            ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}
                    >
                        {popup.message}
                    </div>
                )}

                {/* Confirm Delete Popup */}
                {confirmPopup.show && (
                    <div className="fixed inset-0 z-[1102] flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">
                                Are you sure you want to delete "{confirmPopup.project?.title}"?
                            </h3>
                            <div className="flex justify-center gap-4 mt-6">
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold"
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={cancelDelete}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 font-semibold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
                        {type} Projects
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Browse all projects in this category.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="text-center py-10 text-lg text-gray-500">Loading...</div>
                ) : (
                    <>
                        {/* No Projects */}
                        {(!projects || projects.length === 0) ? (
                            <div className="col-span-full text-center text-gray-400">
                                <p className="text-lg mb-2">
                                    No projects {isAdminAuthenticated ? "added" : "available"} yet.
                                </p>
                                <p className="text-sm text-gray-500">
                                    {isAdminAuthenticated
                                        ? "Click 'Add New Project' to get started!"
                                        : "Projects will appear here once added by an administrator."}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {projects.map((proj, idx) => (
                                    <ProjectCard
                                        key={proj._id}
                                        project={proj}
                                        idx={idx}
                                        handleEdit={handleEdit}
                                        handleDelete={handleDelete}
                                        isAdminAuthenticated={isAdminAuthenticated}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Add New Project Button for Admin */}
                {isAdminAuthenticated && (
                    <div className="flex justify-center mt-8">
                        <button
                            onClick={() => {
                                setNewProject({
                                    title: "", 
                                    objective: "",
                                    goals: [""], 
                                    image: null, 
                                    category: type,
                                });
                                setUpdate(false);
                                setId(null);
                                setShowModal(true);
                            }}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-green-700 transition-all text-lg"
                        >
                            + Add New Project
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <ProjectModal
                    setShowModal={setShowModal}
                    setNewProject={setNewProject}
                    newProject={newProject}
                    update={update}
                    setUpdate={setUpdate}
                    id={id}
                    fetchProjects={fetchProjects}
                />
            )}
        </section>
    );
};

export default ShowProjects;
