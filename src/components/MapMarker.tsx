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
  const label = store.mapLabel || store.neighborhood;

  const icon = useMemo(
    () =>
      L.divIcon({
        className: 'balcony-map-marker',
        // Wide enough for short label; height covers icon + optional label
        iconSize: [112, 96],
        iconAnchor: [56, 78],
        html: `
          <div class="marker-wrap${isSelected ? ' is-selected' : ''}" data-kind="${isBalcony ? 'balcony' : 'migros'}">
            ${isSelected ? '<span class="marker-glow" aria-hidden="true"></span>' : ''}
            <div class="marker-icon-shell">
              <img src="${iconSrc}" alt="" decoding="async" draggable="false" />
              ${store.isFlagship ? '<span class="marker-star" aria-hidden="true">★</span>' : ''}
            </div>
            <span class="marker-label">${escapeHtml(label)}</span>
          </div>
        `,
      }),
    [iconSrc, isBalcony, isSelected, label, store.isFlagship]
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
