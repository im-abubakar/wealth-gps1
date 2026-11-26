import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Benefits, Solutions, ToolsIntro } from '@/components/Sections';
import { WealthScore } from '@/components/tools/WealthScore';
import { Savings } from '@/components/tools/Savings';
import { NetWorth } from '@/components/tools/NetWorth';
import { Profile } from '@/components/tools/Profile';
import { Cta } from '@/components/Cta';
import { Footer } from '@/components/Footer';
import { CONFIG } from '@/lib/config';
import { getAssets } from '@/lib/assets';

export default function Page() {
  const { logo } = getAssets();
  return (
    <Providers>
      <a className="skip" href="#contenido">{CONFIG.ui.skip}</a>
      <Header logo={logo} />
      <main id="contenido">
        <Hero />
        {/* Todo lo que va debajo del hero cuelga de .lux (estilos en app/lux.css); el hero queda fuera. */}
        <div className="lux">
          <Benefits />
          
          {/* <Solutions /> */}
          {/* <ToolsIntro />
          <WealthScore />
          <Savings />
          <NetWorth />
          <Profile />
          <Cta /> */}
        </div>
      </main>
      {/* <Footer logo={logo} /> */}
    </Providers>
  );
}
