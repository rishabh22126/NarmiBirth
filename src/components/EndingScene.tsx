/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Heart, Stars, Award, Sparkles } from 'lucide-react';

export default function EndingScene() {
  return (
    <div
      id="cinematic-ending-phase"
      className="relative w-full py-28 flex flex-col items-center justify-center text-center overflow-hidden z-20 px-6 bg-gradient-to-t from-black via-[#050208]/90 to-transparent"
    >
      {/* Absolute glow balls */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto space-y-12 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2 }}
          className="flex items-center justify-center"
        >
          <div className="relative p-6 bg-[#4B1B61]/20 border border-[#D4AF37]/20 rounded-full shadow-2xl">
            <Heart className="w-10 h-10 text-[#D4AF37] fill-[#D4AF37] animate-ping duration-1500 absolute scale-110 opacity-30" />
            <Heart className="w-10 h-10 text-[#D4AF37] fill-[#D4AF37]/80 animate-pulse" />
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold"
          >
            An Infinite Love Trilogy
          </motion.h4>

          {/* Core Hindi and English climax */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight text-[#F9F6F2] font-light">
              Born in Pain... <br />
              Built Through Struggles... <br />
              <span className="text-[#D4AF37] font-serif italic font-normal block mt-2 drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                But Destined to Shine.
              </span>
            </h2>
            <p className="text-xs md:text-sm text-[#F9F6F2]/60 italic font-serif leading-relaxed max-w-lg mx-auto">
              "Born in shadows, refined by struggles, you have become the brightest shining sun of your own destiny."
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-xs md:text-sm text-[#F9F6F2]/50 max-w-md mx-auto leading-relaxed font-sans"
          >
            You survived everything that was strategically placed to break you down, and yet, you grew up to become soft, incredibly kind, extremely beautiful, and fiercely strong. I am profoundly proud of you.
          </motion.p>
        </div>

        {/* Decorative Golden Signature for Narmatha */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.0 }}
          className="pt-4"
        >
          <div className="inline-block p-6 md:p-8 rounded-3xl bg-[#050208]/90 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden text-center group min-w-[280px]">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none" />
            <span className="block text-[10px] font-mono tracking-widest text-[#F9F6F2]/40 uppercase">Always and Forever,</span>
            <span className="block text-3xl md:text-4.5xl font-serif mt-2.5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-[#D4AF37] font-bold select-none drop-shadow-[0_0_15px_rgba(212,175,55,0.25)] tracking-wide capitalize">
              Narmatha
            </span>
            <span className="block text-[10px] font-mono text-[#D4AF37] mt-3 tracking-[0.25em] font-bold uppercase">
              23/05/2005 → FOREVER ♡
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating end credits */}
      <div className="absolute bottom-6 inset-x-0 text-center space-y-1 select-none pointer-events-none opacity-40">
        <span className="text-[9px] font-mono tracking-widest text-[#F9F6F2]/30 uppercase block">Thank you for being my destiny</span>
        <span className="text-[8px] font-mono text-[#F9F6F2]/20 uppercase block flex items-center justify-center gap-1">
          <Stars className="w-2.5 h-2.5 text-[#D4AF37] animate-pulse" /> Created with unconditional adore • May 2026
        </span>
      </div>
    </div>
  );
}
