import { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { StoreLocation } from '../data/stores';

interface MapControllerProps {
  selectedStore: StoreLocation | null;
  userLocation: { lat: number; lng: number } | null;
  focusUser: boolean;
}

export function MapController({ selectedStore, userLocation, focusUser }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (focusUser && userLocation) {
      map.panTo({ lat: userLocation.lat, lng: userLocation.lng });
      map.setZoom(14);
      return;
    }

    if (selectedStore) {
      map.panTo({ lat: selectedStore.lat, lng: selectedStore.lng });
      map.setZoom(15);
    }
  }, [map, selectedStore, userLocation, focusUser]);

  return null;
}
