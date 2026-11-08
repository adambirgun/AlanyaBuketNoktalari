import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { StoreLocation } from '../data/stores';

interface MapMarkerProps {
  store: StoreLocation;
  isSelected: boolean;
  onSelect: (store: StoreLocation) => void;
}

export function MapMarker({ store, isSelected, onSelect }: MapMarkerProps) {
  const isBalcony = store.kind === 'balcony';

  return (
    <AdvancedMarker
      position={{ lat: store.lat, lng: store.lng }}
      onClick={() => onSelect(store)}
      title={store.name}
      zIndex={isSelected ? 60 : isBalcony ? 40 : 20}
    >
      <div className="relative group cursor-pointer flex flex-col items-center select-none">
        {/* Soft radial glow when selected or hovered */}
        {isSelected && (
          <div className="absolute -inset-2 rounded-full bg-[#d6b85f]/60 blur-lg animate-pulse pointer-events-none" />
        )}

        {/* 100% Transparent Icon Container - No solid box background */}
        <div
          className={`relative bg-transparent transition-all duration-200 transform ${
            isSelected
              ? 'scale-125 -translate-y-1 drop-shadow-[0_8px_16px_rgba(214,184,95,0.7)]'
              : 'hover:scale-115 active:scale-95 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]'
          }`}
        >
          {isBalcony ? (
            <img
              src="/balcony.png"
              alt="Balcony Flowers"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain bg-transparent block"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = '🌸';
                  target.parentElement.className = 'text-3xl filter drop-shadow-md';
                }
              }}
            />
          ) : (
            <img
              src="/migros-balcony-pin.png"
              alt="Migros Satış Noktası"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain bg-transparent block"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = '🛒';
                  target.parentElement.className = 'text-2xl filter drop-shadow-md';
                }
              }}
            />
          )}

          {/* Flagship Star Badge for Main Store */}
          {store.isFlagship && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d6b85f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#d6b85f] text-[#0f2b1d] text-[8px] font-black items-center justify-center shadow-sm">
                ★
              </span>
            </span>
          )}
        </div>

        {/* Clean Minimalist Neighborhood Label */}
        <div
          className={`mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap shadow-md pointer-events-none transition-all duration-150 backdrop-blur-md ${
            isSelected
              ? 'bg-[#d6b85f] text-[#0f2b1d] font-bold border border-[#0f2b1d]/40 scale-105'
              : 'bg-[#0f2b1d]/85 text-[#f7f5ed] border border-[#d6b85f]/30 opacity-90 group-hover:opacity-100'
          }`}
        >
          {store.neighborhood}
        </div>
      </div>
    </AdvancedMarker>
  );
}
