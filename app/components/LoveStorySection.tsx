'use client';

import { motion } from 'framer-motion';

export default function LoveStorySection() {
  return (
    <section className="py-12 px-6 bg-brand-bg text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <div className="w-12 h-12 border border-brand-primary/30 rounded-full flex items-center justify-center mb-8">
          <span className="w-6 h-6 border border-brand-primary/40 rotate-45 flex items-center justify-center">
            <span className="w-3 h-3 bg-brand-accent/30 rounded-full" />
          </span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-serif text-brand-primary mb-6 tracking-widest uppercase">
          Love Story
        </h2>
        
        <p className="text-lg md:text-xl font-serif text-brand-secondary mb-10 italic">
          Read and follow our love of life<br />journey as a couple here:
        </p>
        
        <button className="px-8 py-3 bg-brand-primary/60 text-white rounded-md hover:bg-brand-primary/80 transition-colors tracking-widest font-serif text-lg">
          Our Love Story
        </button>
      </motion.div>
    </section>
  );
}
