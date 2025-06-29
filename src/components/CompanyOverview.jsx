import { motion } from 'framer-motion'
import overviewBg from '../assets/overviewbg.jpg';
import inovation from '../assets/inovation.jpg';
import integrity from '../assets/integrity.jpg';
import inclusiveGrowth from '../assets/inclusiveGrowth.png';
import clientCentric from '../assets/clientCentric.jpg';
import mission from '../assets/mission.png';
import vision from '../assets/vision.jpg'

const CompanyOverview = () => {
  const coreValues = [
    {
      title: "Innovation with Purpose",
      description: "Driving meaningful innovation that addresses real-world challenges and creates lasting impact.",
      icon: inovation
    },
    {
      title: "Integrity in Execution",
      description: "Upholding honesty, transparency, and ethical standards in every action and decision.",
      icon: integrity
    },
    {
      title: "Inclusive Growth",
      description: "Fostering diversity and enabling opportunities for all to thrive together.",
      icon: inclusiveGrowth
    },
    {
      title: "Client-Centric Solutions",
      description: "Designing services and products with deep empathy and focus on client success.",
      icon: clientCentric
    },
  ];

  return (
    <section id="overview" className="py-20 bg-white relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${overviewBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.40,
          filter: 'blur(2px)',
        }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-900">Goklyn</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A purpose-driven IT services and consulting firm empowering startups and small businesses with <strong>future-ready technology</strong>. From secure development to AI/ML, SEO, and even quantum computing.
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg"
          >
            <img
              src={vision}
              alt="vision"
              className="w-full h-34 object-cover  mx-auto mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To become a globally respected IT consultancy and digital transformation partner that
              uplifts communities and builds sustainable futures through reliable, ethical, and inclusive
              technology.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg"
          >
            <img
              src={mission}
              alt="mission"
              className="w-full h-34 object-cover  mx-auto mb-4 shadow-lg"
            />
            <h2 className="text-2xl font-bold text-green-900 text-center mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To deliver smart, scalable, and secure solutions that empower startups and small businesses to thrive in a digitally evolving world.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            “We’re not just building technology — we’re building a future.”
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={value.icon}
                alt={value.title}
                className="w-18 h-18 object-cover rounded-full mx-auto mb-4 shadow"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompanyOverview
