import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="depoimentos" className="relative py-24 md:py-32 overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #121212 0%, #181818 50%, #121212 100%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span
            className="text-xs tracking-widest uppercase mb-4 block"
            style={{ color: '#FF8C42', fontFamily: '"Inter", sans-serif', letterSpacing: '0.2em' }}
          >
            Resultados reais
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
            QUEM JÁ{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MUDOU
            </span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative p-8 md:p-12 text-center"
              style={{
                background: '#181818',
                border: '1px solid #2A2A2A',
                borderRadius: '2px',
              }}
            >
              {/* Red accent top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-16"
                style={{ background: 'linear-gradient(90deg, #FF1744, #FF8C42)' }}
              />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={16} fill="#FF8C42" color="#FF8C42" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-lg md:text-xl leading-relaxed mb-8"
                style={{
                  color: '#E5E7EB',
                  fontFamily: '"Inter", sans-serif',
                  fontStyle: 'italic',
                }}
              >
                "{testimonials[current].text}"
              </blockquote>

              {/* Author */}
              <div>
                <p
                  className="font-bold text-white text-base"
                  style={{ fontFamily: '"Montserrat", sans-serif' }}
                >
                  {testimonials[current].name}
                </p>
                <p
                  className="text-xs tracking-widest uppercase mt-1"
                  style={{ color: '#9CA3AF', fontFamily: '"Inter", sans-serif', letterSpacing: '0.12em' }}
                >
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 transition-all duration-200 hover:scale-110"
              style={{
                background: '#1E1E1E',
                border: '1px solid #2A2A2A',
                borderRadius: '2px',
                color: '#9CA3AF',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,23,68,0.4)';
                (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#2A2A2A';
                (e.currentTarget as HTMLButtonElement).style.color = '#9CA3AF';
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === current
                      ? 'linear-gradient(90deg, #FF1744, #FF8C42)'
                      : '#2A2A2A',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 transition-all duration-200 hover:scale-110"
              style={{
                background: '#1E1E1E',
                border: '1px solid #2A2A2A',
                borderRadius: '2px',
                color: '#9CA3AF',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,23,68,0.4)';
                (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#2A2A2A';
                (e.currentTarget as HTMLButtonElement).style.color = '#9CA3AF';
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
