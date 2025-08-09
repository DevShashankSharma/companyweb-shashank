import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProjectCard = ({ project, idx, handleEdit, handleDelete, isAdminAuthenticated }) => {
    const badgeText = project.category || project.type || "Uncategorized";

    return (
        <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.07 }}
            className="relative bg-white rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-[1.04] transition-all duration-300 flex flex-col overflow-hidden border border-gray-200"
            style={{ minHeight: 480, maxHeight: 600, height: "auto" }}
        >
            {/* Admin Action Buttons */}
            {isAdminAuthenticated && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                    <button
                        onClick={() => handleEdit(project)}
                        className="p-2 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 hover:bg-blue-200 text-blue-600 shadow transition"
                        title="Edit Project"
                    >
                        <FaEdit size={16} />
                    </button>
                    <button
                        onClick={() => handleDelete(project)}
                        className="p-2 rounded-full bg-gradient-to-br from-red-100 to-pink-100 hover:bg-red-200 text-red-600 shadow transition"
                        title="Delete Project"
                    >
                        <FaTrash size={16} />
                    </button>
                </div>
            )}

            {/* Project Image */}
            <div className="relative w-full" style={{ height: 180, minHeight: 180, maxHeight: 180 }}>
                {project.image ? (
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-t-3xl transition-transform duration-300"
                        style={{ minHeight: 180, maxHeight: 180, height: 180 }}
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.08 }}
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-t-3xl text-gray-400 text-sm italic border"
                        style={{ minHeight: 180, maxHeight: 180, height: 180 }}>
                        No Image
                    </div>
                )}
                {/* Badge */}
                <span className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg backdrop-blur-md tracking-wide z-10">
                    {badgeText}
                </span>
                <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Card Content */}
            <div className="flex flex-col flex-1 p-6 overflow-y-auto">
                {/* Title */}
                <h3 className="text-xl font-extrabold text-indigo-900 mb-2 text-center leading-tight group-hover:text-indigo-700 transition-colors">
                    {project.title}
                </h3>

                {/* Objective */}
                <p className="text-sm text-gray-600 mb-4 text-center">
                    {project.objective}
                </p>

                {/* Goals */}
                <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1 tracking-wide">Goals</h4>
                    <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                        {project.goals?.length > 0 ? (
                            project.goals.map((goal, i) => <li key={i}>{goal}</li>)
                        ) : (
                            <li className="italic text-gray-400">No goals added</li>
                        )}
                    </ul>
                </div>

                {/* More Details Button */}
                <div className="mt-auto">
                    <button
                        className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg hover:from-indigo-700 hover:to-blue-600 transition duration-300 text-base"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
