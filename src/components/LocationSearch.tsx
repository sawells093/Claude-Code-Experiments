import { useEffect, useRef } from 'react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import type { Location } from '../types';

interface LocationSearchProps {
  onLocationSelect: (location: Location) => void;
}

export default function LocationSearch({ onLocationSelect }: LocationSearchProps) {
  const geocoderContainer = useRef<HTMLDivElement>(null);
  const geocoder = useRef<MapboxGeocoder | null>(null);

  useEffect(() => {
    if (!geocoderContainer.current || geocoder.current) return;

    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    geocoder.current = new MapboxGeocoder({
      accessToken: accessToken,
      types: 'country,region,place,postcode,locality,neighborhood',
      placeholder: 'Search for a location...',
      marker: false, // We'll handle markers in the Map component
      render: function(item) {
        return `<div class="mapboxgl-ctrl-geocoder--suggestion-item">
          <div class="mapboxgl-ctrl-geocoder--suggestion-title">${item.text}</div>
          <div class="mapboxgl-ctrl-geocoder--suggestion-address">${item.place_name.replace(item.text + ', ', '')}</div>
        </div>`;
      },
    });

    geocoder.current.addTo(geocoderContainer.current);

    // Handle location selection
    geocoder.current.on('result', (e) => {
      const result = e.result;
      const [longitude, latitude] = result.center;

      onLocationSelect({
        latitude,
        longitude,
        name: result.place_name,
      });
    });

    // Force background color on suggestions when they appear
    geocoder.current.on('results', () => {
      setTimeout(() => {
        const suggestionsEl = document.querySelector('.mapboxgl-ctrl-geocoder--suggestions');
        if (suggestionsEl instanceof HTMLElement) {
          suggestionsEl.style.backgroundColor = '#18181C';
          suggestionsEl.style.borderRadius = '16px';
        }
      }, 0);
    });

    return () => {
      if (geocoder.current) {
        geocoder.current.clear();
      }
    };
  }, [onLocationSelect]);

  return (
    <div
      ref={geocoderContainer}
      style={{
        width: '100%',
        maxWidth: '500px',
      }}
    />
  );
}
