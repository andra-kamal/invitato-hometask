'use client';

import { motion } from 'framer-motion';

export default function GreetingSection() {
  return (
    <section className="py-8 px-6 md:px-12 bg-brand-bg text-center flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="space-y-4">
          <p className="text-lg md:text-xl font-serif leading-relaxed text-brand-secondary italic">
            "I was sound asleep, but in my dreams I was wide awake. Oh, listen! It's the sound of my lover knocking, calling!"
          </p>
          <p className="text-sm uppercase tracking-widest text-brand-primary/60">
            — Song of Songs 5:2 MSG
          </p>
        </div>

        <div className="py-4">
          <h2 className="text-4xl md:text-5xl font-serif text-brand-primary">
            Ricky <span className="font-script lowercase text-3xl md:text-4xl text-brand-accent px-2">and</span> Fellycia
          </h2>
        </div>
      </motion.div>
    </section>
  );
}
