'use client';

import { motion } from 'framer-motion';

export default function EventSection() {
  return (
    <section id="wedding-details" className="py-12 px-6 md:px-12 bg-brand-bg text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <p className="text-lg font-serif text-brand-primary leading-relaxed mb-16">
          Together with joyful hearts and the grace of God, we cordially request the honor of your presence at our wedding celebration:
        </p>

        {/* Timeline Line */}
        <div className="flex flex-col items-center">
          <div className="w-[1px] h-24 bg-brand-primary/40 mb-8" />
          
          <div className="mb-12">
            <p className="text-brand-secondary tracking-widest uppercase text-sm mb-4">Date:</p>
            <h3 className="text-3xl md:text-4xl font-serif text-brand-primary font-medium mb-2">Thursday,</h3>
            <h3 className="text-3xl md:text-4xl font-serif text-brand-primary font-medium">01 October 2026</h3>
          </div>

          <div className="w-[1px] h-24 bg-brand-primary/40 mb-8" />
          
          {/* Holy Matrimony */}
          <div className="mb-16">
            <div className="flex justify-center mb-6 text-brand-primary opacity-60">
              {/* Ring Icon placeholder */}
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 11.25a2.25 2.25 0 114.5 0M9 14.25a2.25 2.25 0 114.5 0" />
                <circle cx="12" cy="12" r="8" strokeWidth={1} />
              </svg>
            </div>
            <p className="text-brand-secondary tracking-widest uppercase text-sm mb-4">Holy Matrimony:</p>
            <div className="text-3xl md:text-4xl font-serif text-brand-primary mb-6">
              11.00 <span className="text-2xl md:text-3xl">WIB</span>
            </div>
            <div className="text-lg font-serif text-brand-primary mb-2">GBT Kristus Alfa Omega Puri Anjasmoro</div>
            <div className="text-brand-secondary">Jalan Puri Anjasmoro No 10 Blok J1, Semarang</div>
          </div>

          <div className="w-[1px] h-24 bg-brand-primary/40 mb-8" />

          {/* Wedding Reception */}
          <div className="mb-12">
            <div className="flex justify-center mb-6 text-brand-primary opacity-60">
              {/* Cheers Icon placeholder */}
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-brand-secondary tracking-widest uppercase text-sm mb-4">Wedding Reception:</p>
            <div className="text-3xl md:text-4xl font-serif text-brand-primary mb-6">
              18.00 <span className="text-2xl md:text-3xl">WIB</span>
            </div>
            <div className="text-lg font-serif text-brand-primary mb-2">MAC Ballroom</div>
            <div className="text-brand-secondary leading-relaxed">
              Jalan Majapahit No 168, Gayamsari, Kec. Gayamsari,<br />Kota Semarang
            </div>
          </div>

          <a 
            href="https://www.google.com/maps/place/MAC+BALLROOM/@-7.0026844,110.4470466,17z/data=!3m1!4b1!4m6!3m5!1s0x2e708c92d2100b1f:0x598cdabb59d88d72!8m2!3d-7.0026897!4d110.4496215!16s%2Fg%2F11f4_2wtgk?hl=en-id&entry=tts"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-brand-primary/60 text-white rounded-md hover:bg-brand-primary/80 transition-colors tracking-widest font-serif text-lg mt-4 mb-16 inline-block"
          >
            See Location
          </a>
        </div>
      </motion.div>
    </section>
  );
}
