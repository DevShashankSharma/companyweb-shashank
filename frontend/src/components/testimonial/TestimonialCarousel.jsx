import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaUpload } from "react-icons/fa";
import TestimonialModel from './TestimonialModel';

function TestimonialCarousel({ isAdminAuthenticated }) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const autoSlideRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [update, setUpdate] = useState(false);
    const [id, setId] = useState("");
    const [newTestimonial, setNewTestimonial] = useState({
        name: '',
        quote: '',
        role: '',
    });
    const [testimonials, setTestimonials] = useState([]);
    const [popup, setPopup] = useState({ show: false, message: "", type: "success" });
    const [confirmPopup, setConfirmPopup] = useState({ show: false, testimonial: null });
    const [isHovered, setIsHovered] = useState(false);

    // Fetch testimonials from MongoDB backend
    const fetchTestimonials = async () => {
        try {
            const res = await fetch("https://goklyn-backend.vercel.app/api/testimonials");
            const data = await res.json(); 
            setTestimonials(data.testimonials || []); 
        } catch (error) {
            setTestimonials([]);
            setPopup({ show: true, message: "Error fetching testimonials!", type: "error" });
        }
    };

    // Show custom confirm popup instead of window.confirm
    const handleDelete = (testimonial) => {
        setConfirmPopup({ show: true, testimonial });
    };

    const confirmDelete = async () => {
        const testimonial = confirmPopup.testimonial;
        setConfirmPopup({ show: false, testimonial: null });
        try {
            const res = await fetch(`https://goklyn-backend.vercel.app/api/testimonials/${testimonial._id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            setPopup({ show: true, message: data.message || "Testimonial deleted!", type: data.success ? "success" : "error" });
            await fetchTestimonials();
        } catch (error) {
            setPopup({ show: true, message: "Error deleting testimonial!", type: "error" });
        }
        setConfirmPopup({ show: false, testimonial: null });
    };

    const cancelDelete = () => {
        setConfirmPopup({ show: false, testimonial: null });
    };

    const handleEdit = (testimonial) => {
        setNewTestimonial(testimonial);
        setUpdate(true);
        setId(testimonial._id);
        setShowModal(true);
    };

    useEffect(() => {
        fetchTestimonials();
        // eslint-disable-next-line
    }, []);

    const handleModalOpen = () => {
        setNewTestimonial({ name: '', quote: '', role: '' });
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

    // Auto-slide every 5 seconds
    useEffect(() => {
        autoSlideRef.current = () => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % testimonials.length);
        };
    });

    useEffect(() => {
        if (isHovered) return; // Pause when hovered
        const interval = setInterval(() => autoSlideRef.current(), 5000);
        return () => clearInterval(interval);
    }, [testimonials.length, isHovered]);

    const next = () => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setDirection(-1);
        setCurrent((prev) =>
            (prev - 1 + testimonials.length) % testimonials.length
        );
    };

    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0,
            position: "absolute",
        }),
        center: {
            x: 0,
            opacity: 1,
            position: "relative",
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        },
        exit: (dir) => ({
            x: dir > 0 ? -300 : 300,
            opacity: 0,
            position: "absolute",
        }),
    };

    useEffect(() => {
        // If current index is out of bounds after testimonials update, reset to 0
        if (current >= testimonials.length && testimonials.length > 0) {
            setCurrent(0);
        }
    }, [testimonials, current]);

    return (
        <div>
            {testimonials.length === 0 ? (
                <div className="col-span-full text-center text-gray-400">
                    <p className="text-lg mb-2">No testimonial {isAdminAuthenticated ? "uploaded" : "available"} yet.</p>
                    <p className="text-sm text-gray-500">
                        {isAdminAuthenticated ? "Click 'Upload Testimonial' to get started!" : "Testimonial will appear here once uploaded by an administrator."}
                    </p>
                </div>
            ) : (
                testimonials.length > 0 && testimonials[current] && (
                    <div className="flex items-center justify-center w-full gap-4 relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
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
                                    <h3 className="text-lg font-bold mb-4 text-gray-800">Are you sure you want to delete this Testimonial?</h3>
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
                        {/* Prev Button */}
                        <button
                            onClick={prev}
                            className="p-3 rounded-full hover:scale-110 active:scale-95 text-blue-600 transition absolute -left-10 top-1/2 -translate-y-1/2 z-10"
                            aria-label="Previous testimonial"
                        >
                            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21l-7-7 7-7" /></svg>
                        </button>
                        {/* Carousel */}
                        <div
                            className="flex-1 flex justify-center overflow-hidden relative xs:px-10 h-[300px] xs:h-[240px] sm:h-[200px]"
                        >
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={testimonials[current]._id + current}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ type: "tween", duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                                    className="relative bg-white shadow-lg rounded-2xl px-4 py-8 md:py-12 text-center border border-gray-200 flex flex-col items-center group hover:bg-blue-50 transition-colors duration-300 w-full h-full"
                                >
                                    {/* Edit & Delete Buttons */}
                                    {isAdminAuthenticated && <div className="absolute top-3 right-3 flex gap-2 z-10">
                                        <button
                                            onClick={() => handleEdit(testimonials[current])}
                                            className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                                            title="Edit"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(testimonials[current])}
                                            className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition"
                                            title="Delete"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>}
                                    {/* Opening Quote */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0.5 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute left-4 md:left-8 top-4 md:top-8 text-3xl md:text-5xl text-blue-200 opacity-60 pointer-events-none select-none"
                                    >“</motion.div>

                                    <div className="relative flex flex-col items-center justify-center w-full h-full">
                                        {/* Quote Text */}
                                        <p className="text-gray-800 italic z-10 text-lg md:text-xl leading-relaxed break-words max-w-2xl mx-auto mb-2 md:mb-4">
                                            {testimonials[current].quote}
                                        </p>

                                        {/* Divider Line */}
                                        <div className="w-16 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 rounded-full opacity-70 mx-auto mb-2 md:mb-3"></div>

                                        {/* Name & Role */}
                                        <div className="z-10 flex flex-col items-center md:items-center gap-0.5">
                                            <p className="text-base md:text-lg font-semibold text-blue-700 tracking-wide">{testimonials[current].name}</p>
                                            <p className="text-xs md:text-sm text-gray-500">{testimonials[current].role}</p>
                                        </div>
                                    </div>

                                    {/* Closing Quote */}
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0.5 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute right-4 md:right-8 bottom-4 md:bottom-8 text-3xl md:text-5xl text-blue-200 opacity-60 pointer-events-none select-none"
                                    >”</motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        {/* Next Button */}
                        <button
                            onClick={next}
                            className="p-3 rounded-full hover:scale-110 active:scale-95 text-blue-600 transition absolute -right-10 top-1/2 -translate-y-1/2 z-10"
                            aria-label="Next testimonial"
                        >
                            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5l7 7-7 7" /></svg>
                        </button>
                        {/* Dots */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrent(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx
                                        ? "bg-blue-500 scale-125 shadow-lg"
                                        : "bg-blue-200 hover:bg-blue-400"
                                        }`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div >
                )
            )}
            {/* Show upload button ONLY if admin is authenticated */}
            {isAdminAuthenticated && (
                <div className="flex justify-center mt-16">
                    <button
                        onClick={handleModalOpen}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center space-x-2"
                    >
                        <FaUpload />
                        <span>Upload New Testimonial</span>
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal &&
                <TestimonialModel
                    setShowModal={setShowModal}
                    setNewTestimonial={setNewTestimonial}
                    newTestimonial={newTestimonial}
                    update={update}
                    setUpdate={setUpdate}
                    id={id}
                    fetchTestimonials={fetchTestimonials}
                />}
        </div>
    );
}

export default TestimonialCarousel;