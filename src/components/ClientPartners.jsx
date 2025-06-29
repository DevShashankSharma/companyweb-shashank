import { motion } from 'framer-motion'
import TestimonialCarousel from './TestimonialCarousel';

const ClientPartners = () => {
  const clientsWorkedWith = [
    {
      title: "MVPs for Early-Stage Startups",
      description: "Built scalable and investor-ready MVPs to help startups validate and launch their ideas quickly.",
      icon: "🚀"
    },
    {
      title: "AI Dashboards for Ed-Tech Platforms",
      description: "Designed intelligent dashboards using machine learning for better learner analytics and engagement.",
      icon: "📊"
    },
    {
      title: "Data Tools for NGOs",
      description: "Developed easy-to-use tools that help non-profits track, analyze, and report their impact data effectively.",
      icon: "🤝"
    },
    {
      title: "B2B SaaS Development Teams",
      description: "Collaborated with SaaS teams to accelerate product development, refine architecture, and scale solutions.",
      icon: "💼"
    }
  ];


  const industryPartners = [
    {
      name: "Academic Clubs & Student Research Labs",
      logo: "🎓",
      category: "Education"
    },
    {
      name: "Tech Communities & Hackathons",
      logo: "👨‍💻",
      category: "Community"
    },
    {
      name: "Bhamashah Techno Hub",
      logo: "🏢",
      category: "Incubator"
    }
  ];


  // const certifications = [
  //   { name: "ISO 9001:2015", description: "Quality Management Systems", icon: "✅" },
  //   { name: "ISO 27001", description: "Information Security Management", icon: "🔒" },
  //   { name: "CMMI Level 3", description: "Capability Maturity Model Integration", icon: "📈" },
  //   { name: "Government Security Clearance", description: "Federal Security Clearance", icon: "🛡️" }
  // ]

  const testimonials = [
    {
      quote: "Goklyn helped us turn our MVP dream into a scalable product.",
      name: "Rajat",
      role: "Startup Founder"
    },
    {
      quote: "We loved the ethical approach and deep knowledge of the AI team.",
      name: "Pooja",
      role: "NGO Coordinator"
    },
    {
      quote: "The cybersecurity audit gave us confidence to go public.",
      name: "Ankit",
      role: "SaaS CTO"
    },
    {
      quote: "Monika and team feel more like partners than vendors.",
      name: "Shruti",
      role: "EdTech PM"
    },
    {
      quote: "Always on time. Always value-driven.",
      name: "Pratik",
      role: "HR Tech Entrepreneur"
    }
  ];


  return (
    <section id="partners" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Network
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            "Those who trusted us, grew with us."
          </p>
        </motion.div>

        {/* clients worked with */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Who We’ve Worked With</h3>
            <p className="text-gray-600">
              Supporting startups, NGOs, and SaaS teams with innovative digital solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clientsWorkedWith.map((client, index) => (
              <motion.div
                key={client.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-200 transition-colors duration-300 shadow-sm hover:shadow-lg border border-gray-200"
              >
                <div className="text-4xl mb-4">{client.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{client.title}</h4>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {client.description}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Industry Partners</h3>
            <p className="text-gray-600">Collaborating with leading technology and consulting firms</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industryPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{partner.logo}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{partner.name}</h4>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                  {partner.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Certifications & Accreditations</h3>
            <p className="text-gray-600">Maintaining the highest standards of quality and security</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-3xl mb-3">{cert.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{cert.name}</h4>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

        {/* Partnership Impact Stats */}
        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Partnership Impact</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Our collaborative approach has delivered measurable results across government and industry sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100 text-sm">Government Agencies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-100 text-sm">Industry Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-blue-100 text-sm">Successful Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100 text-sm">Client Satisfaction</div>
            </div>
          </div>
        </motion.div> */}

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

          <TestimonialCarousel testimonials={testimonials} />
        </motion.div>
      </div>
    </section>
  )
}

export default ClientPartners
