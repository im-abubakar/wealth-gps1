'use client';
import { useEffect, useRef, useState } from 'react';
import { CONFIG } from '@/lib/config';
import { UI, fmt, money, parseMoney, pct, scrollToEl } from '@/lib/utils';
import { useResults } from '@/lib/results';
import { Icon } from '../Icon';
import { ChoiceGroup, CountUp, MoneyField, ResultActions, ResultPane, ToolShell } from '../ui';

const C = CONFIG.savings, T = C.text, RANGES = C.ranges;
type Basis = 'gross' | 'net' | null;
type Person = { range: string; exact: string; basis: Basis };
const emptyPerson = (): Person => ({ range: '', exact: '', basis: null });

function findRange(v: number) {
  let f = RANGES[0];
  for (const r of RANGES) if (v >= r.min) f = r;
  return f;
}

function readPerson(p: Person) {
  const exact = parseMoney(p.exact), r = p.range !== '' ? RANGES[+p.range] : null;
  if (!exact && !r) return { err: T.errIncome, field: 'range' as const };
  if (!p.basis) return { err: T.errBasis, field: 'basis' as const };
  const amount = exact || r!.estimate, range = exact ? findRange(exact) : r!;
  const net = p.basis === 'net' ? amount : amount * (1 - range.taxRate);
  return { amount, basis: p.basis, net, source: exact ? T.exactUsed : T.rangeUsed };
}

function PersonBlock({ k, title, p, onChange }: { k: string; title: string; p: Person; onChange: (p: Person) => void }) {
  return (
    <div className="person">
      <h4>{title}</h4>
      <div className="fields">
        <div className="field">
          <label htmlFor={`sv-${k}-range`}>{C.rangeLabel}</label>
          <select id={`sv-${k}-range`} value={p.range} onChange={e => onChange({ ...p, range: e.target.value })}>
            <option value="">{UI.chooseRange}</option>
            {RANGES.map((r, i) => <option key={r.label} value={String(i)}>{r.label}</option>)}
          </select>
        </div>
        <MoneyField id={`sv-${k}-exact`} label={C.exactLabel} hint={C.exactHint} value={p.exact} onChange={v => onChange({ ...p, exact: v })} />
      </div>
      <p className="label" id={`sv-${k}-basis-l`} style={{ margin: '1.2rem 0 .6rem' }}>{C.basisLabel}</p>
      <ChoiceGroup name={`sv-${k}-basis`} labelId={`sv-${k}-basis-l`} value={p.basis}
        options={[
          { value: 'gross', label: C.basis.gross.label, hint: C.basis.gross.hint },
          { value: 'net', label: C.basis.net.label, hint: C.basis.net.hint }
        ]}
        onChange={v => onChange({ ...p, basis: v as Basis })} />
    </div>
  );
}

export function Savings() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { setResult } = useResults();
  const [mode, setMode] = useState<'single' | 'couple'>('single');
  const [you, setYou] = useState<Person>(emptyPerson());
  const [partner, setPartner] = useState<Person>(emptyPerson());
  const [exp, setExp] = useState<Record<string, string>>({});
  const [calculated, setCalculated] = useState(false);
  const [msg, setMsg] = useState('');
  const [scrollNext, setScrollNext] = useState(false);

  const people = mode === 'couple'
    ? [{ k: 'you', lbl: T.you, p: you }, { k: 'partner', lbl: T.partner, p: partner }]
    : [{ k: 'you', lbl: T.you, p: you }];
  const read = people.map(x => ({ ...x, r: readPerson(x.p) }));
  const bad = read.find(x => 'err' in x.r);
  const error = bad && 'err' in bad.r ? (mode === 'couple' ? bad.lbl + ': ' : '') + bad.r.err : '';

  const ok = read.map(x => x.r).filter((r): r is Exclude<typeof r, { err: string }> => !('err' in r));
  const netY = ok.reduce((a, x) => a + x.net, 0), netM = netY / 12;
  const saveM = netM * C.personalSavingsRate, availM = netM - saveM;
  const exps = C.expenses.map(e => ({ label: e.label, v: parseMoney(exp[e.id] ?? '') }));
  const totalExp = exps.reduce((a, x) => a + x.v, 0);
  const bal = availM - totalExp, positive = bal >= 0, rate = pct(C.personalSavingsRate);
  const showResult = calculated && !error;

  const text = [`${C.title}: ${money(bal)} ${UI.perMonth} (${positive ? T.statPositiveKey : T.statNegativeKey})`,
    `${T.mode}: ${C.modes[mode].label}`, `${T.netIncome}: ${money(netM)} ${UI.perMonth}`,
    `${fmt(T.personalSaving, { rate })}: ${money(saveM)}`,
    ...exps.filter(x => x.v > 0).map(x => `${x.label}: ${money(x.v)}`),
    `${T.balance}: ${money(bal)}`, UI.currencyNote].join('\n');

  useEffect(() => { if (showResult) setResult('savings', text); }, [showResult, text, setResult]);
  useEffect(() => { if (scrollNext && showResult) { scrollToEl(headingRef.current); setScrollNext(false); } }, [scrollNext, showResult]);

  const calc = () => {
    if (error) {
      setMsg(error); setCalculated(false);
      requestAnimationFrame(() => {
        const first = bad!.r as { field: 'range' | 'basis' };
        const el = first.field === 'basis'
          ? document.querySelector<HTMLElement>(`input[name="sv-${bad!.k}-basis"]`)
          : document.getElementById(`sv-${bad!.k}-range`);
        el?.focus();
      });
      return;
    }
    setMsg(''); setCalculated(true); setScrollNext(true);
  };

  const usedGross = ok.some(x => x.basis === 'gross'), usedEstimate = ok.some(x => x.source === T.rangeUsed);
  const row = (label: string, m: number, cls?: string, neg?: boolean) => (
    <tr className={cls} key={label}>
      <th scope="row">{label}</th>
      <td className="n">{money(neg ? -m : m)}</td>
      <td className="n">{money((neg ? -m : m) * 12)}</td>
    </tr>
  );

  return (
    <ToolShell cfg={C} num={2} sectionRef={sectionRef}>
      <div ref={bodyRef}>
        <div className="block">
          <h3 id="sv-mode-l">{C.modeTitle}</h3>
          <ChoiceGroup name="sv-mode" labelId="sv-mode-l" value={mode}
            options={[
              { value: 'single', label: C.modes.single.label, hint: C.modes.single.hint, icon: 'person' },
              { value: 'couple', label: C.modes.couple.label, hint: C.modes.couple.hint, icon: 'couple' }
            ]}
            onChange={v => setMode(v as 'single' | 'couple')} />
        </div>

        <div className="block">
          <h3><Icon name="wallet" />{C.incomeTitle}</h3>
          <PersonBlock k="you" title={C.personTitles.you} p={you} onChange={setYou} />
          {mode === 'couple' ? <PersonBlock k="partner" title={C.personTitles.partner} p={partner} onChange={setPartner} /> : null}
        </div>

        <div className="block">
          <h3><Icon name="card" />{C.expensesTitle}</h3>
          <p className="hint">{mode === 'couple' ? C.expensesHintCouple : C.expensesHint}</p>
          <div className="fields" style={{ marginTop: '1rem' }}>
            {C.expenses.map(e => (
              <MoneyField key={e.id} id={`sv-exp-${e.id}`} label={e.label} value={exp[e.id] ?? ''}
                onChange={v => setExp(s => ({ ...s, [e.id]: v }))} />
            ))}
          </div>
        </div>

        <div className="btn-row"><button type="button" className="btn" onClick={calc}>{UI.calculate}<Icon name="arrowR" /></button></div>
        <p className="form-msg" role="alert">{showResult ? '' : msg}</p>

        {showResult ? (
          <ResultPane>
            <h3 className="big" tabIndex={-1} ref={headingRef}>{T.resultTitle}</h3>
            <div className="stat">
              <p className="k">{positive ? T.statPositiveKey : T.statNegativeKey}</p>
              <p className="v"><CountUp value={bal} format={money} /> {UI.perMonth}</p>
              <p>{money(bal * 12)} {UI.perYear}</p>
              <p className="muted">{positive ? fmt(T.statPositive, { amount: money(bal) }) : fmt(T.statNegative, { amount: money(-bal) })}</p>
              {positive ? <p className="muted">{fmt(T.statTotal, { amount: money(bal + saveM) })}</p> : null}
            </div>

            <h4>{T.summaryTitle}</h4>
            <ul className="summary">
              <li><b>{T.mode}: </b>{C.modes[mode].label}</li>
              {ok.map((x, i) => (
                <li key={i}><b>{(mode === 'couple' ? people[i].lbl : T.you) + ': '}</b>
                  {`${money(x.amount)} (${x.basis === 'gross' ? T.incomeGross : T.incomeNet}, ${x.source})`}
                  {x.basis === 'gross' ? ` → ${money(x.net)} neto` : ''}</li>
              ))}
            </ul>

            <table className="stmt">
              <caption>{T.tableCaption}</caption>
              <thead><tr><th scope="col">{T.colConcept}</th><th scope="col" className="n">{T.colMonth}</th><th scope="col" className="n">{T.colYear}</th></tr></thead>
              <tbody>
                {row(T.netIncome, netM)}
                {row(fmt(T.personalSaving, { rate }), saveM, undefined, true)}
                {row(T.available, availM, 'sub')}
                {exps.filter(x => x.v > 0).map(x => row(x.label, x.v, undefined, true))}
                {row(T.balance, bal, 'total')}
              </tbody>
            </table>
            {usedGross ? <p className="note">{T.taxNote}</p> : null}
            {usedEstimate ? <p className="note">{T.estimateNote}</p> : null}
            <p className="note">{UI.currencyNote}</p>
            <ResultActions getText={() => text} sectionRef={sectionRef}
              leading={<button type="button" className="btn ghost" onClick={() => scrollToEl(bodyRef.current)}><Icon name="arrowL" />{UI.editData}</button>} />
          </ResultPane>
        ) : null}
      </div>
    </ToolShell>
  );
}
