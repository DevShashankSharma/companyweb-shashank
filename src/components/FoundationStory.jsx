import { motion } from 'framer-motion'
import foundationImg from '../assets/foundationimg.jpg';

const FoundationStory = () => {
  const timeline = [
    {
      year: "2023",
      title: "Freelance Roots",
      description: "Monika Sharma began offering niche tech services as a freelancer, focusing on ethical, impactful, and future-ready solutions for startups and small businesses.",
      achievement: "Freelance Journey Begins"
    },
    {
      year: "2024",
      title: "Client Growth & Recognition",
      description: "Rapid growth through word-of-mouth, with an expanding client base in ed-tech, NGOs, and SaaS. Goklyn earned trust through values-first innovation.",
      achievement: "Trusted by Clients"
    },
    {
      year: "March 2025",
      title: "Goklyn Private Limited is Born",
      description: "Official incorporation of Goklyn Pvt. Ltd. The name blends ‘Gokul’ (values) and ‘-lyn’ (global future), symbolizing purpose-led global tech.",
      achievement: "Company Incorporated"
    },
    {
      year: "2025",
      title: "Team & Vision Expansion",
      description: "Assembling a diverse team of developers, designers, strategists, and ethical hackers — united by the mission to innovate for impact.",
      achievement: "Team Growth"
    },
    {
      year: "Future",
      title: "Emerging Tech & Impact",
      description: "Goklyn continues its journey with cutting-edge research in AI, quantum, and cybersecurity — shaping the future of ethical tech for bold dreamers.",
      achievement: "Tech for Tomorrow"
    }
  ];

  return (
    <section id="story" className="py-20 bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            "Where tech meets purpose. Where Gokul meets global."
          </p>
        </motion.div>

        {/* Story Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Foundation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Goklyn began as a freelance journey in 2023, led by Monika Sharma — a visionary engineer with a passion for ethical, impactful tech. With every successful project, a greater purpose took shape.
              </p>
              <p className="text-gray-700 leading-relaxed">
                In March 2025, Goklyn Private Limited was officially born. Inspired by the values of Gokul and driven by global ambition, Goklyn now delivers future-ready solutions to startups, NGOs, ed-techs, and SaaS teams — with purpose at its core.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4">
                <img src={foundationImg} alt="Foundation" className="w-full h-auto rounded-lg shadow-md" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-500"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-100 shadow-lg"></div>

                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}>
                  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-bold text-blue-700">{item.year}</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {item.achievement}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-8 text-gray-800"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Our Commitment to the Future</h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              As we look ahead, Goklyn remains committed to driving innovation,
              fostering meaningful partnerships, and creating lasting impact in
              technology and digital transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold mb-2">Student Empowerment</h4>
              <p className="text-gray-600 text-sm">Continuing to bridge the gap between academia and industry</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-semibold mb-2">Technology Innovation</h4>
              <p className="text-gray-600 text-sm">Embracing cutting-edge technologies and methodologies</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <h4 className="font-semibold mb-2">Client Success</h4>
              <p className="text-gray-600 text-sm">Building lasting partnerships and delivering exceptional results</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FoundationStory
