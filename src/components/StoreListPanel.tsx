import { useState, useMemo } from 'react';
import { StoreLocation, STORES, calculateDistanceKm } from '../data/stores';
import { StoreCard } from './StoreCard';
import { Search, Compass, Sparkles, ShoppingBag, X } from 'lucide-react';

interface StoreListPanelProps {
  selectedStore: StoreLocation | null;
  onSelectStore: (store: StoreLocation) => void;
  userLocation: { lat: number; lng: number } | null;
  onLocateMe: () => void;
  isLocating: boolean;
  locationStatus: string | null;
  isLocationError: boolean;
  onCloseMobile?: () => void;
  onOpenErrorGuidance?: () => void;
}

export function StoreListPanel({
  selectedStore,
  onSelectStore,
  userLocation,
  onLocateMe,
  isLocating,
  locationStatus,
  isLocationError,
  onCloseMobile,
  onOpenErrorGuidance,
}: StoreListPanelProps) {
  const [filterType, setFilterType] = useState<'all' | 'balcony' | 'migros'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate distance for each store if user location is available
  const storesWithDistance = useMemo(() => {
    return STORES.map((store) => {
      const distanceKm = userLocation
        ? calculateDistanceKm(userLocation.lat, userLocation.lng, store.lat, store.lng)
        : undefined;
      return {
        ...store,
        distanceKm,
      };
    });
  }, [userLocation]);

  // Sort and filter stores
  const filteredStores = useMemo(() => {
    let result = storesWithDistance;

    // Filter by type
    if (filterType === 'balcony') {
      result = result.filter((s) => s.kind === 'balcony');
    } else if (filterType === 'migros') {
      result = result.filter((s) => s.kind === 'migros');
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.neighborhood.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.badge.toLowerCase().includes(q)
      );
    }

    // If user location is known, sort by closest first
    if (userLocation) {
      result = [...result].sort((a, b) => {
        if (a.distanceKm === undefined) return 1;
        if (b.distanceKm === undefined) return -1;
        return a.distanceKm - b.distanceKm;
      });
    }

    return result;
  }, [storesWithDistance, filterType, searchQuery, userLocation]);

  const closestStoreId = useMemo(() => {
    if (!userLocation || storesWithDistance.length === 0) return null;
    const sorted = [...storesWithDistance].sort((a, b) => (a.distanceKm || 999) - (b.distanceKm || 999));
    return sorted[0]?.id || null;
  }, [userLocation, storesWithDistance]);

  return (
    <div className="flex flex-col h-full bg-[#0f2b1d] border-r border-[#d6b85f]/20 text-[#f7f5ed]">
      {/* Mobile Header / Grab Handle */}
      {onCloseMobile && (
        <div className="flex items-center justify-between p-3 border-b border-[#d6b85f]/20 bg-[#143523]/90 md:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d6b85f]" />
            <h2 className="font-serif font-bold text-sm text-[#f7f5ed]">
              Alanya Satış Noktaları ({filteredStores.length})
            </h2>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80"
            aria-label="Listeyi kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search and Location Action */}
      <div className="p-3 sm:p-4 border-b border-[#d6b85f]/20 space-y-2.5 bg-[#143523]/70">
        {/* Geolocation Button */}
        <div>
          <button
            type="button"
            onClick={onLocateMe}
            disabled={isLocating}
            className={`w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
              isLocating
                ? 'bg-[#1f4a33] text-[#d6b85f] cursor-wait'
                : 'bg-gradient-to-r from-[#d6b85f] to-[#e6ca79] text-[#0f2b1d] hover:brightness-105 active:scale-[0.98]'
            }`}
          >
            <Compass className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            {isLocating
              ? 'Konumunuz Hesaplanıyor...'
              : userLocation
              ? 'Konumumu Güncelle & En Yakını Bul'
              : 'En Yakın Satış Noktasını Bul'}
          </button>

          {locationStatus && (
            <div
              onClick={isLocationError && onOpenErrorGuidance ? onOpenErrorGuidance : undefined}
              role={isLocationError ? 'button' : undefined}
              className={`mt-2 text-xs px-2.5 py-1.5 rounded-lg border text-center transition-all ${
                isLocationError
                  ? 'bg-rose-950/80 border-rose-500/50 text-rose-200 cursor-pointer hover:bg-rose-900/90 shadow-sm flex items-center justify-center gap-1.5'
                  : 'bg-[#0f2b1d] border-[#d6b85f]/40 text-[#d6b85f]'
              }`}
            >
              <span>{locationStatus}</span>
              {isLocationError && onOpenErrorGuidance && (
                <span className="underline font-bold text-[11px] text-amber-300 ml-1">
                  Rehberi Aç
                </span>
              )}
            </div>
          )}
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#d6b85f]/70 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Semt veya cadde ara (Oba, Sahil, Mahmutlar...)"
            className="w-full bg-[#0a1c13] text-xs sm:text-sm text-[#f7f5ed] placeholder-[#f7f5ed]/40 pl-8 pr-7 py-2 rounded-xl border border-[#d6b85f]/30 focus:outline-none focus:border-[#d6b85f] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
              filterType === 'all'
                ? 'bg-[#d6b85f] text-[#0f2b1d]'
                : 'bg-black/30 text-[#f7f5ed]/70 hover:text-[#f7f5ed] border border-white/5'
            }`}
          >
            Tümü (9)
          </button>
          <button
            onClick={() => setFilterType('balcony')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              filterType === 'balcony'
                ? 'bg-[#d6b85f] text-[#0f2b1d]'
                : 'bg-black/30 text-[#f7f5ed]/70 hover:text-[#f7f5ed] border border-white/5'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#d6b85f]" />
            Balcony (2)
          </button>
          <button
            onClick={() => setFilterType('migros')}
            className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              filterType === 'migros'
                ? 'bg-[#d6b85f] text-[#0f2b1d]'
                : 'bg-black/30 text-[#f7f5ed]/70 hover:text-[#f7f5ed] border border-white/5'
            }`}
          >
            <ShoppingBag className="w-3 h-3 text-emerald-400" />
            Migros (7)
          </button>
        </div>
      </div>

      {/* Stores List Header Info */}
      <div className="px-3.5 py-1.5 bg-[#0a1c13]/60 flex items-center justify-between text-[11px] text-[#d6b85f]/80 font-medium border-b border-[#d6b85f]/15">
        <span>
          {filteredStores.length} Satış Noktası
          {userLocation ? ' · En Yakından Uzağa' : ''}
        </span>
        {userLocation && (
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            GPS Aktif
          </span>
        )}
      </div>

      {/* Scrollable Store Cards */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-3.5 space-y-2.5">
        {filteredStores.length > 0 ? (
          filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              isSelected={selectedStore?.id === store.id}
              distanceKm={store.distanceKm}
              isClosest={store.id === closestStoreId}
              onSelect={(s) => {
                onSelectStore(s);
                if (onCloseMobile) onCloseMobile();
              }}
            />
          ))
        ) : (
          <div className="text-center py-10 px-4 space-y-2">
            <p className="text-sm font-semibold text-[#d6b85f]">Sonuç Bulunamadı</p>
            <p className="text-xs text-[#f7f5ed]/60">
              Arama kriterinize uygun nokta bulunamadı.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
              }}
              className="mt-2 px-3 py-1.5 rounded-lg text-xs bg-[#d6b85f]/20 text-[#d6b85f] border border-[#d6b85f]/30"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
