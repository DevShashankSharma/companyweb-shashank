import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import hr from '../assets/hr.jpg'
import ai from '../assets/ai.jpg'
import software from '../assets/softwareDevelopment.jpg'
import cybersecurity from '../assets/cyber.jpg'
import emergingTech from '../assets/emerging.webp'
import seo from '../assets/seo.webp'

const OurServices = () => {
  const services = [
    {
      title: "Software Development",
      description: "Accelerate your growth with custom web and mobile apps designed to solve your unique business challenges and scale as you do.",
      features: [
        "Custom Web & Mobile Apps",
        "MVP Development",
        "Scalable Architecture",
      ],
      icon: software,
      color: "blue",
      details: "We use the latest frameworks and cloud technologies to deliver robust, scalable, and secure software solutions."
    },
    {
      title: "AI / ML Solutions",
      description: "Unlock smarter decisions and automation with AI-powered solutions that turn your data into actionable insights.",
      features: [
        "Predictive Analytics",
        "AI Dashboards",
        "Natural Language Processing (NLP)",
        "Recommendation Engines"
      ],
      icon: ai,
      color: "green",
      details: "Our AI/ML solutions help automate processes, extract insights, and create personalized experiences for your users."
    },
    {
      title: "HR Tech",
      description: "Empower your HR team with tools that streamline recruitment, onboarding, and employee management for a happier, more productive workplace.",
      features: [
        "Smart Recruitment Systems",
        "Internal Portals",
        "Automation Tools",
      ],
      icon: hr,
      color: "purple",
      details: "We build HR platforms that streamline hiring, onboarding, and employee management with modern, user-friendly interfaces."
    },
    {
      title: "Cybersecurity",
      description: "Safeguard your business with comprehensive cybersecurity services that protect your data, reputation, and customer trust.",
      features: [
        "Ethical Hacking",
        "Security Audits",
        "Data Privacy",
        "Secure Architecture"
      ],
      icon: cybersecurity,
      color: "orange",
      details: "Protect your business with our comprehensive cybersecurity services, from penetration testing to compliance consulting."
    },
    {
      title: "Emerging Tech",
      description: "Stay ahead of the curve with R&D in quantum computing, blockchain, and emerging tech to future-proof your business.",
      features: [
        "Quantum Computing Concepts",
        "Research-Driven Solutions ",
      ],
      icon: emergingTech,
      color: "red",
      details: "Stay ahead of the curve with our R&D in quantum computing, blockchain, and other emerging technologies."
    },
    {
      title: "SEO & Web Optimization",
      description: "Increase your online visibility and conversions with data-driven SEO strategies and web performance optimization.",
      features: [
        "SEO Strategy",
        "Implementation",
        "Analytics & Reporting",
      ],
      icon: seo,
      color: "indigo",
      details: "Increase your reach and conversions with our data-driven SEO and web performance optimization services."
    }
  ]; 

  // Search state
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(null);

  // Filter services by search (advanced: match any part of title, description, features, or details)
  const filteredServices = services.filter(service => {
    const searchLower = search.toLowerCase();
    return (
      service.title.toLowerCase().includes(searchLower) ||
      service.description.toLowerCase().includes(searchLower) ||
      service.details.toLowerCase().includes(searchLower) ||
      service.features.some(feature => feature.toLowerCase().includes(searchLower))
    );
  });

  return (
    <section id="services" className="py-20 bg-gray-50 text-gray-800 relative overflow-hidden">
      {/* Animated background blob */}
      <motion.div
        className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-blue-200 via-green-100 to-blue-100 opacity-30 blur-3xl z-0"
        initial={{ scale: 0.8, opacity: 0.2 }}
        animate={{ scale: [0.8, 1.1, 0.9, 1], opacity: [0.2, 0.4, 0.3, 0.2] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-green-200 via-blue-100 to-blue-50 opacity-20 blur-2xl z-0"
        initial={{ scale: 1, opacity: 0.15 }}
        animate={{ scale: [1, 1.08, 0.95, 1], opacity: [0.15, 0.25, 0.18, 0.15] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We serve startups, ed-techs, NGOs, SaaS teams, and bold dreamers.
            <br />
            <strong>Your challenge. Our solution. Your growth.</strong>
          </p>
        </motion.div>
        {/* Divider */}
        <div className="w-24 h-1 mx-auto mb-10 bg-gradient-to-r from-blue-400 via-green-400 to-blue-400 rounded-full opacity-60" />
        {/* Search Bar */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full px-5 py-3 rounded-full border border-blue-200 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-base bg-white pr-12"
            />
            <motion.span
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10" cy="10" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </motion.span>
          </div>
        </motion.div>
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredServices.length === 0 ? (
              <motion.div
                className="col-span-full text-center text-gray-400 py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No services found.
              </motion.div>
            ) : (
              filteredServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(34,197,94,0.10)' }}
                  className={`relative rounded-2xl border border-gray-100 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 bg-white group`}
                >
                  {/* Accent Gradient Glow */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-tr from-blue-300 via-white to-green-200 opacity-20 blur-2xl z-0"></div>
                  <div className="relative z-10 p-8 flex flex-col items-center text-center">
                    <div className="mb-4">
                      <div className="relative flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-white via-blue-100 to-green-100 shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <img
                          src={service.icon}
                          alt={service.title}
                          className="w-18 h-18 object-cover rounded-full border-4 border-white shadow"
                          loading="lazy"
                        />
                        <span className="absolute inset-0 rounded-full border-2 border-blue-200 group-hover:border-green-300 transition-colors duration-300"></span>
                      </div>
                    </div>
                    <h3 className="relative z-10 text-lg font-bold text-gray-900 mb-2 text-center group-hover:text-blue-700 transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 text-base leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <div className="w-full">
                      <h4 className="text-sm font-semibold mb-3 text-gray-800 uppercase tracking-wide">Key Features</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-gray-700 justify-center">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 mr-2 text-xs shadow">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Learn More Button */}
                    <button
                      className="mt-6 px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400"
                      onClick={() => setExpanded(expanded === service.title ? null : service.title)}
                      aria-expanded={expanded === service.title}
                    >
                      {expanded === service.title ? 'Hide Details' : 'Learn More'}
                    </button>
                    {/* Expandable Details */}
                    <AnimatePresence>
                      {expanded === service.title && (
                        <motion.div
                          key="details"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden mt-4 text-sm text-gray-600 bg-blue-50 rounded-lg p-4 shadow-inner"
                        >
                          {service.details}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-blue-400 via-green-400 to-blue-200 rounded-full opacity-60"></div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default OurServices