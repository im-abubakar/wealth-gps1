import { CONFIG } from './config';

export const UI = CONFIG.ui;

export const fmt = (s: string, v: Record<string, string | number> = {}) =>
  String(s).replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));

const moneyFmt = new Intl.NumberFormat(CONFIG.money.locale, {
  style: 'currency',
  currency: CONFIG.money.currency,
  maximumFractionDigits: 0
});
export const money = (n: number) => {
  const r = Math.round(n);
  return moneyFmt.format(r === 0 ? 0 : r);
};
export const pct = (n: number) => Math.round(n * 100);

/** "1,200.50" → 1200.5 ; vacío o negativo → 0 */
export function parseMoney(v: string): number {
  const n = parseFloat(String(v).replace(/[^0-9.]/g, ''));
  return isFinite(n) && n > 0 ? n : 0;
}
export const formatMoneyInput = (v: string) => {
  const n = parseMoney(v);
  return n ? n.toLocaleString('en-CA', { maximumFractionDigits: 2 }) : '';
};

export const cx = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(' ');

export function scrollToEl(el: HTMLElement | null) {
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.setAttribute('tabindex', '-1');
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  el.focus({ preventScroll: true });
}
