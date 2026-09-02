'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    isAttending: null as boolean | null,
    guestCount: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    if (formData.isAttending === null) {
      alert('Please select your attendance status');
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          isAttending: formData.isAttending,
          guestCount: formData.guestCount
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit RSVP');
      
      setStatus('success');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to submit. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="py-12 px-6 md:px-12 bg-brand-bg relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-6 bg-brand-primary rounded-l-full rounded-r-sm" />
            <h2 className="text-3xl md:text-4xl font-serif text-brand-primary tracking-widest uppercase">
              RSVP
            </h2>
            <div className="w-12 h-6 bg-brand-primary rounded-r-full rounded-l-sm" />
          </div>
          
          <p className="text-lg font-serif text-brand-primary">We'd love to hear from you!</p>
          <p className="text-lg font-serif text-brand-primary">Please fill out the confirmation below:</p>
        </div>

        {status === 'success' ? (
          <div className="text-center p-8 bg-brand-card rounded-lg border border-brand-primary/10">
            <h3 className="text-2xl font-serif text-brand-primary mb-4">Thank You!</h3>
            <p className="text-brand-secondary">Your RSVP has been confirmed.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-brand-primary font-serif text-lg mb-1">Name:</label>
              <p className="text-brand-secondary text-sm italic mb-2">*) Guest can only confirm 1 name due to personalized RSVP</p>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#e3e9ef] border border-transparent focus:border-brand-primary/30 rounded px-4 py-3 text-brand-primary outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-brand-primary font-serif text-lg mb-2">Guest Count (Jumlah orang yang hadir):</label>
              <input
                type="number"
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                className="w-full bg-[#e3e9ef] border border-transparent focus:border-brand-primary/30 rounded px-4 py-3 text-brand-primary outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-brand-primary font-serif text-lg mb-4">Will you attend the wedding?</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isAttending: true })}
                  className={`py-3 rounded transition-colors font-serif ${formData.isAttending === true ? 'bg-brand-primary text-white' : 'bg-brand-primary/60 text-white/90 hover:bg-brand-primary/70'}`}
                >
                  Gladly Attend
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isAttending: false })}
                  className={`py-3 rounded transition-colors font-serif ${formData.isAttending === false ? 'bg-brand-primary text-white' : 'bg-brand-primary/60 text-white/90 hover:bg-brand-primary/70'}`}
                >
                  Unable to Attend
                </button>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`px-8 py-2 text-white rounded-md transition-colors tracking-widest font-serif disabled:opacity-50 mx-auto block ${formData.name.trim() !== '' && formData.isAttending !== null && Number(formData.guestCount) > 0 ? 'bg-brand-primary hover:bg-brand-primary/80' : 'bg-[#b4bec8] hover:bg-brand-primary/40'}`}
              >
                {status === 'loading' ? 'Submitting...' : 'Submit'}
              </button>
            </div>
            
            {status === 'error' && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
          </form>
        )}
      </motion.div>
    </section>
  );
}
