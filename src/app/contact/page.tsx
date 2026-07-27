'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Send, CheckCircle2, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fafafa] text-[#171717] selection:bg-zinc-950 selection:text-white">
      <div>
        <Header />

        <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-900 text-xs font-mono-tech mb-6 shadow-vercel-sm">
            <Mail className="w-3.5 h-3.5 text-zinc-950" />
            <span>GET IN TOUCH</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 mb-4">
            Contact Us.
          </h1>

          <p className="text-zinc-600 text-sm sm:text-base mb-10 leading-relaxed max-w-xl">
            Have questions about BG Remover, feature requests, or technical inquiries? Send us a message and our team will respond within 24 hours.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Form Card */}
            <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200 shadow-vercel-md">
              {submitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-zinc-950 text-white flex items-center justify-center mb-4 shadow-vercel-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-950 mb-2">Message Received!</h3>
                  <p className="text-zinc-600 text-xs sm:text-sm max-w-md mb-6">
                    Thank you for reaching out to BG Remover. Our support team will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'general', message: '' });
                    }}
                    className="px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 text-xs font-semibold border border-zinc-200 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-950 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-950 text-xs focus:border-zinc-950 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-950 mb-1.5">
                        Your Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-950 text-xs focus:border-zinc-950 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-950 mb-1.5">
                      Subject Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-950 text-xs focus:border-zinc-950 focus:bg-white focus:outline-none transition-all"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="feature">Feature Request / Feedback</option>
                      <option value="bug">Report a Bug / AI Precision</option>
                      <option value="privacy">Privacy & Security</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-950 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-950 text-xs focus:border-zinc-950 focus:bg-white focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs shadow-vercel-sm hover:scale-[1.01] active:scale-[0.99] transition-all min-h-[44px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Quick Contact & Info Card */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-vercel-sm">
                <Mail className="w-5 h-5 text-zinc-950 mb-3" />
                <h3 className="text-sm font-bold text-zinc-950 mb-1">Direct Email</h3>
                <p className="text-xs text-zinc-600 mb-3">Reach our engineering team directly for fast support.</p>
                <a href="mailto:support@bgremover.com" className="text-xs font-mono-tech text-zinc-950 underline font-semibold">
                  support@bgremover.com
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-vercel-sm">
                <HelpCircle className="w-5 h-5 text-zinc-950 mb-3" />
                <h3 className="text-sm font-bold text-zinc-950 mb-1">Need Quick Answers?</h3>
                <p className="text-xs text-zinc-600 mb-3">Check out our frequently asked questions on the homepage.</p>
                <a href="/#faq-section" className="text-xs font-mono-tech text-zinc-950 underline font-semibold">
                  View FAQs →
                </a>
              </div>
            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
