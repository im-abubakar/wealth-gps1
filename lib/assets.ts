/* Detecta, al compilar, los archivos de marca que subas a /public.
   Nada se redibuja ni se reescribe: si el archivo existe se usa tal cual;
   si no existe, la página sigue mostrando el marcador provisional.

   Nombres esperados dentro de /public:
     logo.svg | logo.png | logo.webp          logo completo (barra de navegación y pie de página)
     logo-symbol.svg | logo-symbol.png        solo el símbolo (favicon); si falta, se usa el logo
     apple-touch-icon.png                     180 x 180 px
     og-image.jpg | og-image.png              imagen para compartir, 1200 x 630 px            */
import fs from 'node:fs';
import path from 'node:path';

const PUB = path.join(process.cwd(), 'public');
const find = (names: string[]) => names.find(n => fs.existsSync(path.join(PUB, n))) ?? null;

export type Img = { src: string; width?: number; height?: number };

function dims(file: string): { width?: number; height?: number } {
  try {
    const buf = fs.readFileSync(path.join(PUB, file));
    if (file.endsWith('.png') && buf.length > 24) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    if (file.endsWith('.svg')) {
      const t = buf.toString('utf8');
      const vb = t.match(/viewBox\s*=\s*"([\d.\s-]+)"/i);
      if (vb) { const [, , w, h] = vb[1].trim().split(/\s+/).map(Number); if (w && h) return { width: w, height: h }; }
      const w = t.match(/<svg[^>]*\swidth\s*=\s*"([\d.]+)/i), h = t.match(/<svg[^>]*\sheight\s*=\s*"([\d.]+)/i);
      if (w && h) return { width: +w[1], height: +h[1] };
    }
  } catch { /* sin medidas: el CSS conserva la proporción con width:auto */ }
  return {};
}

export function getAssets() {
  const logoF = find(['logo.svg', 'logo.png', 'logo.webp']);
  const symbolF = find(['logo-symbol.svg', 'logo-symbol.png']);
  const appleF = find(['apple-touch-icon.png']);
  const ogF = find(['og-image.jpg', 'og-image.png']);
  return {
    logo: logoF ? ({ src: '/' + logoF, ...dims(logoF) } as Img) : null,
    icon: (symbolF ?? logoF) ? '/' + (symbolF ?? logoF) : null,
    apple: appleF ? '/' + appleF : null,
    og: '/' + (ogF ?? 'og-image.jpg'),     // si falta, la etiqueta se emite igual: solo hay que subir el archivo
    ogMissing: !ogF
  };
}
