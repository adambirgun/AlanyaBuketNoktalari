import { useMemo } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { StoreLocation } from '../data/stores';
import { ICONS } from '../lib/assets';

interface MapMarkerProps {
  store: StoreLocation;
  isSelected: boolean;
  onSelect: (store: StoreLocation) => void;
}

export function MapMarker({ store, isSelected, onSelect }: MapMarkerProps) {
  const isBalcony = store.kind === 'balcony';
  const iconSrc = isBalcony ? ICONS.balcony() : ICONS.migros();
  const size = isBalcony ? (isSelected ? 52 : 44) : isSelected ? 48 : 40;

  const icon = useMemo(
    () =>
      L.divIcon({
        className: 'balcony-map-marker',
        iconSize: [Math.max(size, 96), size + 22],
        iconAnchor: [Math.max(size, 96) / 2, size + 18],
        html: `
          <div class="marker-wrap${isSelected ? ' is-selected' : ''}" data-kind="${isBalcony ? 'balcony' : 'migros'}">
            ${isSelected ? '<span class="marker-glow" aria-hidden="true"></span>' : ''}
            <div class="marker-icon-shell">
              <img src="${iconSrc}" alt="" width="${size}" height="${size}" decoding="async" draggable="false" />
              ${store.isFlagship ? '<span class="marker-star" aria-hidden="true">★</span>' : ''}
            </div>
            <span class="marker-label">${escapeHtml(store.neighborhood)}</span>
          </div>
        `,
      }),
    [iconSrc, isBalcony, isSelected, size, store.isFlagship, store.neighborhood]
  );

  return (
    <Marker
      position={[store.lat, store.lng]}
      icon={icon}
      zIndexOffset={isSelected ? 600 : isBalcony ? 400 : 200}
      eventHandlers={{
        click: (event) => {
          L.DomEvent.stopPropagation(event.originalEvent);
          onSelect(store);
        },
      }}
      title={store.name}
    />
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
