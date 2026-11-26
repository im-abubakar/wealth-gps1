'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type P = { x: number; y: number; vx: number; vy: number; r: number };

/** Campo de partículas plateadas que flotan, se conectan y reaccionan al puntero. */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true, pts: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    const LINK = 130, PUSH = 150;

    const build = () => {
      const r = host.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, Math.max(26, (w * h) / 15000)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.7
      }));
    };

    const draw = (move: boolean) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (move) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < PUSH * PUSH && d2 > 1) {
            const d = Math.sqrt(d2), f = (1 - d / PUSH) * 0.9;
            p.vx += (dx / d) * f * 0.12; p.vy += (dy / d) * f * 0.12;
          }
          p.vx *= 0.985; p.vy *= 0.985;
          // deriva mínima para que nunca se detengan
          if (Math.abs(p.vx) < 0.06) p.vx += (Math.random() - 0.5) * 0.02;
          if (Math.abs(p.vy) < 0.06) p.vy += (Math.random() - 0.5) * 0.02;
          p.x += p.vx; p.y += p.vy;
          if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
        }
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            ctx.strokeStyle = `rgba(189,189,189,${(1 - Math.sqrt(d2) / LINK) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = 'rgba(236,236,236,0.75)';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const loop = () => { if (visible && !document.hidden) draw(true); raf = requestAnimationFrame(loop); };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    const ro = new ResizeObserver(() => { build(); if (reduce) draw(false); });

    build();
    ro.observe(host); io.observe(host);
    if (reduce) {
      draw(false);
    } else {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [reduce]);

  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}
