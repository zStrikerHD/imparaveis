import { motion } from 'framer-motion';
import { MapPin, Clock, ExternalLink } from 'lucide-react';
import type { AcademyUnit } from '../types';
import type { GeoResult } from '../types';
import { buildWhatsAppUrl } from '../data';

interface UnitsProps {
  units: AcademyUnit[];
  geoResult: GeoResult;
}

export function Units({ units, geoResult }: UnitsProps) {
  return (
    <section id="unidades" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span
            className="text-xs tracking-widest uppercase mb-4 block"
            style={{ color: '#FF8C42', fontFamily: '"Inter", sans-serif', letterSpacing: '0.2em' }}
          >
            Onde estamos
          </span>
          <h2
            className="font-black italic uppercase leading-none"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            NOSSAS{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              UNIDADES
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {units.map((unit, i) => {
            const isNearest = unit.id === geoResult.unit.id;
            const waUrl = buildWhatsAppUrl(unit);

            return (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative group overflow-hidden"
                style={{
                  background: '#181818',
                  border: isNearest ? '1px solid rgba(255,23,68,0.4)' : '1px solid #2A2A2A',
                  borderRadius: '2px',
                }}
              >
                {/* Nearest badge */}
                {isNearest && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                    style={{
                      background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
                      fontFamily: '"Inter", sans-serif',
                      letterSpacing: '0.15em',
                      borderRadius: '2px',
                    }}
                  >
                    📍 Mais Próxima
                  </div>
                )}

                {/* Glow for nearest */}
                {isNearest && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,23,68,0.06) 0%, transparent 70%)',
                    }}
                  />
                )}

                <div className="p-8 md:p-10">
                  {/* Unit name */}
                  <h3
                    className="font-black italic uppercase text-white mb-1"
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    }}
                  >
                    {unit.name}
                  </h3>
                  <p
                    className="text-xs tracking-widest uppercase mb-8"
                    style={{ color: '#FF8C42', fontFamily: '"Inter", sans-serif', letterSpacing: '0.15em' }}
                  >
                    Academia Imparáveis Prime
                  </p>

                  {/* Address */}
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#FF1744' }} />
                    <div>
                      <p style={{ color: '#E5E7EB', fontFamily: '"Inter", sans-serif', fontSize: '0.95rem' }}>
                        {unit.address}
                      </p>
                      <p style={{ color: '#9CA3AF', fontFamily: '"Inter", sans-serif', fontSize: '0.85rem' }}>
                        {unit.neighborhood} — {unit.city}, SP
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 mb-8">
                    <Clock size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#FF1744' }} />
                    <div>
                      <p style={{ color: '#E5E7EB', fontFamily: '"Inter", sans-serif', fontSize: '0.95rem' }}>
                        Seg – Sex: 6h às 22h
                      </p>
                      <p style={{ color: '#9CA3AF', fontFamily: '"Inter", sans-serif', fontSize: '0.85rem' }}>
                        Sáb: 8h às 14h | Dom: Fechado
                      </p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <motion.a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-wider uppercase"
                      style={{
                        background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
                        borderRadius: '2px',
                        fontFamily: '"Teko", sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '0.1em',
                        color: '#fff',
                        textDecoration: 'none',
                      }}
                    >
                      💬 WhatsApp
                    </motion.a>

                    <motion.a
                      href={unit.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-wider uppercase"
                      style={{
                        border: '1px solid #2A2A2A',
                        borderRadius: '2px',
                        fontFamily: '"Teko", sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '0.1em',
                        color: '#9CA3AF',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,23,68,0.4)';
                        (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = '#2A2A2A';
                        (e.currentTarget as HTMLAnchorElement).style.color = '#9CA3AF';
                      }}
                    >
                      <ExternalLink size={14} />
                      Ver no Mapa
                    </motion.a>
                  </div>
                </div>

                {/* Bottom accent */}
                <div
                  className="h-[2px] w-full"
                  style={{
                    background: isNearest
                      ? 'linear-gradient(90deg, #FF1744, #FF8C42)'
                      : '#2A2A2A',
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
