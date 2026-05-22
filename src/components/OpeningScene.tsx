/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Navigation, Play, ChevronRight, Volume2 } from 'lucide-react';

interface OpeningSceneProps {
  onStart: () => void;
}

export default function OpeningScene({ onStart }: OpeningSceneProps) {
  const [step, setStep] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  
  // Audio references for local rain & sad piano synth
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rainSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const rainGainRef = useRef<GainNode | null>(null);
  const pianoIntervalRef = useRef<number | null>(null);

  // Canvas references for rain drops
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Synthesize Pure Rain Sound & Heartbreaking Piano Keys
  const startCinematicAudio = () => {
    if (audioCtxRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);

      // --- RAIN GENERATOR ---
      // Generate 2 seconds of white noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const rainSource = ctx.createBufferSource();
      rainSource.buffer = noiseBuffer;
      rainSource.loop = true;

      // Bandpass filter to make white noise sound exactly like heavy rainfall
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(650, ctx.currentTime);
      bandpass.Q.setValueAtTime(0.8, ctx.currentTime);

      // Modulate rain gain to simulate wind gusts
      const rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(0.12, ctx.currentTime);

      // Connect rain: Source -> Bandpass -> Gain -> Master
      rainSource.connect(bandpass);
      bandpass.connect(rainGain);
      rainGain.connect(masterGain);
      rainSource.start(0);

      rainSourceRef.current = rainSource;
      rainGainRef.current = rainGain;

      // --- SLOW HEARTBREAKING PIANO PIECES ---
      // Minor notes representing cold infant atmosphere
      const nostalgicMelody = [
        220.00, // A3
        261.63, // C4
        329.63, // E4
        392.00, // G4
        440.00, // A4
        493.88, // B4
        523.25, // C5
        53.00,  // low rumbling base cue
      ];

      const playNostalgicPianoKey = () => {
        if (ctx.state === 'suspended') return;

        // Choose a random note out of minor pentatonic / nostalgic series
        const index = Math.floor(Math.random() * nostalgicMelody.length);
        const freq = nostalgicMelody[index];

        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        filter.connect(masterGain);

        // Slow attack, long weeping release decay
        oscGain.gain.setValueAtTime(0, ctx.currentTime);
        oscGain.gain.linearRampToValueAtTime(0.20, ctx.currentTime + 0.3); // soft strike
        oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

        osc.start();
        osc.stop(ctx.currentTime + 5.0);
      };

      // Play introductory keys right away
      playNostalgicPianoKey();
      setTimeout(playNostalgicPianoKey, 1400);

      // Sequencer for sad cinema piano pieces
      pianoIntervalRef.current = window.setInterval(() => {
        playNostalgicPianoKey();
        if (Math.random() > 0.4) {
          setTimeout(playNostalgicPianoKey, 1500);
        }
      }, 3200);

      setSoundEnabled(true);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked: ", e);
    }
  };

  const stopCinematicAudio = () => {
    if (pianoIntervalRef.current) {
      clearInterval(pianoIntervalRef.current);
    }
    
    // Smooth transition
    if (audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const gain = rainGainRef.current;
      if (gain) {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.0);
      }
      setTimeout(() => {
        try {
          if (rainSourceRef.current) {
            rainSourceRef.current.stop();
          }
          if (audioCtxRef.current) {
            audioCtxRef.current.close();
          }
        } catch (e) {
          // ignore already stopped references
        }
      }, 1000);
    }
  };

  const handleBookUnlock = () => {
    startCinematicAudio();
    setStep(1);
  };

  const traverseNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      stopCinematicAudio();
      onStart();
    }
  };

  // 2. Beautiful Falling Canvas Rain Drops Simulation
  useEffect(() => {
    if (step === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Raindrop objects
    const drops: { x: number; y: number; speed: number; len: number; opacity: number }[] = [];
    const limit = step >= 2 ? 140 : 60; // rain intensifies on steps

    for (let i = 0; i < limit; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        speed: Math.random() * 12 + 10,
        len: Math.random() * 15 + 10,
        opacity: Math.random() * 0.4 + 0.15,
      });
    }

    // Glowing golden particle bursts for Narmatha reveal at step 4 and 5
    const stars: { x: number; y: number; speedY: number; speedX: number; size: number; opacity: number; color: string }[] = [];
    if (step >= 4) {
      for (let i = 0; i < 40; i++) {
        stars.push({
          x: Math.random() * width,
          y: height - Math.random() * 200,
          speedY: -(Math.random() * 3 + 1),
          speedX: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1.5,
          opacity: Math.random() * 0.7 + 0.3,
          color: ['#D4AF37', '#FFF', '#F9F6F2'][Math.floor(Math.random() * 3)],
        });
      }
    }

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dark overlay vignette
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height) * 0.8);
      gradient.addColorStop(0, 'rgba(5, 2, 8, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw cold blue-grey falling raindrops
      ctx.strokeStyle = 'rgba(156, 178, 219, 0.25)';
      ctx.lineWidth = 1;
      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + (drop.speed * 0.1), drop.y + drop.len);
        ctx.stroke();

        drop.y += drop.speed;
        drop.x += drop.speed * 0.05;

        if (drop.y > height) {
          drop.y = -drop.len;
          drop.x = Math.random() * width;
          drop.speed = Math.random() * 12 + 10;
        }
      });

      // Draw golden rising stardust stars
      if (step >= 4) {
        stars.forEach((star) => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = star.opacity;
          ctx.fill();
          ctx.globalAlpha = 1.0;

          star.y += star.speedY;
          star.x += star.speedX;

          if (star.y < 0) {
            star.y = height + 10;
            star.x = Math.random() * width;
          }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [step]);

  return (
    <div
      id="cinematic-opening-screen"
      className="relative w-full h-screen flex flex-col items-center justify-center p-4 bg-black overflow-hidden z-50 text-center"
    >
      {/* Canvas Layer for physical ambient rain and gold stars */}
      {step > 0 && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
      )}

      {/* Atmospheric Star Textures */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none z-0" />

      {/* 2. STEP 0: Interactive Wax-Seal Card (Avoid Chrome Autoplay Ban) */}
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="lock-initiation-gate"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.2 }}
            className="relative max-w-lg mx-auto bg-[#050208]/90 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-3xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] z-30 space-y-6"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            <div className="flex justify-center">
              <div className="relative p-5 rounded-full border border-[#D4AF37]/20 bg-black/60 shadow-inner">
                <Heart className="w-8 h-8 text-[#D4AF37] animate-pulse duration-1000 fill-[#D4AF37]/10" />
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] uppercase font-bold text-center block">
                The Chronicle of Narmatha
              </span>
              <h2 className="text-xl md:text-2.5xl font-serif text-[#F9F6F2] font-light leading-tight">
                A girl nobody celebrated at birth... become the strongest warrior.
              </h2>
              <p className="text-xs text-[#F9F6F2]/50 italic font-serif leading-relaxed px-2">
                "This is a story of struggle, tears, a selfless soul, and an everlasting love. Please dim your room lights, wear headphones, and turn on your device sound."
              </p>
            </div>

            <button
              onClick={handleBookUnlock}
              id="unlock-cinematic"
              className="mt-6 w-full py-4 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs md:text-sm font-sans font-bold tracking-[0.25em] text-[#D4AF37] cursor-pointer hover:bg-[#D4AF37] hover:text-[#050208] transition-all duration-500 shadow-[0_0_25px_rgba(212,175,55,0.15)] flex items-center justify-center gap-2 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" /> ACCESS CINEMATIC MOVIE
            </button>
          </motion.div>
        )}

        {/* STEP 1: Birth declaration */}
        {step === 1 && (
          <motion.div
            key="birth-declaration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5 }}
            className="relative max-w-xl p-6 z-25 space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase block"
              >
                May 23, 2005
              </motion.span>
              <h1 className="text-3xl md:text-5xl font-serif font-light text-[#F9F6F2] leading-tight space-y-2">
                <span className="block animate-pulse">23 May 2005…</span>
                <span className="block mt-4 italic font-extralight text-[#F9F6F2]/80 text-xl md:text-2xl">
                  A little baby girl came into this heavy world…
                </span>
              </h1>
            </div>
          </motion.div>
        )}

        {/* STEP 2: The Sad Reality - Baby Cradle Silhouette with rain */}
        {step === 2 && (
          <motion.div
            key="sad-cradle-unwanted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 1.5 }}
            className="relative max-w-xl p-6 z-25 space-y-8 flex flex-col items-center"
          >
            {/* Baby cradle representation in glowing vector lines */}
            <div className="w-24 h-24 relative opacity-40 animate-pulse duration-2000 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#F9F6F2]">
                <path d="M20 70 L80 70 M30 70 L30 30 M70 70 L70 30 M30 40 L70 40 M30 55 L70 55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M35 35 Q50 20 65 35" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
                <ellipse cx="50" cy="50" rx="15" ry="8" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M15 80 Q50 70 85 80" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-blue-500/10 blur-xl pointer-events-none" />
            </div>

            <div className="space-y-4">
              <p className="text-[#F9F6F2]/30 uppercase text-[9px] tracking-[0.3em] font-mono">Silent Atmosphere • No Celebration</p>
              <h2 className="text-2xl md:text-4xl font-serif text-[#F9F6F2] font-light leading-relaxed">
                "But absolutely <span className="text-red-400 font-serif font-semibold drop-shadow-[0_0_15px_rgba(248,113,113,0.15)]">nobody</span> was waiting for her."
              </h2>
              <p className="text-xs md:text-sm text-[#F9F6F2]/50 italic font-sans max-w-md">
                "There was no joy, no celebration... only a heavy silence and fading lights."
              </p>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Destiny Intervenes */}
        {step === 3 && (
          <motion.div
            key="destiny-intervenes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5 }}
            className="relative max-w-xl p-6 z-25 space-y-6"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center justify-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Destiny’s Secrets
              </span>
              <h2 className="text-2xl md:text-3.5xl font-serif text-[#F9F6F2] font-light leading-relaxed">
                “Her family wished for a boy… <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200 block mt-3 font-semibold">But destiny sent them someone far more powerful.”</span>
              </h2>
              <p className="text-xs text-[#F9F6F2]/50 italic font-sans max-w-md mx-auto">
                "Though they wished for a boy, destiny was preparing a warrior destined to hold the family together."
              </p>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Reveal - NARMATHA */}
        {step === 4 && (
          <motion.div
            key="name-revelation"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 2.0, ease: 'easeOut' }}
            className="relative max-w-2xl px-6 py-10 z-25 space-y-8"
          >
            <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />
            
            <div className="space-y-4 flex flex-col items-center">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                className="w-20 h-20 border border-dashed border-[#D4AF37]/30 rounded-full flex items-center justify-center mb-2"
              >
                <Heart className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]/20" />
              </motion.div>

              <h1 className="text-5xl md:text-8xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] via-amber-200 to-[#D4AF37] font-serif font-bold drop-shadow-[0_0_35px_rgba(212,175,55,0.4)] capitalize select-none">
                NARMATHA
              </h1>

              <p className="text-xs md:text-sm text-[#F9F6F2]/75 font-mono tracking-[0.2em] uppercase mt-2 font-bold">
                A Warrior Was Born
              </p>
            </div>
          </motion.div>
        )}

        {/* STEP 5: Final Proverb & Transition Action */}
        {step === 5 && (
          <motion.div
            key="final-proverb-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative max-w-2xl p-6 z-25 space-y-10 flex flex-col items-center"
          >
            <div className="space-y-5">
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase flex items-center justify-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" /> THE CORE TRUTH
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#F9F6F2] font-light leading-relaxed">
                “Sometimes… <br />
                the most <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-[#D4AF37] font-normal italic">unwanted child</span> <br />
                becomes the strongest person in the family.”
              </h2>
              <p className="text-xs md:text-sm text-[#F9F6F2]/60 italic font-serif leading-relaxed max-w-lg mx-auto">
                "This very girl, once ignored and uncelebrated, stands tall today as the unbreakable protector of her home. Welcome to her incredible journey."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narrative Progress controller bottom panel */}
      {step > 0 && (
        <div className="absolute bottom-12 inset-x-0 flex flex-col items-center gap-4 z-40">
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  s === step ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={traverseNext}
            id="cinematic-proceed-step"
            className="group px-8 py-3.5 rounded-full overflow-hidden border border-[#D4AF37]/35 bg-[#050208]/80 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.08)] hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-[#F9F6F2] active:scale-95"
          >
            <span>{step === 5 ? 'Step Into Her Universe' : 'Feel the breath'}</span>
            <ChevronRight className="w-4 h-4 text-[#D4AF37] transform group-hover:translate-x-1.5 transition-transform" />
          </button>

          {soundEnabled && (
            <span className="text-[9px] font-mono tracking-widest text-[#D4AF37]/60 flex items-center gap-1 uppercase">
              <Volume2 className="w-3 h-3 text-[#D4AF37] animate-pulse" /> Retro Rain-Synth Playing
            </span>
          )}
        </div>
      )}
    </div>
  );
}
