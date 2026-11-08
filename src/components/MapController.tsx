import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { StoreLocation } from '../data/stores';

interface MapControllerProps {
  selectedStore: StoreLocation | null;
  userLocation: { lat: number; lng: number } | null;
  focusUser: boolean;
}

export function MapController({ selectedStore, userLocation, focusUser }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (focusUser && userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 0.8 });
      return;
    }

    if (selectedStore) {
      map.flyTo([selectedStore.lat, selectedStore.lng], 15, { duration: 0.7 });
    }
  }, [map, selectedStore, userLocation, focusUser]);

  return null;
}
