import type { AcademyUnit, GeoResult, HaversineInput, Modality, Testimonial } from './types';

// ─── Academy Units ──────────────────────────────────────────────────────────
export const ACADEMY_UNITS: AcademyUnit[] = [
  {
    id: 'boraceia',
    name: 'Boracéia',
    fullName: 'Imparáveis Prime Boracéia',
    lat: -22.1930,
    lon: -48.7830,
    whatsapp: '5514997966093',
    address: 'R. Terciliano Sgavioli, 790',
    city: 'Boracéia',
    neighborhood: 'Centro',
    mapUrl: 'https://maps.google.com/?q=R.+Terciliano+Sgavioli,+790,+Borac%C3%A9ia,+SP',
  },
  {
    id: 'pederneiras',
    name: 'Pederneiras',
    fullName: 'Imparáveis Prime Pederneiras',
    lat: -22.3500,
    lon: -48.7750,
    whatsapp: '5514990000000', // ← Inserir variável aqui
    address: 'R. Riachuelo - Jd Vista Alegre',
    city: 'Pederneiras',
    neighborhood: 'Jardim Vista Alegre',
    mapUrl: 'https://maps.google.com/?q=R.+Riachuelo,+Jd+Vista+Alegre,+Pederneiras,+SP',
  },
];

// ─── Haversine Distance Formula ─────────────────────────────────────────────
export function haversineDistance({ lat1, lon1, lat2, lon2 }: HaversineInput): number {
  const R = 6371; // Earth radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// ─── Find Nearest Unit ───────────────────────────────────────────────────────
export function findNearestUnit(userLat: number, userLon: number): GeoResult {
  let nearest = ACADEMY_UNITS[0];
  let minDistance = Infinity;

  for (const unit of ACADEMY_UNITS) {
    const dist = haversineDistance({
      lat1: userLat,
      lon1: userLon,
      lat2: unit.lat,
      lon2: unit.lon,
    });
    if (dist < minDistance) {
      minDistance = dist;
      nearest = unit;
    }
  }

  return { unit: nearest, distanceKm: minDistance, source: 'geolocation' };
}

// ─── Fallback Unit ────────────────────────────────────────────────────────────
export function getFallbackResult(): GeoResult {
  return {
    unit: ACADEMY_UNITS[0],
    distanceKm: 0,
    source: 'fallback',
  };
}

// ─── WhatsApp URL Builder ─────────────────────────────────────────────────────
export function buildWhatsAppUrl(unit: AcademyUnit, message?: string): string {
  const defaultMsg = encodeURIComponent(
    `Olá! Vim pelo site e quero saber mais sobre a Academia Imparáveis Prime em ${unit.city}. 💪`
  );
  return `https://wa.me/${unit.whatsapp}?text=${message ? encodeURIComponent(message) : defaultMsg}`;
}

// ─── Modalities Data ───────────────────────────────────────────────────────────
export const MODALITIES: Modality[] = [
  {
    id: 'performance',
    title: 'Treino de Performance',
    description: 'Protocolos de força, hipertrofia e condicionamento desenvolvidos para resultados reais. Sem atalhos.',
    tag: 'DESTAQUE',
    highlight: true,
    gradient: 'from-[#FF1744] to-[#FF8C42]',
    emoji: '⚡',
  },
  {
    id: 'fitdance',
    title: 'FitDance',
    description: 'Coreografias de alta energia que queimam calorias enquanto você se diverte. O cardio que você vai querer fazer.',
    tag: 'MAIS POPULAR',
    highlight: true,
    gradient: 'from-[#FF8C42] to-[#FF1744]',
    emoji: '🔥',
  },
  {
    id: 'musculacao',
    title: 'Musculação',
    description: 'Equipamentos premium e acompanhamento técnico para evoluir de forma consistente e segura.',
    tag: 'FUNDAMENTAL',
    highlight: false,
    gradient: 'from-[#2A2A2A] to-[#1E1E1E]',
    emoji: '🏋️',
  },
  {
    id: 'cardio',
    title: 'Cardio Funcional',
    description: 'Circuitos dinâmicos que aumentam a capacidade aeróbica e o metabolismo. Resultados em tempo recorde.',
    tag: 'RESULTADOS',
    highlight: false,
    gradient: 'from-[#2A2A2A] to-[#1E1E1E]',
    emoji: '🏃',
  },
  {
    id: 'alongamento',
    title: 'Mobilidade & Flex',
    description: 'Prevenção de lesões e melhora de amplitude de movimento. O diferencial dos atletas de elite.',
    tag: 'ESSENCIAL',
    highlight: false,
    gradient: 'from-[#2A2A2A] to-[#1E1E1E]',
    emoji: '🧘',
  },
];

// ─── Testimonials Data ─────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ana Beatriz S.',
    role: 'Aluna há 2 anos — Boracéia',
    text: 'Nunca pensei que treinar fosse se tornar o melhor momento do meu dia. A energia da academia é contagiante e os resultados falam por si.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Carlos Eduardo M.',
    role: 'Aluno há 1 ano — Pederneiras',
    text: 'Em 6 meses perdi 18kg e ganhei músculo. A equipe é diferenciada, o ambiente é sério mas acolhedor. Recomendo sem hesitar.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Fernanda Costa',
    role: 'Aluna há 8 meses — Boracéia',
    text: 'O FitDance transformou minha relação com exercício. Antes eu fugia da academia. Hoje mando os áudios cancelando compromissos pra não perder a aula.',
    rating: 5,
  },
];
