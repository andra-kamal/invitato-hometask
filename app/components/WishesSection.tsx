'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    if (!formData.name || !formData.message) return;

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
        setWishes([data.wish, ...wishes]);
        setFormData({ name: '', message: '' });
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to submit. Please try again.');
      setStatus('error');
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
              className="w-full bg-[#e3e9ef] border border-transparent focus:border-brand-primary/30 rounded px-4 py-3 text-brand-primary outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-brand-primary font-serif text-lg mb-2">Dear Ricky & Fellycia...</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full bg-[#e3e9ef] border border-transparent focus:border-brand-primary/30 rounded px-4 py-3 text-brand-primary outline-none transition-colors resize-none"
              placeholder="..."
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`px-8 py-2 text-white rounded-md transition-colors tracking-widest font-serif disabled:opacity-50 ${formData.name.trim() !== '' && formData.message.trim() !== '' ? 'bg-brand-primary hover:bg-brand-primary/80' : 'bg-[#b4bec8] hover:bg-brand-primary/40'}`}
            >
              {status === 'loading' ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          
          {status === 'success' && (
            <p className="text-green-600 text-right mt-2 font-serif">Thank you for your wishes!</p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-right mt-2 font-serif">{errorMessage}</p>
          )}
        </form>

        {/* Wishes List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {wishes.map((wish) => (
            <div key={wish.id} className="bg-[#f5f7f9] p-6 rounded shadow-sm border border-[#e3e9ef]">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-bold text-brand-primary">{wish.name}</span>
                <span className="text-brand-accent text-sm">♦</span>
              </div>
              <p className="text-brand-primary/80 font-serif leading-relaxed mb-4">
                {wish.message}
              </p>
              <div className="text-xs text-brand-secondary">
                {formatDate(wish.createdAt)}
              </div>
            </div>
          ))}
          
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
