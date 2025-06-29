import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TestimonialCarousel({ testimonials }) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);
    const autoSlideRef = useRef();

    // Auto-slide every 5 seconds
    useEffect(() => {
        autoSlideRef.current = () => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % testimonials.length);
        };
    });

    useEffect(() => {
        const interval = setInterval(() => autoSlideRef.current(), 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

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

    return (
        <div className="flex items-center justify-center w-full gap-4 relative">
            {/* Prev Button */}
            <button
                onClick={prev}
                className="p-3 rounded-full bg-white border border-gray-200 hover:bg-blue-100 text-blue-600 shadow transition absolute left-0 top-1/2 -translate-y-1/2 z-10"
                aria-label="Previous testimonial"
            >
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21l-7-7 7-7" /></svg>
            </button>
            {/* Carousel */}
            <div className="flex-1 flex justify-center overflow-hidden relative" style={{ minHeight: 260 }}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={testimonials[current].name + current}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "tween", duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="relative bg-white shadow-lg rounded-2xl px-8 py-10 text-center border border-gray-200 flex flex-col items-center group hover:bg-blue-50 transition-colors duration-300 w-full"
                        style={{ minHeight: 220 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute left-6 top-6 text-5xl text-blue-200 opacity-60 pointer-events-none select-none"
                        >“</motion.div>
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl mb-4 border-4 border-blue-100 shadow-lg group-hover:border-blue-300 transition text-blue-100 group-hover:text-blue-500">
                            {testimonials[current].avatar
                                ? <img src={testimonials[current].avatar} alt={testimonials[current].name} className="w-full h-full rounded-full object-cover" />
                                : <span>{testimonials[current].name[0]}</span>
                            }
                        </div>
                        <p className="text-gray-800 italic mb-4 z-10 text-lg leading-relaxed"> {testimonials[current].quote} </p>
                        <div className="mt-auto z-10">
                            <p className="text-base font-semibold text-blue-700">{testimonials[current].name}</p>
                            <p className="text-xs text-gray-500">{testimonials[current].role}</p>
                        </div>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute right-6 bottom-6 text-5xl text-blue-200 opacity-60 pointer-events-none select-none"
                        >”</motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* Next Button */}
            <button
                onClick={next}
                className="p-3 rounded-full bg-white border border-gray-200 hover:bg-blue-100 text-blue-600 shadow transition absolute right-0 top-1/2 -translate-y-1/2 z-10"
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
        </div>
    );
}

export default TestimonialCarousel;