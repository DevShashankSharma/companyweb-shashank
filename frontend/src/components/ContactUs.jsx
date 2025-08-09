import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBuilding, FaEnvelope, FaDownload, FaPhoneAlt } from "react-icons/fa";
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import html2pdf from 'html2pdf.js';

const ContactUs = ({ userId, userlogin, isAdminAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.subject || !formData.message || !formData.service) {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('error');
        setMessage('Please fill in all required fields.');
        setFormData({
          name: '',
          email: '',
          service: '',
          subject: '',
          message: ''
        });
        setTimeout(() => {
          setSubmitStatus(null);
          setMessage('');
        }, 5000);
      }, 2000);
      return;
    }

    if (isAdminAuthenticated) {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('warning');
        setMessage('Admin cannot submit this form.');
        setFormData({
          name: '',
          email: '',
          service: '',
          subject: '',
          message: ''
        });
        setTimeout(() => {
          setSubmitStatus(null);
          setMessage('');
        }, 5000);
      }, 2000);
      return;
    }

    if (!userlogin.loggedin) {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('warning');
        setMessage('Please Create an account to submit the form.');
        setFormData({
          name: '',
          email: '',
          service: '',
          subject: '',
          message: ''
        });
        setTimeout(() => {
          setSubmitStatus(null);
          setMessage('');
        }, 5000);
      }, 2000);
      return;
    }

    // Submit to MongoDB backend
    try {
      await fetch("http://localhost:5000/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId })
      });
      setTimeout(() => {
        setIsSubmitting(false);
        setMessage("Thank you for your message! We'll get back to you within 24 hours.");
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          service: '',
          subject: '',
          message: ''
        });
        setTimeout(() => {
          setSubmitStatus(null);
          setMessage('');
        }, 5000);
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setMessage('Error submitting the form. Please try again.');
      setTimeout(() => {
        setSubmitStatus(null);
        setMessage('');
      }, 5000);
    }
  };

  const generatePortfolioPDF = async () => {
    setIsGeneratingPDF(true)

    try {
      const element = document.createElement('div');
      // Create a simple HTML content for the PDF
      element.innerHTML = `
  <div style="font-family: Arial, sans-serif; padding: 30px; font-size: 14px; color: #000;">
    <div style="text-align: center; margin-bottom: 25px;">
      <h1 style="color: #1e40af; font-size: 28px; margin: 0;">Goklyn Private Limited </h1>
      <p style="color: #6b7280; font-size: 16px; margin: 5px 0 0;">Innovating Digital Solutions</p>
    </div>

    <div style="margin-bottom: 20px;">
      <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 5px;">About Us</h2>
      <p>
        Goklyn Private Limited  is a forward-thinking technology company dedicated to building innovative digital solutions that empower businesses. We blend technical expertise with creative problem-solving to deliver software that’s both powerful and user-centric.
      </p>
    </div>

    <div style="margin-bottom: 20px;">
      <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 5px;">Our Services</h2>
      <ul style="padding-left: 20px; margin: 0;">
        <li>• Software Development</li>
        <li>• Web Development</li>
        <li>• Mobile App Development</li>
        <li>• AI & Machine Learning</li>
        <li>• Cybersecurity Solutions</li>
        <li>• Digital Marketing & SEO</li>
        <li>• Cloud Computing</li>
      </ul>
    </div>

    <div style="margin-bottom: 20px;">
      <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 5px;">Our Values</h2>
      <ul style="padding-left: 20px; margin: 0;">
        <li>• Innovation</li>
        <li>• Integrity</li>
        <li>• Client-Centric Approach</li>
        <li>• Inclusive Growth</li>
      </ul>
    </div>

    <div style="margin-bottom: 20px;">
      <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 5px;">Contact Information</h2>
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
        <p style="margin: 6px 0;"><strong>Address:</strong> Goklyn Private Limited, Jaipur, Rajasthan, India</p>
        <p style="margin: 6px 0;"><strong>Email:</strong> contact@goklyn.in</p>
        <p style="margin: 6px 0;"><strong>Phone:</strong> +91 90244 66472</p>
        <p style="margin: 6px 0;"><strong>Business Hours:</strong> Monday – Friday, 9:00 AM – 6:00 PM IST</p>
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 5px;">Social Media</h2>
      <div style="margin-bottom: 4px; display: flex; align-items: center;">
        <img src="data:image/webp;base64,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" alt="Instagram" width="16" height="16" style="margin-top: 12px; margin-right: 8px"/>
        <strong>@goklyn_pvt.ltd</strong>
      </div>
      <div style="margin-bottom: 4px; display: flex; align-items: center;">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEUMZMX///8AYcQAWcFDf8nL3PIAWrzQ3vMAYcI0eclZjtAucslAgsz6/v3x9/sgbclOhM8AX8QAYsAAX70AV70AWMLm7vgAXb4sdsw5fsoRbsVmltK6z+iUt+AMZcGDrN3c6fNvnddiltWqwuPA0+r0+vyOrt+lweR9pduuyueUst9Lh81pldd1mtYdbcunxOXO4u7Z4fGRyVlRAAAEKUlEQVR4nO3ce1faMBzG8SblEpSCiUUuQrkMhsCc+v7f3Ko4KjW/yLY0WXOez9mf4Ml3vSW1NYoAAAAAAAAAAAAAAAAAAAAAAAAAAADgYiriIsqU72FURcapGnXHk5aMue+xVCCT6n56x960Z2OpMt8jsozz+Xve0Xqc+h6SXbKzYOeSfex7UBap+J591lThHI3awPxw5KGcVFUj0RayaRrI6UaUj8GTpfA9NivknApkvTC2YdwjC9lc+h6dBWpFB7JFCIXx1FDIRr6HZ0Fq2EkZewjgXNMnLhVH34a+x/fPeMdYOK3/gchvTIFsXf/ZKR+bC+u/DcW1cS/d1f84jFobU+H3ANYXadNU2PU9PAvkd0Ngz/forMgMhU/1P5Xm4h0ZmHQCOAzz68WEPNdsg9iE+ZH4QATeBTApPYqf9PvoKIh99E2qOxQ3jVvf47JHDT5fMl5GAQW+3tNvnF/4N3shwrhJc8Ljw/Q0Q13MJ4GcRc8IORjP99vZfpWlQe2gH3EZx7Gs/4IJAADqQ3DJX/+FM38vqHyKlA5Hhx+Pj49X43468P34CheEiz9Z+pTMlrvFaQ6YbNrblRpKf6vNbHRNKX2yT/kwSVd5XluzGGs//Ew9NfIGS/RYs3X2yUGzp7dpnMYu+zPql1mbp46f+XxeSCkVxrpt8+bmWJgJOTPeYP7m5QkWi4Wye0d94t3m3sNmtFao5OyLvle7zPnRaKlQCb6+IDBfXvddJ1oq5BH5WE7JXd/xwWilUKnJpYGM9a7dPk5mpfCWP18cmO+okdOtaKVwYHxm5ZP1wOWNPBuFneUfBTK2dHkzyEbhwfirco3NxOF+aqPw8rPMbzuHV34bhX+h4e6q6KnQ4ZM6ngrZyNlG9FXo7hfMvgp7zt7o8FXIDq52U2+FznbTKgovmgAsalq4mB0mQqjJYfvler98o6sWhevuYPh2C5jz4WD1ReMPR4soi4W91dmtXy7MK469o7mpvcLn8nRaSWPi9PzH/++FCXvW3LuXpoXxi6MllK1tqHtGLBMd0zccLYNtFR60W8T0wkqv7yTQVuGTfpfLuvRXkms3sxo7hQlx/yy7NayOO3Uq3MXExY148PFY6OZyYafwihqsXNJfGteoMCGXQoYfzxo1KmxSO2kkJvTLcXUq3BreraFnp3UqNLwT3aJPpnUqPNBjTV+CKDScFVv0t+pUaLiytegXq1BoCQoLKNRDYfVQWEChHgqrh8ICCvVQWD0UFlCoh8LqobCAQj0UVg+FBRTqobB6KCygUA+F1UNhAYV6KKweCgso1ENh9VBYQKEeCquHwkKAhe1SIf2UoaFwSP+/dB29FtTvUsbnH+Q3VxTDmxOq+zffskqJiOtFpZda+OV/M6uQKepLof0NWAAAAAAAAAAAAAAAAAAAAAAAAAAAgAr8Aj5RWY0PDbn2AAAAAElFTkSuQmCC" alt="LinkedIn" width="16" height="16" style="margin-top: 12px; margin-right: 8px"/>
        <strong>linkedin.com/company/goklyn-pvt-ltd</strong>
      </div>
      <div style="margin-bottom: 4px; display: inline-flex; align-items: center;">
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhITERIWFRAVFRUWFxYRFhUYFRAYFREaFxcSFhMYHCghGR4lGxYVITEiJSkrLi4uFx8zODMtNygtLi0BCgoKDQ0ODw8PDysZFRkrKysrKy0rKys3KystKy0tLSsrKystKys3KystKysrKystKysrKysrKysrKy0rKystK//AABEIAOAA4AMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABwgBBQYEAgP/xABJEAABAwICBwQECQkGBwAAAAABAAIDBBEFIQYHEjFBUXETImGBQnKRoQgUIzJic4KisSQzNVJTsrPBwkOSk6PD4RUlVGN0g4T/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwCcUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/Z" alt="GitHub" width="16" height="16" style="margin-top: 12px; margin-right: 8px"/>
        <strong>github.com/goklyn</strong>
      </div>
    </div>


    <div style="margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px;">
      <p>Generated on ${new Date().toLocaleDateString()}</p>
      <p>© ${new Date().getFullYear()} Goklyn Private Limited . All rights reserved.</p>
    </div>
  </div>
`;


      const opt = {
        margin: 0.5,
        filename: 'Goklyn-Technologies-Portfolio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };
      await html2pdf().set(opt).from(element).save();
      setSubmitStatus('portfolio-success');
    } catch (error) {
      console.error('PDF generation error:', error);
      setSubmitStatus('portfolio-error');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const contactInfo = [
    {
      title: "Head Office",
      address: "Goklyn Private Limited ",
      city: "India",
      icon: <FaBuilding className="text-blue-600" />
    }
  ]

  const contactMethods = [
    {
      type: "General Inquiries",
      email: "contact@goklyn.in",
      phone: "+91 90244 66472",
      icon: <FaEnvelope className="text-blue-600" />
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
            Ready to shape your digital journey? Let's connect.

          </p>
        </motion.div>


        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg border shadow-lg w-fit max-w-[90%] text-sm
        ${submitStatus === 'success'
                ? 'bg-green-100 border-green-400 text-green-700'
                : submitStatus === 'error'
                  ? 'bg-red-100 border-red-400 text-red-700'
                  : submitStatus === 'warning'
                    ? 'bg-yellow-100 border-yellow-400 text-yellow-700'
                    : ''
              }`}
          >
            {message}
          </motion.div>
        )}

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
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 text-2xl shadow group-hover:scale-110 transition-transform duration-200">
                      {office.icon}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{office.title}</h5>
                      <p className="text-gray-600 text-sm">
                        Goklyn Private Limited, Jaipur, Rajasthan, India
                      </p>
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
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 text-2xl shadow group-hover:scale-110 transition-transform duration-200">
                      {method.icon}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{method.type}</h5>
                      <a href={`mailto:${method.email}`} className="text-blue-600 text-sm hover:underline block">{method.email}</a>
                      <a href={`tel:${method.phone.replace(/[^+\d]/g, '')}`} className="text-gray-600 text-sm hover:underline block">{method.phone}</a>
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
                    placeholder="What services do you want from us ?"
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
              <a href="mailto:contact@goklyn.in" className="inline-flex items-center px-5 py-2 bg-blue-600 text-white font-medium rounded-3xl hover:bg-blue-700 transition">
                {/* icon */}
                <FaEnvelope className="mr-2" />
                Email Us
              </a>
              <a href="tel:+919024466472" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-3xl hover:bg-green-700 transition">
                {/* icon */}
                <FaPhoneAlt className="mr-2" />
                Call Us
              </a>
            </div>

          </div>

        </motion.div>
        <div className='flex justify-center'>
          <button
            onClick={generatePortfolioPDF}
            disabled={isGeneratingPDF}
            className="inline-flex items-center px-6 py-3 bg-gray-700 text-white font-medium rounded-md hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed self-center mt-11 hover:cursor-pointer"
          >
            <FaDownload className="mr-2" />
            {isGeneratingPDF ? 'Generating...' : ' Download Portfolio'}
          </button>
        </div>
      </div>

      {/* Snackbar for portfolio download */}
      <Snackbar
        open={submitStatus === 'portfolio-success' || submitStatus === 'portfolio-error'}
        autoHideDuration={3000}
        onClose={() => setSubmitStatus(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSubmitStatus(null)}
          severity={submitStatus === 'portfolio-success' ? 'success' : 'error'}
          sx={{ width: 'fit-content' }}
        >

          {submitStatus === 'portfolio-success'
            ? 'Portfolio downloading ... '
            : 'Error generating portfolio. Please try again.'}
        </MuiAlert>
      </Snackbar>

    </section>
  )
}

export default ContactUs