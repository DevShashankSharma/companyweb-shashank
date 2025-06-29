import { motion } from 'framer-motion'
import hr from '../assets/hr.jpg'
import ai from '../assets/ai.png'
import software from '../assets/softwareDevelopment.jpg'
import cybersecurity from '../assets/cyber.jpeg'
import emergingTech from '../assets/emerging.webp'
import seo from '../assets/seo.webp'

const OurServices = () => {
  const services = [
    {
      title: "Software Development",
      description: "Custom web and mobile apps, MVPs, and scalable architectures tailored to your business goals.",
      features: [
        "Custom Web & Mobile Apps",
        "MVP Development",
        "Scalable Architecture",
      ],
      icon: software,
      color: "blue"
    },
    {
      title: "AI / ML Solutions",
      description: "Smart systems powered by machine learning, NLP, and AI dashboards to drive intelligent decisions.",
      features: [
        "Predictive Analytics",
        "AI Dashboards",
        "Natural Language Processing (NLP)",
        "Recommendation Engines"
      ],
      icon: ai,
      color: "green"
    },
    {
      title: "HR Tech",
      description: "Transforming HR with smart recruitment, automation tools, and internal portals that enhance workflows.",
      features: [
        "Smart Recruitment Systems",
        "Internal Portals",
        "Automation Tools",
      ],
      icon: hr,
      color: "purple"
    },
    {
      title: "Cybersecurity",
      description: "Robust security solutions including ethical hacking, audits, and data privacy architecture.",
      features: [
        "Ethical Hacking",
        "Security Audits",
        "Data Privacy",
        "Secure Architecture"
      ],
      icon: cybersecurity,
      color: "orange"
    },
    {
      title: "Emerging Tech",
      description: "Exploring the edge of technology with quantum computing concepts and research-driven innovation.",
      features: [
        "Quantum Computing Concepts",
        "Research-Driven Solutions ",
      ],
      icon: emergingTech,
      color: "red"
    },
    {
      title: "SEO & Web Optimization",
      description: "Boosting your digital visibility through SEO strategy, performance optimization, and detailed analytics.",
      features: [
        "SEO Strategy",
        "Implementation",
        "Analytics & Reporting",
      ],
      icon: seo,
      color: "indigo"
    }
  ];


  const getGradient = (color) => {
    const gradients = {
      blue: "from-blue-100 to-blue-200",
      green: "from-green-100 to-green-200",
      purple: "from-purple-100 to-purple-200",
      orange: "from-orange-100 to-orange-200",
      red: "from-red-100 to-red-200",
      indigo: "from-indigo-100 to-indigo-200"
    }
    return gradients[color] || gradients.blue
  }

  return (
    <section id="services" className="py-20 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-2 bg-white hover:bg-gradient-to-br ${getGradient(service.color)}`}
            >
              <div className="p-6 text-center">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-18 h-18 object-cover rounded-full mx-auto mb-4 shadow"
                /> 
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-gray-800">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-700">
                        <span className="text-green-500 mr-2">✔</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurServices
