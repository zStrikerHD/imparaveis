import { useState, useEffect } from 'react';
import type { GeoResult } from '../types';
import { findNearestUnit, getFallbackResult } from '../data';

export type GeoStatus = 'idle' | 'loading' | 'resolved' | 'denied' | 'error';

export interface UseGeolocationReturn {
  geoResult: GeoResult;
  status: GeoStatus;
}

const GEO_TIMEOUT_MS = 5000;

export function useGeolocation(): UseGeolocationReturn {
  const [geoResult, setGeoResult] = useState<GeoResult>(getFallbackResult());
  const [status, setStatus] = useState<GeoStatus>('idle');

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoResult(getFallbackResult());
      setStatus('error');
      return;
    }

    setStatus('loading');

    const timeoutId = setTimeout(() => {
      setGeoResult(getFallbackResult());
      setStatus('error');
    }, GEO_TIMEOUT_MS);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        const result = findNearestUnit(
          position.coords.latitude,
          position.coords.longitude
        );
        setGeoResult(result);
        setStatus('resolved');
      },
      () => {
        clearTimeout(timeoutId);
        setGeoResult(getFallbackResult());
        setStatus('denied');
      },
      { timeout: GEO_TIMEOUT_MS, maximumAge: 60000 }
    );

    return () => clearTimeout(timeoutId);
  }, []);

  return { geoResult, status };
}
