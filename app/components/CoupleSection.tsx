'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CoupleSection() {
  return (
    <section id="groom-bride" className="py-4 px-6 md:px-12 bg-brand-bg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-widest text-brand-primary mb-2">
          The Groom & Bride
        </h2>
      </motion.div>

      <div className="flex flex-col gap-24 max-w-4xl mx-auto">
        {/* Groom Profile */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative w-64 h-80 md:w-72 md:h-96 mb-8 overflow-hidden rounded-t-[40%] rounded-b-md shadow-xl">
            <Image
              src="/5.webp"
              alt="Ricky Ravanelli"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-3xl font-serif text-brand-primary mb-4">Ricky Ravanelli, S.E.</h3>
          <div className="text-brand-secondary mb-6 font-serif text-lg">
            <p className="italic mb-2">The Son of</p>
            <p>Mr. Parent Man</p>
            <p>&amp;</p>
            <p>Mrs. Parent Lady</p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm tracking-widest hover:bg-brand-primary/20 transition-colors"
          >
            @groomricky
          </a>
        </motion.div>

        {/* Separator */}
        <div className="flex justify-center items-center">
          <span className="w-16 h-[1px] bg-brand-primary/30"></span>
          <span className="mx-4 text-brand-accent text-2xl font-serif">♦</span>
          <span className="w-16 h-[1px] bg-brand-primary/30"></span>
        </div>

        {/* Bride Profile */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative w-64 h-80 md:w-72 md:h-96 mb-8 overflow-hidden rounded-t-[40%] rounded-b-md shadow-xl">
            <Image
              src="/6.webp"
              alt="Fellycia Indriyani Pratama"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-3xl font-serif text-brand-primary mb-4">Fellycia Indriyani Pratama, S.I.Kom.</h3>
          <div className="text-brand-secondary mb-6 font-serif text-lg">
            <p className="italic mb-2">The Daughter of</p>
            <p>Mr. Parent Man</p>
            <p>&amp;</p>
            <p>Mrs. Parent Lady</p>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-block px-6 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm tracking-widest hover:bg-brand-primary/20 transition-colors"
          >
            @bridefelly
          </a>
        </motion.div>
      </div>
    </section>
  );
}
