'use client';
import { useEffect, useRef, useState } from 'react';
import { CONFIG } from '@/lib/config';
import { UI, cx, fmt, scrollToEl } from '@/lib/utils';
import { useResults } from '@/lib/results';
import { Icon } from '../Icon';
import { ResultActions, ResultPane, ToolShell, Wizard, motion, type WizGroup } from '../ui';

const C = CONFIG.profile;
type Answers = Record<string, (number | null)[]>;

export function Profile() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { setResult } = useResults();
  const [answers, setAnswers] = useState<Answers>(() =>
    Object.fromEntries(C.areas.map(a => [a.id, a.questions.map(() => null)])));
  const [view, setView] = useState<'form' | 'result'>('form');

  const setAnswer = (aid: string, qi: number, v: number) =>
    setAnswers(s => ({ ...s, [aid]: s[aid].map((x, i) => (i === qi ? v : x)) }));

  const groups: WizGroup[] = C.areas.map(a => ({
    id: a.id, name: a.name, icon: a.icon,
    total: a.questions.length,
    answered: answers[a.id].filter(v => v !== null).length,
    missing: a.questions.map((_, qi) => (answers[a.id][qi] === null ? `pf-${a.id}-${qi}` : '')).filter(Boolean),
    render: showMissing => (
      <div>
        {a.questions.map((q, qi) => {
          const nm = `pf-${a.id}-${qi}`, tid = nm + '-t', val = answers[a.id][qi];
          return (
            <div key={nm} id={nm} role="group" aria-labelledby={tid} className={cx('profq', showMissing && val === null && 'invalid')}>
              <p className="qtext" id={tid}>{q.text}</p>
              <div className="optlist">
                {q.options.map((txt, oi) => (
                  <div className="choice" key={oi}>
                    <input type="radio" name={nm} id={`${nm}-${oi}`} checked={val === oi + 1} onChange={() => setAnswer(a.id, qi, oi + 1)} />
                    <label htmlFor={`${nm}-${oi}`} className="choice-card"><span>{txt}</span></label>
                  </div>
                ))}
              </div>
              <p className="qerr">{UI.missing}</p>
            </div>
          );
        })}
      </div>
    )
  }));

  const out = C.areas.map(a => {
    const vals = answers[a.id].map(v => v ?? 0);
    const avg = vals.reduce((s, v) => s + v, 0) / a.questions.length;
    const n = Math.min(4, Math.max(1, Math.round(avg)));
    return { a, n, level: a.levels[n - 1] };
  });
  const text = [`${C.resultTitle}:`, ...out.map(x => `- ${x.a.name}: ${x.level.name} (${fmt(C.levelOf, { n: x.n })})`)].join('\n');

  useEffect(() => { if (view === 'result') setResult('profile', text); }, [view, text, setResult]);
  useEffect(() => { if (view === 'result') scrollToEl(headingRef.current); }, [view]);

  return (
    <ToolShell cfg={C} num={4} sectionRef={sectionRef}>
      <div ref={bodyRef}>
        {view === 'form' ? (
          <Wizard uid="pf" groups={groups} onFinish={() => setView('result')} />
        ) : (
          <ResultPane>
            <h3 className="big" tabIndex={-1} ref={headingRef}>{C.resultTitle}</h3>
            <div className="profile-grid">
              {out.map((x, i) => (
                <motion.article className="pcard" key={x.a.id}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}>
                  <Icon name={x.a.icon} />
                  <p className="area">{x.a.name}</p>
                  <h4>{x.level.name}</h4>
                  <div className="meter" role="img" aria-label={fmt(C.levelOf, { n: x.n })}>
                    {[1, 2, 3, 4].map(k => (
                      <motion.i key={k} className={k <= 5 - x.n ? 'on' : ''}
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} style={{ originX: 0 }}
                        transition={{ delay: 0.35 + i * 0.12 + k * 0.08, duration: 0.35 }} />
                    ))}
                  </div>
                  <p className="muted" style={{ marginBottom: '.8rem', fontSize: '.9rem' }}>{fmt(C.levelOf, { n: x.n })}</p>
                  <p>{x.level.text}</p>
                </motion.article>
              ))}
            </div>
            <ResultActions getText={() => text} sectionRef={sectionRef}
              leading={<button type="button" className="btn ghost" onClick={() => { setView('form'); setTimeout(() => scrollToEl(bodyRef.current), 50); }}><Icon name="arrowL" />{UI.editAnswers}</button>} />
          </ResultPane>
        )}
      </div>
    </ToolShell>
  );
}
