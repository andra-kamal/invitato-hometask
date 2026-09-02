'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: Oct 1, 2026
    const targetDate = new Date('2026-10-01T08:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/2.webp"
          alt="Couple Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-serif mb-12 tracking-wider">
          Counting the Days!
        </h2>

        <div className="flex justify-center items-start gap-1 sm:gap-2 mb-12">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <div key={unit} className="flex items-start">
              <div className="flex flex-col items-center w-14 sm:w-16 md:w-20">
                <span className="text-4xl sm:text-5xl md:text-6xl font-serif text-center">
                  {value}
                </span>
                <span className="text-[10px] sm:text-xs md:text-sm tracking-[0.15em] mt-2 uppercase text-white/70">
                  {unit}
                </span>
              </div>
              {index < 3 && (
                <span className="text-3xl sm:text-4xl md:text-5xl font-serif mx-0.5 sm:mx-2 pt-1 sm:pt-2">
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <button className="px-8 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-md transition-all font-serif tracking-widest">
          Remind Me
        </button>
      </motion.div>
    </section>
  );
}
