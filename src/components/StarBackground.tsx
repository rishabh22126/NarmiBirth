/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  blinkSpeed?: number;
  color: string;
  type: 'star' | 'heart' | 'lantern';
  angle?: number;
  spin?: number;
}

export default function StarBackground({ activeTheme }: { activeTheme?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxStars = 120;
    let maxHearts = activeTheme === 'love' ? 40 : 15;
    let maxLanterns = activeTheme === 'birthday' ? 35 : 5;

    // Adjust particle limits depending on active theme
    if (activeTheme === 'childhood') {
      maxStars * 1.5;
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const getThemeColors = () => {
      switch (activeTheme) {
        case 'childhood':
          return ['rgba(244, 63, 94, ', 'rgba(251, 113, 133, ', 'rgba(253, 224, 71, ']; // pinks, roses, baby yellows
        case 'growing':
          return ['rgba(168, 85, 247, ', 'rgba(192, 132, 252, ', 'rgba(129, 140, 248, ']; // purples, indigo
        case 'teenage':
          return ['rgba(99, 102, 241, ', 'rgba(59, 130, 246, ', 'rgba(147, 197, 253, ']; // deep indigos, neon blues
        case 'love':
          return ['rgba(239, 68, 68, ', 'rgba(244, 63, 94, ', 'rgba(236, 72, 153, ']; // deep reds, pinks
        case 'birthday':
          return ['rgba(234, 179, 8, ', 'rgba(245, 158, 11, ', 'rgba(253, 224, 71, ']; // sparkles of gold, amber
        default:
          return ['rgba(255, 255, 255, ', 'rgba(251, 207, 232, ', 'rgba(253, 244, 215, '];
      }
    };

    const createStar = (x: number, y: number, isNew = false): Particle => {
      return {
        x,
        y,
        size: Math.random() * 1.8 + 0.4,
        speedY: (Math.random() - 0.5) * 0.05,
        speedX: (Math.random() - 0.5) * 0.05,
        opacity: Math.random() * 0.7 + 0.3,
        blinkSpeed: Math.random() * 0.02 + 0.005,
        color: 'rgba(255, 255, 255, ',
        type: 'star'
      };
    };

    const createHeart = (x: number, y: number, isNew = false): Particle => {
      const colors = ['rgba(244, 63, 94, ', 'rgba(236, 72, 153, ', 'rgba(225, 29, 72, '];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return {
        x,
        y: isNew ? canvas.height + 20 : y,
        size: Math.random() * 12 + 6,
        speedY: -(Math.random() * 0.8 + 0.4),
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.3,
        color: randomColor,
        type: 'heart',
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.015
      };
    };

    const createLantern = (x: number, y: number, isNew = false): Particle => {
      const colors = ['rgba(245, 158, 11, ', 'rgba(234, 179, 8, ', 'rgba(251, 146, 60, '];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      return {
        x,
        y: isNew ? canvas.height + 30 : y,
        size: Math.random() * 14 + 10, // lantern scale
        speedY: -(Math.random() * 0.5 + 0.3),
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.4,
        color: randomColor,
        type: 'lantern',
        angle: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.005
      };
    };

    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;

      // Populate stars
      for (let i = 0; i < maxStars; i++) {
        particles.push(createStar(Math.random() * w, Math.random() * h));
      }

      // Populate hearts
      const initialHeartsCount = activeTheme === 'love' ? maxHearts : 8;
      for (let i = 0; i < initialHeartsCount; i++) {
        particles.push(createHeart(Math.random() * w, Math.random() * h));
      }

      // Populate lanterns
      const initialLanternsCount = activeTheme === 'birthday' ? maxLanterns : 3;
      for (let i = 0; i < initialLanternsCount; i++) {
        particles.push(createLantern(Math.random() * w, Math.random() * h));
      }
    };

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size / 4);
      // Top left curve
      ctx.bezierCurveTo(x - size / 2, y - size / 1.1, x - size, y - size / 3, x, y + size / 1.4);
      // Top right curve
      ctx.bezierCurveTo(x + size, y - size / 3, x + size / 2, y - size / 1.1, x, y - size / 4);
      ctx.fill();
    };

    const drawLantern = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      const halfW = size * 0.4;
      const halfH = size * 0.6;

      ctx.beginPath();
      // Draw a rounded rectangular-like sky lantern shape
      ctx.moveTo(x - halfW, y - halfH + 3);
      ctx.quadraticCurveTo(x, y - halfH, x + halfW, y - halfH + 3);
      ctx.lineTo(x + halfW - 2, y + halfH - 4);
      ctx.quadraticCurveTo(x, y + halfH + 2, x - halfW + 2, y + halfH - 4);
      ctx.closePath();
      ctx.fill();

      // Lit candle/spark glow inside lantern
      ctx.fillStyle = 'rgba(255, 239, 163, 0.9)';
      ctx.beginPath();
      ctx.arc(x, y + halfH - 4, size * 0.15, 0, Math.PI * 2);
      ctx.fill();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render backgrounds gradient transitions if needed, but we let index.css handle themes beautifully.
      // So canvas will render purely floating transparent items.

      const currentColors = getThemeColors();
      maxHearts = activeTheme === 'love' ? 40 : 15;
      maxLanterns = activeTheme === 'birthday' ? 35 : 5;

      // Count existing active particles
      let heartCount = 0;
      let lanternCount = 0;
      let starCount = 0;

      particles.forEach((p) => {
        if (p.type === 'heart') heartCount++;
        else if (p.type === 'lantern') lanternCount++;
        else if (p.type === 'star') starCount++;
      });

      // Refill particles if list dropped
      const w = canvas.width;
      if (starCount < maxStars) {
        particles.push(createStar(Math.random() * w, canvas.height + 5, true));
      }
      if (heartCount < maxHearts) {
        particles.push(createHeart(Math.random() * w, canvas.height + 15, true));
      }
      if (lanternCount < maxLanterns) {
        particles.push(createLantern(Math.random() * w, canvas.height + 25, true));
      }

      particles = particles.filter((p) => {
        // Twinkle or drift
        if (p.type === 'star') {
          // Glow and flicker
          if (p.blinkSpeed) {
            p.opacity += p.blinkSpeed;
            if (p.opacity > 1 || p.opacity < 0.15) {
              p.blinkSpeed = -p.blinkSpeed;
            }
          }
          p.x += p.speedX;
          p.y += p.speedY;

          // Wrap stars around screen edges
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          // Mouse Gravitational effect on stars
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const force = (180 - dist) / 180;
              p.x += (dx / dist) * force * 1.5;
              p.y += (dy / dist) * force * 1.5;
            }
          }

          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          return true;
        }

        if (p.type === 'heart') {
          p.y += p.speedY;
          if (p.angle !== undefined && p.spin !== undefined) {
            p.angle += p.spin;
            p.x += Math.sin(p.angle) * 0.4; // sway
          } else {
            p.x += p.speedX;
          }

          // Gentle attraction/push away by mouse
          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              const force = (150 - dist) / 150;
              p.x += (dx / dist) * force * 2.0;
            }
          }

          // Draw neon outer-glow for love theme
          if (activeTheme === 'love') {
            ctx.shadowBlur = 18;
            ctx.shadowColor = 'rgba(244, 63, 94, 0.7)';
          }

          ctx.fillStyle = `${p.color}${p.opacity})`;
          drawHeart(ctx, p.x, p.y, p.size);

          ctx.shadowBlur = 0; // reset shadow
          return p.y > -20 && p.x >= -30 && p.x <= canvas.width + 30;
        }

        if (p.type === 'lantern') {
          p.y += p.speedY;
          if (p.angle !== undefined && p.spin !== undefined) {
            p.angle += p.spin;
            p.x += Math.sin(p.angle) * 0.3; // sway sideways
          } else {
            p.x += p.speedX;
          }

          if (mouseRef.current.active) {
            const dx = p.x - mouseRef.current.x;
            const dy = p.y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const force = (120 - dist) / 120;
              p.x += (dx / dist) * force * 1.5;
            }
          }

          // Lantern glowing halo
          ctx.shadowBlur = 24;
          ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';

          ctx.fillStyle = `${p.color}${p.opacity})`;
          drawLantern(ctx, p.x, p.y, p.size);

          ctx.shadowBlur = 0; // reset nested shadows
          return p.y > -40 && p.x >= -50 && p.x <= canvas.width + 50;
        }

        return false;
      });

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    updateAndDraw();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX;
        mouseRef.current.y = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTheme]);

  return (
    <canvas
      ref={canvasRef}
      id="aesthetic-star-canvas"
      className="fixed inset-0 pointer-events-none z-0 block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
