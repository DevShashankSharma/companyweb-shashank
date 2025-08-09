import { motion } from 'framer-motion' 
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import GavelIcon from '@mui/icons-material/Gavel'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import ClientPartners from './partners/ClientPartners'
import MediaPress from './media/MediaPress'

const CompanyOverview = ({ isAdminAuthenticated }) => {
  const coreValues = [
    {
      title: "Innovation with Purpose",
      description: "Driving meaningful innovation that addresses real-world challenges and creates lasting impact.",
      icon: <LightbulbIcon fontSize="large" />
    },
    {
      title: "Integrity in Execution",
      description: "Upholding honesty, transparency, and ethical standards in every action and decision.",
      icon: <GavelIcon fontSize="large" />
    },
    {
      title: "Inclusive Growth",
      description: "Fostering diversity and enabling opportunities for all to thrive together.",
      icon: <Diversity3Icon fontSize="large" />
    },
    {
      title: "Client-Centric Solutions",
      description: "Designing services and products with deep empathy and focus on client success.",
      icon: <EmojiPeopleIcon fontSize="large" />
    },
  ]

  return (
    <>
      <section id="overview" className="pb-20 pt-22 bg-white relative overflow-hidden">
        {/* Background Image */}
        {/* <div
          className="absolute inset-0 w-full h-full z-0"
          aria-hidden="true"
          style={{
            backgroundImage: `url(${overviewBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.40,
            filter: 'blur(2px)',
          }}
        ></div> */}

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
          {/* <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg"
            >
              <img
                src={vision}
                alt="vision"
                className="w-full h-34 object-cover mx-auto mb-4 shadow-lg"
              />
              <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To become a globally respected IT consultancy and digital transformation partner that
                uplifts communities and builds sustainable futures through reliable, ethical, and inclusive
                technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg"
            >
              <img
                src={mission}
                alt="mission"
                className="w-full h-34 object-cover mx-auto mb-4 shadow-lg"
              />
              <h2 className="text-2xl font-bold text-green-900 text-center mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To deliver smart, scalable, and secure solutions that empower startups and small businesses to thrive in a digitally evolving world.
              </p>
            </motion.div>
          </div> */}

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
                className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-[1.04] hover:shadow-2xl transition-all duration-300 border border-blue-100 group overflow-hidden"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-400 opacity-30 blur-2xl z-0"></div>
                <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 shadow-lg mb-4 text-white text-4xl group-hover:scale-110 transition-transform duration-200"> 
                  {value.icon}
                </div>
                <h3 className="relative z-10 text-lg font-bold text-gray-900 mb-2 text-center group-hover:text-blue-700 transition-colors duration-200">
                  {value.title}
                </h3>
                <p className="relative z-10 text-gray-600 text-sm text-center leading-relaxed">
                  {value.description}
                </p> 
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full opacity-60"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ClientPartners isAdminAuthenticated={isAdminAuthenticated} />
      <MediaPress isAdminAuthenticated={isAdminAuthenticated} />
    </>
  )
}

export default CompanyOverview
