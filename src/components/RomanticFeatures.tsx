/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOVE_LETTERS, REASONS_WHY, MEMORY_GALLERY } from '../data/timeline';
import { LoveLetter, ReasonLove, MemoryItem } from '../types';
import {
  Heart,
  Smile,
  Sparkles,
  Anchor,
  Sun,
  Flame,
  Mail,
  MailOpen,
  Calendar,
  Eye,
  X,
  MapPin,
  Lock
} from 'lucide-react';

export default function RomanticFeatures() {
  const [activeLetter, setActiveLetter] = useState<LoveLetter | null>(null);
  const [heartClicks, setHeartClicks] = useState(0);
  const [heartBursts, setHeartBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  // Simple icon component lookup mapped to royal Gold
  const getReasonIcon = (iconName: string) => {
    const sizeClasses = "w-6 h-6 text-[#D4AF37] group-hover:text-yellow-200 group-hover:scale-105 transition-transform duration-300";
    switch (iconName) {
      case 'Heart':
        return <Heart className={`${sizeClasses} fill-[#D4AF37]/10`} />;
      case 'Smile':
        return <Smile className={sizeClasses} />;
      case 'Sparkles':
        return <Sparkles className={sizeClasses} />;
      case 'Anchor':
        return <Anchor className={sizeClasses} />;
      case 'Sun':
        return <Sun className={sizeClasses} />;
      case 'Flame':
        return <Flame className={`${sizeClasses} fill-[#D4AF37]/10`} />;
      default:
        return <Heart className={sizeClasses} />;
    }
  };

  const handleHeartButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setHeartClicks((prev) => prev + 1);

    // Get click coords inside the button or viewport absolute coords
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    // Spawn 14 burst hearts
    const newBursts = Array.from({ length: 14 }).map((_, idx) => ({
      id: Date.now() + idx,
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 40,
    }));

    setHeartBursts((prev) => [...prev, ...newBursts]);

    // Clean up particles after fade out duration (1.2 seconds)
    setTimeout(() => {
      setHeartBursts((prev) => prev.filter((b) => !newBursts.some((nb) => nb.id === b.id)));
    }, 1200);
  };

  return (
    <div id="extra-romantic-modules" className="relative w-full py-16 space-y-32 z-20">
      {/* 1. Reasons why I love you cards  */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">Whispers of the Soul</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[#F9F6F2] font-light">
            Reasons I Choose <span className="italic text-[#D4AF37]">You Everyday</span>
          </h2>
          <div className="w-12 h-px bg-[#D4AF37]/45 mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS_WHY.map((reason) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: reason.id * 0.1 }}
              className="group relative bg-[#050208]/70 border border-white/5 p-6 rounded-2xl flex flex-col gap-4 backdrop-blur-md hover:border-[#D4AF37]/25 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(212,175,55,0.05)] overflow-hidden"
            >
              {/* Corner ambient card highlight */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#D4AF37]/5 to-transparent rounded-tr-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-[#4B1B61]/20 group-hover:border-[#D4AF37]/20 transition-all duration-300">
                  {getReasonIcon(reason.iconName)}
                </div>
                <h3 className="text-sm md:text-base font-sans tracking-tight text-[#F9F6F2] font-semibold group-hover:text-[#D4AF37] transition-colors">
                  {reason.title}
                </h3>
              </div>

              <p className="text-xs text-[#F9F6F2]/60 leading-relaxed font-sans font-light">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Cozy Memory Gallery Section */}
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">Frozen in Time</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[#F9F6F2] font-light">
            Our Magical <span className="italic text-[#D4AF37]">Polaroids</span>
          </h2>
          <div className="w-12 h-px bg-[#D4AF37]/45 mx-auto rounded" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEMORY_GALLERY.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-[#050208]/80 border border-white/10 p-4 rounded-2xl shadow-xl flex flex-col gap-4 backdrop-blur-md group hover:border-[#D4AF37]/25 transform hover:-translate-y-1.5 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Polaroid Photo Frame */}
              <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-black border border-white/5 shadow-inner">
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest bg-black/60 border border-white/15 px-2 py-0.5 rounded backdrop-blur-sm font-semibold">
                    {memory.category}
                  </span>
                </div>
              </div>

              {/* Photo Description Block */}
              <div className="space-y-1.5 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 justify-between">
                  <span className="text-[10px] font-mono text-[#D4AF37] font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#D4AF37] inline" /> {memory.date}
                  </span>
                </div>
                <h3 className="text-sm font-sans tracking-tight text-[#F9F6F2] font-semibold">
                  {memory.title}
                </h3>
                <p className="text-[11px] text-[#F9F6F2]/50 leading-relaxed font-light">
                  {memory.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 3. Envelope Love Letters Section */}
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-3 mb-10">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold">Encrypted in Stars</span>
          <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[#F9F6F2] font-light">
            Wax-Sealed <span className="italic text-[#D4AF37]">Thoughts lock-box</span>
          </h2>
          <p className="text-xs text-[#F9F6F2]/50 italic font-serif">Click on any gold-stitched envelope to unlock...</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LOVE_LETTERS.map((letter, idx) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              onClick={() => setActiveLetter(letter)}
              className="group relative cursor-pointer flex flex-col items-center bg-[#050208]/80 border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-500 hover:border-[#D4AF37]/30 transform hover:-translate-y-2 flex-shrink-0"
            >
              {/* Ambient envelope glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37]/20 via-yellow-300/10 to-[#D4AF37]/20 rounded-t-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

              {/* Envelope Vector Graphic Layer */}
              <div id={`letter-envelope-${letter.id}`} className="relative w-28 h-20 mb-6 flex items-center justify-center">
                {/* Back of Envelope */}
                <div className="absolute inset-0 bg-[#050208] border border-white/5 rounded-lg shadow-inner group-hover:-rotate-3 transition-transform duration-500" />
                
                {/* Animated paper sticking out */}
                <motion.div
                  className="absolute bottom-5 w-24 h-12 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded shadow-md z-10"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: idx * 0.4 }}
                />

                {/* Front Envelope Flap shadow */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <Mail className="w-12 h-12 text-[#F9F6F2]/50 group-hover:scale-105 group-hover:text-[#D4AF37] transition-all duration-300" />
                </div>
              </div>

              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37]/80 mb-1 uppercase font-bold">
                {letter.date}
              </span>
              <h3 className="text-sm font-sans tracking-tight text-[#F9F6F2] font-semibold text-center group-hover:text-[#D4AF37] transition-colors">
                {letter.title}
              </h3>
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.15em] mt-3.5 flex items-center gap-1 font-bold">
                <Eye className="w-3 h-3 text-[#D4AF37]" /> Click to Unlock
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Interactive Gravity Heart Shoot Button */}
      <div className="w-full max-w-xl mx-auto px-4 text-center space-y-6">
        <h3 className="text-xl md:text-2xl font-serif tracking-tight text-[#F9F6F2] font-light">
          Send Unlimited <span className="italic text-[#D4AF37]">Glitter & Love</span>
        </h3>
        <p className="text-xs text-[#F9F6F2]/50 max-w-xs mx-auto">
          Tap our core battery heart below. Each touch shoots dozens of gold-glowing stardust hearts across the window!
        </p>

        <div className="relative inline-block mt-4">
          <button
            onClick={handleHeartButtonClick}
            id="shoot-stardust-hearts"
            className="group relative cursor-pointer p-6 rounded-full bg-gradient-to-tr from-[#4B1B61]/20 via-[#D4AF37]/10 to-[#721B3E]/20 border border-[#D4AF37]/30 transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_40px_rgba(212,175,55,0.15)] focus:outline-none"
            title="Shoot Hearts!"
          >
            <Heart className="w-12 h-12 text-[#D4AF37] fill-[#D4AF37]/80 animate-pulse duration-1000 group-hover:scale-105" />
            
            <span className="absolute -top-3 -right-3 flex h-5 w-5 bg-[#D4AF37] text-neutral-950 font-mono font-bold text-[9px] rounded-full items-center justify-center shadow">
              {heartClicks}
            </span>
          </button>
        </div>
      </div>

      {/* 5. Love Letter Full Modal Overlay View */}
      <AnimatePresence>
        {activeLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur Lock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLetter(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -30 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#050208] border border-white/10 p-6 md:p-8 shadow-2xl z-20 flex flex-col gap-6 overflow-hidden max-h-[85vh]"
            >
              {/* Corner decorative lights */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37]" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                    {activeLetter.date}
                  </span>
                  <h3 className="text-base md:text-lg font-serif text-[#F9F6F2] font-semibold">
                    {activeLetter.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveLetter(null)}
                  className="p-1 px-1.5 rounded-full border border-white/10 bg-white/5 text-[#F9F6F2]/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Close letter"
                  id="close-letter-modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Letter body styled in elegant warm letters formatting */}
              <div className="overflow-y-auto pr-1">
                <p className="text-xs md:text-sm leading-relaxed text-[#F9F6F2]/90 font-serif tracking-wide whitespace-pre-line text-left indent-6 italic bg-neutral-950/40 p-5 rounded-2xl border border-white/5 shadow-inner">
                  {activeLetter.letter}
                </p>
              </div>

              <div className="flex items-center gap-2 justify-center text-[10px] font-mono text-[#D4AF37] uppercase mt-2 font-bold">
                <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37] animate-pulse" /> Always and Forever yours
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Render Heart Burst particles on screen */}
      <AnimatePresence>
        {heartBursts.map((burst) => (
          <motion.div
            key={burst.id}
            initial={{ opacity: 1, scale: 0.6, y: burst.y, x: burst.x }}
            animate={{
              opacity: 0,
              scale: Math.random() * 1.5 + 1.0,
              y: burst.y - 180 - Math.random() * 80,
              x: burst.x + (Math.random() - 0.5) * 220,
              rotate: (Math.random() - 0.5) * 60,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Heart className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37]/80 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

