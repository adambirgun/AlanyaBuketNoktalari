import { useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { 
  STORES, 
  ALANYA_CENTER, 
  StoreLocation, 
  calculateDistanceKm, 
  formatDistance, 
  getDirectionsUrl, 
  getWhatsAppUrl,
  getStoreOpenStatus
} from './data/stores';
import { Header } from './components/Header';
import { StoreListPanel } from './components/StoreListPanel';
import { MapMarker } from './components/MapMarker';
import { MapController } from './components/MapController';
import { UserLocationMarker } from './components/UserLocationMarker';
import { LocationErrorModal } from './components/LocationErrorModal';
import { 
  Navigation, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Compass, 
  List, 
  Sparkles,
  ShoppingBag,
  ChevronRight,
  X,
  Phone
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

function MapClickClear({ onClear }: { onClear: () => void }) {
  useMapEvents({
    click: () => onClear(),
  });
  return null;
}

export default function App() {
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [isLocationError, setIsLocationError] = useState(false);
  const [locationErrorCode, setLocationErrorCode] = useState<number | null>(null);
  const [showLocationErrorModal, setShowLocationErrorModal] = useState(false);
  const [focusUser, setFocusUser] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mapFilter, setMapFilter] = useState<'all' | 'balcony' | 'migros'>('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // User Geolocation Handler
  const handleLocateMe = useCallback(() => {
    setShowLocationErrorModal(false);
    setLocationErrorCode(null);

    if (!navigator.geolocation) {
      setLocationStatus('Tarayıcınız konum servisini desteklemiyor.');
      setIsLocationError(true);
      setLocationErrorCode(2);
      setShowLocationErrorModal(true);
      return;
    }

    setIsLocating(true);
    setLocationStatus('GPS konumunuz alınıyor...');
    setIsLocationError(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });
        setIsLocating(false);
        setIsLocationError(false);
        setShowLocationErrorModal(false);
        setLocationErrorCode(null);
        setFocusUser(true);

        // Find the closest store
        let closestStore: StoreLocation | null = null;
        let minDistance = Infinity;

        STORES.forEach((store) => {
          const dist = calculateDistanceKm(userLat, userLng, store.lat, store.lng);
          if (dist < minDistance) {
            minDistance = dist;
            closestStore = store;
          }
        });

        if (closestStore) {
          const storeName = (closestStore as StoreLocation).name;
          setSelectedStore(closestStore);
          setLocationStatus(`En yakın nokta: ${storeName} (${formatDistance(minDistance)})`);
        } else {
          setLocationStatus('Konumunuz belirlendi.');
        }

        setTimeout(() => setFocusUser(false), 1200);
      },
      (error) => {
        setIsLocating(false);
        setIsLocationError(true);
        setLocationErrorCode(error.code);
        setShowLocationErrorModal(true);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus('Konum izni reddedildi. Tarayıcınızdan izin verebilirsiniz.');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setLocationStatus('Konum bilgisi alınamadı.');
        } else {
          setLocationStatus('Konum zaman aşımına uğradı.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  const handleSelectStore = (store: StoreLocation) => {
    setSelectedStore(store);
    setFocusUser(false);
  };

  // Filtered stores on the map
  const visibleStores = useMemo(() => {
    if (mapFilter === 'balcony') {
      return STORES.filter((s) => s.kind === 'balcony');
    }
    if (mapFilter === 'migros') {
      return STORES.filter((s) => s.kind === 'migros');
    }
    return STORES;
  }, [mapFilter]);

  // Selected store distance calculation
  const selectedDistance = useMemo(() => {
    if (!selectedStore || !userLocation) return null;
    const km = calculateDistanceKm(
      userLocation.lat,
      userLocation.lng,
      selectedStore.lat,
      selectedStore.lng
    );
    return formatDistance(km);
  }, [selectedStore, userLocation]);

  // Selected store operating status (Quality of Life real-time analysis)
  const selectedStoreOpenStatus = useMemo(() => {
    return selectedStore ? getStoreOpenStatus(selectedStore) : null;
  }, [selectedStore]);

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#0f2b1d] text-[#f7f5ed] overflow-hidden select-none">
      {/* Top Header - Mobile First, Clean & Compact */}
      <Header totalStoresCount={STORES.length} />

      {/* Main Workspace (Mobile-First full screen map with responsive panels) */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Desktop Left Sidebar: Store List Panel */}
        <aside
          className={`hidden md:block w-[380px] lg:w-[420px] shrink-0 h-full transition-all duration-300 z-10 ${
            sidebarCollapsed ? 'md:-ml-[380px] lg:-ml-[420px]' : ''
          }`}
        >
          <StoreListPanel
            selectedStore={selectedStore}
            onSelectStore={handleSelectStore}
            userLocation={userLocation}
            onLocateMe={handleLocateMe}
            isLocating={isLocating}
            locationStatus={locationStatus}
            isLocationError={isLocationError}
            onOpenErrorGuidance={() => setShowLocationErrorModal(true)}
          />
        </aside>

        {/* Sidebar Toggle Button for Desktop */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden md:flex absolute top-4 z-20 items-center justify-center w-8 h-8 rounded-lg bg-[#0f2b1d]/90 text-[#d6b85f] border border-[#d6b85f]/40 shadow-lg hover:bg-[#143523] transition-all"
          style={{
            left: sidebarCollapsed ? '16px' : 'calc(min(420px, 100vw) - 16px)',
          }}
          title={sidebarCollapsed ? 'Listeyi Göster' : 'Listeyi Gizle'}
        >
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-300 ${
              sidebarCollapsed ? 'rotate-0' : 'rotate-180'
            }`}
          />
        </button>

        {/* Full-bleed OpenStreetMap — no API key, production-safe for public GitHub Pages */}
        <main className="flex-1 relative h-full w-full">
            <div className="w-full h-full relative">
              <MapContainer
                center={[ALANYA_CENTER.lat, ALANYA_CENTER.lng]}
                zoom={12}
                className="w-full h-full z-0 store-map"
                scrollWheelZoom
                attributionControl
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright" rel="noopener noreferrer" target="_blank">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={19}
                  crossOrigin
                />

                <MapController
                  selectedStore={selectedStore}
                  userLocation={userLocation}
                  focusUser={focusUser}
                />

                {visibleStores.map((store) => (
                  <MapMarker
                    key={store.id}
                    store={store}
                    isSelected={selectedStore?.id === store.id}
                    onSelect={handleSelectStore}
                  />
                ))}

                {userLocation && <UserLocationMarker position={userLocation} />}
                <MapClickClear onClear={() => setSelectedStore(null)} />
              </MapContainer>

              {/* Floating Filter Chips over the Map (Mobile & Desktop) */}
              <div className="absolute top-3 left-3 right-3 sm:right-auto z-[1100] flex items-center gap-1.5 overflow-x-auto pb-1 pointer-events-auto">
                <div className="glass-panel p-1 rounded-xl flex items-center gap-1 shadow-lg border border-[#d6b85f]/30">
                  <button
                    onClick={() => setMapFilter('all')}
                    className={`px-3.5 py-2.5 md:py-1.5 rounded-lg text-[15px] md:text-xs font-bold transition-all ${
                      mapFilter === 'all'
                        ? 'bg-[#d6b85f] text-[#0f2b1d] shadow-sm'
                        : 'text-[#f7f5ed]/80 hover:text-white'
                    }`}
                  >
                    Tümü (9)
                  </button>
                  <button
                    onClick={() => setMapFilter('balcony')}
                    className={`px-3 py-2.5 md:py-1.5 rounded-lg text-[15px] md:text-xs font-bold flex items-center gap-1.5 transition-all ${
                      mapFilter === 'balcony'
                        ? 'bg-[#d6b85f] text-[#0f2b1d] shadow-sm'
                        : 'text-[#f7f5ed]/80 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 md:w-3 md:h-3 text-[#d6b85f]" />
                    Balcony (2)
                  </button>
                  <button
                    onClick={() => setMapFilter('migros')}
                    className={`px-3 py-2.5 md:py-1.5 rounded-lg text-[15px] md:text-xs font-bold flex items-center gap-1.5 transition-all ${
                      mapFilter === 'migros'
                        ? 'bg-[#d6b85f] text-[#0f2b1d] shadow-sm'
                        : 'text-[#f7f5ed]/80 hover:text-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 md:w-3 md:h-3 text-emerald-400" />
                    Migros (7)
                  </button>
                </div>
              </div>

              {/* Floating GPS Button on Map */}
              <div className="absolute top-3 right-3 z-[1100] pointer-events-auto">
                <button
                  type="button"
                  onClick={handleLocateMe}
                  disabled={isLocating}
                  className="flex items-center justify-center gap-1.5 min-w-12 min-h-12 md:min-w-0 md:min-h-0 px-3.5 py-3 md:py-2 rounded-xl bg-[#0f2b1d]/95 hover:bg-[#143523] text-[#d6b85f] border border-[#d6b85f]/40 shadow-xl backdrop-blur-md text-[15px] md:text-xs font-bold transition-all active:scale-95 disabled:opacity-75"
                  title="En yakın satış noktasını bul"
                  aria-label={userLocation ? 'Konumumu yenile' : 'En yakın buket'}
                >
                  <Compass className={`w-6 h-6 md:w-4 md:h-4 ${isLocating ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">
                    {userLocation ? 'Konumumu Yenile' : 'En Yakın Buket'}
                  </span>
                </button>
              </div>

              {/* Animated Location Error Guidance Banner / Modal */}
              <LocationErrorModal
                isOpen={showLocationErrorModal}
                errorCode={locationErrorCode}
                errorMessage={locationStatus || 'Konum bilgisine ulaşılamadı.'}
                onRetry={handleLocateMe}
                onDismiss={() => setShowLocationErrorModal(false)}
                onSelectMainStore={() => {
                  const mainStore = STORES.find((s) => s.isFlagship) || STORES[0];
                  handleSelectStore(mainStore);
                }}
              />

              {/* Single Unified Store Detail Card (Mobile & Desktop) */}
              {selectedStore && (
                <div className="absolute z-[1200] pointer-events-auto bottom-16 left-2.5 right-2.5 sm:left-4 sm:right-4 md:bottom-6 md:right-6 md:left-auto md:w-[380px] md:max-w-md animate-in slide-in-from-bottom duration-200">
                  <div className="glass-panel p-3.5 sm:p-4 rounded-2xl shadow-2xl border border-[#d6b85f]/50 bg-[#0f2b1d]/95 backdrop-blur-xl">
                    <div className="flex gap-2.5 sm:gap-3 mb-2.5 items-start">
                      {/* Store Atmosphere Image Thumbnail */}
                      <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-[#0a1c13] border border-[#d6b85f]/30 shadow-md">
                        <img
                          src={selectedStore.image}
                          alt={selectedStore.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.src = selectedStore.fallbackImage;
                          }}
                        />
                        <span className="absolute bottom-1 left-1 px-1 py-0.5 rounded text-[8px] font-bold bg-[#0f2b1d]/90 text-[#d6b85f] uppercase tracking-wider">
                          {selectedStore.badge}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold text-[#d6b85f] uppercase tracking-wider">
                            {selectedStore.badge}
                          </span>
                          <span className="text-[10px] text-[#f7f5ed]/60">·</span>
                          <span className="text-[10px] text-[#f7f5ed]/80 font-medium truncate">
                            {selectedStore.neighborhood}
                          </span>
                        </div>
                        <h4 className="font-serif text-[16px] sm:text-base font-bold text-[#f7f5ed] truncate leading-tight mt-0.5">
                          {selectedStore.name}
                        </h4>
                        <p className="text-[13px] sm:text-[11px] text-[#f7f5ed]/75 line-clamp-2 sm:line-clamp-1 mt-0.5 flex items-start gap-1">
                          <MapPin className="w-4 h-4 sm:w-3 sm:h-3 text-[#d6b85f] shrink-0 mt-0.5" />
                          <span>{selectedStore.address}</span>
                        </p>
                        <div className="flex items-center gap-1.5 text-[13px] sm:text-[11px] text-[#f7f5ed]/70 mt-1 font-medium">
                          <Clock className="w-4 h-4 sm:w-3 sm:h-3 text-[#d6b85f] shrink-0" />
                          <span>{selectedStore.hours}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedStore(null)}
                        className="text-white/60 hover:text-white p-1.5 rounded-full bg-white/5 hover:bg-white/10 shrink-0 transition-colors"
                        aria-label="Kapat"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quality of Life Operating Hours & Live Status */}
                    {selectedStoreOpenStatus && (
                      <div className="mb-2.5">
                        {selectedStoreOpenStatus.isOpen ? (
                          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{selectedStoreOpenStatus.statusText} · {selectedStoreOpenStatus.nextEventText}</span>
                          </div>
                        ) : (
                          <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-rose-950/70 via-amber-950/40 to-rose-950/70 border border-rose-500/40 text-rose-100 text-[11px] shadow-sm">
                            <div className="flex items-center justify-between gap-1 font-bold text-rose-300">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                Şu an Kapalı
                              </span>
                              <span className="text-[10px] text-amber-300 font-semibold">
                                Açılış: {selectedStoreOpenStatus.openTimeFormatted}
                              </span>
                            </div>
                            <p className="text-[10px] text-rose-200/80 mt-1 leading-snug">
                              {selectedStoreOpenStatus.nextEventText}. {selectedStore.isFlagship ? "Kapalı saatlerde de WhatsApp'tan ön sipariş verebilirsiniz." : "Açılış saatinde doğrudan reyonumuzdan buketinizi alabilirsiniz."}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedDistance && (
                      <div className="text-[10px] sm:text-[11px] font-bold text-[#d6b85f] mb-2.5">
                        📍 Konumunuza mesafe: {selectedDistance}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <a
                        href={getDirectionsUrl(selectedStore.lat, selectedStore.lng)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 sm:py-2 px-3 rounded-xl text-[15px] sm:text-xs font-bold bg-[#d6b85f] text-[#0f2b1d] hover:bg-[#e6ca79] transition-all shadow-sm active:scale-95"
                      >
                        <Navigation className="w-5 h-5 sm:w-3.5 sm:h-3.5" />
                        Yol Tarifi
                      </a>

                      {selectedStore.isFlagship && (
                        <>
                          <a
                            href={getWhatsAppUrl(
                              selectedStore.phone || '+905523798373',
                              selectedStoreOpenStatus && !selectedStoreOpenStatus.isOpen
                                ? `Merhaba, ${selectedStore.name} şu an kapalı görünüyor. Açılış için önceden buket siparişi / rezervasyonu bırakmak istiyorum.`
                                : selectedStore.whatsappMessage ||
                                  `Merhaba, ${selectedStore.name} hakkında bilgi almak istiyorum.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 sm:px-3 rounded-xl border transition-all flex items-center gap-1 text-xs font-semibold ${
                              selectedStoreOpenStatus && !selectedStoreOpenStatus.isOpen
                                ? 'bg-amber-950/70 text-amber-300 border-amber-500/40 hover:bg-amber-900/80'
                                : 'bg-[#143523] text-emerald-300 border-emerald-500/40 hover:bg-[#1a442d]'
                            }`}
                            title={
                              selectedStoreOpenStatus && !selectedStoreOpenStatus.isOpen
                                ? 'Ön Sipariş Bırak'
                                : 'WhatsApp Sipariş'
                            }
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-[11px] font-bold">
                              {selectedStoreOpenStatus && !selectedStoreOpenStatus.isOpen
                                ? 'Ön Sipariş'
                                : 'WhatsApp'}
                            </span>
                          </a>

                          <a
                            href="tel:+905523798373"
                            className="p-2 rounded-xl bg-white/5 text-[#f7f5ed] border border-white/10 hover:bg-white/10 transition-colors"
                            title="Telefonla Ara"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Bottom Navigation Bar (Persistent on Mobile) */}
              <div className="md:hidden absolute bottom-2 left-2.5 right-2.5 z-[1100] pointer-events-auto">
                <div className="glass-panel p-1.5 rounded-2xl flex items-center justify-between gap-1.5 shadow-2xl border border-[#d6b85f]/30">
                  <button
                    onClick={() => setMobileDrawerOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 min-h-[52px] py-3.5 px-3 rounded-xl text-[16px] font-bold bg-[#143523] text-[#d6b85f] border border-[#d6b85f]/30 active:scale-95 transition-all"
                  >
                    <List className="w-6 h-6" />
                    Tüm Noktalar
                  </button>

                  <button
                    onClick={handleLocateMe}
                    disabled={isLocating}
                    className="flex-1 flex items-center justify-center gap-2 min-h-[52px] py-3.5 px-3 rounded-xl text-[16px] font-bold bg-[#d6b85f] text-[#0f2b1d] active:scale-95 transition-all shadow-sm"
                  >
                    <Compass className={`w-6 h-6 ${isLocating ? 'animate-spin' : ''}`} />
                    En Yakın
                  </button>
                </div>
              </div>
            </div>
        </main>
      </div>

      {/* Mobile Drawer / Slide-up Sheet for All Locations */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200">
          <div 
            className="w-full h-[85vh] rounded-t-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <StoreListPanel
              selectedStore={selectedStore}
              onSelectStore={(store) => {
                handleSelectStore(store);
                setMobileDrawerOpen(false);
              }}
              userLocation={userLocation}
              onLocateMe={handleLocateMe}
              isLocating={isLocating}
              locationStatus={locationStatus}
              isLocationError={isLocationError}
              onCloseMobile={() => setMobileDrawerOpen(false)}
              onOpenErrorGuidance={() => {
                setMobileDrawerOpen(false);
                setShowLocationErrorModal(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
