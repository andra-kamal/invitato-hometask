'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import CoverSection from './components/CoverSection';
import GreetingSection from './components/GreetingSection';
import CoupleSection from './components/CoupleSection';
import LoveStorySection from './components/LoveStorySection';
import CountdownSection from './components/CountdownSection';
import EventSection from './components/EventSection';
import RsvpSection from './components/RsvpSection';
import GallerySection from './components/GallerySection';
import GiftSection from './components/GiftSection';
import WishesSection from './components/WishesSection';
import FooterSection from './components/FooterSection';
import FloatingNav from './components/FloatingNav';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  // Disable browser scroll restoration and ensure starting at top
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  // Prevent scrolling when closed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen relative font-sans text-brand-primary">
      {/* Desktop Split Layout */}
      <div className="flex w-full">
        {/* Left Side - Fixed (Desktop Only) */}
        <div className="hidden lg:block lg:w-[calc(100%-480px)] fixed top-0 left-0 bottom-0 h-screen overflow-hidden">
          <Image
            src="/10.webp"
            alt="Ricky and Fellycia"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />
          
          <div className="absolute inset-0 flex flex-col justify-between py-16 px-12">
            <div className="pt-12">
              <p className="tracking-[0.4em] uppercase text-xs mb-6 text-white/80 font-semibold drop-shadow-md">
                The Wedding of
              </p>
              <h1 className="text-6xl xl:text-8xl font-serif text-white tracking-tight font-light drop-shadow-lg">
                Ricky <span className="font-script lowercase text-5xl xl:text-7xl px-3 opacity-90 text-white">and</span> Fellycia
              </h1>
            </div>
            
            <div className="pb-8 max-w-sm">
              <p className="text-lg font-serif text-white leading-relaxed italic mb-4 drop-shadow-md">
                "I was sound asleep, but in my dreams I was wide awake. Oh, listen! It's the sound of my lover knocking, calling!"
              </p>
              <p className="text-sm uppercase tracking-widest text-white/70 drop-shadow-md">— Song of Songs 5:2 MSG</p>
            </div>
          </div>
        </div>

        {/* Right Side - Scrollable content (or full width on mobile) */}
        <div className={`w-full lg:w-[480px] lg:ml-[calc(100%-480px)] shadow-2xl relative ${isOpen ? 'min-h-screen overflow-y-auto' : 'h-[100dvh] overflow-hidden'} bg-brand-bg`}>
          {/* Cover - shown on ALL screen sizes until opened */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                key="cover"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="relative w-full h-[100dvh] z-50"
              >
                <CoverSection onOpen={handleOpen} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main content, hidden until opened */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-brand-bg"
            >
              <FloatingNav />
              
              <GreetingSection />
              <CoupleSection />
              <LoveStorySection />
              <CountdownSection />
              <EventSection />
              <RsvpSection />
              <GallerySection />
              <GiftSection />
              <WishesSection />
              <FooterSection />
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
