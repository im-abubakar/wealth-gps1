'use client';
import { useEffect, useRef, useState } from 'react';
import { CONFIG } from '@/lib/config';
import { UI, fmt, money, parseMoney, scrollToEl } from '@/lib/utils';
import { useResults } from '@/lib/results';
import { Icon } from '../Icon';
import { ChoiceGroup, CountUp, MoneyField, ResultActions, ResultPane, ToolShell, motion } from '../ui';

const C = CONFIG.netWorth, T = C.text;

export function NetWorth() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { setResult } = useResults();
  const [mode, setMode] = useState<'single' | 'couple'>('single');
  const [vals, setVals] = useState<Record<string, string>>({});
  const [calculated, setCalculated] = useState(false);
  const [msg, setMsg] = useState('');
  const [scrollNext, setScrollNext] = useState(false);

  type F = { id: string; label: string; hint?: string; coupleOnly?: boolean; factor?: number };
  const value = (f: F) => (f.coupleOnly && mode !== 'couple') ? 0 : parseMoney(vals[f.id] ?? '') * (f.factor ?? 1);

  const secs = C.sections.map(s => {
    const items = (s.fields as F[]).map(fl => ({ label: fl.label, v: value(fl) }));
    return { s, items, total: items.reduce((a, x) => a + x.v, 0) };
  });
  const by = (k: string) => secs.find(x => x.s.kind === k)!;
  const cuentas = by('cuentas'), bienes = by('bienes'), deudas = by('deudas');
  const assets = cuentas.total + bienes.total, debts = deudas.total, net = assets - debts;
  const any = secs.some(x => x.total > 0);
  const showResult = calculated && any;

  const text = [`${C.title}: ${money(net)}`, `${T.mode}: ${C.modes[mode].label}`,
    `${T.subCuentas}: ${money(cuentas.total)}`, `${T.totalAssets}: ${money(assets)}`,
    `${T.totalDebts}: ${money(debts)}`, `${T.netWorth}: ${money(net)}`, UI.currencyNote].join('\n');

  useEffect(() => { if (showResult) setResult('networth', text); }, [showResult, text, setResult]);
  useEffect(() => { if (scrollNext && showResult) { scrollToEl(headingRef.current); setScrollNext(false); } }, [scrollNext, showResult]);

  const calc = () => {
    if (!any) { setMsg(T.errAny); setCalculated(false); document.getElementById(`nw-${C.sections[0].fields[0].id}`)?.focus(); return; }
    setMsg(''); setCalculated(true); setScrollNext(true);
  };

  const maxV = Math.max(assets, debts, 1);
  const head = (t: string) => <tr className="sub"><th scope="colgroup" colSpan={2}>{t}</th></tr>;
  const items = (x: typeof cuentas) => x.items.some(i => i.v > 0)
    ? x.items.filter(i => i.v > 0).map(i => <tr key={i.label}><th scope="row">{i.label}</th><td className="n">{money(i.v)}</td></tr>)
    : <tr><td colSpan={2} className="muted">{T.empty}</td></tr>;
  const line = (l: string, v: number, cls?: string) => <tr className={cls}><th scope="row">{l}</th><td className="n">{money(v)}</td></tr>;

  return (
    <ToolShell cfg={C} num={3} sectionRef={sectionRef}>
      <div ref={bodyRef}>
        <div className="block">
          <h3 id="nw-mode-l">{C.modeTitle}</h3>
          <ChoiceGroup name="nw-mode" labelId="nw-mode-l" value={mode}
            options={[
              { value: 'single', label: C.modes.single.label, hint: C.modes.single.hint, icon: 'person' },
              { value: 'couple', label: C.modes.couple.label, hint: C.modes.couple.hint, icon: 'couple' }
            ]}
            onChange={v => setMode(v as 'single' | 'couple')} />
          {mode === 'couple' ? <p className="hint">{C.coupleHint}</p> : null}
        </div>

        {C.sections.map(s => (
          <div className="block" key={s.id}>
            <h3><Icon name={s.icon} />{s.title}</h3>
            <p className="hint">{s.hint} {C.fieldHint}</p>
            <div className="fields" style={{ marginTop: '1rem' }}>
              {(s.fields as F[]).map(fl => (
                <MoneyField key={fl.id} id={`nw-${fl.id}`} label={fl.label} hint={fl.hint}
                  hidden={!!fl.coupleOnly && mode !== 'couple'}
                  value={vals[fl.id] ?? ''} onChange={v => setVals(s2 => ({ ...s2, [fl.id]: v }))} />
              ))}
            </div>
          </div>
        ))}

        <div className="btn-row"><button type="button" className="btn" onClick={calc}>{UI.calculate}<Icon name="arrowR" /></button></div>
        <p className="form-msg" role="alert">{showResult ? '' : msg}</p>

        {showResult ? (
          <ResultPane>
            <h3 className="big" tabIndex={-1} ref={headingRef}>{T.resultTitle}</h3>
            <div className="stat">
              <p className="k">{T.statKey}</p>
              <p className="v"><CountUp value={net} format={money} /></p>
              <p className="muted">{fmt(net >= 0 ? T.statPositive : T.statNegative, { assets: money(assets), debts: money(debts) })}</p>
            </div>
            <div className="compare">
              {([[T.barAssets, assets], [T.barDebts, debts]] as [string, number][]).map(([l, v], i) => (
                <div key={l}>
                  <span><span>{l}</span><span>{money(v)}</span></span>
                  <div className="bar"><motion.span initial={{ width: 0 }} animate={{ width: Math.round(v / maxV * 100) + '%' }} transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease: 'easeOut' }} /></div>
                </div>
              ))}
            </div>

            <h4>{T.summaryTitle}</h4>
            <ul className="summary">
              <li><b>{T.mode}: </b>{C.modes[mode].label}</li>
              <li><b>{T.subCuentas}: </b>{money(cuentas.total)}</li>
              <li><b>{T.totalAssets}: </b>{money(assets)}</li>
              <li><b>{T.totalDebts}: </b>{money(debts)}</li>
            </ul>

            <table className="stmt">
              <caption>{T.tableCaption}</caption>
              <thead><tr><th scope="col">{T.colConcept}</th><th scope="col" className="n">{T.colAmount}</th></tr></thead>
              <tbody>
                {head(cuentas.s.title)}{items(cuentas)}{line(T.subCuentas, cuentas.total)}
                {head(bienes.s.title)}{items(bienes)}{line(T.subBienes, bienes.total)}
                {line(T.totalAssets, assets, 'sub')}
                {head(deudas.s.title)}{items(deudas)}{line(T.totalDebts, debts, 'sub')}
                {line(T.netWorth, net, 'total')}
              </tbody>
            </table>
            <p className="note">{UI.currencyNote}</p>
            <ResultActions getText={() => text} sectionRef={sectionRef}
              leading={<button type="button" className="btn ghost" onClick={() => scrollToEl(bodyRef.current)}><Icon name="arrowL" />{UI.editData}</button>} />
          </ResultPane>
        ) : null}
      </div>
    </ToolShell>
  );
}
