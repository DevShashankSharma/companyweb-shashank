import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#overview' },
      { name: 'Our Team', href: '#team' },
      { name: 'Our Story', href: '#story' },
      { name: 'Careers', href: '#contact' }
    ],
    services: [
      { name: "Software Development", href: "#services" },
      { name: "AI / ML Solutions", href: "#services" },
      { name: "HR Tech", href: "#services", },
      { name: "Cybersecurity", href: "#services", },
      { name: "Emerging Tech", href: "#services", },
      { name: "SEO & Web Optimization", href: "#services", }
    ],

    resources: [
      { name: 'Press Releases', href: '#media' },
      { name: 'Case Studies', href: '#media' },
      { name: 'Partnerships', href: '#partners' },
      { name: 'Contact', href: '#contact' }
    ]
  }

  return (
    <footer className="bg-slate-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Goklyn</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              A leading technology solutions provider dedicated to driving digital transformation
              and innovation across businesses and organizations.
            </p>
            <div className="flex space-x-4">
              {/* LinkedIn */}
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="..." />
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="..." />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Footer Columns */}
          {['company', 'services', 'resources'].map((section, i) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4 capitalize">{section}</h4>
              <ul className="space-y-2">
                {footerLinks[section].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-300 pt-8 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              title: 'Head Office',
              lines: ['Goklyn Private Limited, Jaipur, Rajasthan,', 'India']
            }, {
              title: 'Contact',
              lines: ['Email: contact@goklyn.in', 'Phone: +91 9024466472']
            }, {
              title: 'Business Hours',
              lines: ['Mon-Fri: 9:00 AM - 6:00 PM IST', 'Sat: 10:00 AM - 2:00 PM IST']
            }].map((info, i) => (
              <div key={i}>
                <h5 className="font-semibold text-gray-900 mb-2">{info.title}</h5>
                <p className="text-gray-600 text-sm">
                  {info.lines.map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-300 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Goklyn Technologies. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((text) => (
                <a
                  key={text}
                  href="#"
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  {text}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
