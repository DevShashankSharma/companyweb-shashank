import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const TestimonialModel = ({
    setShowModal,
    newTestimonial,
    setNewTestimonial,
    update,
    setUpdate,
    id,
    fetchTestimonials
}) => {
    const [popup, setPopup] = useState({ show: false, message: "", type: "success" });

    // Modal handlers
    const handleModalClose = () => {
        setShowModal(false);
        setUpdate(false);
        setNewTestimonial({
            name: '',
            quote: '',
            role: '',
        });
    };

    const handleNewTestimonialChange = (e) => {
        const { name, value } = e.target;
        setNewTestimonial(prev => ({ ...prev, [name]: value }));
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();
        try {
            let res, data;
            if (update) {
                res = await fetch(`https://goklyn-backend.vercel.app/api/testimonials/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newTestimonial)
                });
                data = await res.json();
                setPopup({ show: true, message: data.message || "Testimonial updated!", type: data.success ? "success" : "error" });
                setUpdate(false);
                await fetchTestimonials();
            } else {
                res = await fetch("https://goklyn-backend.vercel.app/api/testimonials", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...newTestimonial, createdAt: new Date() })
                });
                data = await res.json();
                setPopup({ show: true, message: data.message || "Testimonial added!", type: data.success ? "success" : "error" });
                await fetchTestimonials();
            }
        } catch (err) {
            setPopup({ show: true, message: "❌ Something went wrong!", type: "error" });
            setTimeout(() => setPopup({ show: false, message: "", type: "error" }), 1500);
        }
        setTimeout(() => {
            handleModalClose();
            setPopup({ show: false, message: "", type: "success" });
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-1101 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white p-0 border border-blue-100 relative animate-fadeIn">
                {/* Popup */}
                {popup.show && (
                    <div className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-[1105] px-6 py-3 rounded-lg shadow-lg text-white font-semibold transition
                        ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
                        {popup.message}
                        <button
                            className="ml-4 text-white font-bold"
                            onClick={() => setPopup({ show: false, message: "", type: popup.type })}
                        >
                            <FaTimes />
                        </button>
                    </div>
                )}
                <form
                    onSubmit={handleModalSubmit}
                    className="p-8 relative"
                >
                    <button
                        type="button"
                        onClick={handleModalClose}
                        className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-red-500 transition"
                        aria-label="Close"
                    >
                        <FaTimes />
                    </button>
                    <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
                        <span className="inline-block w-2 h-6 bg-blue-500 rounded-full mr-2"></span>
                        {update ? "Update Testimonial" : "Add New Testimonial"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-gray-700">Name</label>
                            <input
                                name="name"
                                value={newTestimonial.name}
                                onChange={handleNewTestimonialChange}
                                required
                                className="w-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-3 py-2 rounded-lg mb-4 transition"
                                placeholder="Client name"
                            />

                            <label className="block text-sm font-semibold mb-1 text-gray-700">Role</label>
                            <input
                                name="role"
                                value={newTestimonial.role}
                                onChange={handleNewTestimonialChange}
                                className="w-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-3 py-2 rounded-lg mb-4 transition"
                                placeholder="e.g. NGO Coordinator, Startup Founder"
                            />

                            <label className="block text-sm font-semibold mb-1 text-gray-700">Quote</label>
                            <textarea
                                name="quote"
                                value={newTestimonial.quote}
                                onChange={handleNewTestimonialChange}
                                required
                                className="w-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-3 py-2 rounded-lg mb-4 transition resize-none"
                                rows={4}
                                placeholder="Quote"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition active:scale-[.95]"
                    >
                        {update ? "Update Testimonial" : "Add Testimonial"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TestimonialModel;
