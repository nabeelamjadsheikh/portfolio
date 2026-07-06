import { AuroraBackground } from '@/components/fx/aurora-background';
import { GridBackground } from '@/components/fx/grid-background';
import { Cursor } from '@/components/fx/cursor';
import { Preloader } from '@/components/fx/preloader';
import { ScrollProgress } from '@/components/fx/scroll-progress';
import { Nav } from '@/components/sections/nav';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Journey } from '@/components/sections/journey';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Metrics } from '@/components/sections/metrics';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Page() {
  return (
    <>
      <Preloader />
      <AuroraBackground />
      <GridBackground />
      <Cursor />
      <ScrollProgress />
      <Nav />

      <main>
        <Hero />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Experience />
        <Metrics />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
