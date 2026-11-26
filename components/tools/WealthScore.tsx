'use client';
import { useEffect, useRef, useState } from 'react';
import { CONFIG } from '@/lib/config';
import { UI, cx, fmt, pct, scrollToEl } from '@/lib/utils';
import { useResults } from '@/lib/results';
import { Icon } from '../Icon';
import { CountUp, ResultActions, ResultPane, ToolShell, Wizard, motion, type WizGroup } from '../ui';

const C = CONFIG.wealthScore;
type Answers = Record<string, (boolean | null)[]>;

const statusOf = (r: number): 'ok' | 'mid' | 'low' =>
  r >= C.thresholds.covered ? 'ok' : r >= C.thresholds.partial ? 'mid' : 'low';

function compute(answers: Answers) {
  const per = C.pillars.map(p => {
    const w = p.questions.map(q => ('points' in q && q.points ? q.points : 1) as number);
    const sum = w.reduce((a, b) => a + b, 0);
    let got = 0; const pending: string[] = [];
    p.questions.forEach((q, i) => { if (answers[p.id][i]) got += w[i] / sum * p.weight; else pending.push(q.text); });
    return { p, got, ratio: p.weight ? got / p.weight : 0, pending };
  });
  const max = C.pillars.reduce((a, p) => a + p.weight, 0);
  const total = per.reduce((a, x) => a + x.got, 0);
  return { per, score: max ? total / max * 100 : 0 };
}

const CIRC = 2 * Math.PI * 84;

export function WealthScore() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { setResult } = useResults();
  const [answers, setAnswers] = useState<Answers>(() =>
    Object.fromEntries(C.pillars.map(p => [p.id, p.questions.map(() => null)])));
  const [view, setView] = useState<'form' | 'result'>('form');

  const setAnswer = (pid: string, qi: number, v: boolean) =>
    setAnswers(a => ({ ...a, [pid]: a[pid].map((x, i) => (i === qi ? v : x)) }));

  const groups: WizGroup[] = C.pillars.map(p => ({
    id: p.id, name: p.name, icon: p.icon,
    total: p.questions.length,
    answered: answers[p.id].filter(v => v !== null).length,
    missing: p.questions.map((_, qi) => (answers[p.id][qi] === null ? `ws-${p.id}-${qi}` : '')).filter(Boolean),
    render: showMissing => (
      <div>
        {p.questions.map((q, qi) => {
          const nm = `ws-${p.id}-${qi}`, tid = nm + '-t', val = answers[p.id][qi];
          return (
            <div key={nm} id={nm} role="group" aria-labelledby={tid} className={cx('qrow', showMissing && val === null && 'invalid')}>
              <p className="qtext" id={tid}>{q.text}</p>
              <div className="seg">
                <input type="radio" name={nm} id={nm + '-y'} checked={val === true} onChange={() => setAnswer(p.id, qi, true)} />
                <label htmlFor={nm + '-y'}>{UI.yes}</label>
                <input type="radio" name={nm} id={nm + '-n'} checked={val === false} onChange={() => setAnswer(p.id, qi, false)} />
                <label htmlFor={nm + '-n'}>{UI.no}</label>
              </div>
              <p className="qerr">{UI.missing}</p>
            </div>
          );
        })}
      </div>
    )
  }));

  const r = compute(answers);
  const score = Math.round(r.score);
  const level = [...C.levels].reverse().find(l => score >= l.min) ?? C.levels[0];
  const coveredN = r.per.filter(x => statusOf(x.ratio) === 'ok').length;
  const weakest = [...r.per].sort((a, b) => a.ratio - b.ratio)[0];
  const text = [`${C.resultTitle}: ${score}/100 (${level.name})`,
    ...r.per.map(x => `- ${x.p.name}: ${Math.round(x.got)}/${x.p.weight} · ${C.status[statusOf(x.ratio)]}`)].join('\n');

  useEffect(() => { if (view === 'result') setResult('score', text); }, [view, text, setResult]);
  useEffect(() => { if (view === 'result') scrollToEl(headingRef.current); }, [view]);

  return (
    <ToolShell cfg={C} num={1} sectionRef={sectionRef}>
      <div ref={bodyRef}>
        {view === 'form' ? (
          <Wizard uid="ws" groups={groups} onFinish={() => setView('result')} />
        ) : (
          <ResultPane>
            <div className="score-top">
              <div className="ring" role="img" aria-label={`${C.resultTitle}: ${score} ${C.outOf}`}>
                <svg viewBox="0 0 200 200" aria-hidden="true">
                  <circle className="t" cx="100" cy="100" r="84" />
                  <motion.circle className="v" cx="100" cy="100" r="84" strokeDasharray={CIRC}
                    initial={{ strokeDashoffset: CIRC }} animate={{ strokeDashoffset: CIRC * (1 - score / 100) }}
                    transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }} />
                </svg>
                <div className="num"><span><CountUp value={score} /></span><small>{C.outOf}</small></div>
              </div>
              <div>
                <h3 className="big" tabIndex={-1} ref={headingRef}>{C.resultTitle}: {level.name}</h3>
                <p>{level.text}</p>
                <p>{fmt(C.coveredCount, { n: coveredN, total: r.per.length })}{' '}
                  {coveredN === r.per.length ? C.allCovered : fmt(C.workFirst, { name: weakest.p.name })}</p>
              </div>
            </div>

            <h3>{C.pillarsTitle}</h3>
            {r.per.map((x, i) => {
              const st = statusOf(x.ratio);
              return (
                <motion.div className="pillar" key={x.p.id}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                  <div className="pillar-head">
                    <h4><Icon name={x.p.icon} />{x.p.name}</h4>
                    <span>
                      <span className="muted">{fmt(C.pointsOf, { n: Math.round(x.got), max: x.p.weight })}{'  '}</span>
                      <span className={'chip ' + st}>{st === 'ok' ? '✓ ' : ''}{C.status[st]}</span>
                    </span>
                  </div>
                  <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct(x.ratio)} aria-label={x.p.name}>
                    <motion.span initial={{ width: 0 }} animate={{ width: pct(x.ratio) + '%' }} transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: 'easeOut' }} />
                  </div>
                  {st !== 'ok' && x.pending.length ? (
                    <div>
                      <p className="hint" style={{ marginTop: '.8rem' }}>{C.pendingTitle}</p>
                      <ul>{x.pending.map(t => <li key={t}>{t}</li>)}</ul>
                    </div>
                  ) : null}
                </motion.div>
              );
            })}

            <ResultActions getText={() => text} sectionRef={sectionRef}
              leading={<button type="button" className="btn ghost" onClick={() => { setView('form'); setTimeout(() => scrollToEl(bodyRef.current), 50); }}><Icon name="arrowL" />{UI.editAnswers}</button>} />
          </ResultPane>
        )}
      </div>
    </ToolShell>
  );
}
