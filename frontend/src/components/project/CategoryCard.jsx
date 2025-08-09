import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, idx, isAdmin, onEdit, onDelete }) => {
    const navigate = useNavigate();

    const handleViewProjects = (type) => {
        navigate(`/showprojects/${type}`, { state: { type } });
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: idx * 0.1 } },
        hover: { scale: 1.05, boxShadow: "0 15px 35px rgba(0,0,0,0.15)" },
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true }}
            className="relative rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-xl shadow-lg 
                 flex flex-col cursor-pointer transition-all duration-300 overflow-hidden"
            style={{ borderTop: `4px solid ${category.color || "#6366f1"}`, minHeight: 420, height: 420, maxHeight: 420 }}
        >
            {/* Admin Buttons */}
            {isAdmin && (
                <div className="absolute top-3 right-3 flex gap-2 z-20">
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.stopPropagation(); onEdit(category); }}
                        className="p-2 bg-white/80 backdrop-blur-md rounded-full text-blue-600 
                       hover:bg-blue-100 shadow-sm transition"
                        title="Edit Category"
                    >
                        <FaEdit size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.stopPropagation(); onDelete(category); }}
                        className="p-2 bg-white/80 backdrop-blur-md rounded-full text-red-600 
                       hover:bg-red-100 shadow-sm transition"
                        title="Delete Category"
                    >
                        <FaTrash size={16} />
                    </motion.button>
                </div>
            )}

            {/* Full-width Image */}
            <div className="relative w-full h-40 md:h-48 overflow-hidden">
                {category.image ? (
                    <motion.img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover rounded-t-3xl "
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.08 }}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-t-3xl 
                          text-gray-400 text-sm italic border">
                        No Image
                    </div>
                )}
                <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Title */}
            <h2 className="text-center font-bold text-lg md:text-xl text-indigo-900 mt-3 px-4 
                     group-hover:text-indigo-700 transition-colors">
                {category.title}
            </h2>

            {/* Description */}
            <p className="text-center text-sm text-gray-600 px-5 mt-1 line-clamp-3">
                {category.description}
            </p>

            {/* Type */}
            <p className="text-xs text-gray-400 text-center mt-1">
                Category: <span className="text-indigo-500 font-medium">{category.category || "N/A"}</span>
            </p>

            {/* Button */}
            <div className="mt-auto p-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 
                     hover:from-indigo-700 hover:to-blue-600 shadow-md transition"
                    onClick={() => handleViewProjects(category.category)}
                >
                    View Projects
                </motion.button>
            </div>
        </motion.div>
    );
};

export default CategoryCard;
