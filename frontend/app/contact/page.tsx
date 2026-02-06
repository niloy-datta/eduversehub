'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const contactMethods = [
    { icon: '📧', title: 'Email', value: 'support@eduversehub.com', link: 'mailto:support@eduversehub.com' },
    { icon: '💬', title: 'Discord', value: 'Join our community', link: '#' },
    { icon: '🐦', title: 'Twitter', value: '@eduversehub', link: '#' },
  ];

  const faqs = [
    { q: 'Is EduVerse Hub free to use?', a: 'Yes! Our core features are completely free. We also offer a Pro plan with additional features.' },
    { q: 'How do I track my progress?', a: 'Create a free account to automatically save your typing history and view detailed analytics.' },
    { q: 'Can I use EduVerse Hub on mobile?', a: 'Yes, our platform works on tablets and mobile devices, though we recommend a physical keyboard for the best experience.' },
    { q: 'How do I report a bug?', a: 'Use the contact form on this page or email us directly at bugs@eduversehub.com.' },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="border-b border-dark-800/50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110" style={{background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)'}}>
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <span className="text-xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                EduVerse Hub
              </span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link href="/typing" className="text-dark-400 hover:text-white transition-colors">Typing</Link>
              <Link href="/lessons" className="text-dark-400 hover:text-white transition-colors">Lessons</Link>
              <Link href="/contact" className="text-primary-400 font-medium">Contact</Link>
              <div className="w-px h-6 bg-dark-700" />
              <Link href="/login" className="text-dark-400 hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-dark-400 max-w-2xl mx-auto">
            Have a question or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="glass rounded-3xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                <p className="text-dark-400 mb-6">We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="btn-outline"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-white mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white focus:outline-none focus:border-primary-500 transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white focus:outline-none focus:border-primary-500 transition-all"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white focus:outline-none focus:border-primary-500 transition-all"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 text-white focus:outline-none focus:border-primary-500 transition-all resize-none"
                      placeholder="Tell us more..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact Methods & FAQ */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="glass rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Other Ways to Reach Us</h2>
              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.link}
                    className="flex items-center gap-4 p-4 rounded-xl bg-dark-800/30 hover:bg-dark-700/50 transition-colors"
                  >
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <div className="text-white font-medium">{method.title}</div>
                      <div className="text-dark-400 text-sm">{method.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="glass rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-xl bg-dark-800/30">
                    <div className="text-white font-medium mb-2">{faq.q}</div>
                    <div className="text-dark-400 text-sm">{faq.a}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800/50 py-6">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm text-dark-600">
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-primary-400">Contact</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
            <div>© 2026 EduVerse Hub</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
