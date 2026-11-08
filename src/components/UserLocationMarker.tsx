import { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';

interface UserLocationMarkerProps {
  position: { lat: number; lng: number };
}

export function UserLocationMarker({ position }: UserLocationMarkerProps) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: 'user-location-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        html: `
          <div class="user-dot-wrap" aria-hidden="true">
            <span class="user-pulse-ring"></span>
            <span class="user-dot"></span>
          </div>
        `,
      }),
    []
  );

  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={icon}
      zIndexOffset={700}
      interactive={false}
      title="Mevcut Konumunuz"
    />
  );
}
