'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/bg-sound.mp3'); // Example music
    audioRef.current.loop = true;
    
    // Auto-play when opened
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(e => console.log('Audio play prevented by browser', e));
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play prevented by browser', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const menuItems = [
    { label: 'Groom & Bride', targetId: 'groom-bride' },
    { label: 'Wedding Details', targetId: 'wedding-details' },
    { label: 'RSVP', targetId: 'rsvp' },
    { label: 'Wedding Gift', targetId: 'wedding-gift' },
    { label: 'Kind Words', targetId: 'kind-words' },
  ];

  const scrollToSection = (targetId: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  return (
    <>
      {/* Bottom left floating controls */}
      <div className="fixed bottom-6 left-6 z-50 flex gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="w-11 h-11 bg-[#1b2d3e] border border-white/15 rounded-full flex items-center justify-center text-white hover:bg-[#25394d] transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isOpen ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <button
          onClick={toggleMusic}
          aria-label="Toggle background music"
          className="w-11 h-11 bg-[#1b2d3e] border border-white/15 rounded-full flex items-center justify-center text-white hover:bg-[#25394d] transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 lg:left-auto lg:w-[480px] z-40 bg-[#1b2d3e]/95 backdrop-blur-md flex flex-col justify-center px-8 md:px-12"
          >
            <div className="absolute top-10 left-8 md:left-12">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1 font-sans">
                Wedding of
              </p>
              <h2 className="text-2xl md:text-3xl font-serif text-white">
                Ricky <span className="font-script lowercase text-2xl text-brand-accent px-1">and</span> Fellycia
              </h2>
            </div>
            
            <nav className="flex flex-col gap-6 w-full text-right mt-16">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.targetId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <button 
                    onClick={() => scrollToSection(item.targetId)}
                    className="text-xl md:text-2xl font-serif text-white/90 hover:text-white hover:translate-x-[-4px] transition-all pb-3 border-b border-white/10 block w-full text-right cursor-pointer"
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
