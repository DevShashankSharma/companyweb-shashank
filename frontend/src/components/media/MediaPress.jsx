import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { FaUpload } from "react-icons/fa";
import MediaCard from "./MediaCard";
import MediaModal from "./MediaModal";

const MediaPress = ({ isAdminAuthenticated }) => {
    const [showModal, setShowModal] = useState(false);
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState("");
    const [newMedia, setNewMedia] = useState({
        title: '',
        desc: '',
        image: null,
    });

    const [mediaAll, setMediaAll] = useState([]);
    const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
    const [confirmPopup, setConfirmPopup] = useState({ show: false, media: null });

    // Fetch media from MongoDB backend
    const fetchMedia = useCallback(async () => {
        try {
            const res = await fetch("https://goklyn-backend.vercel.app/api/media");
            const data = await res.json();
            setMediaAll(data.mediaList || []); 
        } catch (err) {
            setMediaAll([]);
            setPopup({ show: true, message: "Error fetching media!", type: "error" });
        }
    }, []);

    // Show custom confirm popup instead of window.confirm
    const handleDelete = (media) => {
        setConfirmPopup({ show: true, media });
    };

    const confirmDelete = async () => {
        const media = confirmPopup.media;
        setConfirmPopup({ show: false, media: null });
        try {
            const res = await fetch(`https://goklyn-backend.vercel.app/api/media/${media._id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            setPopup({ show: true, message: data.message || "Media deleted!", type: data.success ? "success" : "error" });
            await fetchMedia();
        } catch (error) {
            setPopup({ show: true, message: "Error deleting Media!", type: "error" });
        }
    };

    const cancelDelete = () => {
        setConfirmPopup({ show: false, media: null });
    };

    const handleEdit = (media) => {
        setNewMedia(media);
        setUpdate(true);
        setId(media._id);
        setShowModal(true);
    };

    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]);

    const handleModalOpen = () => {
        setNewMedia({ title: '', desc: '', image: null });
        setUpdate(false);
        setId("");
        setShowModal(true);
    };

    useEffect(() => {
        if (popup.show) {
            const timer = setTimeout(() => setPopup({ ...popup, show: false }), 1500);
            return () => clearTimeout(timer);
        }
    }, [popup]);

    return (
        <section id="media" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Popup */}
                {popup.show && (
                    <div className={`fixed top-8 left-1/2 transform -translate-x-1/2  px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition z-[1105]
            ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                        {popup.message}
                    </div>
                )}

                {/* Confirm Delete Popup */}
                {confirmPopup.show && (
                    <div className="fixed inset-0 z-[1102] flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">Are you sure you want to delete this media?</h3>
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
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Media & Press
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        “We believe in creating leaders, not just code.”
                    </p>
                </motion.div>

                {/* Featured */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mb-16"
                >
                    <div>
                        {
                            mediaAll.length === 0 ? (
                                <div className="col-span-full text-center text-gray-400">
                                    <p className="text-lg mb-2">No Media {isAdminAuthenticated ? "uploaded" : "available"} yet.</p>
                                    <p className="text-sm text-gray-500">
                                        {isAdminAuthenticated ? "Click 'Upload Media' to get started!" : "Media will appear here once uploaded by an administrator."}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {mediaAll.map((media, idx) => (
                                        <MediaCard
                                            key={media._id}
                                            media={media}
                                            idx={idx}
                                            handleDelete={handleDelete}
                                            handleEdit={handleEdit}
                                            isAdminAuthenticated={isAdminAuthenticated}
                                        />
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </motion.div>
            </div>
            {/* Show upload button ONLY if admin is authenticated */}
            {isAdminAuthenticated && (
                <div className="flex justify-center my-8">
                    <button
                        onClick={handleModalOpen}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center space-x-2"
                    >
                        <FaUpload />
                        <span>Upload Media</span>
                    </button>
                </div>
            )}
            {/* Modal */}
            {showModal &&
                <MediaModal
                    setShowModal={setShowModal}
                    setNewMedia={setNewMedia}
                    newMedia={newMedia}
                    update={update}
                    setUpdate={setUpdate}
                    id={id}
                    fetchMedia={fetchMedia} 
                />}
        </section>
    );
};

export default MediaPress;
