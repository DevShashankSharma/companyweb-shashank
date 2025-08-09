import { motion } from 'framer-motion'
import founder from "../assets/founder.jpg"

const FoundersTeam = () => {
  const teamMembers = [
    {
      name: "Monika Sharma",
      position: "Founder & CEO",
      bio: "At the heart of Goklyn is a vision nurtured by tradition, driven by innovation. As the founder, I believe in building with soul—where technology serves humanity, and progress honors purpose.",
      expertise: ["Cybersecurity", "AI", "Quantum Computing", "Entrepreneurship"],
      image: founder,
      isImage: true
    },
    {
      name: "Team Ethos",
      position: "Our Core Belief",
      bio: "We are a symphony of minds — developers, designers, managers, and tech strategists — working in harmony with equal voices. At Goklyn, we proudly uphold a balanced gender ratio, championing women empowerment as a core ethos of our culture.",
      expertise: ["Innovation", "Collaboration", "Empathy", "Impact-Driven"],
      image: "https://www.bing.com/th/id/OIP.h8aUPtiJ-RsoPCWt3-Oi0QHaEu?w=255&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
      isImage: true
    }
  ]

  return (
    <section id="team" className="py-20 bg-white text-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Founders & Team
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the leadership that guides our mission and the ethos that defines our collective spirit.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-br from-blue-100 to-blue-200 p-8">
                <div className="md:order-2 mb-4 md:mb-0 md:ml-6">
                  {member.isImage ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="text-6xl">{member.image}</div>
                  )}
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-700 font-medium">{member.position}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Areas of Expertise:</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-200 text-blue-800 text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FoundersTeam