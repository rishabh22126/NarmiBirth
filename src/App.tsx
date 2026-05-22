/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StarBackground from './components/StarBackground';
import AudioPlayer from './components/AudioPlayer';
import OpeningScene from './components/OpeningScene';
import TimelineStory from './components/TimelineStory';
import BirthdayScene from './components/BirthdayScene';
import StoryAlbum from './components/StoryAlbum';
import FloatingMoments from './components/FloatingMoments';
import RomanticFeatures from './components/RomanticFeatures';
import EndingScene from './components/EndingScene';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'childhood' | 'growing' | 'teenage' | 'love' | 'birthday'>('childhood');
  const [daysOfYou, setDaysOfYou] = useState(7668);

  const handleStartJourney = () => {
    setIsJourneyStarted(true);
  };

  const handlePhaseInView = (theme: 'childhood' | 'growing' | 'teenage' | 'love' | 'birthday') => {
    setActiveTheme(theme);
  };

  // Calculate chronological days of her grace since her birthday (23 May 2005) to current time (May 2026)
  useEffect(() => {
    const birthDate = new Date('2005-05-23');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 0) {
      setDaysOfYou(diffDays);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050208] text-[#F9F6F2] selection:bg-yellow-500/30 selection:text-yellow-200 overflow-x-hidden antialiased font-sans">
      
      {/* Immersive Atmospheric Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] bg-[#4B1B61] opacity-25 blur-[140px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-[#721B3E] opacity-20 blur-[130px] rounded-full" />
      </div>

      {/* 1. Synced Canvas Interactive Starfield Background */}
      <StarBackground activeTheme={isJourneyStarted ? activeTheme : 'opening'} />

      {/* 2. Cozy Sound Controller & Synth player */}
      <AudioPlayer isJourneyStarted={isJourneyStarted} />

      {/* 3. Cinematic Entrance Screen & Interactive Timeline Container */}
      <AnimatePresence mode="wait">
        {!isJourneyStarted ? (
          <motion.div
            key="splash-landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.98 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="w-full"
          >
            <OpeningScene onStart={handleStartJourney} />
          </motion.div>
        ) : (
          <motion.main
            key="full-story-timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="relative w-full min-h-screen flex flex-col z-10"
          >
            {/* Top Bar / Navigation from Immersive UI theme */}
            <nav className="relative z-30 flex justify-between items-center px-6 md:px-16 py-6 border-b border-white/5 bg-black/10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-[#D4AF37] rounded-full shadow-[0_0_12px_#D4AF37] animate-ping" />
                <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold text-[#D4AF37]/90 font-mono">
                  The Eternal Journey
                </span>
              </div>
              <div className="flex items-center gap-4 md:gap-10">
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#F9F6F2]/50 font-mono hidden sm:inline">
                  23 May 2005 — 23 May 2026
                </span>
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[9px] md:text-[10px] uppercase font-mono tracking-wider">
                  <div className="flex gap-1 items-end h-3">
                    <div className="w-0.5 h-2.5 bg-[#D4AF37] animate-pulse"></div>
                    <div className="w-0.5 h-1.5 bg-[#D4AF37]/60"></div>
                    <div className="w-0.5. h-3 bg-[#D4AF37]"></div>
                    <div className="w-0.5 h-2 bg-[#D4AF37]/60"></div>
                  </div>
                  <span>Ambient Soft Piano synth</span>
                </div>
              </div>
            </nav>

            {/* Immersive 3-Column layout container on desktop screens */}
            <div className="flex-1 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 md:px-16 pt-10 pb-20">
              
              {/* Left Column: Fixed Progress Timeline Era aside */}
              <aside className="lg:col-span-2 hidden lg:flex flex-col justify-start pt-24 sticky top-24 h-[calc(100vh-140px)] z-30">
                <div className="flex flex-col gap-10 border-l border-white/10 ml-4 relative">
                  
                  {/* Childhood Era Indicator */}
                  <div className="relative pl-8 transition-all duration-300">
                    <div className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      activeTheme === 'childhood' 
                        ? 'bg-[#D4AF37] scale-125 shadow-[0_0_12px_#D4AF37]' 
                        : 'bg-white/20'
                    }`} />
                    <span className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${
                      activeTheme === 'childhood' ? 'text-[#D4AF37]' : 'text-white/30'
                    }`}>2005 — 2010</span>
                    <span className={`block text-xs font-medium transition-colors ${
                      activeTheme === 'childhood' ? 'text-[#F9F6F2]' : 'text-white/40'
                    }`}>Childhood Bliss</span>
                  </div>

                  {/* Growing Era Indicator */}
                  <div className="relative pl-8 transition-all duration-300">
                    <div className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      activeTheme === 'growing' 
                        ? 'bg-[#D4AF37] scale-125 shadow-[0_0_12px_#D4AF37]' 
                        : 'bg-white/20'
                    }`} />
                    <span className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${
                      activeTheme === 'growing' ? 'text-[#D4AF37]' : 'text-white/30'
                    }`}>2011 — 2016</span>
                    <span className={`block text-xs font-medium transition-colors ${
                      activeTheme === 'growing' ? 'text-[#F9F6F2]' : 'text-white/40'
                    }`}>Growing Dreams</span>
                  </div>

                  {/* Teenage Era Indicator */}
                  <div className="relative pl-8 transition-all duration-300">
                    <div className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      activeTheme === 'teenage' 
                        ? 'bg-[#D4AF37] scale-125 shadow-[0_0_12px_#D4AF37]' 
                        : 'bg-white/20'
                    }`} />
                    <span className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${
                      activeTheme === 'teenage' ? 'text-[#D4AF37]' : 'text-white/30'
                    }`}>2017 — 2021</span>
                    <span className={`block text-xs font-medium transition-colors ${
                      activeTheme === 'teenage' ? 'text-[#F9F6F2]' : 'text-white/40'
                    }`}>Teenage Maturity</span>
                  </div>

                  {/* Love Era Indicator */}
                  <div className="relative pl-8 transition-all duration-300">
                    <div className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      activeTheme === 'love' 
                        ? 'bg-[#D4AF37] scale-125 shadow-[0_0_12px_#D4AF37]' 
                        : 'bg-white/20'
                    }`} />
                    <span className={`block text-[10px] font-mono uppercase tracking-widest mb-1 ${
                      activeTheme === 'love' ? 'text-[#D4AF37]' : 'text-white/30'
                    }`}>Our Destiny</span>
                    <span className={`block text-xs font-medium transition-colors ${
                      activeTheme === 'love' ? 'text-[#F9F6F2]' : 'text-white/40'
                    }`}>The Love Chapter</span>
                  </div>

                  {/* Birthday Era Indicator */}
                  <div className="relative pl-8 transition-all duration-300">
                    <div className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                      activeTheme === 'birthday' 
                        ? 'bg-[#D4AF37] scale-125 shadow-[0_0_12px_#D4AF37]' 
                        : 'bg-white/20'
                    }`} />
                    <span className={`block text-[10px] font-mono uppercase tracking-[0.2em] font-bold mb-1 ${
                      activeTheme === 'birthday' ? 'text-[#D4AF37]' : 'text-white/30'
                    }`}>2026 Present</span>
                    <span className={`block text-xs font-serif italic transition-colors ${
                      activeTheme === 'birthday' ? 'text-[#F9F6F2]' : 'text-white/40'
                    }`}>My Whole World</span>
                  </div>

                </div>
              </aside>

              {/* Center Column: The Primary Scrollable Cinematic Content */}
              <div className="col-span-1 lg:col-span-7 flex flex-col items-center relative">
                
                {/* Central Concentric Gold Cosmic Orbits Background Layer */}
                <div className="absolute top-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[600px] h-[340px] md:h-[600px] border border-[#D4AF37]/5 rounded-full flex items-center justify-center pointer-events-none z-0">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                    className="w-[260px] md:w-[460px] h-[260px] md:h-[460px] border border-dashed border-[#D4AF37]/10 rounded-full flex items-center justify-center"
                  >
                    <div className="w-[180px] md:w-[320px] h-[180px] md:h-[320px] border border-[#D4AF37]/15 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#D4AF37]/30 rounded-full" />
                    </div>
                  </motion.div>
                </div>

                <div className="relative w-full z-10 flex flex-col gap-12">
                  {/* Part A: Chronological Phases */}
                  <TimelineStory onPhaseActive={handlePhaseInView} />

                  {/* Part B: Birthday Ceremony with Countdown and Lantern flight */}
                  <BirthdayScene />

                  {/* Part C: Interactive Memory Album Section */}
                  <StoryAlbum />

                  {/* Part D: Floating drifting polaroids with parallax scroll effect */}
                  <FloatingMoments />

                  {/* Part E: Bento grids and letters */}
                  <RomanticFeatures />

                  {/* Part D: Final beautiful signature block */}
                  <EndingScene />
                </div>
              </div>

              {/* Right Column: Premium luxury metadata bento statistics aside */}
              <aside className="lg:col-span-3 hidden lg:flex flex-col gap-6 pt-24 sticky top-24 h-[calc(100vh-140px)] z-30 justify-start">
                
                {/* Micro Reasons Box */}
                <div className="bg-neutral-950/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <h3 className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-5 flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> Cosmic Blessings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3.5 items-start">
                      <span className="text-[#D4AF37] font-serif text-sm font-semibold tracking-wide">01</span>
                      <p className="text-xs text-white/70 italic leading-relaxed font-sans">
                        Your smile acts as the compass in my stormiest skies.
                      </p>
                    </div>
                    <div className="flex gap-3.5 items-start">
                      <span className="text-[#D4AF37] font-serif text-sm font-semibold tracking-wide">02</span>
                      <p className="text-xs text-white/70 italic leading-relaxed font-sans">
                        How you can effortlessly turn any silent dark room into golden safety.
                      </p>
                    </div>
                    <div className="flex gap-3.5 items-start">
                      <span className="text-[#D4AF37] font-serif text-sm font-semibold tracking-wide">03</span>
                      <p className="text-xs text-white/70 italic leading-relaxed font-sans">
                        Your fierce resilience and the absolute beauty of your dreams.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Love metadata capsule cards */}
                <div className="flex gap-4">
                  <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center shadow-lg hover:border-[#D4AF37]/35 transition-all duration-300">
                    <span className="block text-2xl font-serif text-[#D4AF37] font-semibold">{daysOfYou.toLocaleString()}</span>
                    <span className="text-[9px] uppercase tracking-widest text-[#F9F6F2]/40 font-mono mt-1 block">Days of You</span>
                  </div>
                  <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center shadow-lg hover:border-[#D4AF37]/35 transition-all duration-300">
                    <span className="block text-2xl font-serif text-[#D4AF37] font-semibold">∞</span>
                    <span className="text-[9px] uppercase tracking-widest text-[#F9F6F2]/40 font-mono mt-1 block">Love Limit</span>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="p-4 bg-yellow-500/5 rounded-2xl border border-yellow-500/15 text-center">
                  <span className="text-[10px] font-mono tracking-widest text-yellow-105/70 uppercase">Current Scene:</span>
                  <span className="text-xs block italic text-[#D4AF37] font-serif mt-1">Infinite Together ♡</span>
                </div>

                {/* Interactive replay action anchor */}
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-2 w-full py-2.5 rounded-full border border-white/10 bg-white/5 font-mono text-[9px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 hover:border-yellow-500/20 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-3 h-3 text-red-400 fill-red-400/30" /> Replay Her Movie
                </button>

              </aside>

            </div>

            {/* Bottom Footer Credits block */}
            <footer className="relative z-30 px-6 md:px-16 py-6 flex flex-col sm:flex-row justify-between items-center border-t border-white/5 bg-black/40 backdrop-blur-xl text-center sm:text-left gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">
                  Scene 05: <span className="text-white/70 italic">Happy 21st Birthday, My Entire Universe</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-28 md:w-40 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                  <div className="absolute top-0 left-0 h-full w-[100%] bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]" />
                </div>
                <span className="text-[10px] font-mono text-[#D4AF37]">2005 / 2026</span>
              </div>
            </footer>

          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

