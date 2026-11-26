'use client';
import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { CONFIG } from '@/lib/config';
import { Icon } from './Icon';
import { ParticleField } from './ParticleField';

const H = CONFIG.hero;
const EASE = [0.22, 1, 0.36, 1] as const;

/* Titular palabra por palabra; las dos últimas brillan con un destello plateado */
function Headline() {
  const words = H.title.split(' ');
  return (
    <h1 id="hero-t" aria-label={H.title}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word-mask" aria-hidden="true">
            <motion.span
              className={i >= words.length - 2 ? 'word shimmer' : 'word'}
              initial={{ y: '110%', rotate: 4 }} animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: EASE }}>
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </h1>
  );
}

/* "Una ruta clara para tu ahorro / tus seguros / tu retiro…" */
function Rotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI(n => (n + 1) % H.rotatingWords.length), 2300);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <p className="rotator">
      <span>{H.rotatingPrefix}</span>{' '}
      <span className="rot-slot" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={i} className="rot-word"
            initial={{ y: '90%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-90%', opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}>
            {H.rotatingWords[i]}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only">{H.rotatingWords.join(', ')}</span>
    </p>
  );
}

/* Tarjeta que se inclina suavemente hacia el puntero */
function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  return (
    <motion.li className={className} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={e => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
      whileHover={reduce ? undefined : { scale: 1.02 }}>
      {children}
    </motion.li>
  );
}

function Ticker() {
  const items = H.ticker;
  return (
    <div className="ticker" role="group" aria-label={H.tickerLabel}>
      <div className="ticker-track">
        {[0, 1].map(copy => (
          <ul key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {items.map(t => <li key={t}>{t}</li>)}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 }), sy = useSpring(my, { stiffness: 50, damping: 18 });
  const auroraX = useTransform(sx, [-1, 1], [-30, 30]), auroraY = useTransform(sy, [-1, 1], [-20, 20]);
  const radarX = useTransform(sx, [-1, 1], [18, -18]), radarY = useTransform(sy, [-1, 1], [12, -12]);
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="inicio" ref={ref} className="hero on-dark" aria-labelledby="hero-t"
      onPointerMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}>
      <motion.div className="aurora" style={{ x: auroraX, y: auroraY }} aria-hidden="true"><i /><i /><i /></motion.div>
      <motion.div className="radar" style={{ x: radarX, y: radarY }} aria-hidden="true">
        <b className="sweep" /><i /><i /><i /><i /><i />
      </motion.div>
      <ParticleField />

      <div className="container hero-grid">
        <div>
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {H.eyebrow}
          </motion.span>
          <Headline />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85, ease: EASE }}>
            <Rotator />
            <p className="lead">{H.lead}</p>
            <div className="btn-row">
              <a className="btn btn-glow" href={H.ctaHref}>{H.cta}<Icon name="arrowR" /></a>
              <a className="btn ghost" href={H.secondaryHref}>{H.secondary}</a>
            </div>
            <p className="hero-note">{H.note}</p>
          </motion.div>
        </div>

        <ol className="route" aria-label={H.stepsTitle}>
          {H.steps.map((s, i) => (
            <Tilt key={s.title}>
              <motion.div className="route-in" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 + i * 0.25, ease: EASE }}>
                <span className={i === 0 ? 'pin pin-locate' : 'pin pin-flag'}><Icon name={s.icon} /></span>
                <div>
                  <span className="n">{s.n}</span>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </ol>
      </div>
      <Ticker />
    </section>
  );
}
