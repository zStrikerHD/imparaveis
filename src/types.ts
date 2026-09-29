// Academy unit type definition
export interface AcademyUnit {
  id: string;
  name: string;
  fullName: string;
  lat: number;
  lon: number;
  whatsapp: string;
  address: string;
  city: string;
  neighborhood: string;
  mapUrl: string;
}

// Geolocation result with distance and source
export interface GeoResult {
  unit: AcademyUnit;
  distanceKm: number;
  source: 'geolocation' | 'fallback';
}

// Haversine input parameters
export interface HaversineInput {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

// Modality card type
export interface Modality {
  id: string;
  title: string;
  description: string;
  tag: string;
  highlight: boolean;
  gradient: string;
  emoji: string;
}

// Testimonial type
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}
