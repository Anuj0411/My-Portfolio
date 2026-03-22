import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../style';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { contactInfo } from '../constants';
import { linkedin, github, email as emailIcon, phone as phoneIcon } from '../assets';
import Toast from './Toast';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success',
  });

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
    setTimeout(() => {
      setToast({ isVisible: false, message: '', type: 'success' });
    }, 5000);
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: '',
    };
    let isValid = true;

    const trimmedName = form.name.trim();
    if (!trimmedName) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      isValid = false;
    } else if (trimmedName.length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
      isValid = false;
    } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
      isValid = false;
    }

    const trimmedEmail = form.email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    } else if (trimmedEmail.length > 100) {
      newErrors.email = 'Email must be less than 100 characters';
      isValid = false;
    }

    const trimmedMessage = form.message.trim();
    if (!trimmedMessage) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (trimmedMessage.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    } else if (trimmedMessage.length > 1000) {
      newErrors.message = 'Message must be less than 1000 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Validate environment variables
    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      showToast('Email service is not configured. Please contact the administrator.', 'error');
      console.error('Missing EmailJS credentials. Check your .env file.');
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name.trim(),
          to_name: 'Anuj',
          from_email: form.email.trim(),
          to_email: 'anuj.parashar.140@gmail.com',
          message: form.message.trim(),
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          showToast('Thank you! I will get back to you as soon as possible.', 'success');

          setForm({
            name: '',
            email: '',
            message: '',
          });
          setErrors({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.error('EmailJS Error:', error);

          let errorMessage = 'Ahh, something went wrong. Please try again.';

          if (error.text) {
            // Common EmailJS errors
            if (error.text.includes('Invalid grant')) {
              errorMessage =
                'Email service authentication expired. Please contact the site administrator to reconnect the Gmail account.';
            } else if (error.text.includes('insufficient authentication scopes')) {
              errorMessage =
                'Email service needs additional permissions. Please contact the site administrator to update Gmail permissions.';
            } else if (error.text.includes('403') || error.text.includes('Forbidden')) {
              errorMessage = 'Email service access denied. Please contact the site administrator.';
            } else if (error.text.includes('404')) {
              errorMessage =
                'Email service configuration not found. Please contact the site administrator.';
            }
          }

          showToast(errorMessage, 'error');

          // Log detailed error for debugging
          console.error('Full error details:', {
            status: error.status,
            text: error.text,
            serviceId: serviceId,
            templateId: templateId,
          });
        }
      );
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
      <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
        <motion.div
          variants={slideIn('left', 'tween', 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                required
                className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium ${
                  errors.name ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.name && <span className="text-red-500 text-sm mt-2">{errors.name}</span>}
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email address?"
                required
                className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium ${
                  errors.email ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.email && <span className="text-red-500 text-sm mt-2">{errors.email}</span>}
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                required
                className={`bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium ${
                  errors.message ? 'border-2 border-red-500' : ''
                }`}
              />
              {errors.message && (
                <span className="text-red-500 text-sm mt-2">{errors.message}</span>
              )}
              <span className="text-secondary text-xs mt-1">
                {form.message.trim().length}/1000 characters
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-tertiary/90'
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>

            <div className="mt-4 text-secondary text-xs">
              <p>
                By submitting this form, you agree to the collection and use of your information
                solely for responding to your inquiry.
              </p>
            </div>
          </form>

          {/* Contact Information Section */}
          <div className="mt-12 pt-8 border-t border-secondary/20">
            <h4 className="text-white font-medium text-[18px] mb-6">Other Ways to Reach Me</h4>
            <div className="flex flex-col gap-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-secondary hover:text-white transition-colors group"
              >
                <img
                  src={emailIcon}
                  alt="email"
                  className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="text-[14px]">{contactInfo.email}</span>
              </a>

              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 text-secondary hover:text-white transition-colors group"
              >
                <img
                  src={phoneIcon}
                  alt="phone"
                  className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="text-[14px]">{contactInfo.phone}</span>
              </a>

              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-secondary hover:text-white transition-colors group"
              >
                <img
                  src={linkedin}
                  alt="linkedin"
                  className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="text-[14px]">LinkedIn Profile</span>
              </a>

              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-secondary hover:text-white transition-colors group"
              >
                <img
                  src={github}
                  alt="github"
                  className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="text-[14px]">GitHub Profile</span>
              </a>

              <div className="flex items-center gap-3 text-secondary mt-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-[14px]">{contactInfo.location}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[650px] h-[450px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </>
  );
};

const ContactWithWrapper = SectionWrapper(Contact, 'contact');
export default ContactWithWrapper;
