'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoveStorySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const timelineData = [
    { year: '2018', text: 'Lorem ipsum dercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { year: '2019', text: 'Ldipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { year: '2020', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut' },
    { year: '2021', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.' },
  ];

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
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-brand-primary/60 text-white rounded-md hover:bg-brand-primary/80 transition-colors tracking-widest font-serif text-lg"
        >
          Our Love Story
        </button>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 lg:left-auto lg:w-[480px] z-[100] bg-[#d0d5d8] overflow-y-auto"
          >
            <div className="min-h-screen max-w-2xl mx-auto py-16 px-6 md:px-12 flex flex-col">
              <h2 className="text-3xl md:text-4xl font-serif text-[#7a7c7f] mb-16 tracking-widest uppercase text-center">
                Our Love Story
              </h2>
              
              <div className="relative flex-1">
                {/* Vertical Line */}
                <div className="absolute left-[23px] top-4 bottom-8 w-[2px] bg-white"></div>
                
                {timelineData.map((item, idx) => (
                  <div key={idx} className="relative flex gap-6 md:gap-8 mb-16 last:mb-12">
                    {/* Circle Icon */}
                    <div className="w-12 h-12 rounded-full bg-[#767676] text-white flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_2px_#d0d5d8]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    
                    {/* Content */}
                    <div className="pt-1 text-left">
                      <h3 className="text-2xl font-serif text-[#7a7c7f] mb-4">{item.year}</h3>
                      <p className="font-serif text-[#7a7c7f] leading-[1.8] text-[15px]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center pb-8">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 bg-[#767676] text-white font-serif rounded shadow-md hover:bg-[#606060] transition-colors"
                >
                  Back to Invitation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
