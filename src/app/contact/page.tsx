'use client';

import { useState } from 'react';
import { EnvelopeIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@/components/ui';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full mb-6">
            <EnvelopeIcon className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Get in Touch</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Contact Us
          </h1>

          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Have a question or feedback? We&apos;d love to hear from you.
            Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-gray-200/50 border border-gray-100"
        >
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <Input
              label="Your Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-6">
            <Input
              label="Subject"
              placeholder="How can we help you?"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <textarea
              rows={6}
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 focus:outline-none resize-none"
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <PaperAirplaneIcon className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
