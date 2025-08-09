import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import CategoryCard from './CategoryCard';
import ProjectCategoryModel from './ProjectCategoryModel';


const Projects = ({ isAdminAuthenticated }) => {
  const [projectCategories, setProjectCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [newProjectCategory, setNewProjectCategory] = useState({
    title: '',
    description: '',
    image: null,
    category: ''
  });
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState(null);

  // Popup states
  const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
  const [confirmPopup, setConfirmPopup] = useState({ show: false, category: null });

  // Fetch all categories
  const fetchProjectCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://goklyn-backend.vercel.app/api/projects/categories');
      const categories = res.data.categories?.map(cat => ({
        ...cat,
        image: cat.image
      })) || [];
      setProjectCategories(categories);
    } catch (err) {
      console.error('Failed to fetch project categories:', err);
      setProjectCategories([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjectCategories();
  }, [fetchProjectCategories]);

  // Edit category
  const handleEdit = (category) => {
    setNewProjectCategory({
      ...category,
    });
    setId(category._id);
    setUpdate(true);
    setShowModal(true);
  };

  // Delete category (show confirm popup)
  const handleDelete = (category) => {
    setConfirmPopup({ show: true, category });
  };

  // Confirm delete
  const confirmDelete = async () => {
    const category = confirmPopup.category;
    setConfirmPopup({ show: false, category: null });
    try {
      const res = await axios.delete(`https://goklyn-backend.vercel.app/api/projects/category/${category._id}`);
      setProjectCategories(prev => prev.filter(cat => cat._id !== category._id));
      setPopup({ show: true, message: res.data.message, type: res.data.success ? "success" : "error" });
    } catch (err) {
      setPopup({ show: true, message: "Failed to delete project category.", type: "error" });
      console.error('Delete error:', err);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setConfirmPopup({ show: false, category: null });
  };

  // Auto-hide popup
  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => setPopup({ ...popup, show: false }), 1500);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  return (
    <section id="projects" className="py-20 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        {/* Popup */}
        {popup.show && (
          <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition z-[1105]
            ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {popup.message}
          </div>
        )}

        {/* Confirm Delete Popup */}
        {confirmPopup.show && (
          <div className="fixed inset-0 z-[1102] flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
              <h3 className="text-lg font-bold mb-4 text-gray-800">
                Are you sure you want to delete category "{confirmPopup.category?.title}"?
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bold ideas. Real-world impact.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-10 text-lg text-gray-500">Loading...</div>
        ) : (
          <>
            {/* No Categories */}
            {(!projectCategories || projectCategories.length === 0) ? (
              <div className="col-span-full text-center text-gray-400">
                <p className="text-lg mb-2">No projects {isAdminAuthenticated ? "uploaded" : "available"} yet.</p>
                <p className="text-sm text-gray-500">
                  {isAdminAuthenticated ? "Click 'Add New Project Type' to get started!" : "Projects will appear here once uploaded by an administrator."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 relative">
                {projectCategories.map((cat, idx) => (
                  <div key={cat._id}>
                    <CategoryCard
                      category={cat}
                      idx={idx}
                      isAdmin={isAdminAuthenticated}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Add New Type Button for Admin */}
        {isAdminAuthenticated && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                setNewProjectCategory({
                  title: '',
                  description: '',
                  image: null,
                  category: ''
                });
                setUpdate(false);
                setId(null);
                setShowModal(true);
              }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-green-700 transition-all text-lg"
            >
              + Add New Project Category
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <ProjectCategoryModel
          setShowModal={setShowModal}
          setNewProjectCategory={setNewProjectCategory}
          newProjectCategory={newProjectCategory}
          update={update}
          setUpdate={setUpdate}
          id={id}
          fetchProjectCategories={fetchProjectCategories}
        />
      )}
    </section>
  );
};

export default Projects;
