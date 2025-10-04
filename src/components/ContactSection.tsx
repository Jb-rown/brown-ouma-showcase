
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  // Read Formspree form id from Vite env (set VITE_FORMSPREE_FORM_ID in your .env)
  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined;
  const FORMSPREE_URL = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setIsSubmitting(false);
      toast({ title: 'Missing fields', description: 'Please fill in name, email and message.' });
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email)) {
      setIsSubmitting(false);
      toast({ title: 'Invalid email', description: 'Please provide a valid email address.' });
      return;
    }

    // If Formspree is configured, POST the submission there
    if (FORMSPREE_URL) {
      try {
        const res = await fetch(FORMSPREE_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          })
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok) {
          toast({ title: 'Message Sent!', description: "Thanks — I'll get back to you soon." });
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          const errMsg = data?.error || data?.message || 'Failed to send message. Please try again later.';
          toast({ title: 'Send failed', description: String(errMsg) });
        }
      } catch (err) {
        console.error('Contact form send error', err);
        toast({ title: 'Network error', description: 'Unable to send message. Check your connection.' });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // No server-side integration configured — provide guidance to the user
    setIsSubmitting(false);
    toast({
      title: 'Form not configured',
      description: 'Please configure a service to receive messages (Formspree or EmailJS). Quick setup: create a Formspree form and set VITE_FORMSPREE_FORM_ID in your .env, then restart the dev server.'
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'brownjohn9870@gmail.com',
      href: 'mailto:brownjohn9870@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 703 285 635',
      href: 'tel:+254703285635'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nairobi, Kenya',
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Jb-rown',
      color: 'hover:text-slate-300'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'http://www.linkedin.com/in/john-brown-ouma',
      color: 'hover:text-blue-400'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://x.com/JohnBro11355112',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Let's discuss your next project or explore collaboration opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                  placeholder="Project Discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                  placeholder="Tell me about your project or how we can collaborate..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-semibold transition-all duration-300 ${
                  isSubmitting
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg mr-4">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">{info.label}</h4>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-400">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                I'm always interested in discussing new opportunities, innovative projects, 
                and potential collaborations. Whether you have a specific project in mind 
                or just want to connect, feel free to reach out!
              </p>
              
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-slate-800 rounded-full hover:bg-slate-700 transform hover:scale-110 transition-all duration-300 group ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-slate-400 group-hover:text-inherit" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-8 border border-emerald-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Available for Work</h3>
              <p className="text-slate-300 mb-4">
                I'm currently open to new opportunities and exciting projects. 
                Let's create something amazing together!
              </p>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
                <span className="text-emerald-400 font-medium">Available for hire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
