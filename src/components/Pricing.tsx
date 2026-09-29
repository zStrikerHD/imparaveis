import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import type { GeoResult } from '../types';
import { buildWhatsAppUrl } from '../data';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlight: boolean;
  badge?: string;
  ctaLabel: string;
}

const PLANS: PricingPlan[] = [
  {
    id: 'mensal',
    name: 'Mensal',
    price: 99,
    period: '/mês',
    description: 'Ideal para experimentar e começar a sua jornada.',
    features: [
      'Acesso ilimitado à musculação',
      'Aulas coletivas incluídas',
      'Avaliação física inicial',
      'App de treinos',
    ],
    highlight: false,
    ctaLabel: 'Começar Agora',
  },
  {
    id: 'trimestral',
    name: 'Trimestral',
    price: 79,
    period: '/mês',
    description: 'A escolha mais popular. Compromisso que gera resultado.',
    features: [
      'Tudo do plano Mensal',
      'FitDance ilimitado',
      'Acompanhamento nutricional',
      'Desconto em suplementos',
      'Treino personalizado',
    ],
    highlight: true,
    badge: 'MAIS POPULAR',
    ctaLabel: 'Quero Este Plano',
  },
  {
    id: 'semestral',
    name: 'Semestral',
    price: 64,
    period: '/mês',
    description: 'Máximo comprometimento. Máximo resultado. Máxima economia.',
    features: [
      'Tudo do plano Trimestral',
      'Personal trainer 2x/semana',
      'Acesso a todas as unidades',
      'Priority booking nas aulas',
      'Camiseta Imparáveis Prime',
    ],
    highlight: false,
    badge: 'MELHOR CUSTO-BENEFÍCIO',
    ctaLabel: 'Quero o Prime',
  },
];

interface PricingProps {
  geoResult: GeoResult;
}

export function Pricing({ geoResult }: PricingProps) {
  return (
    <section id="planos" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,23,68,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <span
            className="text-xs tracking-widest uppercase mb-4 block"
            style={{ color: '#FF8C42', fontFamily: '"Inter", sans-serif', letterSpacing: '0.2em' }}
          >
            Sem letras miúdas
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
            ESCOLHA O SEU{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PLANO
            </span>
          </h2>
          <p
            className="mt-4 text-base max-w-lg mx-auto"
            style={{ color: '#9CA3AF', fontFamily: '"Inter", sans-serif' }}
          >
            Quanto antes você começa, mais rápido transforma. Valores especiais de lançamento.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {PLANS.map((plan, i) => {
            const waMessage = encodeURIComponent(
              `Olá! Tenho interesse no plano ${plan.name} da Academia Imparáveis Prime em ${geoResult.unit.city}. Pode me dar mais informações? 💪`
            );
            const waUrl = `https://wa.me/${geoResult.unit.whatsapp}?text=${waMessage}`;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col"
                style={{
                  background: plan.highlight ? 'linear-gradient(145deg, #1C0808 0%, #1A1010 50%, #181818 100%)' : '#181818',
                  border: plan.highlight ? '1px solid rgba(255,23,68,0.45)' : '1px solid #2A2A2A',
                  borderRadius: '2px',
                  boxShadow: plan.highlight ? '0 0 40px rgba(255,23,68,0.1)' : 'none',
                  transform: plan.highlight ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                {/* Top accent bar */}
                <div
                  className="h-[3px] w-full"
                  style={{
                    background: plan.highlight
                      ? 'linear-gradient(90deg, #FF1744, #FF8C42)'
                      : '#2A2A2A',
                  }}
                />

                <div className="p-6 md:p-8 flex flex-col flex-1">
                  {/* Badge */}
                  {plan.badge && (
                    <div className="mb-4 self-start">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase"
                        style={{
                          background: plan.highlight
                            ? 'linear-gradient(135deg, #FF1744, #FF8C42)'
                            : 'rgba(255,140,66,0.15)',
                          borderRadius: '2px',
                          color: plan.highlight ? '#fff' : '#FF8C42',
                          fontFamily: '"Inter", sans-serif',
                          letterSpacing: '0.12em',
                          border: plan.highlight ? 'none' : '1px solid rgba(255,140,66,0.3)',
                        }}
                      >
                        {plan.highlight && <Zap size={9} />}
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan name */}
                  <h3
                    className="font-black italic uppercase mb-1"
                    style={{
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      color: plan.highlight ? '#fff' : '#E5E7EB',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-end gap-1 mb-1 mt-3">
                    <span
                      className="text-xs font-semibold"
                      style={{ color: '#9CA3AF', fontFamily: '"Inter", sans-serif', paddingBottom: '6px' }}
                    >
                      R$
                    </span>
                    <span
                      className="font-black leading-none"
                      style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 900,
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        background: plan.highlight
                          ? 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)'
                          : 'none',
                        WebkitBackgroundClip: plan.highlight ? 'text' : 'unset',
                        WebkitTextFillColor: plan.highlight ? 'transparent' : '#fff',
                        backgroundClip: plan.highlight ? 'text' : 'unset',
                        color: plan.highlight ? 'transparent' : '#fff',
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="text-sm mb-1"
                      style={{ color: '#9CA3AF', fontFamily: '"Inter", sans-serif', paddingBottom: '4px' }}
                    >
                      {plan.period}
                    </span>
                  </div>

                  <p
                    className="text-xs mb-6 leading-relaxed"
                    style={{ color: '#6B7280', fontFamily: '"Inter", sans-serif' }}
                  >
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div
                    className="w-full h-px mb-5"
                    style={{ background: '#2A2A2A' }}
                  />

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm"
                        style={{ color: '#D1D5DB', fontFamily: '"Inter", sans-serif' }}
                      >
                        <span
                          className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{
                            background: plan.highlight
                              ? 'linear-gradient(135deg, #FF1744, #FF8C42)'
                              : 'rgba(255,140,66,0.15)',
                          }}
                        >
                          <Check size={9} color={plan.highlight ? '#fff' : '#FF8C42'} strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`cta-plan-${plan.id}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center py-4 text-sm font-bold tracking-wider uppercase mt-auto"
                    style={{
                      background: plan.highlight
                        ? 'linear-gradient(135deg, #FF1744 0%, #FF8C42 100%)'
                        : 'transparent',
                      border: plan.highlight ? 'none' : '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '2px',
                      fontFamily: '"Teko", sans-serif',
                      fontSize: '1.05rem',
                      letterSpacing: '0.1em',
                      color: '#fff',
                      textDecoration: 'none',
                      boxShadow: plan.highlight ? '0 0 30px rgba(255,23,68,0.3)' : 'none',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!plan.highlight) {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,23,68,0.5)';
                        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,23,68,0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!plan.highlight) {
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.15)';
                        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      }
                    }}
                  >
                    {plan.ctaLabel} →
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 text-xs"
          style={{ color: '#4B5563', fontFamily: '"Inter", sans-serif' }}
        >
          * Valores sujeitos a alteração. Consulte a unidade mais próxima para condições especiais.
          Contratos sem fidelidade disponíveis.
        </motion.p>
      </div>
    </section>
  );
}
