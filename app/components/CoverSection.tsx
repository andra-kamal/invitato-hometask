'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CoverSectionProps {
  onOpen: () => void;
  guestName?: string;
}

export default function CoverSection({ onOpen, guestName = 'Invitato' }: CoverSectionProps) {
  return (
    <div className="relative w-full h-[100dvh] flex flex-col justify-between items-center text-center overflow-hidden bg-[#e5e7eb]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/1.webp"
          alt="Wedding Cover"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover object-center"
        />
        {/* Cinematic dark overlay gradient for maximum text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between pt-10 pb-16 md:pb-12 px-6">
        {/* Top Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pt-6"
        >
          <p className="tracking-[0.25em] text-xs md:text-sm uppercase mb-3 text-white/80 font-medium drop-shadow-md">
            The Wedding of
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white drop-shadow-lg tracking-tight">
            Ricky <span className="font-script lowercase text-4xl md:text-5xl lg:text-6xl px-2 text-white/90">and</span> Fellycia
          </h1>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="pb-4 md:pb-6"
        >
          <div className="mb-6">
            <p className="text-sm md:text-base mb-1 text-white/90 font-sans tracking-wide drop-shadow-md">
              Dear Mr/Mrs/Ms,
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-white drop-shadow-lg tracking-wide">
              {guestName}
            </h2>
          </div>

          <button
            onClick={onOpen}
            suppressHydrationWarning
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-brand-accent text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-opacity-95 hover:shadow-2xl hover:scale-105 border border-white/20 shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-widest font-sans font-medium">
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
