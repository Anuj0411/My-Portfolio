import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../style';
import { SectionWrapper } from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import { contactInfo } from '../constants';
import Toast from './Toast';

const fieldClass = (hasError) =>
  `w-full appearance-none rounded-none bg-transparent border-0 border-b py-3 text-[15px] text-white placeholder:text-white/45 outline-none shadow-none ring-0 transition-colors ${
    hasError ? 'border-red-400/70' : 'border-white/15 focus:border-white/70'
  }`;

const Contact = () => {
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
    const { name, value } = e.target;

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
    return { isValid, errors: newErrors };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors: nextErrors } = validateForm();
    if (!isValid) {
      const first = ['name', 'email', 'message'].find((key) => nextErrors[key]);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      showToast('Email is not configured. Write to me directly instead.', 'error');
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
        { publicKey }
      )
      .then(
        () => {
          setLoading(false);
          showToast('Received. I will get back to you soon.', 'success');

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
          const raw = `${error?.text || error?.message || ''}`.trim();
          const text = raw.toLowerCase();
          console.error('EmailJS Error:', error);

          let message = 'Could not send. Email me directly instead.';
          if (text.includes('invalid grant')) {
            message = 'Gmail on EmailJS expired. Reconnect it, or email me directly.';
          } else if (text.includes('insufficient authentication scopes')) {
            message =
              'Gmail send permission is missing. Reconnect Gmail in EmailJS and allow Send email.';
          } else if (text.includes('origin') || text.includes('forbidden')) {
            message = 'This domain is not allowed in EmailJS. Email me directly instead.';
          } else if (
            text.includes('the service id') ||
            text.includes('template id') ||
            text.includes('404')
          ) {
            message =
              'EmailJS service or template ID is wrong. Copy the current IDs from the dashboard.';
          } else if (raw) {
            message = raw;
          }

          showToast(message, 'error');
        }
      );
  };

  const direct = [
    { label: 'Email', href: `mailto:${contactInfo.email}`, value: contactInfo.email },
    { label: 'Phone', href: `tel:${contactInfo.phone}`, value: contactInfo.phone },
    {
      label: 'LinkedIn',
      href: contactInfo.linkedin,
      value: 'linkedin.com/in/anuj-parashar-b45493388',
      external: true,
    },
    {
      label: 'GitHub',
      href: contactInfo.github,
      value: 'github.com/Anuj0411',
      external: true,
    },
  ];

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      <motion.div variants={textVariant()}>
        <h2 id="contact-heading" className={styles.sectionSubText}>
          Contact
        </h2>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12 lg:gap-0">
        <motion.form
          variants={fadeIn('up', 'tween', 0.08, 0.7)}
          onSubmit={handleSubmit}
          noValidate
          aria-labelledby="contact-heading"
          className="order-2 lg:order-1 lg:pr-16 lg:border-r lg:border-white/10"
        >
          <label className="flex flex-col" htmlFor="contact-name">
            <span className="text-[12px] uppercase tracking-[0.16em] text-white/60">Name</span>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
              autoCapitalize="words"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className={fieldClass(errors.name)}
            />
            {errors.name && (
              <span id="contact-name-error" className="text-red-300 text-sm mt-2">
                {errors.name}
              </span>
            )}
          </label>

          <label className="flex flex-col mt-8" htmlFor="contact-email">
            <span className="text-[12px] uppercase tracking-[0.16em] text-white/60">Email</span>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              className={fieldClass(errors.email)}
            />
            {errors.email && (
              <span id="contact-email-error" className="text-red-300 text-sm mt-2">
                {errors.email}
              </span>
            )}
          </label>

          <label className="flex flex-col mt-8" htmlFor="contact-message">
            <span className="text-[12px] uppercase tracking-[0.16em] text-white/60">Message</span>
            <textarea
              id="contact-message"
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What should I know?"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message
                  ? 'contact-message-error contact-message-count'
                  : 'contact-message-count'
              }
              className={`${fieldClass(errors.message)} resize-y min-h-[8rem]`}
            />
            {errors.message && (
              <span id="contact-message-error" className="text-red-300 text-sm mt-2">
                {errors.message}
              </span>
            )}
            <span id="contact-message-count" className="text-white/55 text-xs mt-2">
              {form.message.trim().length}/1000
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className={`mt-10 border border-white/25 px-5 py-2.5 text-[13px] tracking-[0.16em] uppercase text-white/90 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/60 hover:text-white'
            }`}
          >
            {loading ? 'Sending…' : 'Send'}
          </button>

          <p className="mt-6 text-[12px] text-white/55 leading-relaxed max-w-md">
            Used only to reply. Not shared.
          </p>
        </motion.form>

        <motion.aside
          variants={fadeIn('up', 'tween', 0.12, 0.7)}
          className="order-1 lg:order-2 lg:pl-16"
        >
          <h3 className="font-serif text-white text-[26px] sm:text-[28px] tracking-tight">
            Direct
          </h3>
          <ul className="mt-6 space-y-4">
            {direct.map((item) => (
              <li key={item.label}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  aria-label={
                    item.external ? `${item.label}: ${item.value} (opens in a new tab)` : undefined
                  }
                  className="mt-1 inline-block text-[15px] text-white/70 hover:text-white transition-colors break-all"
                >
                  {item.value}
                </a>
              </li>
            ))}
            <li>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">Location</p>
              <p className="mt-1 text-[15px] text-white/70">{contactInfo.location}</p>
            </li>
          </ul>
        </motion.aside>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, 'contact');
