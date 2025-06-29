import { useState } from 'react'
import { motion } from 'framer-motion'

const Header = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Overview', id: 'overview' },
    { name: 'Team', id: 'team' },
    { name: 'Services', id: 'services' },
    { name: 'Story', id: 'story' },
    { name: 'Partners', id: 'partners' },
    { name: 'Media', id: 'media' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ]

  const handleScroll = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h1 className="text-2xl font-bold text-blue-900 cursor-pointer">Goklyn</h1>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <button
                  onClick={() => handleScroll(item.id)}
                  className={`text-gray-700 px-3 py-2 text-sm font-medium transform transition-all duration-200 ease-in-out cursor-pointer hover:text-blue-900 hover:scale-110`}
                >
                  {item.name}
                </button>
                <span
                  className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-900 transition-all duration-300 ease-in-out group-hover:w-full"
                ></span>
              </motion.div>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => handleScroll(item.id)}
                    className={`text-gray-700 block w-full text-left px-3 py-2 text-base font-medium transform transition-all duration-200 ease-in-out cursor-pointer hover:text-blue-900 hover:scale-105`}
                  >
                    {item.name}
                  </button>
                  <span
                    className="absolute left-0 -bottom-1 h-0.5 w-0 bg-blue-900 transition-all duration-300 ease-in-out group-hover:w-full"
                  ></span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header
