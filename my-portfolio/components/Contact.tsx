'use client';

import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiMapPin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const CARAMEL = '#C4A47C';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setIsLoading(false);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form, publicKey);
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px" style={{ background: CARAMEL }} />
          <span className="text-sm uppercase tracking-[0.25em] font-medium" style={{ color: CARAMEL }}>
            Contact
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white">Let's Work Together</h2>
        <p className="text-lg text-zinc-400">
          Interested in working together? Reach out and let's start a conversation.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg" style={{ background: 'rgba(196,164,124,0.08)', border: '1px solid rgba(196,164,124,0.25)', color: CARAMEL }}>
              <FiMapPin className="text-xl" />
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-1">MY LOCATION</div>
              <div className="text-lg font-medium text-white">Injibara, Ethiopia</div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg" style={{ background: 'rgba(196,164,124,0.08)', border: '1px solid rgba(196,164,124,0.25)', color: CARAMEL }}>
              <FiPhone className="text-xl" />
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-1">PHONE</div>
              <a href="tel:+251918448553" className="text-lg font-medium text-white hover:text-[#C4A47C]">
                +251 91 844 8553
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg" style={{ background: 'rgba(196,164,124,0.08)', border: '1px solid rgba(196,164,124,0.25)', color: CARAMEL }}>
              <FiMail className="text-xl" />
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-1">EMAIL</div>
              <a href="mailto:biniyamtegegne21@gmail.com" className="text-lg font-medium text-white hover:text-[#C4A47C] break-all">
                biniyamtegegne21@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-8" style={{ background: 'rgba(196,164,124,0.03)', border: '1px solid rgba(196,164,124,0.20)' }}>
          <h3 className="text-2xl font-semibold mb-6 text-white">Get In Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="from_name" required placeholder="Your name" className="w-full rounded-lg px-4 py-3 bg-zinc-950 text-white placeholder:text-zinc-500 focus:outline-none" style={{ border: '1px solid rgba(196,164,124,0.25)' }} />
              <input type="email" name="from_email" required placeholder="you@example.com" className="w-full rounded-lg px-4 py-3 bg-zinc-950 text-white placeholder:text-zinc-500 focus:outline-none" style={{ border: '1px solid rgba(196,164,124,0.25)' }} />
            </div>
            <input type="text" name="subject" required placeholder="Subject" className="w-full rounded-lg px-4 py-3 bg-zinc-950 text-white placeholder:text-zinc-500 focus:outline-none" style={{ border: '1px solid rgba(196,164,124,0.25)' }} />
            <textarea rows={4} name="message" required placeholder="Your message" className="w-full rounded-lg px-4 py-3 bg-zinc-950 text-white placeholder:text-zinc-500 focus:outline-none resize-none" style={{ border: '1px solid rgba(196,164,124,0.25)' }} />
            <button type="submit" disabled={isLoading} className="w-full py-4 font-semibold rounded-lg text-black disabled:opacity-60" style={{ background: CARAMEL, boxShadow: '0 10px 30px rgba(196,164,124,0.35)' }}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="flex items-center gap-2 justify-center text-sm pt-2" style={{ color: CARAMEL }}>
                <FiCheckCircle /> Your message has been sent. Thank you!
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 justify-center text-red-500 text-sm pt-2">
                <FiAlertCircle /> Something went wrong. Try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;