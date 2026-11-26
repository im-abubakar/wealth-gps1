import type { Metadata, Viewport } from 'next';
import '@fontsource/playfair-display/latin-500.css';
import '@fontsource/playfair-display/latin-700.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import './globals.css';
import './lux.css';
import { SITE, SITE_URL } from '@/lib/site';
import { getAssets } from '@/lib/assets';

const A = getAssets();
const ogUrl = `${SITE_URL}${A.og}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: `${SITE_URL}/` },
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: `${SITE_URL}/`,
    locale: SITE.locale,
    alternateLocale: SITE.alternateLocale,
    images: [{ url: ogUrl, width: 1200, height: 630, alt: SITE.ogImageAlt }]
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [{ url: ogUrl, alt: SITE.ogImageAlt }]
  },
  icons: {
    ...(A.icon ? { icon: A.icon } : {}),
    ...(A.apple ? { apple: A.apple } : {})
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: 'dark light'
};

/* Oscuro por defecto (negro como color de marca); el botón del encabezado cambia a claro. Nada se guarda en el navegador. */
const themeScript = `try{var d=document.documentElement;if(!d.dataset.theme){d.dataset.theme='dark'}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        {/* Degradado compartido para los trazos de los iconos (una sola definición) */}
        <svg aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <linearGradient id="lux-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0" style={{ stopColor: 'var(--ic1)' }} /><stop offset=".5" style={{ stopColor: 'var(--ic2)' }} /><stop offset="1" style={{ stopColor: 'var(--ic3)' }} />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
