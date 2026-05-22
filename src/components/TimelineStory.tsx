/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { TIMELINE_PHASES } from '../data/timeline';
import { TimelinePhase } from '../types';
import {
  BookOpen,
  CloudSun,
  GraduationCap,
  Compass,
  CloudRain,
  Heart,
  Music,
  Moon,
  Sparkles,
  Award,
  Calendar,
  ChevronDown
} from 'lucide-react';

interface TimelineStoryProps {
  onPhaseActive: (theme: 'childhood' | 'growing' | 'teenage' | 'love' | 'birthday') => void;
}

export default function TimelineStory({ onPhaseActive }: TimelineStoryProps) {
  return (
    <div id="love-timeline-storyline" className="relative w-full max-w-5xl mx-auto px-4 md:px-6 py-10 z-10 space-y-32">
      {/* Intro decorative element */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-[#D4AF37]/50" />
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold">The Scroll of Destiny</span>
        <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[#F9F6F2] font-light">
          Our Story <span className="italic text-[#D4AF37]">Begins Here</span>
        </h2>
        <p className="text-xs md:text-sm text-[#F9F6F2]/50 max-w-md italic font-serif">Scroll slowly to relive each precious chapter of her life...</p>
        <ChevronDown className="w-4 h-4 text-[#D4AF37] animate-bounce mt-2" />
      </div>

      {/* Render the timeline story blocks */}
      {TIMELINE_PHASES.map((phase, index) => (
        <TimelineBlock
          key={phase.id}
          phase={phase}
          index={index}
          onInView={() => onPhaseActive(phase.theme)}
        />
      ))}
    </div>
  );
}

// Inner block component utilizing Framer Motion's useInView for modular intersection triggers
interface TimelineBlockProps {
  key?: string;
  phase: TimelinePhase;
  index: number;
  onInView: () => void;
}

function TimelineBlock({ phase, index, onInView }: TimelineBlockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.35, once: false });

  // Trigger stage active state in parent when card is high in the view
  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView]);

  const isLeft = index % 2 === 0;

  // Icon chooser helper
  const renderFloatingSymbols = (theme: string) => {
    switch (theme) {
      case 'childhood':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Cute slow floating stars and circles */}
            <motion.div animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} className="absolute top-10 left-8 text-[#D4AF37]/30">🧸</motion.div>
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }} className="absolute bottom-12 right-12 text-[#D4AF37]/20">🦋</motion.div>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} className="absolute top-1/2 right-1/4 text-yellow-300/20">⭐</motion.div>
          </div>
        );
      case 'growing':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <motion.div animate={{ y: [0, -12, 0], rotate: [0, 360, 0] }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} className="absolute top-8 right-10 text-[#D4AF37]/20">
              <CloudSun className="w-8 h-8" />
            </motion.div>
            <motion.div animate={{ y: [0, -18, 0], rotate: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }} className="absolute bottom-10 left-10 text-[#D4AF37]/25">
              <BookOpen className="w-6 h-6" />
            </motion.div>
            <motion.div animate={{ scale: [0.9, 1.1, 0.9] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }} className="absolute top-1/3 left-1/3 text-yellow-105/20">🎓</motion.div>
          </div>
        );
      case 'teenage':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            {/* Rainy particles/neon glows */}
            <motion.div animate={{ y: [0, 25, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }} className="absolute top-6 left-12 text-[#D4AF37]/20">
              <CloudRain className="w-7 h-7" />
            </motion.div>
            <motion.div animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }} className="absolute bottom-8 right-14 text-[#D4AF37]/30">
              <Heart className="w-8 h-8 fill-[#D4AF37]/10" />
            </motion.div>
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} className="absolute top-1/2 right-6 text-[#D4AF37]/20">
              <Music className="w-5 h-5 animate-pulse" />
            </motion.div>
          </div>
        );
      case 'love':
        return (
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }} className="absolute top-8 right-10 text-[#D4AF37]">
              <Heart className="w-10 h-10 fill-[#D4AF37]/40 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
            </motion.div>
            <motion.div animate={{ y: [0, -30, 0], x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-10 left-8 text-[#D4AF37]/30">💖</motion.div>
            <motion.div animate={{ y: [0, -25, 0], x: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1.2 }} className="absolute top-1/2 left-2/3 text-amber-300/30">✨</motion.div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={`relative w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Side Decorative Year Indicator */}
      <div className="w-full md:w-5/12 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4">
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex items-center gap-2 px-3.5 py-1 bg-[#050208]/80 border border-white/10 rounded-full backdrop-blur-md"
        >
          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold">{phase.yearRange}</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-2xl md:text-3.5xl font-serif tracking-tight text-[#F9F6F2] font-medium leading-tight capitalize"
        >
          {phase.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xs md:text-sm font-sans text-white/50 leading-relaxed font-light italic"
        >
          {phase.subtitle}
        </motion.p>
      </div>

      {/* Story Card Box with Interactive Elements */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className={`group relative w-full md:w-6/12 rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl p-6 md:p-8 flex flex-col gap-6 bg-[#050208]/60 backdrop-blur-2xl transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-[0_0_50px_rgba(212,175,55,0.06)]`}
      >
        {/* Underlay glow backdrop matching theme color mapping mapped to dark purple/gold gradients */}
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-radial from-[#4B1B61]/25 to-transparent blur-[80px] opacity-60 pointer-events-none group-hover:scale-125 transition-transform duration-700" />

        {/* Floating symbols related to this stage */}
        {renderFloatingSymbols(phase.theme)}

        {/* Image Frame */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-inner border border-white/5 bg-[#050208] group-hover:border-[#D4AF37]/15 transition-colors duration-500">
  <img
    src={phase.imageSrc}
    alt={phase.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
    referrerPolicy="no-referrer"
  />

  <div className="absolute bottom-4 left-4">
    <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-[#D4AF37] bg-black/60 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md font-semibold">
      {phase.badge}
    </span>
  </div>
</div>

        {/* Story Text block */}
        <div className="relative space-y-4 z-10">
          <p className="text-xs md:text-sm leading-relaxed text-[#F9F6F2]/80 font-sans tracking-wide">
            {phase.theme === 'love' ? (
              // Enhanced typing vibe for the love phase
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.4 }}
              >
                {phase.emotionalText}
              </motion.span>
            ) : (
              phase.emotionalText
            )}
          </p>

          {/* Detailed achievements list inside clean cards */}
          <div className="grid grid-cols-1 gap-2.5 pt-2">
            {phase.details.map((detail, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.15 }}
                className="flex items-start gap-2 text-xs text-[#F9F6F2]/60 font-light"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70 mt-1.5 flex-shrink-0" />
                <span>{detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

