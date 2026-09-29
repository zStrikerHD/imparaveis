import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGeolocation } from './hooks/useGeolocation';
import { MODALITIES, TESTIMONIALS, ACADEMY_UNITS } from './data';
import { Hero } from './components/Hero';
import { Modalities } from './components/Modalities';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Units } from './components/Units';
import { Footer } from './components/Footer';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const { geoResult, status } = useGeolocation();
  const lenisRef = useRef<Lenis | null>(null);

  // ─── Lenis smooth scroll setup ────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // ─── GSAP section reveal animations ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section dividers reveal
      gsap.utils.toArray<HTMLElement>('[data-gsap-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Parallax on hero background elements
      gsap.to('[data-gsap-parallax]', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative">
      <Hero geoResult={geoResult} geoStatus={status} />

      {/* Section separator */}
      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #2A2A2A 30%, #2A2A2A 70%, transparent)' }}
      />

      <Modalities modalities={MODALITIES} />

      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #2A2A2A 30%, #2A2A2A 70%, transparent)' }}
      />

      <Pricing geoResult={geoResult} />

      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #2A2A2A 30%, #2A2A2A 70%, transparent)' }}
      />

      <Testimonials testimonials={TESTIMONIALS} />

      <div
        className="w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #2A2A2A 30%, #2A2A2A 70%, transparent)' }}
      />

      <Units units={ACADEMY_UNITS} geoResult={geoResult} />

      <Footer geoResult={geoResult} />
    </main>
  );
}

export default App;
