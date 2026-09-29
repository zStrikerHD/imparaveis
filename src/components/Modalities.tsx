import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Modality } from '../types';

interface ModalityCardProps {
  modality: Modality;
  index: number;
}

const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 0.5 };

function ModalityCard({ modality, index }: ModalityCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), SPRING_CONFIG);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), SPRING_CONFIG);
  const spotX = useSpring(mouseX, SPRING_CONFIG);
  const spotY = useSpring(mouseY, SPRING_CONFIG);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isHighlight = modality.highlight;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative rounded-sm overflow-hidden cursor-pointer group ${
        isHighlight ? 'lg:row-span-2' : ''
      }`}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-sm"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([x, y]) =>
              `radial-gradient(300px circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(255,23,68,0.12), transparent 70%)`
          ),
        }}
      />

      {/* Card body */}
      <div
        className="relative h-full flex flex-col justify-between p-5 md:p-6 transition-all duration-300"
        style={{
          background: isHighlight
            ? 'linear-gradient(145deg, #1A0A0A 0%, #181818 100%)'
            : '#181818',
          border: '1px solid #2A2A2A',
          minHeight: isHighlight ? '220px' : '140px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Border gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm pointer-events-none"
          style={{
            background: 'transparent',
            boxShadow: isHighlight
              ? 'inset 0 0 0 1px rgba(255,23,68,0.4)'
              : 'inset 0 0 0 1px rgba(255,140,66,0.3)',
          }}
        />

        {/* Tag */}
        {isHighlight && (
          <div
            className="absolute top-6 right-6 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-sm"
            style={{
              background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.15em',
            }}
          >
            {modality.tag}
          </div>
        )}

        {/* Emoji / Icon */}
        <motion.span
          className="text-3xl block"
          style={{ transform: 'translateZ(20px)' }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          {modality.emoji}
        </motion.span>

        {/* Title */}
        <h3
          className="font-black italic uppercase text-white leading-none mb-1"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 900,
            fontSize: isHighlight ? 'clamp(1.2rem, 2.5vw, 1.7rem)' : 'clamp(0.95rem, 1.8vw, 1.2rem)',
            transform: 'translateZ(10px)',
          }}
        >
          {isHighlight ? (
            <span
              style={{
                background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {modality.title}
            </span>
          ) : (
            modality.title
          )}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{
            color: '#9CA3AF',
            fontFamily: '"Inter", sans-serif',
            transform: 'translateZ(5px)',
          }}
        >
          {modality.description}
        </p>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
          style={{
            background: isHighlight
              ? 'linear-gradient(90deg, #FF1744, #FF8C42)'
              : 'linear-gradient(90deg, #FF8C42, #FF1744)',
          }}
        />
      </div>
    </motion.div>
  );
}

interface ModalitiesProps {
  modalities: Modality[];
}

export function Modalities({ modalities }: ModalitiesProps) {
  return (
    <section id="modalidades" className="relative py-16 md:py-20 overflow-hidden">
      {/* Section background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,23,68,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <span
            className="text-xs tracking-widest uppercase mb-4 block"
            style={{ color: '#FF8C42', fontFamily: '"Inter", sans-serif', letterSpacing: '0.2em' }}
          >
            O que oferecemos
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
              MODALIDADES
            </span>
          </h2>
        </motion.div>

        {/* True Bento Grid — responsive: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          style={{ perspective: '1000px' }}
        >
          {modalities.map((mod, i) => (
            <ModalityCard key={mod.id} modality={mod} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
