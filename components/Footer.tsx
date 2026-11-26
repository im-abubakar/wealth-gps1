import { CONFIG } from '@/lib/config';
import { UI } from '@/lib/utils';
import type { Img } from '@/lib/assets';

/* Pie de página: logo (centrado en móvil, a la izquierda en escritorio) + los textos de CONFIG.footer */
export function Footer({ logo }: { logo: Img | null }) {
  const F = CONFIG.footer;
  return (
    <footer className="site-footer lux-dark">
      <div className="container footer-in">
        <a className="logo-link logo-footer" href="#inicio" aria-label={logo ? undefined : UI.logoAria}>
          {logo
            ? <img className="logo-img" src={logo.src} width={logo.width} height={logo.height} alt="Wealth GPS" />
            : <span className="logo-ph">{UI.logoLabel}</span>}
        </a>
        <div className="footer-text">
          <p>{F.about} {F.motto}</p>
          <p>{F.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
