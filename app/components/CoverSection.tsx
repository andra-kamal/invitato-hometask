'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CoverSectionProps {
  onOpen: () => void;
  guestName?: string;
}

export default function CoverSection({ onOpen, guestName = 'Invitato' }: CoverSectionProps) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-between items-center text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/1.webp"
          alt="Wedding Cover"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/60 via-transparent to-brand-bg/80" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between py-12 px-6">
        {/* Top Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-8"
        >
          <p className="tracking-[0.2em] text-sm md:text-base uppercase mb-4 text-brand-primary">
            The Wedding of
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-primary drop-shadow-sm">
            Ricky <span className="font-script lowercase text-4xl md:text-5xl lg:text-6xl px-2 opacity-80">and</span> Fellycia
          </h1>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="pb-12"
        >
          <div className="mb-8">
            <p className="text-sm md:text-base mb-2 text-brand-primary">Dear Mr/Mrs/Ms,</p>
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-brand-primary">
              {guestName}
            </h2>
          </div>

          <button
            onClick={onOpen}
            suppressHydrationWarning
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-brand-accent text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-widest">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              Open Invitation
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
