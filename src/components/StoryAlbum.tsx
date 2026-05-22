/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ChevronLeft, ChevronRight, BookOpen, Quote, Eye } from 'lucide-react';
import { IMAGES } from '../data/images';

interface AlbumItem {
  id: string;
  title: string;
  subtitle: string;
  story: string;
  image: string;
  date: string;
  category: string;
  moodColor: string;
  quote: string;
}

const ALBUM_STORIES: AlbumItem[] = [
  {
    id: 'pict-1',
    title: 'The First Stage Victory',
    subtitle: 'Where Fear Slowly Turned Into Confidence',
    story: 'In her first year of college, Narmatha stood on stage with trembling hands and a nervous heart. What seemed like just a PPT presentation for others… was a battle against her own fears. Slide by slide, her confidence bloomed. And when her name was announced for the First Prize… for the first time in her life, she didn’t feel weak. She felt proud.',
    image: IMAGES.album.midnightCodingTerminal,
    date: 'First Year of College',
    category: 'Achievement & Confidence',
    moodColor: '#4B1B61',
    quote: '"That small certificate was not just a prize — it was proof that she was finally learning to believe in herself."'
  },

  {
    id: 'pict-2',
    title: 'Colors of Her Own World',
    subtitle: 'Finding Peace Through Creativity',
    story: 'Narmatha slowly found peace in content creation and fashion — a world where she could truly be herself. Through creativity, colors, and confidence, she discovered happiness beyond her struggles. For the first time, life felt lighter, calmer, and beautifully her own.',
    image: IMAGES.album.sunsetHandsClasp,
    date: 'Healing Era',
    category: 'Self Discovery',
    moodColor: '#D4AF37',
    quote: '"Somewhere between fashion, creativity, and quiet moments… she finally found herself again."'
  },

  {
    id: 'pict-3',
    title: 'The Chennai Interview',
    subtitle: 'A Moment That Made Her Mother Proud',
    story: 'In Chennai, Narmatha walked into her very first interview carrying years of struggle, hope, and silent prayers in her heart. Despite all the fear and pressure, she faced the moment with courage and confidence. And when she succeeded, it wasn’t just her victory — it was the first time she made both herself and her mother truly proud.',
    image: IMAGES.album.rainTeacupComfort,
    date: 'A New Beginning',
    category: 'Career Milestone',
    moodColor: '#721B3E',
    quote: '"Behind her nervous smile stood years of sacrifices, prayers, and the dream of making her mother proud."'
  },

  {
    id: 'pict-4',
    title: 'Her First Dress',
    subtitle: 'A Small Purchase, A Big Happiness',
    story: 'She bought a dress with her own hard-earned money for the very first time. It was not just a simple dress for her — it was a small symbol of independence and happiness. The smile on her face that day was pure, peaceful, and unforgettable.',
    image: IMAGES.album.stardustConstellation,
    date: 'Independent Moments',
    category: 'Little Happiness',
    moodColor: '#050208',
    quote: '"Sometimes the smallest things carry the biggest emotions — and that dress carried her pride."'
  },

  {
    id: 'pict-5',
    title: 'The Backpack Gift',
    subtitle: 'A Simple Gift Filled With Love',
    story: 'When Rishabh gifted her a backpack after such a long time, Narmatha’s happiness was impossible to hide. It wasn’t just a bag for her — it was a small gesture filled with love, care, and the feeling of being truly valued.',
    image: IMAGES.album.maternalProtectiveShield,
    date: 'Love & Care',
    category: 'Emotional Memories',
    moodColor: '#D4AF37',
    quote: '"It was never about the gift itself — it was about finally feeling loved, remembered, and special."'
  }
];

export default function StoryAlbum() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const current = ALBUM_STORIES[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % ALBUM_STORIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + ALBUM_STORIES.length) % ALBUM_STORIES.length);
  };

  return (
    <div
      id="narmatha-story-album-section"
      className="relative w-full max-w-5xl mx-auto px-4 md:px-6 py-20 bg-black/40 border border-white/5 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden group/album"
    >
      {/* Decorative background radial light aligned with active index mood color */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-[130px] pointer-events-none transition-all duration-1000"
        style={{ backgroundColor: current.moodColor }}
      />
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-tr-3xl pointer-events-none" />

      {/* Album Section Header */}
      <div className="text-center space-y-3 mb-12">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold flex items-center justify-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" /> Photographic Chronicles
        </span>
        <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[#F9F6F2] font-light">
          Sacred <span className="italic text-[#D4AF37]">Story Album</span>
        </h2>
        <p className="text-xs text-[#F9F6F2]/50 max-w-md mx-auto leading-relaxed">
          Every picture hides a silent battle. Every milestone narrates the beautiful triumph of an uncelebrated baby girl who became our strongest warrior.
        </p>
        <div className="w-12 h-px bg-[#D4AF37]/45 mx-auto rounded mt-3" />
      </div>

      {/* The Majestic Cinematic Slideshow Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Frame: Large Image Display with soft custom borders */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] md:aspect-[16/10] w-full bg-neutral-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl group flex items-center justify-center">
            {/* Ambient image background shadow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.img
                key={current.id}
                src={current.image}
                alt={current.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="w-full h-full object-cover select-none pointer-events-none"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Float Badge overlay top left */}
            <div className="absolute top-4 left-4 z-20">
              <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase bg-black/80 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md shadow-lg font-semibold">
                {current.category}
              </span>
            </div>

            {/* Float Date overlay bottom left */}
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-[10px] font-mono text-white/70 block uppercase tracking-wider font-bold">
                {current.date}
              </span>
            </div>

            {/* Hover look action cue */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-15 pointer-events-none">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-black/90 border border-[#D4AF37]/35 px-4 py-2 rounded-full flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> Lens into her soul
              </span>
            </div>
          </div>

          {/* Quick slideshow controls centered below photo representation */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 text-[#F9F6F2]/75 hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all cursor-pointer active:scale-90"
              title="Previous Story"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-xs font-mono text-[#F9F6F2]/40 tracking-widest uppercase">
              <span className="text-[#D4AF37] font-bold font-mono">{activeIndex + 1}</span> / {ALBUM_STORIES.length}
            </div>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-white/10 bg-white/5 text-[#F9F6F2]/75 hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all cursor-pointer active:scale-90"
              title="Next Story"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Frame: Detailed Storytelling Narration Block */}
        <div className="lg:col-span-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 text-left"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#D4AF37] font-bold">
                  {current.category} • {current.date}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-[#F9F6F2] font-semibold tracking-tight">
                  {current.title}
                </h3>
                <p className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest italic mt-1">
                  {current.subtitle}
                </p>
              </div>

              {/* Heartbreaking & Hopeful Story Text Container */}
              <div className="relative p-5 md:p-6 bg-neutral-950/40 border border-white/5 rounded-2xl shadow-inner text-[#F9F6F2]/80 text-xs md:text-sm leading-relaxed font-sans font-light space-y-4">
                <p className="indent-4 tracking-wide font-sans leading-relaxed">
                  {current.story}
                </p>
              </div>

              {/* Romantic Quote Tribute Block */}
              <div className="border-l-2 border-[#D4AF37]/40 pl-4 py-1 italic relative text-xs md:text-sm text-[#F9F6F2]/70 font-serif leading-relaxed flex gap-2">
                <Quote className="w-5 h-5 text-[#D4AF37]/30 flex-shrink-0" />
                <p className="tracking-wide">
                  {current.quote}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Grid of Polaroid mini-thumbnails below for direct quick access */}
      <div className="mt-12 pt-8 border-t border-white/5">
        <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#F9F6F2]/30 text-center mb-5">
          Select a frame directly to reveal its story
        </p>
        
        <div className="grid grid-cols-5 gap-3.5 md:gap-4 max-w-3xl mx-auto">
          {ALBUM_STORIES.map((item, index) => {
            const isSelected = index === activeIndex;
            return (
              <button
                key={item.id}
                onClick={() => setActiveIndex(index)}
                className={`relative aspect-square rounded-xl overflow-hidden border transition-all duration-300 transform group hover:scale-[1.06] shadow-md cursor-pointer ${
                  isSelected 
                    ? 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-[#D4AF37]/40 scale-[1.04]' 
                    : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                }`}
                title={item.title}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual glow element */}
                {isSelected && (
                  <div className="absolute inset-0 bg-[#D4AF37]/10 animate-pulse pointer-events-none" />
                )}
                
                {/* Direct quick highlight number corner overlay */}
                <div className="absolute bottom-1 right-1 bg-black/75 px-1.5 py-0.5 rounded text-[8px] font-mono text-white/80 scale-90">
                  #{index + 1}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
