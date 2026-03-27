"use client"

import { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
    if (publicKey) emailjs.init(publicKey);
  }, []);

  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (!/^[a-zA-Z\s]*$/.test(name)) return 'Name should only contain letters and spaces';
    return '';
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone) return '';
    if (!/^\+?\d{0,11}$/.test(phone)) {
      return 'Please enter a valid phone number (only numbers and + allowed)';
    }
    if (phone.startsWith('+') && phone.length > 12) {
      return 'Phone number cannot exceed 11 digits after +';
    }
    if (!phone.startsWith('+') && phone.length > 11) {
      return 'Phone number cannot exceed 11 digits';
    }
    return '';
  };

  const validateMessage = (message) => {
    if (!message.trim()) return 'Message is required';
    if (message.length < 10) return 'Message must be at least 10 characters';
    return '';
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    let error = '';
    switch (id) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [id]: error
    }));
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^\d+]/g, '');
    const finalValue = sanitizedValue.includes('+')
      ? '+' + sanitizedValue.replace(/\+/g, '')
      : sanitizedValue;
    const maxLength = finalValue.startsWith('+') ? 12 : 11;
    const truncatedValue = finalValue.slice(0, maxLength);

    setFormData(prev => ({
      ...prev,
      phone: truncatedValue
    }));

    const error = validatePhone(truncatedValue);
    setErrors(prev => ({
      ...prev,
      phone: error
    }));
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');

    setFormData(prev => ({
      ...prev,
      name: sanitizedValue
    }));

    const error = validateName(sanitizedValue);
    setErrors(prev => ({
      ...prev,
      name: error
    }));
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/[^a-zA-Z0-9@._%+-]/g, '');
    const atCount = (sanitizedValue.match(/@/g) || []).length;
    const finalValue = atCount > 1
      ? sanitizedValue.replace(/@/g, (match, index) => index === sanitizedValue.indexOf('@') ? '@' : '')
      : sanitizedValue;

    setFormData(prev => ({
      ...prev,
      email: finalValue
    }));

    const error = validateEmail(finalValue);
    setErrors(prev => ({
      ...prev,
      email: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      message: validateMessage(formData.message)
    };

    if (!formData.phone) {
      newErrors.phone = '';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== '')) {
      return;
    }

    setIsSubmitting(true);

    const serviceId  = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      phone: formData.phone,
      message: formData.message
    };

    emailjs.send(serviceId, templateId, templateParams)
      .then(() => {
        setIsSubmitting(false);

        Swal.fire({
          title: 'Message Sent!',
          text: 'Thank you for reaching out! I will get back to you soon.',
          icon: 'success',
          confirmButtonColor: '#3B82F6'
        });

        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({ name: '', email: '', phone: '', message: '' });
      })
      .catch(() => {
        setIsSubmitting(false);

        Swal.fire({
          title: 'Oops!',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
          confirmButtonColor: '#3B82F6'
        });
      });
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-white">
          Get in <span className="text-blue-400">Touch</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left Column - Contact Details */}
          <div className="bg-gray-800 p-4 sm:p-8 rounded-xl shadow-lg lg:w-1/2">
            <div className="flex flex-col items-center">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center shadow-xl border-4 border-blue-400 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 mb-8">
                <Image
                  src="/images/profile_photo.png"
                  width={224}
                  height={224}
                  alt="Oshadha Pathiraja"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-left w-full">
                <h4 className="text-2xl font-semibold mb-6 text-blue-400">Contact Details</h4>

                <div className="flex items-center mb-6">
                  <svg aria-hidden="true" className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div>
                    <span className="block font-medium">Location:</span>
                    <span>Malabe, Western Province, Sri Lanka</span>
                  </div>
                </div>

                <h4 className="text-xl font-semibold mb-4 text-blue-400 mt-8">Connect With Me</h4>
                <div className="flex flex-wrap gap-1">
                  <a href="mailto:oshadhanipun093@gmail.com" className="p-2.5 text-2xl text-gray-300 hover:text-blue-300 transition" aria-label="Email"><FaEnvelope /></a>
                  <a href="https://github.com/oshadha2k01" target="_blank" rel="noopener noreferrer" className="p-2.5 text-2xl text-gray-300 hover:text-white transition" aria-label="GitHub"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/oshadha-pathiraja-77b08333a/" target="_blank" rel="noopener noreferrer" className="p-2.5 text-2xl text-gray-300 hover:text-blue-400 transition" aria-label="LinkedIn"><FaLinkedin /></a>
                  <a href="https://www.facebook.com/share/192Tbe3uuA/" target="_blank" rel="noopener noreferrer" className="p-2.5 text-2xl text-gray-300 hover:text-blue-600 transition" aria-label="Facebook"><FaFacebook /></a>
                  <a href="https://www.instagram.com/oshadha_nipun/" target="_blank" rel="noopener noreferrer" className="p-2.5 text-2xl text-gray-300 hover:text-pink-500 transition" aria-label="Instagram"><FaInstagram /></a>
                  <a href="https://wa.me/94766050012" target="_blank" rel="noopener noreferrer" className="p-2.5 text-2xl text-gray-300 hover:text-green-400 transition" aria-label="WhatsApp"><FaWhatsapp /></a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-800 p-4 sm:p-8 rounded-xl shadow-lg lg:w-1/2">
            <h4 className="text-2xl font-semibold mb-6 text-blue-400">Send Me a Message</h4>
            <form ref={form} onSubmit={handleSubmit} className="text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    value={formData.name}
                    onChange={handleNameChange}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={errors.name ? 'true' : undefined}
                    className={`w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.name ? 'border-2 border-red-500' : ''}`}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={errors.email ? 'true' : undefined}
                    className={`w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.email ? 'border-2 border-red-500' : ''}`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  aria-invalid={errors.phone ? 'true' : undefined}
                  className={`w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.phone ? 'border-2 border-red-500' : ''}`}
                  placeholder="+94123456789 (optional)"
                  maxLength={12}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">{errors.phone}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  aria-invalid={errors.message ? 'true' : undefined}
                  className={`w-full p-3 bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.message ? 'border-2 border-red-500' : ''}`}
                  placeholder="Write your message here..."
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">{errors.message}</p>
                )}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  aria-busy={isSubmitting}
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-10 py-3 rounded-md transition shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
