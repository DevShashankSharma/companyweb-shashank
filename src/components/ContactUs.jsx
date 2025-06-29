import { useState } from 'react'
import { motion } from 'framer-motion'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        organization: '',
        phone: '',
        subject: '',
        message: ''
      })
      setTimeout(() => setSubmitStatus(null), 5000)
    }, 2000)
  }

  const contactInfo = [
    {
      title: "Head Office",
      address: "Goklyn Technologies",
      city: "India",
      icon: "🏢"
    }
  ]

  const contactMethods = [
    {
      type: "General Inquiries",
      email: "contact@goklyn.in",
      phone: "+91 90244 66472",
      icon: "📧"
    },
  ]

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/goklyn_pvt.ltd",
      icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/goklyn-pvt-ltd",
      icon: "https://cdn-icons-png.flaticon.com/512/145/145807.png"
    },
    {
      name: "GitHub",
      url: "https://github.com/goklyn",
      icon: "https://cdn-icons-png.flaticon.com/512/733/733553.png"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/goklyn",
      icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png"
    }
  ];


  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to shape your digital journey? Let’s connect.

          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >

            {/* Location */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Office Location</h4>
              <div className="space-y-4">
                {contactInfo.map((office, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{office.icon}</div>
                    <div>
                      <h5 className="font-medium text-gray-900">{office.title}</h5>
                      <p className="text-gray-600 text-sm">Goklyn Private Limited, Jaipur, Rajasthan, India </p>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Methods</h4>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-2xl">{method.icon}</div>
                    <div>
                      <h5 className="font-medium text-gray-900">{method.type}</h5>
                      <p className="text-blue-600 text-sm">{method.email}</p>
                      <p className="text-gray-600 text-sm">{method.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-transform transform hover:scale-105 hover:shadow-md cursor-pointer bg-gray-100 hover:bg-white"
                  >
                    <img src={social.icon} alt={social.name} className="w-6 h-6" />
                    <span className="text-sm text-gray-700">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>



            {/* Business Hours */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between text-sm mt-2 text-gray-600">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM - 2:00 PM IST</span>
                </div>
                <div className="flex justify-between text-sm mt-2 text-gray-600">
                  <span>Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Enquiry form</h3>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                >
                  Thank you for your message! We'll get back to you within 24 hours.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service required</label>
                  <input
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg"
                    placeholder="Whar services do you want from us ?"
                  />
                </div>


                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg"
                    placeholder="Type your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Our team is ready to discuss your specific needs and explore how Goklyn can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:contact@goklyn.in" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                📧 Email Us
              </a>
              <a href="tel:+919024466472" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
                📞 Call Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactUs
