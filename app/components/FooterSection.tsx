'use client';

import { motion } from 'framer-motion';

export default function FooterSection() {
  return (
    <section className="bg-brand-footer text-white py-12 px-6 md:px-12 text-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        <p className="text-xl md:text-2xl font-serif tracking-widest uppercase mb-12 text-white/80">
          Thank You,
        </p>
        
        <h2 className="text-4xl md:text-5xl font-serif mb-16">
          Ricky <span className="font-script lowercase text-3xl md:text-4xl text-brand-accent px-2 opacity-80">and</span> Fellycia
        </h2>
        
        <div className="text-sm md:text-base text-white/60 flex justify-end">
          <div className="text-right">
            <p>Created with Love by Invitato Candidate</p>
            <p>2026 Ricky & Fellycia</p>
            <p>All Rights Reserved</p>
          </div>
        </div>
      </motion.div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand-bg to-transparent opacity-20 pointer-events-none" />
    </section>
  );
}
