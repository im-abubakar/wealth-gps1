'use client';
import { useState } from 'react';
import { CONFIG } from '@/lib/config';
import { useResults } from '@/lib/results';
import { Icon } from './Icon';
import { AccentTitle, Reveal } from './ui';

export function Cta() {
  const K = CONFIG.cta, ct = CONFIG.contact;
  const { results } = useResults();
  const parts = Object.values(results).filter(Boolean);
  const has = parts.length > 0;
  const [touched, setTouched] = useState(false);
  const [wanted, setWanted] = useState(true);
  const include = has && (touched ? wanted : true);

  let body = K.mailGreeting;
  if (include) body += '\n\n' + K.mailResultsTitle + '\n\n' + parts.join('\n\n');
  const mailto = `mailto:${ct.email}?subject=${encodeURIComponent(ct.subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section id="contacto" className="section cta lux-dark" aria-labelledby="cta-t">
      <div className="cta-glow" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <span className="eyebrow">{K.kicker}</span>
          <AccentTitle text={K.title} accent={K.accent} id="cta-t" />
          <p className="lead">{K.lead}</p>
          <div className="btn-row">
            {ct.bookingUrl
              ? <a className="btn btn-glow" href={ct.bookingUrl} target="_blank" rel="noopener"><Icon name="calendar" />{K.book}</a>
              : <a className="btn btn-glow" href={mailto}><Icon name="calendar" />{K.book}</a>}
            <a className="btn ghost" href={mailto}><Icon name="mail" />{K.write}</a>
          </div>
          <label className="chk" htmlFor="cta-chk">
            <input type="checkbox" id="cta-chk" disabled={!has} checked={include}
              onChange={e => { setTouched(true); setWanted(e.target.checked); }} />
            {K.includeResults}
          </label>
          {!has ? <p className="hero-note">{K.noResults}</p> : null}
          <p className="contact-lines">
            <a href={'mailto:' + ct.email}>{ct.email}</a>
            {ct.phone ? <> · <a href={'tel:' + ct.phone.replace(/[^+\d]/g, '')}>{ct.phone}</a></> : null}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
