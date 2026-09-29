import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPin, Loader2, ChevronDown } from 'lucide-react';
import type { GeoResult } from '../types';
import type { GeoStatus } from '../hooks/useGeolocation';

// Inline Instagram SVG (lucide-react doesn't export Instagram)
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
import { buildWhatsAppUrl } from '../data';

interface HeroProps {
  geoResult: GeoResult;
  geoStatus: GeoStatus;
}

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: customEase },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 60, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.9, ease: customEase },
  },
};

export function Hero({ geoResult, geoStatus }: HeroProps) {
  const waUrl = buildWhatsAppUrl(geoResult.unit);
  const distanceText =
    geoStatus === 'resolved' && geoResult.distanceKm > 0
      ? `A ${geoResult.distanceKm.toFixed(1)} km de você`
      : `Unidade ${geoResult.unit.name}`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden"
    >
      {/* Background — atmospheric gradient + overlay */}
      <div className="absolute inset-0 z-0">
        {/* Dark base */}
        <div className="absolute inset-0 bg-[#0D0D0D]" />

        {/* Radial glow — carmesim top-right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 70% at 75% 20%, rgba(255,23,68,0.18) 0%, transparent 65%)',
          }}
        />

        {/* Secondary glow — laranja bottom-left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 20% 90%, rgba(255,140,66,0.1) 0%, transparent 60%)',
          }}
        />

        {/* Gym image overlay — dark cinematic */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.55) 45%, rgba(13,13,13,0.3) 100%)',
          }}
        />

        {/* Athlete silhouette background image */}
        <div
          className="absolute right-0 top-0 w-full h-full"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&fit=crop")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            opacity: 0.35,
            mixBlendMode: 'luminosity',
          }}
        />

        {/* Vignette bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-48"
          style={{
            background: 'linear-gradient(to top, #121212 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col"
        >
          <span
            className="text-white font-display font-700 text-2xl tracking-widest uppercase leading-none"
            style={{ fontFamily: '"Teko", sans-serif', letterSpacing: '0.15em' }}
          >
            IMPARÁVEIS
          </span>
          <span
            className="text-xs tracking-[0.35em] uppercase"
            style={{ color: '#FF8C42', fontFamily: '"Inter", sans-serif' }}
          >
            PRIME
          </span>
        </motion.div>

        <motion.a
          href="https://instagram.com/academia_das_imparaveis"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors duration-200"
          style={{ fontFamily: '"Inter", sans-serif' }}
        >
          <InstagramIcon size={16} />
          <span className="hidden sm:inline">@academia_das_imparaveis</span>
        </motion.a>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-16">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-4xl"
        >
          {/* Location badge */}
          <motion.div variants={itemVariants} className="mb-6 animate-float-badge">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border text-xs font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(255,23,68,0.1)',
                borderColor: 'rgba(255,23,68,0.35)',
                color: '#FF8C42',
                fontFamily: '"Inter", sans-serif',
                letterSpacing: '0.15em',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping-dot absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: '#FF1744' }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: '#FF1744' }}
                />
              </span>
              <AnimatePresence mode="wait">
                {geoStatus === 'loading' ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Loader2 size={10} className="animate-spin" />
                    Localizando...
                  </motion.span>
                ) : (
                  <motion.span
                    key="location"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <MapPin size={10} className="inline mr-1" />
                    {distanceText}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Main title */}
          <motion.div variants={titleVariants} className="overflow-hidden">
            <h1
              className="font-black italic uppercase leading-[0.88] tracking-tight text-white"
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              <span className="block">LIBERTE</span>
              <span className="block">O SEU LADO</span>
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                IMPARÁVEL
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mt-8 text-lg md:text-xl max-w-xl leading-relaxed"
            style={{ color: '#9CA3AF', fontFamily: '"Inter", sans-serif', fontWeight: 400 }}
          >
            Treino de Performance. FitDance. Resultados reais.
            A academia que não aceita mediocridade — e que fica perto de você.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-cta-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center justify-center gap-3 px-8 py-5 animate-pulse-glow overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
                borderRadius: '2px',
                fontFamily: '"Teko", sans-serif',
                fontWeight: 700,
                fontSize: '1.15rem',
                letterSpacing: '0.12em',
                color: '#fff',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {/* Shimmer overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 hover:opacity-100"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  transition: 'opacity 0.3s',
                }}
                whileHover={{ opacity: 1 }}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={geoResult.unit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="relative z-10 flex items-center gap-2"
                >
                  💬 Falar com {geoResult.unit.name}
                </motion.span>
              </AnimatePresence>
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#modalidades"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-5"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '2px',
                fontFamily: '"Teko", sans-serif',
                fontWeight: 600,
                fontSize: '1.1rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.75)',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,23,68,0.5)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.15)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)';
              }}
            >
              Ver Modalidades →
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap gap-8"
          >
            {[
              { value: '500+', label: 'Alunos Ativos' },
              { value: '2', label: 'Unidades' },
              { value: '10+', label: 'Modalidades' },
              { value: '98%', label: 'Satisfação' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="font-black italic uppercase leading-none"
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 900,
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                    background: 'linear-gradient(135deg, #FF1744, #FF8C42)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: '#9CA3AF', fontFamily: '"Inter", sans-serif', letterSpacing: '0.15em' }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        <span className="text-[10px] tracking-widest uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
