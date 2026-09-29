import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
import type { GeoResult } from '../types';
import { buildWhatsAppUrl } from '../data';

interface FooterProps {
  geoResult: GeoResult;
}

// Marquee ticker items
const TICKER_ITEMS = [
  'TREINO DE PERFORMANCE',
  'FITDANCE',
  'MUSCULAÇÃO',
  'RESULTADOS REAIS',
  'CARDIO FUNCIONAL',
  'MOBILIDADE',
  'IMPARÁVEIS',
];

export function Footer({ geoResult }: FooterProps) {
  const waUrl = buildWhatsAppUrl(geoResult.unit);

  return (
    <footer id="footer" className="relative overflow-hidden">
      {/* Ticker marquee */}
      <div
        className="relative overflow-hidden py-4 border-t border-b"
        style={{ borderColor: '#2A2A2A' }}
      >
        <div
          className="animate-marquee whitespace-nowrap text-sm font-bold tracking-widest uppercase"
          style={{
            fontFamily: '"Teko", sans-serif',
            fontSize: '1.1rem',
            letterSpacing: '0.15em',
            background: 'linear-gradient(90deg, #FF1744, #FF8C42, #FF1744)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {Array.from({ length: 4 }).map((_, idx) => (
            <span key={idx}>
              {TICKER_ITEMS.join(' · ')} ·{' '}
            </span>
          ))}
        </div>
      </div>

      {/* Final CTA block */}
      <div
        className="relative py-24 md:py-32 text-center px-6"
        style={{
          background: 'linear-gradient(180deg, #121212 0%, #0D0D0D 100%)',
        }}
      >
        {/* Atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,23,68,0.07) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-widest uppercase mb-6"
            style={{ color: '#FF8C42', fontFamily: '"Inter", sans-serif', letterSpacing: '0.2em' }}
          >
            A decisão mais importante do seu dia
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-black italic uppercase leading-none mb-10"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 9vw, 7rem)',
              letterSpacing: '-0.03em',
            }}
          >
            COMECE{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              HOJE.
            </span>
          </motion.h2>

          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-5 animate-pulse-glow"
            style={{
              background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
              borderRadius: '2px',
              fontFamily: '"Teko", sans-serif',
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: '0.12em',
              color: '#fff',
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            💬 Falar com {geoResult.unit.name} →
          </motion.a>
        </div>
      </div>

      {/* Footer bar */}
      <div
        className="px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ background: '#0D0D0D', borderTop: '1px solid #1E1E1E' }}
      >
        {/* Logo */}
        <div className="flex flex-col">
          <span
            className="text-white font-bold uppercase tracking-widest text-lg leading-none"
            style={{ fontFamily: '"Teko", sans-serif', letterSpacing: '0.15em' }}
          >
            IMPARÁVEIS
          </span>
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: '#FF8C42', fontFamily: '"Inter", sans-serif', letterSpacing: '0.25em' }}
          >
            PRIME
          </span>
        </div>

        {/* Copyright */}
        <p
          className="text-xs text-center"
          style={{ color: '#4B5563', fontFamily: '"Inter", sans-serif' }}
        >
          © {new Date().getFullYear()} Academia Imparáveis Prime. Todos os direitos reservados.
        </p>

        {/* Instagram */}
        <a
          href="https://instagram.com/academia_das_imparaveis"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm transition-colors duration-200 hover:text-white"
          style={{ color: '#9CA3AF', fontFamily: '"Inter", sans-serif', textDecoration: 'none' }}
        >
          <InstagramIcon size={16} />
          <span>@academia_das_imparaveis</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </footer>
  );
}
