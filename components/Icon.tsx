/* Iconos de línea: rejilla de 48, trazo 2.5, terminaciones redondas (el estilo está en globals.css) */
const ICONS: Record<string, string> = {
  person: '<circle cx="24" cy="15" r="7"/><path d="M10 42c0-8 6-14 14-14s14 6 14 14"/>',
  couple: '<circle cx="17" cy="16" r="6"/><path d="M5 40c0-7 5-12 12-12s12 5 12 12"/><circle cx="33" cy="18" r="5"/><path d="M31 29c7 0 12 4 12 11"/>',
  trend: '<path d="M6 36l12-12 8 8 16-18"/><path d="M32 14h10v10"/>',
  shield: '<path d="M24 5l15 6v12c0 10-7 17-15 20-8-3-15-10-15-20V11z"/><path d="M17 24l5 5 9-10"/>',
  sunrise: '<path d="M6 36h36"/><path d="M14 36a10 10 0 0 1 20 0"/><path d="M24 10v6M10 18l4 4M38 18l-4 4"/><path d="M12 42h24"/>',
  target: '<circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="10"/><circle cx="24" cy="24" r="2.5"/>',
  estate: '<rect x="10" y="6" width="28" height="36" rx="3"/><path d="M17 16h14M17 23h14M17 30h6"/><circle cx="32" cy="34" r="4"/>',
  gauge: '<path d="M7 34a17 17 0 1 1 34 0"/><path d="M24 34l9-11"/><circle cx="24" cy="34" r="2.5"/>',
  statement: '<rect x="10" y="6" width="28" height="36" rx="3"/><path d="M17 16h14M17 24h14M17 32h8"/>',
  balance: '<path d="M24 8v32M14 40h20M10 14h28"/><path d="M10 14L4 28h12z"/><path d="M38 14l-6 14h12z"/>',
  profile: '<rect x="6" y="10" width="36" height="28" rx="4"/><circle cx="18" cy="21" r="4"/><path d="M11 33c1-4 4-6 7-6s6 2 7 6"/><path d="M30 20h8M30 27h8"/>',
  compass: '<circle cx="24" cy="24" r="18"/><path d="M31 17l-4 10-10 4 4-10z"/>',
  route: '<circle cx="12" cy="36" r="4"/><circle cx="36" cy="12" r="4"/><path d="M16 36h14a6 6 0 0 0 0-12H18a6 6 0 0 1 0-12h14"/>',
  locate: '<circle cx="24" cy="24" r="8"/><circle cx="24" cy="24" r="2"/><path d="M24 4v8M24 36v8M4 24h8M36 24h8"/>',
  flag: '<path d="M12 42V6"/><path d="M12 8h26l-6 9 6 9H12"/>',
  wallet: '<path d="M8 14h28a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z"/><path d="M8 14a4 4 0 0 1 4-4h22"/><circle cx="32" cy="28" r="2"/>',
  home: '<path d="M6 22L24 7l18 15"/><path d="M11 19v22h26V19"/><path d="M20 41V29h8v12"/>',
  card: '<rect x="5" y="10" width="38" height="28" rx="4"/><path d="M5 19h38M12 30h8"/>',
  sun: '<circle cx="24" cy="24" r="8"/><path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4"/>',
  moon: '<path d="M40 28A16 16 0 1 1 20 8a13 13 0 0 0 20 20z"/>',
  menu: '<path d="M8 14h32M8 24h32M8 34h32"/>',
  close: '<path d="M12 12l24 24M36 12L12 36"/>',
  arrowR: '<path d="M8 24h32M28 12l12 12-12 12"/>',
  arrowL: '<path d="M40 24H8M20 12L8 24l12 12"/>',
  copy: '<rect x="16" y="16" width="26" height="26" rx="4"/><path d="M32 16v-6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h6"/>',
  print: '<path d="M14 18V6h20v12"/><rect x="6" y="18" width="36" height="16" rx="3"/><path d="M14 28h20v14H14z"/>',
  mail: '<rect x="5" y="9" width="38" height="30" rx="4"/><path d="M5 14l19 14 19-14"/>',
  calendar: '<rect x="6" y="9" width="36" height="33" rx="4"/><path d="M6 20h36M16 5v8M32 5v8"/>'
};

export function Icon({ name }: { name: string }) {
  return (
    <svg
      className="ic"
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: ICONS[name] ?? '' }}
    />
  );
}
