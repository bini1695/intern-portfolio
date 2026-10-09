'use client';

import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiMapPin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="space-y-12">
      <div className="space-y-4">
        <div className="text-brand-purple font-medium text-sm tracking-wider uppercase">05 / Let's Work Together</div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Let's Work Together</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Have an idea, a challenge, or just a good question? Let's start a conversation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            I'm open to thoughtful collaborations, freelance projects, and full-time opportunities with teams building something meaningful.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-brand-purple">
                <FiMail className="text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">EMAIL</div>
                <a href="mailto:biniyamtegegne21@gmail.com" className="text-lg font-medium text-gray-900 dark:text-white hover:text-brand-purple transition-colors break-all">
                  biniyamtegegne21@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-brand-purple">
                <FiPhone className="text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">PHONE</div>
                <a href="tel:+12025550147" className="text-lg font-medium text-gray-900 dark:text-white hover:text-brand-purple transition-colors">+251918448553</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg text-brand-purple">
                <FiMapPin className="text-xl" />
              </div>
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">LOCATION</div>
                <div className="text-lg font-medium text-gray-900 dark:text-white">Addis Ababa · Open to remote</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-3xl p-8">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Tell me what you have in mind.</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">Name</label>
                <input type="text" name="from_name" required placeholder="Your name"
                  className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple transition-colors text-gray-900 dark:text-white placeholder:text-gray-400" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">Email</label>
                <input type="email" name="from_email" required placeholder="you@example.com"
                  className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple transition-colors text-gray-900 dark:text-white placeholder:text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Subject</label>
              <input type="text" name="subject" required placeholder="A little about your project"
                className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple transition-colors text-gray-900 dark:text-white placeholder:text-gray-400" />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Message</label>
              <textarea rows={4} name="message" required placeholder="What are you hoping to build?"
                className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg px-4 py-3 focus:outline-none focus:border-brand-purple transition-colors text-gray-900 dark:text-white placeholder:text-gray-400 resize-none"></textarea>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full py-4 bg-brand-purple hover:bg-brand-light disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all mt-4">
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="flex items-center gap-2 justify-center text-green-500 text-sm pt-2">
                <FiCheckCircle /> Message sent! I'll reply to {`biniyamtegegne21@gmail.com`} shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 justify-center text-red-500 text-sm pt-2">
                <FiAlertCircle /> Something went wrong. Please email me directly.
              </div>
            )}

            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
              Your message goes straight to biniyamtegegne21@gmail.com. No mailing lists, no surprises.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;