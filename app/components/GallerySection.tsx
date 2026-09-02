'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
  '/1.webp', '/2.webp', '/3.webp', '/4.webp', '/5.webp',
  '/6.webp', '/7.webp', '/8.webp', '/9.webp', '/10.webp'
];

export default function GallerySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const scrollThumbnails = (scrollOffset: number) => {
    if (thumbnailsRef.current) {
      thumbnailsRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <section className="py-12 px-6 md:px-12 bg-brand-bg text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative mb-12 text-brand-primary">
          <p className="tracking-widest uppercase text-sm mb-4 opacity-70">
            A PORTRAIT OF
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-12">
            RICKY <span className="font-script lowercase text-3xl md:text-4xl text-brand-accent px-2 opacity-80">and</span> FELLYCIA
          </h2>
          
          <p className="text-lg md:text-xl font-serif mb-2">
            "True love is when both people think they're the lucky one"
          </p>
          <p className="italic opacity-60">#RickyFellinlove</p>
        </div>

        {/* Main Slider Image */}
        <div className="relative aspect-[3/4] md:aspect-[4/5] max-w-xl mx-auto overflow-hidden rounded-2xl shadow-lg mb-6 group bg-gray-200">
          <AnimatePresence custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="w-10 h-10 flex items-center justify-center text-white drop-shadow-md hover:scale-110 transition-transform"
            >
              <svg className="w-8 h-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="w-10 h-10 flex items-center justify-center text-white drop-shadow-md hover:scale-110 transition-transform"
            >
              <svg className="w-8 h-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Play/Pause Toggle */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute bottom-6 left-6 text-white drop-shadow-md opacity-70 hover:opacity-100 transition-opacity"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Thumbnails row */}
        <div className="relative max-w-xl mx-auto group/thumbs">
          {/* Scroll Left Button */}
          <button 
            onClick={() => scrollThumbnails(-200)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-12 bg-white/60 hover:bg-white/90 backdrop-blur-sm rounded-r flex items-center justify-center opacity-0 group-hover/thumbs:opacity-100 transition-opacity shadow-sm border border-brand-primary/10"
          >
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div ref={thumbnailsRef} className="flex gap-3 overflow-x-auto no-scrollbar py-4 px-2 snap-x scroll-smooth">
            {galleryImages.map((src, index) => (
              <div 
                key={index} 
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  setIsPlaying(false);
                }}
                className={`relative w-20 h-16 md:w-24 md:h-20 flex-shrink-0 snap-start overflow-hidden rounded cursor-pointer transition-all duration-300 ${
                  currentIndex === index ? 'ring-1 ring-brand-primary opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumb ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Scroll Right Button */}
          <button 
            onClick={() => scrollThumbnails(200)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-12 bg-white/60 hover:bg-white/90 backdrop-blur-sm rounded-l flex items-center justify-center opacity-0 group-hover/thumbs:opacity-100 transition-opacity shadow-sm border border-brand-primary/10"
          >
            <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
