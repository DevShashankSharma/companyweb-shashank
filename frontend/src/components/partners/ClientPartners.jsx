import { motion } from 'framer-motion'
import TestimonialCarousel from '../testimonial/TestimonialCarousel';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WorkIcon from '@mui/icons-material/Work';
import { useEffect, useState, useCallback } from 'react';
import { FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import PartnerModal from './PartnerModel';
import axios from 'axios';

const clientsWorkedWith = [
  {
    title: "MVPs for Early-Stage Startups",
    description: "Built scalable and investor-ready MVPs to help startups validate and launch their ideas quickly.",
    icon: <RocketLaunchIcon fontSize="large" />
  },
  {
    title: "AI Dashboards for Ed-Tech Platforms",
    description: "Designed intelligent dashboards using machine learning for better learner analytics and engagement.",
    icon: <InsertChartIcon fontSize="large" />
  },
  {
    title: "Data Tools for NGOs",
    description: "Developed easy-to-use tools that help non-profits track, analyze, and report their impact data effectively.",
    icon: <VolunteerActivismIcon fontSize="large" />
  },
  {
    title: "B2B SaaS Development Teams",
    description: "Collaborated with SaaS teams to accelerate product development, refine architecture, and scale solutions.",
    icon: <WorkIcon fontSize="large" />
  }
];

const ClientPartners = ({ isAdminAuthenticated }) => {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [newPartner, setNewPartner] = useState({
    name: '',
    category: '',
    image: null,
  });

  const [partners, setPartners] = useState([]);
  const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
  const [confirmPopup, setConfirmPopup] = useState({ show: false, partner: null });

  // Fetch partners from MongoDB backend
  const fetchPartners = useCallback(async () => {
    try {
      const res = await axios.get("https://goklyn-backend.vercel.app/api/partners");
      setPartners(res.data || []);
    } catch (error) {
      setPartners([]);
      setPopup({ show: true, message: " Error fetching partners!", type: "error" });
    }
  }, []);

  // Show custom confirm popup instead of window.confirm
  const handleDelete = (partner) => {
    setConfirmPopup({ show: true, partner });
  };

  const confirmDelete = async () => {
    const partner = confirmPopup.partner;
    setConfirmPopup({ show: false, partner: null });
    try {
      const res = await axios.delete(`https://goklyn-backend.vercel.app/api/partners/${partner._id}`);
      setPopup({ show: true, message: res.data.message, type: res.data.success ? "success" : "error" });
      await fetchPartners();
    } catch (error) {
      setPopup({ show: true, message: error.message, type: "error" });
    }
  };

  const cancelDelete = () => {
    setConfirmPopup({ show: false, partner: null });
  };

  const handleEdit = (partner) => {
    setNewPartner(partner);
    setUpdate(true);
    setId(partner._id);
    setShowModal(true);
  };

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  useEffect(() => {
    if (popup.show) {
      const timer = setTimeout(() => setPopup({ ...popup, show: false }), 1500);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  const handleModalOpen = () => {
    setNewPartner({ name: '', category: '', image: null });
    setUpdate(false);
    setId("");
    setShowModal(true);
  };

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Network</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">"Those who trusted us, grew with us."</p>
        </motion.div>

        {/* Clients Worked With */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Who We've Worked With</h3>
            <p className="text-gray-600">Supporting startups, NGOs, and SaaS teams with innovative digital solutions.</p>
          </div>

          {/* Modern Marquee Animation */}
          <div
            className="relative overflow-x-hidden p-2"
            onMouseEnter={e => {
              const marquee = e.currentTarget.querySelector('.animate-marquee-modern');
              if (marquee) marquee.style.animationPlayState = 'paused';
            }}
            onMouseLeave={e => {
              const marquee = e.currentTarget.querySelector('.animate-marquee-modern');
              if (marquee) marquee.style.animationPlayState = 'running';
            }}
          >
            <div
              className="flex gap-8 animate-marquee-modern"
              style={{
                width: 'max-content',
                animation: 'marquee-modern 22s linear infinite',
                animationPlayState: 'running'
              }}
            >
              {clientsWorkedWith.concat(clientsWorkedWith).map((client, index) => (
                <div
                  key={client.title + index}
                  className="relative flex-shrink-0 w-[320px] md:w-[340px] h-[260px] bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-between hover:scale-[1.04] hover:shadow-2xl transition-all duration-300 border border-blue-100 group overflow-hidden mx-2"
                  style={{ flex: '0 0 340px', minHeight: 260, maxHeight: 260 }}
                >
                  {/* Icon */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-4xl mb-3 shadow-lg group-hover:scale-110 transition-transform duration-200">
                    {client.icon}
                  </div>
                  {/* Title */}
                  <h4 className="relative z-10 font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-200 text-center leading-tight min-h-[48px] flex items-center justify-center">
                    {client.title}
                  </h4>
                  {/* Description */}
                  <p className="relative z-10 text-gray-600 text-base text-center mb-2 px-2 leading-snug min-h-[48px] flex items-center justify-center">
                    {client.description}
                  </p>
                  {/* Animated underline */}
                  <span className="block w-12 h-1 bg-gradient-to-r from-blue-300 via-indigo-400 to-blue-300 rounded-full opacity-70 mx-auto group-hover:w-20 transition-all duration-300"></span>
                </div>
              ))}
            </div>
            {/* Gradient overlays for fade effect */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-20"></div>
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-20"></div>
          </div>

          {/* Marquee Animation Keyframes */}
          <style>
            {`
              @keyframes marquee-modern {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              @media (min-width: 768px) {
                .animate-marquee-modern {
                  min-width: 1020px;
                }
              }
            `}
          </style>
        </motion.div>

        {/* Industry Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
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
                <h3 className="text-lg font-bold mb-4 text-gray-800">Are you sure you want to delete this Partner?</h3>
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
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Industry Partners</h3>
            <p className="text-gray-600">Collaborating with leading technology and consulting firms</p>
          </div>

          <div>
            {
              partners.length === 0 ? (
                <div className="col-span-full text-center text-gray-400">
                  <p className="text-lg mb-2">No Partners {isAdminAuthenticated ? "uploaded" : "available"} yet.</p>
                  <p className="text-sm text-gray-500">
                    {isAdminAuthenticated ? "Click 'Upload New Partner' to get started!" : "Partners will appear here once uploaded by an administrator."}
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {partners.map((partner, index) => (
                    <motion.div
                      key={partner._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-all duration-300 border border-indigo-100 group overflow-hidden"
                    >
                      {/* Edit & Delete Buttons */}
                      {isAdminAuthenticated && (
                        <div className="absolute top-4 right-4 flex gap-2 z-10">
                          <button
                            onClick={() => handleEdit(partner)}
                            className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 shadow transition"
                            title="Edit"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(partner)}
                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700 shadow transition"
                            title="Delete"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      )}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-400 via-blue-400 to-indigo-200 opacity-30 blur-2xl z-0"></div>
                      <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 text-white text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <img src={partner.image} className="w-full h-full object-cover rounded-full border border-indigo-100" alt="partner" />
                      </div>
                      <h4 className="relative z-10 font-bold text-base text-gray-900 mb-2 group-hover:text-indigo-700 transition-colors duration-200 text-center">
                        {partner.name}
                      </h4>
                      <span className="relative z-10 px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                        {partner.category}
                      </span>
                    </motion.div>
                  ))}
                </div>
              )}
          </div>
          {/* Show upload button ONLY if admin is authenticated */}
          {isAdminAuthenticated && (
            <div className="flex justify-center my-8">
              <button
                onClick={handleModalOpen}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <FaUpload />
                <span>Upload New Partner</span>
              </button>
            </div>
          )}
          {/* Modal */}
          {showModal &&
            <PartnerModal
              setShowModal={setShowModal}
              setNewPartner={setNewPartner}
              newPartner={newPartner}
              update={update}
              setUpdate={setUpdate}
              id={id}
              fetchPartners={fetchPartners}
            />}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 bg-gray-50 rounded-lg p-8"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              What Our Clients Say's
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">Real voices. Real results.</p>
          </div>
          <TestimonialCarousel isAdminAuthenticated={isAdminAuthenticated} />
        </motion.div>
      </div>
    </section>
  )
}

export default ClientPartners;
