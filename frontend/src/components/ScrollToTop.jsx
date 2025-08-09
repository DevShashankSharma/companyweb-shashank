import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // or use 'auto'
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {showButton && (
                <button
                    onClick={handleClick}
                    className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                    aria-label="Scroll to top"
                >
                    <FaArrowUp className="text-xl" />
                </button>
            )}
        </>
    );
}
