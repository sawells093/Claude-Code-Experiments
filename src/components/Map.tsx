import { useEffect, useRef } from 'react';
import * as mapboxgl from 'mapbox-gl';
import type { Location } from '../types';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

interface MapProps {
  location: Location | null;
  onMapLoad?: () => void;
}

export default function Map({ location, onMapLoad }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme to match mockup
      center: location ? [location.longitude, location.latitude] : [0, 20],
      zoom: location ? 14 : 2,
    });

    // Remove default controls for cleaner look
    // map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      if (onMapLoad) onMapLoad();
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [onMapLoad, location]);

  // Update map when location changes
  useEffect(() => {
    if (!map.current || !location) return;

    const { latitude, longitude } = location;

    // Fly to the new location
    map.current.flyTo({
      center: [longitude, latitude],
      zoom: 14,
      duration: 2000,
      pitch: 0, // Flat view
    });

    // Remove existing marker
    if (marker.current) {
      marker.current.remove();
    }

    // Create custom marker element with blue dot and glow
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `
      <div class="marker-glow"></div>
      <div class="marker-dot"></div>
    `;

    // Add new marker with custom element
    marker.current = new mapboxgl.Marker({ element: el })
      .setLngLat([longitude, latitude])
      .addTo(map.current);

  }, [location]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '32px',
        overflow: 'hidden',
      }}
    />
  );
}
