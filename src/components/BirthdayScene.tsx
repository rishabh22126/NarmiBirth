/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Star, Sparkles, Send } from 'lucide-react';

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
}

export default function BirthdayScene() {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: false,
  });

  const [candleBlown, setCandleBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [wishText, setWishText] = useState('');
  const [wishLogs, setWishLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiParticles = useRef<any[]>([]);
  const animFrameId = useRef<number | null>(null);

  // Target date: Midnight of May 23, 2026
  const targetDate = new Date('2026-05-23T00:00:00').getTime();

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isUnlocked: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({
          days,
          hours,
          minutes,
          seconds,
          isUnlocked: false,
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Confetti particles generator loop when candle is blown
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
    canvas.height = canvas.parentElement?.clientHeight || 450;

    const drawConfettiHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size / 4);
      ctx.bezierCurveTo(x - size / 2, y - size / 1.1, x - size, y - size / 3, x, y + size / 1.4);
      ctx.bezierCurveTo(x + size, y - size / 3, x + size / 2, y - size / 1.1, x, y - size / 4);
      ctx.fill();
    };

    const updateConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiParticles.current = confettiParticles.current.filter((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.opacity -= p.decay;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        if (p.type === 'heart') {
          drawConfettiHeart(ctx, p.x, p.y, p.size * 1.5);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1.0; // reset
        return p.opacity > 0 && p.y < canvas.height && p.x > 0 && p.x < canvas.width;
      });

      animFrameId.current = requestAnimationFrame(updateConfetti);
    };

    updateConfetti();

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight || 450;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const triggerConfettiExplosion = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = canvas.width / 2;
    const startY = canvas.height * 0.58; // Cake relative offset

    // Create 90 sparkles utilizing the luxurious Immersive Gold/White/Purple celestial palette
    for (let i = 0; i < 90; i++) {
      confettiParticles.current.push({
        x: startX,
        y: startY,
        size: Math.random() * 5 + 2,
        speedX: (Math.random() - 0.5) * 10,
        speedY: (Math.random() - 0.9) * 11 - 4,
        color: ['#D4AF37', '#F9F6F2', '#4B1B61', '#721B3E', '#FFFFFF', '#D4AF37/80'][
          Math.floor(Math.random() * 6)
        ],
        opacity: 1,
        decay: Math.random() * 0.015 + 0.008,
        gravity: 0.16,
        type: Math.random() > 0.4 ? 'spark' : 'heart',
      });
    }
  };

  const blowCandle = () => {
    if (candleBlown) return;
    setCandleBlown(true);
    triggerConfettiExplosion();
  };

  const submitWish = (e: FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    setWishLogs([...wishLogs, wishText.trim()]);
    setWishMade(true);
    setWishText('');
    triggerConfettiExplosion();
  };

  return (
    <div
      id="birthday-celebration-phase"
      className="relative w-full max-w-5xl mx-auto px-4 md:px-6 py-16 z-10 flex flex-col items-center"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-yellow-600/5 blur-[120px] pointer-events-none" />

      <div className="text-center space-y-6 mb-16 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-full font-mono text-xs tracking-widest uppercase font-bold">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> May 23, 2026 Milestone
        </div>

        {/* Dynamic header showing Countdown vs Happy Birthday message */}
        {!countdown.isUnlocked ? (
          <>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-[#F9F6F2] font-light">
              The Countdown to <span className="text-[#D4AF37] font-serif italic font-normal drop-shadow-[0_0_20px_rgba(212,175,55,0.2)]">Her Golden 21st</span>
            </h2>
            <p className="text-xs md:text-sm text-[#F9F6F2]/50 italic font-serif">
              Tick-tock... just a few heartbeats away from her special milestone.
            </p>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 1.4 }}
          >
            <h2 className="text-4xl md:text-6.5xl font-serif tracking-tight text-[#D4AF37] leading-tight font-light italic">
              Happy Birthday, My Love
            </h2>
            <p className="text-xs md:text-sm text-[#F9F6F2]/70 font-sans max-w-lg mx-auto italic mt-4 leading-relaxed">
              "You were born on the 23rd of May, 2005. Today, my world celebrates you. No matter how much time passes, I will choose you, again and again."
            </p>
          </motion.div>
        )}
      </div>

      {/* Countdown Clock Display & Locks Grid */}
      <div className="w-full max-w-2xl bg-[#050208]/80 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-2xl shadow-3xl text-center space-y-6 relative overflow-hidden mb-16 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-4 gap-4 md:gap-6">
          {[
            { value: countdown.days, label: 'Days' },
            { value: countdown.hours, label: 'Hours' },
            { value: countdown.minutes, label: 'Mins' },
            { value: countdown.seconds, label: 'Secs' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#050208] border border-white/5 p-3.5 md:p-5 rounded-2xl flex flex-col items-center justify-center shadow-lg hover:border-[#D4AF37]/25 transition-all duration-300"
            >
              <span className="text-2xl md:text-4xl font-mono font-bold text-[#D4AF37] select-none tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] md:text-xs font-mono text-white/40 uppercase tracking-widest mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {countdown.isUnlocked ? (
          <p className="text-[10px] md:text-xs font-mono text-emerald-400 tracking-wider py-2 uppercase flex items-center justify-center gap-1.5 bg-emerald-950/25 border border-emerald-500/20 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> The birthday portal is officially active!
          </p>
        ) : (
          <p className="text-[10px] md:text-xs font-mono text-[#D4AF37]/90 tracking-wider py-2 uppercase flex items-center justify-center gap-1.5 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-xl font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" /> Countdown initialized in real-time
          </p>
        )}
      </div>

      {/* Interactive Birthday Cake Scene */}
      <div className="relative w-full max-w-xl aspect-[4/3] min-h-[400px] bg-[#050208]/70 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden backdrop-blur-2xl">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        <div className="text-center space-y-2 z-20">
          <h3 className="text-base md:text-lg font-serif tracking-tight text-[#F9F6F2] font-semibold">
            {candleBlown
              ? wishMade
                ? 'Your Wish is Flying into the Heavens ✨'
                : 'Now, Make a Wish, My Entire Sky!'
              : 'The Celestial Birthday Cake'}
          </h3>
          <p className="text-xs text-[#F9F6F2]/50 max-w-sm mx-auto font-sans">
            {candleBlown
              ? 'Your secret prayer has been safe-locked in the starry orbits.'
              : 'Click on the flickering candle to blow it out and unlock golden stardust!'}
          </p>
        </div>

        {/* 3D-Like Animated Vector Cake */}
        <div id="interactive-birthday-cake" className="relative h-48 w-64 flex flex-col items-center justify-end z-20 pb-4">
          {/* Flame & Candle */}
          <div className="absolute bottom-[108px] flex flex-col items-center cursor-pointer select-none group" onClick={blowCandle}>
            {/* Flickering Flame */}
            <AnimatePresence>
              {!candleBlown && (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  animate={{
                    scale: [1, 1.15, 0.95, 1.1, 1],
                    y: [0, -2, 1, -1, 0],
                    rotate: [0, 2, -1, 1, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                  className="w-4 h-6 bg-radial from-yellow-100 via-[#D4AF37] to-amber-600 rounded-full blur-[1.5px] shadow-[0_0_15px_rgba(212,175,55,0.85)] filter brightness-110"
                />
              )}
            </AnimatePresence>
            {/* Candle Stick */}
            <div className="w-1.5 h-10 bg-linear-to-b from-[#D4AF37] via-[#050208] to-[#D4AF37] rounded-sm relative mt-[-1px]">
              {/* Golden stripes on candle */}
              <div className="absolute inset-x-0 top-2 h-0.5 bg-yellow-300/60" />
              <div className="absolute inset-x-0 top-5 h-0.5 bg-yellow-300/60" />
            </div>
          </div>

          {/* Tier 3 (Top tier - Cream-white with gold dripping) */}
          <div className="w-24 h-10 bg-gradient-to-r from-[#F9F6F2] to-white rounded-t-lg border-b-2 border-[#D4AF37]/20 relative flex items-center justify-center shadow-lg">
            <span className="text-[9px] text-[#D4AF37] font-mono font-bold uppercase select-none tracking-widest">Love</span>
            {/* Elegant Golden icing drip on top tier */}
            <div className="absolute inset-x-0 top-0 h-2 bg-[#D4AF37]/20 rounded-t-lg" />
            <div className="absolute left-4 top-2 w-1.5 h-3 bg-[#D4AF37]/35 rounded-full" />
            <div className="absolute right-6 top-2 w-1.5 h-2.5 bg-[#D4AF37]/35 rounded-full" />
          </div>

          {/* Tier 2 (Middle tier - Royal Purple Velvet) */}
          <div className="w-36 h-12 bg-gradient-to-r from-[#4B1B61] to-[#721B3E] rounded-t-lg border-b-2 border-[#D4AF37]/25 relative flex items-center justify-center shadow-lg">
            <span className="text-[10px] text-white/90 font-mono font-bold uppercase select-none tracking-widest">Grace</span>
            {/* Elegant soft dripping */}
            <div className="absolute inset-x-0 top-0 h-2.5 bg-white/10 rounded-t-lg" />
            <div className="absolute left-6 top-2 w-2 h-3.5 bg-white/15 rounded-full" />
            <div className="absolute right-8 top-2 w-2 h-4.5 bg-white/15 rounded-full" />
          </div>

          {/* Tier 1 (Base tier - Royal Decorated Velvet Gold) */}
          <div className="w-48 h-14 bg-gradient-to-r from-[#D4AF37] via-[#f3d36b] to-[#D4AF37] rounded-t-lg relative flex items-center justify-center shadow-2xl">
            <span className="text-xs text-[#050208] font-mono font-bold uppercase select-none tracking-widest">23 / 05 / 2005</span>
            {/* Royal stardust icing detailing */}
            <div className="absolute inset-x-0 top-0 h-3 bg-white/40 rounded-t-lg" />
            <div className="absolute left-10 top-2 w-3 h-5 bg-white/50 rounded-full" />
            <div className="absolute right-12 top-2 w-2.5 h-4.5 bg-white/50 rounded-full" />
          </div>

          {/* Gold Serving Plate */}
          <div className="w-56 h-3 bg-gradient-to-r from-yellow-700 via-[#D4AF37] to-yellow-700 rounded-full shadow-lg" />
          <div className="w-52 h-1.5 bg-yellow-800/80 rounded-full pointer-events-none" />
        </div>

        {/* Dynamic wish form or wish confirmation panel */}
        <div className="w-full z-20 min-h-[80px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {candleBlown && !wishMade ? (
              <motion.form
                key="make-wish"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                onSubmit={submitWish}
                className="w-full max-w-sm flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Enter your secret milestone wish..."
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs rounded-full bg-white/5 border border-white/10 text-[#F9F6F2] placeholder-[#F9F6F2]/30 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-0 font-sans"
                  id="user-birthday-wish-input"
                  maxLength={120}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center p-2.5 rounded-full bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#050208] transition-colors shadow-lg cursor-pointer"
                  title="Send wish into the cosmic orbits"
                  id="submit-birthday-wish"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </motion.form>
            ) : wishMade ? (
              <motion.div
                key="wish-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase font-bold">
                  ✓ Wish Sealed in Gold
                </div>
                {wishLogs.length > 0 && (
                  <p className="text-xs text-[#F9F6F2]/80 italic mt-2.5 max-w-xs mx-auto font-serif">
                    " {wishLogs[wishLogs.length - 1]} "
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.p
                key="instruction-blow"
                className="text-xs font-mono text-[#F9F6F2]/40 uppercase tracking-widest text-center"
              >
                Blow out the candle to seal your stardust wish...
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

