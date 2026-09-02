'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GiftSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-12 px-6 md:px-12 bg-brand-bg text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex justify-center mb-8 text-brand-primary opacity-60">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif text-brand-primary tracking-widest uppercase mb-8">
          Wedding Gift
        </h2>
        
        <p className="text-lg font-serif text-brand-primary leading-relaxed mb-10">
          For beloved ones who may want to show your sincere love by sending a gift, please kindly tap the button below:
        </p>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-brand-primary/60 text-white rounded-md hover:bg-brand-primary/80 transition-colors tracking-widest font-serif text-lg"
        >
          Send Gift
        </button>
      </motion.div>

      {/* Gift Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-card p-8 rounded-lg max-w-md w-full relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-brand-primary/50 hover:text-brand-primary"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className="text-2xl font-serif text-brand-primary mb-6">Bank Transfer</h3>
              
              <div className="bg-white p-6 rounded-md shadow-sm mb-4">
                <p className="font-bold text-xl mb-1">BCA</p>
                <p className="text-lg font-mono mb-2 tracking-widest">1234567890</p>
                <p className="text-brand-secondary">a.n. Ricky Ravanelli</p>
                <button className="mt-4 w-full py-2 border border-brand-primary/30 rounded text-sm uppercase tracking-widest hover:bg-brand-primary/5 transition-colors">
                  Copy Account Number
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-md shadow-sm">
                <p className="font-bold text-xl mb-1">Mandiri</p>
                <p className="text-lg font-mono mb-2 tracking-widest">0987654321</p>
                <p className="text-brand-secondary">a.n. Fellycia Indriyani</p>
                <button className="mt-4 w-full py-2 border border-brand-primary/30 rounded text-sm uppercase tracking-widest hover:bg-brand-primary/5 transition-colors">
                  Copy Account Number
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
