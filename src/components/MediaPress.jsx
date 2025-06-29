import { motion } from "framer-motion";

const MediaPress = () => { 
    const featuredIn = [
        {
            title: "Founders Masterclass at RIC Jaipur",
            description: "Talk on ethical leadership and tech entrepreneurship.",
            icon: "🎓",
        },
        {
            title: "Virtual Internship Orientation",
            description: "Engaged 30+ interns with 40%+ women employability.",
            icon: "💼",
        },
    ];

    return (
        <section id="media" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <div className="grid md:grid-cols-2 gap-8">
                        {featuredIn.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative bg-white/60 backdrop-blur-lg border border-blue-100 rounded-2xl shadow-xl p-8 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 group"
                            >
                                {/* Accent Bar */}
                                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-300 rounded-2xl" />
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="text-4xl text-blue-600 bg-blue-100 rounded-full p-3 shadow group-hover:scale-110 transition-transform duration-200">
                                        {feature.icon}
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                                        {feature.title}
                                    </h4>
                                </div>
                                <p className="text-base text-gray-700 leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MediaPress;
