'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Wish = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/wishes');
      const data = await res.json();
      if (data.success) {
        setWishes(data.wishes);
      }
    } catch (error) {
      console.error('Failed to fetch wishes:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setStatus('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit wish');
      
      if (data.success) {
        setWishes((prev) => [data.wish, ...prev]);
        setFormData({ name: '', message: '' });
        setStatus('success');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to submit. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const isFormValid = formData.name.trim() !== '' && formData.message.trim() !== '';

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
          <h2 className="text-3xl md:text-4xl font-serif text-brand-primary tracking-widest uppercase mb-6">
            Kind Words
          </h2>
          <p className="text-lg font-serif text-brand-primary">
            Please leave your sincere prayers and wishes to us and our families:
          </p>
        </div>

        {/* Wish Form */}
        <form onSubmit={handleSubmit} className="space-y-6 mb-16">
          <div>
            <label className="block text-brand-primary font-serif text-lg mb-2">Your Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="w-full bg-[#e3e9ef] border border-transparent focus:border-brand-primary/30 rounded-lg px-4 py-3 text-brand-primary outline-none transition-all placeholder:text-brand-secondary/50 focus:bg-[#edf2f7]"
              required
            />
          </div>

          <div>
            <label className="block text-brand-primary font-serif text-lg mb-2">Dear Ricky & Fellycia...</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full bg-[#e3e9ef] border border-transparent focus:border-brand-primary/30 rounded-lg px-4 py-3 text-brand-primary outline-none transition-all resize-none placeholder:text-brand-secondary/50 focus:bg-[#edf2f7]"
              placeholder="Write your prayers and warm wishes..."
              required
            />
          </div>

          {/* Action Row: Left Notification & Right Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
            {/* Notification Area (Left of Submit Button) */}
            <div className="w-full sm:flex-1 text-left min-h-[36px] flex items-center">
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, x: -12, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -12, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2 text-emerald-800 bg-emerald-50/95 px-4 py-2 rounded-full border border-emerald-300 text-sm font-serif shadow-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0 font-sans">
                      ✓
                    </span>
                    <span>Thank you! Your wish has been posted.</span>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, x: -12, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -12, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2 text-rose-800 bg-rose-50/95 px-4 py-2 rounded-full border border-rose-300 text-sm font-serif shadow-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs shrink-0 font-sans">
                      !
                    </span>
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`relative inline-flex items-center justify-center gap-2 px-8 py-2.5 text-white rounded-full transition-all duration-300 tracking-widest font-serif disabled:opacity-50 shrink-0 shadow-sm ${
                isFormValid
                  ? 'bg-brand-primary hover:bg-brand-primary/90 hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-[#b4bec8] hover:bg-brand-primary/40 cursor-not-allowed'
              }`}
            >
              {status === 'loading' ? (
                <>
                  <motion.svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </motion.svg>
                  <span>Sending...</span>
                </>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>

        {/* Wishes List with Layout Animation */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                layout
                initial={{ opacity: 0, y: -24, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#f5f7f9] p-6 rounded-xl shadow-sm border border-[#e3e9ef] transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-brand-primary">{wish.name}</span>
                  <span className="text-brand-accent text-sm">♦</span>
                </div>
                <p className="text-brand-primary/85 font-serif leading-relaxed mb-4 text-[15px]">
                  {wish.message}
                </p>
                <div className="text-xs text-brand-secondary flex items-center justify-between">
                  <span>{formatDate(wish.createdAt)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {wishes.length === 0 && (
            <p className="text-center text-brand-secondary italic py-8">
              Be the first to send your wishes!
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
