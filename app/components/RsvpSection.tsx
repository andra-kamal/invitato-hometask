'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RsvpSection() {
  const [formData, setFormData] = useState({
    name: '',
    isAttending: null as boolean | null,
    guestCount: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<{ name: string; isAttending: boolean | null; guestCount: string } | null>(null);

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
      
      setSubmittedData({
        name: formData.name,
        isAttending: formData.isAttending,
        guestCount: formData.guestCount
      });
      setStatus('success');
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to submit. Please try again.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      isAttending: null,
      guestCount: '',
    });
    setSubmittedData(null);
    setStatus('idle');
    setErrorMessage('');
  };

  const isFormValid = formData.name.trim() !== '' && formData.isAttending !== null && Number(formData.guestCount) > 0;

  return (
    <section id="rsvp" className="py-12 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
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

        <AnimatePresence mode="wait">
          {status === 'success' && submittedData ? (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center p-8 md:p-12 bg-[#eaf0f6]/90 backdrop-blur-md rounded-2xl border border-brand-primary/15 shadow-xl relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

              {/* Animated Seal Icon */}
              <div className="relative flex items-center justify-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                  className="w-20 h-20 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-lg border-4 border-white/60"
                >
                  <motion.svg
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M20 6L9 17l-5-5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
                    />
                  </motion.svg>
                </motion.div>
              </div>

              {/* Header Title */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-brand-secondary mb-2 font-medium">
                  Response Recorded
                </p>
                <h3 className="text-3xl md:text-4xl font-serif text-brand-primary mb-3">
                  Thank You, {submittedData.name}!
                </h3>
              </motion.div>

              {/* Elegant Separator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex justify-center items-center my-6"
              >
                <span className="w-12 h-[1px] bg-brand-primary/30" />
                <span className="mx-3 text-brand-accent text-sm">♦</span>
                <span className="w-12 h-[1px] bg-brand-primary/30" />
              </motion.div>

              {/* Status Badge & Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-serif text-base border border-brand-primary/15">
                  <span className={`w-2.5 h-2.5 rounded-full ${submittedData.isAttending ? 'bg-emerald-500' : 'bg-rose-400'}`} />
                  {submittedData.isAttending
                    ? `Joyfully Attending (${submittedData.guestCount} Guest${Number(submittedData.guestCount) > 1 ? 's' : ''})`
                    : 'Unable to Attend'}
                </div>

                <p className="text-brand-secondary font-serif text-lg leading-relaxed max-w-md mx-auto italic">
                  {submittedData.isAttending
                    ? "We are truly honored and cannot wait to celebrate our special day with you!"
                    : "Thank you for letting us know. Your prayers and blessings mean everything to us."}
                </p>
              </motion.div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="mt-8 pt-4 border-t border-brand-primary/10"
              >
                <button
                  onClick={handleReset}
                  className="text-xs uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors underline-offset-4 hover:underline"
                >
                  Send another confirmation
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              key="rsvp-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block text-brand-primary font-serif text-lg mb-1">Name:</label>
                <p className="text-brand-secondary text-sm italic mb-2">*) Guest can only confirm 1 name due to personalized RSVP</p>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Full Name"
                  className="w-full bg-[#e3e9ef] border border-transparent focus:border-brand-primary/30 rounded-lg px-4 py-3 text-brand-primary outline-none transition-all placeholder:text-brand-secondary/50 focus:bg-[#edf2f7]"
                  required
                />
              </div>

              <div>
                <label className="block text-brand-primary font-serif text-lg mb-2">Guest Count:</label>
                <input
                  type="number"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  placeholder="1"
                  className="w-full bg-[#e3e9ef] border border-transparent focus:border-brand-primary/30 rounded-lg px-4 py-3 text-brand-primary outline-none transition-all placeholder:text-brand-secondary/50 focus:bg-[#edf2f7]"
                  required
                />
              </div>

              <div>
                <label className="block text-brand-primary font-serif text-lg mb-4">Will you attend the wedding?</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isAttending: true })}
                    className={`py-3 rounded-lg transition-all duration-300 font-serif tracking-wide ${
                      formData.isAttending === true
                        ? 'bg-brand-primary text-white shadow-md scale-[1.02]'
                        : 'bg-brand-primary/50 text-white/90 hover:bg-brand-primary/70'
                    }`}
                  >
                    Gladly Attend
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isAttending: false })}
                    className={`py-3 rounded-lg transition-all duration-300 font-serif tracking-wide ${
                      formData.isAttending === false
                        ? 'bg-brand-primary text-white shadow-md scale-[1.02]'
                        : 'bg-brand-primary/50 text-white/90 hover:bg-brand-primary/70'
                    }`}
                  >
                    Unable to Attend
                  </button>
                </div>
              </div>

              <div className="pt-6 text-center">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`relative inline-flex items-center justify-center gap-3 px-10 py-3 text-white rounded-full transition-all duration-300 tracking-widest font-serif disabled:opacity-60 shadow-md ${
                    isFormValid
                      ? 'bg-brand-primary hover:bg-brand-primary/90 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer'
                      : 'bg-[#b4bec8] hover:bg-brand-primary/40 cursor-not-allowed'
                  }`}
                >
                  {status === 'loading' ? (
                    <>
                      <motion.svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </motion.svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>
              
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-center text-sm font-serif flex items-center justify-center gap-2 mt-4"
                >
                  <svg className="w-4 h-4 text-rose-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
