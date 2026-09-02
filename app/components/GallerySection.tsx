'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
  '/1.webp', '/2.webp', '/3.webp', '/4.webp', '/5.webp',
  '/6.webp', '/7.webp', '/8.webp', '/9.webp', '/10.webp'
];

export default function GallerySection() {
  return (
    <section className="py-12 px-6 md:px-12 bg-brand-bg text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <p className="tracking-widest uppercase text-brand-secondary text-sm mb-4">
          A PORTRAIT OF
        </p>
        <h2 className="text-4xl md:text-5xl font-serif text-brand-primary mb-12">
          RICKY <span className="font-script lowercase text-3xl md:text-4xl text-brand-accent px-2">and</span> FELLYCIA
        </h2>
        
        <p className="text-lg md:text-xl font-serif text-brand-primary mb-2">
          "True love is when both people think they're the lucky one"
        </p>
        <p className="text-brand-secondary italic mb-16">#RickyFellinlove</p>

        {/* Gallery Grid/Carousel - simplified to a grid for now */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {galleryImages.slice(0, 6).map((src, index) => (
            <div key={index} className="relative aspect-[3/4] overflow-hidden rounded-md cursor-pointer group">
              <Image
                src={src}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          ))}
        </div>
        
        {/* Thumbnails row */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-4 px-2 -mx-2 snap-x">
          {galleryImages.map((src, index) => (
            <div key={index} className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 snap-start overflow-hidden rounded cursor-pointer border-2 border-transparent hover:border-brand-primary/30 transition-all">
              <Image
                src={src}
                alt={`Thumb ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
