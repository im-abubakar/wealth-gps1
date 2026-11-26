'use client';
import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react';
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion } from 'framer-motion';
import { Icon } from './Icon';
import { UI, cx, formatMoneyInput, fmt, parseMoney } from '@/lib/utils';

/* ---------- aparece al hacer scroll ---------- */
export function Reveal({
  children, delay = 0, y = 28, className, as = 'div'
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'li' | 'article' }) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/* ---------- número que "cuenta" hasta su valor ---------- */
export function CountUp({ value, format = (n: number) => String(Math.round(n)), duration = 1.1 }:
  { value: number; format?: (n: number) => string; duration?: number }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : 0);
  const [text, setText] = useState(format(reduce ? value : 0));
  const fmtRef = useRef(format);
  fmtRef.current = format;
  useEffect(() => {
    const unsub = mv.on('change', v => setText(fmtRef.current(v)));
    const ctrl = animate(mv, value, { duration: reduce ? 0 : duration, ease: [0.22, 1, 0.36, 1] });
    return () => { unsub(); ctrl.stop(); };
  }, [value, duration, reduce, mv]);
  return <>{text}</>;
}

/* ---------- campo de dinero ---------- */
export function MoneyField({ id, label, hint, value, onChange, hidden }:
  { id: string; label: string; hint?: string; value: string; onChange: (v: string) => void; hidden?: boolean }) {
  if (hidden) return null;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="money">
        <span className="pre" aria-hidden="true">$</span>
        <input
          id={id} type="text" inputMode="decimal" autoComplete="off" placeholder="0"
          aria-describedby={hint ? id + '-h' : undefined}
          value={value}
          onChange={e => onChange(e.target.value.replace(/[^0-9.,]/g, ''))}
          onBlur={() => onChange(formatMoneyInput(value))}
        />
      </div>
      {hint ? <p className="hint" id={id + '-h'}>{hint}</p> : null}
    </div>
  );
}

/* ---------- tarjetas de elección (radio accesible) ---------- */
export type Choice = { value: string; label: string; hint?: string; icon?: string };
export function ChoiceGroup({ name, labelId, options, value, onChange }:
  { name: string; labelId: string; options: Choice[]; value: string | null; onChange: (v: string) => void }) {
  return (
    <div className="choice-grid" role="radiogroup" aria-labelledby={labelId}>
      {options.map((o, i) => {
        const id = `${name}-${i}`;
        return (
          <div className="choice" key={o.value}>
            <input type="radio" name={name} id={id} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
            <label htmlFor={id} className="choice-card">
              {o.icon ? <Icon name={o.icon} /> : null}
              <span><strong>{o.label}</strong>{o.hint ? <small>{o.hint}</small> : null}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- copiar e imprimir ---------- */
export function ResultActions({ getText, sectionRef, leading }:
  { getText: () => string; sectionRef: RefObject<HTMLElement | null>; leading?: ReactNode }) {
  const [status, setStatus] = useState('');
  useEffect(() => {
    const clear = () => document.querySelectorAll('.print-target').forEach(e => e.classList.remove('print-target'));
    window.addEventListener('afterprint', clear);
    return () => window.removeEventListener('afterprint', clear);
  }, []);
  const copy = async () => {
    const text = getText();
    try {
      await navigator.clipboard.writeText(text);
      setStatus(UI.copied);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;left:-999px'; ta.setAttribute('aria-hidden', 'true');
      document.body.append(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch { /* sin permiso */ }
      ta.remove();
      setStatus(ok ? UI.copied : UI.copyFail);
    }
  };
  const print = () => { sectionRef.current?.classList.add('print-target'); window.print(); };
  return (
    <>
      <div className="btn-row result-actions">
        {leading}
        <button type="button" className="btn ghost" onClick={copy}><Icon name="copy" />{UI.copy}</button>
        <button type="button" className="btn ghost" onClick={print}><Icon name="print" />{UI.print}</button>
      </div>
      <p className="form-msg" role="status">{status}</p>
    </>
  );
}

/* ---------- asistente por pasos (Wealth Score y Perfil) ---------- */
export type WizGroup = {
  id: string; name: string; icon: string;
  total: number; answered: number;
  missing: string[];                        // ids de las filas sin responder
  render: (showMissing: boolean) => ReactNode;
};
export function Wizard({ uid, groups, onFinish }: { uid: string; groups: WizGroup[]; onFinish: () => void }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [showMissing, setShowMissing] = useState(false);
  const [msg, setMsg] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const focusTitle = useRef(false);

  const a = groups.reduce((s, g) => s + g.answered, 0);
  const t = groups.reduce((s, g) => s + g.total, 0);
  const p = t ? Math.round(a / t * 100) : 0;
  const last = idx === groups.length - 1;

  const go = (i: number, focus = true) => {
    const n = Math.max(0, Math.min(groups.length - 1, i));
    setDir(n >= idx ? 1 : -1); setIdx(n); setMsg('');
    focusTitle.current = focus;
  };
  useEffect(() => { if (focusTitle.current) { titleRef.current?.focus(); focusTitle.current = false; } }, [idx]);

  const finish = () => {
    const total = groups.reduce((s, g) => s + g.missing.length, 0);
    if (!total) { onFinish(); return; }
    setShowMissing(true);
    const gi = groups.findIndex(g => g.missing.length);
    const rowId = groups[gi].missing[0];
    setDir(gi >= idx ? 1 : -1); setIdx(gi);
    setMsg(fmt(UI.missingGroup, { n: total }));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const row = document.getElementById(rowId);
      row?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (row?.querySelector('input') as HTMLInputElement | null)?.focus({ preventScroll: true });
    }));
  };

  const g = groups[idx];
  return (
    <div>
      <div className="wiz-top">
        <div className="steps">
          {groups.map((x, i) => (
            <button key={x.id} type="button"
              className={cx('pill', x.answered === x.total && 'done')}
              aria-current={i === idx ? 'step' : undefined}
              onClick={() => go(i)}>
              {i === idx ? <motion.span layoutId={`${uid}-pill`} className="pill-bg" transition={{ type: 'spring', stiffness: 420, damping: 36 }} /> : null}
              <Icon name={x.icon} />{x.name}
            </button>
          ))}
        </div>
        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={p} aria-label="Avance">
          <motion.span initial={false} animate={{ width: p + '%' }} transition={{ duration: 0.45, ease: 'easeOut' }} />
        </div>
        <p className="hint" aria-live="polite">{fmt(UI.stepOf, { n: idx + 1, total: groups.length })} · {g.name}</p>
      </div>

      <AnimatePresence mode="wait" initial={false} custom={dir}>
        <motion.div key={g.id} custom={dir}
          initial={{ opacity: 0, x: 36 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -36 * dir }}
          transition={{ duration: 0.25 }}>
          <h3 className="wiz-title" tabIndex={-1} ref={titleRef}><Icon name={g.icon} />{g.name}</h3>
          {g.render(showMissing)}
        </motion.div>
      </AnimatePresence>

      <p className="form-msg" role="alert">{msg}</p>
      <div className="wiz-nav">
        <button type="button" className="btn ghost" disabled={idx === 0} onClick={() => go(idx - 1)}><Icon name="arrowL" />{UI.prev}</button>
        <span className="btn-row">
          {!last ? <button type="button" className="btn" onClick={() => go(idx + 1)}>{UI.next}<Icon name="arrowR" /></button> : null}
          {last ? <button type="button" className="btn" onClick={finish}>{UI.seeResult}<Icon name="arrowR" /></button> : null}
        </span>
      </div>
    </div>
  );
}

/* ---------- esqueleto de cada herramienta ---------- */
/* ---------- piezas compartidas de las secciones ---------- */
/** Título de sección con UNA palabra clave en degradado (la palabra viene de CONFIG, clave `accent`). */
export function AccentTitle({ text, accent, id, as: Tag = 'h2' }: { text: string; accent?: string; id?: string; as?: 'h2' | 'h3' }) {
  const i = accent ? text.indexOf(accent) : -1;
  return (
    <Tag id={id}>
      {i < 0 || !accent ? text : <>{text.slice(0, i)}<span className="gtext">{accent}</span>{text.slice(i + accent.length)}</>}
    </Tag>
  );
}

export function SectionHead({ kicker, title, accent, id, intro }: { kicker: string; title: string; accent?: string; id: string; intro?: string }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{kicker}</span>
      <AccentTitle text={title} accent={accent} id={id} />
      {intro ? <p className="lead">{intro}</p> : null}
    </Reveal>
  );
}

export function Card({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <Reveal as="article" className={cx('card lift', className)} delay={delay}>{children}</Reveal>;
}

export function ToolShell({ cfg, num, children, sectionRef }:
  { cfg: { id: string; kicker: string; title: string; accent?: string; intro: string }; num: number; children: ReactNode; sectionRef?: RefObject<HTMLElement | null> }) {
  return (
    <section id={cfg.id} ref={sectionRef} className="section" aria-labelledby={cfg.id + '-t'}>
      <div className="container">
        <Reveal className="tool-head">
          <span className="badge" aria-hidden="true"><span className="gtext">{num}</span></span>
          <div>
            <span className="eyebrow">{fmt(UI.toolLabel, { n: num })} · {cfg.kicker}</span>
            <AccentTitle text={cfg.title} accent={cfg.accent} id={cfg.id + '-t'} />
            <p>{cfg.intro}</p>
          </div>
        </Reveal>
        <Reveal className="tool-card" y={40}>{children}</Reveal>
      </div>
    </section>
  );
}

/* ---------- aparición de resultados ---------- */
export function ResultPane({ children, innerRef }: { children: ReactNode; innerRef?: RefObject<HTMLDivElement | null> }) {
  return (
    <motion.div ref={innerRef} className="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} aria-live="polite">
      {children}
    </motion.div>
  );
}

export { AnimatePresence, motion, useId, useInView };
