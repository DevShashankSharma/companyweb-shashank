import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

const MediaCard = ({ media, idx, handleEdit, handleDelete, isAdminAuthenticated }) => {
    return (
        <div>
            <motion.div
                key={media._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200 rounded-3xl shadow-2xl p-6 sm:p-8 hover:scale-[1.03] hover:shadow-blue-200/60 transition-all duration-300 group overflow-hidden h-full"
            >
                {/* Edit & Delete Buttons */}
                {isAdminAuthenticated && (
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                        <button
                            onClick={() => handleEdit(media)}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 shadow transition"
                            title="Edit"
                        >
                            <FaEdit size={18} />
                        </button>
                        <button
                            onClick={() => handleDelete(media)}
                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700 shadow transition"
                            title="Delete"
                        >
                            <FaTrash size={18} />
                        </button>
                    </div>
                )}

                {/* Accent Gradient Bar */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 via-blue-300 to-blue-100 rounded-2xl" />

                {/* Media Image & Title */}
                <div className="flex items-center space-x-4 sm:space-x-5 mb-6">
                    <div className="relative flex-shrink-0">
                        <div className="absolute -inset-1 rounded-full blur-lg bg-blue-200 opacity-60 group-hover:opacity-80 transition" />
                        <img
                            src={media.image}
                            alt="Media Visual"
                            className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-cover rounded-full shadow-lg border-4 border-white relative z-10 transition-all duration-300"
                            style={{
                                aspectRatio: "1/1",
                                objectFit: "cover",
                                background: "#f3f4f6"
                            }}
                        />
                    </div>
                    <h4 className="text-lg sm:text-2xl font-extrabold text-gray-900 group-hover:text-blue-700 transition-colors duration-200 drop-shadow">
                        {media.title}
                    </h4>
                </div>

                {/* Description */}
                <p className="text-base text-gray-700 leading-relaxed mb-2">
                    {media.desc}
                </p>
            </motion.div>
        </div>
    );
};

export default MediaCard;
