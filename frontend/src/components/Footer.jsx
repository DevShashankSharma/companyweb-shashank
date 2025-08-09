import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about', isRoute: true },
      { name: 'Our Team', href: '/about', isRoute: true },
      { name: 'Our Story', href: '/about', isRoute: true },
      { name: 'Careers', href: '/contact', isRoute: true }
    ],
    services: [
      { name: "Software Development", href: "/services", isRoute: true },
      { name: "AI / ML Solutions", href: "/services", isRoute: true },
      { name: "HR Tech", href: "/services", isRoute: true },
      { name: "Cybersecurity", href: "/services", isRoute: true },
      { name: "Emerging Tech", href: "/services", isRoute: true },
      { name: "SEO & Web Optimization", href: "/services", isRoute: true }
    ],

    resources: [
      { name: 'Press Releases', href: '/#media', isRoute: false },
      { name: 'Case Studies', href: '/about', isRoute: true },
      { name: 'Partnerships', href: '/#partners', isRoute: false },
      { name: 'Contact', href: '/contact', isRoute: true }
    ]
  }

  return (
    <footer className="bg-slate-300 text-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <a href="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-blue-700 transition-colors duration-200">Goklyn</h3>
            </a>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              A leading technology solutions provider dedicated to driving digital transformation
              and innovation across businesses and organizations.
            </p> 
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
                    {(section === 'company' || section === 'resources' || section === 'services') && link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    )}
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
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Goklyn Private Limited. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
