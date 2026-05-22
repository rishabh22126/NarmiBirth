/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Calendar, Heart } from 'lucide-react';
import { IMAGES } from '../data/images';

interface FloatingCard {
  id: string;
  image: string;
  title: string;
  date: string;
  rotation: number;
  top: string; // vertical percentage placement in the container
  left?: string;
  right?: string;
  parallaxSpeed: number; // multiplier for motion
}

const FLOATING_ITEMS: FloatingCard[] = [
  {
    id: 'float-1',
    image: IMAGES.floating.warmMidnightStudy,
    title: 'Warm Midnight Study',
    date: 'Growth Era',
    rotation: -8,
    top: '12%',
    left: '4%',
    parallaxSpeed: -120,
  },
  {
    id: 'float-2',
    image: IMAGES.floating.sunsetGoldenWalk,
    title: 'Secret Golden Hues',
    date: 'Safe Sanctuary',
    rotation: 6,
    top: '28%',
    right: '5%',
    parallaxSpeed: 100,
  },
  {
    id: 'float-3',
    image: IMAGES.floating.teaCupsCozy,
    title: 'Quiet Walks & Tea Cups',
    date: 'Healing Era',
    rotation: -5,
    top: '46%',
    left: '6%',
    parallaxSpeed: -80,
  },
  {
    id: 'float-4',
    image: IMAGES.floating.starryNightStardust,
    title: 'Balcony Dreamscaping',
    date: 'Universe Alignment',
    rotation: 12,
    top: '64%',
    right: '4%',
    parallaxSpeed: 140,
  },
  {
    id: 'float-5',
    image: IMAGES.floating.motherlySacrosanctLove,
    title: 'Smiles Held High',
    date: 'Pure Backbone',
    rotation: -10,
    top: '82%',
    left: '5%',
    parallaxSpeed: -100,
  }
];

export default function FloatingMoments() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Tie the scroll progress of this container to real physical drift transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div
      ref={containerRef}
      id="cinematic-floating-moments-wrapper"
      className="relative w-full min-h-[140vh] py-16 overflow-hidden z-10 pointer-events-none"
    >
      {/* Decorative vertical connection line representing stardust paths */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-white/0 via-[#D4AF37]/15 to-white/0 pointer-events-none" />

      {/* Title block at the center */}
      <div className="relative w-full max-w-xl mx-auto text-center space-y-3 px-4 z-20 pointer-events-auto mt-16 mb-24">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-bold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Echoes of Eternity
        </span>
        <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[#F9F6F2] font-light">
          Floating <span className="italic text-[#D4AF37]">Moments</span>
        </h2>
        <p className="text-xs text-[#F9F6F2]/50 max-w-md mx-auto leading-relaxed">
          As you glide down her starry survival path, watch her beautiful, fragile memories drift softly across the screen—healed in warm, golden glow.
        </p>
        <div className="w-12 h-px bg-[#D4AF37]/30 mx-auto rounded" />
      </div>

      {/* Render randomized floating polaroids */}
      {FLOATING_ITEMS.map((item) => {
        // Compute drift rate dynamically using useTransform inside custom physics hook
        // This moves items vertically as the viewport scrolls
        // Convert number speed to pixel values
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const translateY = useTransform(scrollYProgress, [0, 1], [0, item.parallaxSpeed]);

        return (
          <motion.div
            key={item.id}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              right: item.right,
              y: translateY,
              transform: `rotate(${item.rotation}deg)`,
            }}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="w-40 sm:w-44 md:w-48 bg-[#050208]/95 border border-white/10 p-2.5 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.65)] hover:border-[#D4AF37]/35 transition-colors duration-300 pointer-events-auto select-none"
          >
            {/* Polaroid image frame */}
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-black border border-white/5 shadow-inner">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-[#D4AF37] font-semibold tracking-wider uppercase border border-white/10">
                {item.date}
              </div>
            </div>

            {/* Polaroid handwritten descriptor block */}
            <div className="pt-3 pb-1 text-center space-y-1">
              <div className="flex items-center gap-1 justify-center">
                <Heart className="w-2.5 h-2.5 text-[#D4AF37] fill-[#D4AF37]/20" />
                <span className="text-[10px] font-mono tracking-wider text-white/50 uppercase">
                  {item.date}
                </span>
              </div>
              <h4 className="text-[11px] font-serif text-[#F9F6F2] font-semibold tracking-tight truncate px-1">
                {item.title}
              </h4>
            </div>

            {/* Subtle bottom hanging pin decor */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#D4AF37] rounded-full blur-[0.5px]" />
          </motion.div>
        );
      })}
    </div>
  );
}
