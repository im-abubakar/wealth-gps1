'use client';
import { CONFIG } from '@/lib/config';
import { UI, fmt } from '@/lib/utils';
import { Icon } from './Icon';
import { Card, Reveal, SectionHead } from './ui';

export function Benefits() {
  const B = CONFIG.benefits;
  return (
    <section id="beneficios" className="section" aria-labelledby="ben-t">
      <div className="container">
        <SectionHead kicker={B.kicker} title={B.title} accent={B.accent} id="ben-t" />
        <div className="grid c4">
          {B.items.map((i, k) => (
            <Card key={i.title} delay={k * 0.1}>
              <Icon name={i.icon} /><h3>{i.title}</h3><p>{i.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Solutions() {
  const S = CONFIG.solutions;
  return (
    <section id="soluciones" className="section" aria-labelledby="sol-t">
      <div className="container">
        <SectionHead kicker={S.kicker} title={S.title} accent={S.accent} id="sol-t" intro={S.intro} />
        <div className="grid c3">
          {S.items.map((i, k) => (
            <Card key={i.problem} className="problem" delay={(k % 3) * 0.1}>
              <h3 className="q">{i.problem}</h3>
              <p className="a"><strong>{S.helpLabel}: </strong>{i.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ToolsIntro() {
  const I = CONFIG.toolsIntro;
  const tools = [CONFIG.wealthScore, CONFIG.savings, CONFIG.netWorth, CONFIG.profile];
  return (
    <section id="herramientas" className="section" aria-labelledby="tools-t">
      <div className="container">
        <SectionHead kicker={I.kicker} title={I.title} accent={I.accent} id="tools-t" intro={I.intro} />
        <div className="grid c4">
          {tools.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1}>
              <a className="tool-link lift" href={'#' + t.id}>
                <span className="num">{fmt(UI.toolLabel, { n: i + 1 }).toUpperCase()}</span>
                <Icon name={t.icon} />
                <strong>{t.title}</strong>
                <span className="qq">{t.kicker}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
