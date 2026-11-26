'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { CONFIG } from '@/lib/config';
import { UI, cx } from '@/lib/utils';
import { Icon } from './Icon';
import type { Img } from '@/lib/assets';

export function Header({ logo }: { logo: Img | null }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
  };

  return (
    <header className={cx('site-header on-dark', scrolled && 'scrolled')}>
      <div className="container header-in">
        {logo
          ? <a className="logo-link" href="#inicio"><img className="logo-img" src={logo.src} width={logo.width} height={logo.height} alt="Wealth GPS" /></a>
          : <a className="logo-ph" href="#inicio" aria-label={UI.logoAria}>{UI.logoLabel}</a>}
        <nav className={cx('nav', open && 'open')} id="menu" aria-label={UI.navLabel}>
          <ul>
            {CONFIG.nav.map(n => (
              <li key={n.href}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="header-actions">
          <button type="button" className="icon-btn" onClick={toggleTheme} aria-label={theme === 'dark' ? UI.toLight : UI.toDark}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme} style={{ display: 'grid' }}
                initial={{ rotate: -80, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 80, opacity: 0, scale: 0.6 }} transition={{ duration: 0.22 }}>
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
              </motion.span>
            </AnimatePresence>
          </button>
          <button type="button" className="icon-btn menu-btn" aria-expanded={open} aria-controls="menu"
            aria-label={open ? UI.menuClose : UI.menuOpen} onClick={() => setOpen(o => !o)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} role="presentation" aria-hidden="true" />
    </header>
  );
}
