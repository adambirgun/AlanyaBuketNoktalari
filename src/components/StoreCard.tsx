import { StoreLocation, getDirectionsUrl, getWhatsAppUrl, formatDistance, getStoreOpenStatus } from '../data/stores';
import { Navigation, Clock, MapPin, MessageCircle, Sparkles, AlertCircle } from 'lucide-react';

interface StoreCardProps {
  store: StoreLocation;
  isSelected: boolean;
  distanceKm?: number;
  isClosest?: boolean;
  onSelect: (store: StoreLocation) => void;
}

export function StoreCard({ store, isSelected, distanceKm, isClosest, onSelect }: StoreCardProps) {
  const isBalcony = store.kind === 'balcony';
  const openStatus = getStoreOpenStatus(store);
  const directionsUrl = getDirectionsUrl(store.lat, store.lng);
  
  const whatsappMsg = openStatus.isOpen
    ? (store.whatsappMessage || `Merhaba, ${store.name} hakkında bilgi almak istiyorum.`)
    : `Merhaba, ${store.name} şu an kapalı görünüyor. Açılış için önceden buket siparişi / rezervasyonu bırakmak istiyorum.`;

  const whatsAppUrl = getWhatsAppUrl(store.phone || '+905523798373', whatsappMsg);

  return (
    <div
      onClick={() => onSelect(store)}
      className={`group relative rounded-2xl p-3 sm:p-3.5 cursor-pointer transition-all duration-200 border text-left overflow-hidden ${
        isSelected
          ? 'bg-[#143523] border-[#d6b85f] shadow-[0_12px_28px_-6px_rgba(214,184,95,0.35)] ring-1 ring-[#d6b85f]/60'
          : 'bg-[#0f2b1d]/85 border-[#d6b85f]/20 hover:border-[#d6b85f]/50 hover:bg-[#143523]/70'
      }`}
    >
      {/* Store Atmosphere Image Showcase */}
      <div className="relative w-full h-36 sm:h-40 rounded-xl overflow-hidden mb-3 bg-[#0a1c13] border border-[#d6b85f]/25">
        <img
          src={store.image}
          alt={`${store.name} buket reyonu ve çiçek atmosferi`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = store.fallbackImage;
          }}
        />
        {/* Soft vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b1d] via-[#0f2b1d]/30 to-black/20" />

        {/* Badges on top-left of image */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full backdrop-blur-md border shadow-sm ${
              isBalcony
                ? 'bg-[#d6b85f] text-[#0f2b1d] border-[#d6b85f]'
                : 'bg-[#0f2b1d]/90 text-emerald-300 border-emerald-400/40'
            }`}
          >
            {isBalcony && <Sparkles className="w-2.5 h-2.5" />}
            {store.badge}
          </span>
          {store.isFlagship && (
            <span className="text-[10px] font-bold bg-[#0f2b1d]/90 text-[#d6b85f] px-2 py-0.5 rounded-full border border-[#d6b85f]/40 backdrop-blur-md shadow-sm">
              Merkez
            </span>
          )}
        </div>

        {/* Live Status indicator on top-right of image */}
        <div className="absolute top-2 right-2">
          {openStatus.isOpen ? (
            <span className="text-[10px] font-bold text-emerald-200 bg-emerald-950/90 backdrop-blur-md border border-emerald-400/50 px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Açık
            </span>
          ) : (
            <span className="text-[10px] font-bold text-rose-200 bg-rose-950/90 backdrop-blur-md border border-rose-400/60 px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              Kapalı
            </span>
          )}
        </div>

        {/* Neighborhood & Distance badge at bottom of image */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold text-[#f7f5ed] flex items-center gap-1 drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#d6b85f]" />
            {store.neighborhood}
          </span>
          {distanceKm !== undefined && (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-md backdrop-blur-md ${
                isClosest
                  ? 'bg-[#d6b85f] text-[#0f2b1d] border-[#d6b85f]'
                  : 'bg-[#0f2b1d]/90 text-[#d6b85f] border-[#d6b85f]/40'
              }`}
            >
              {isClosest && '📍 '}{formatDistance(distanceKm)}
            </span>
          )}
        </div>
      </div>

      {/* Store Title */}
      <h3 className="font-serif text-base font-semibold text-[#f7f5ed] group-hover:text-[#d6b85f] transition-colors line-clamp-1 mb-1">
        {store.name}
      </h3>

      {/* Address */}
      <p className="text-xs text-[#f7f5ed]/70 flex items-start gap-1.5 mb-2 line-clamp-1 leading-relaxed">
        <MapPin className="w-3.5 h-3.5 text-[#d6b85f]/80 shrink-0 mt-0.5" />
        <span className="truncate">{store.address}</span>
      </p>

      {/* Hours */}
      <div className="flex items-center gap-1.5 text-[11px] text-[#d6b85f]/85 mb-2 font-medium">
        <Clock className="w-3 h-3 shrink-0" />
        <span>{store.hours}</span>
      </div>

      {/* QoL Warning Alert Box if Store is Currently Closed */}
      {!openStatus.isOpen ? (
        <div className="mb-2.5 p-2 rounded-xl bg-gradient-to-r from-rose-950/60 via-amber-950/40 to-rose-950/60 border border-rose-500/40 text-rose-100 text-[11px] leading-relaxed shadow-inner">
          <div className="flex items-center justify-between gap-1 font-bold text-rose-300 mb-0.5">
            <span className="flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
              Şu an Kapalı
            </span>
            <span className="text-[10px] text-amber-300 font-semibold">
              Açılış: {openStatus.openTimeFormatted}
            </span>
          </div>
          <p className="text-[10px] text-rose-200/80">
            {openStatus.nextEventText}. {store.isFlagship ? "Kapalı saatlerde de WhatsApp'tan ön sipariş verebilirsiniz." : "Açılış saatinde doğrudan reyonumuzdan buketinizi alabilirsiniz."}
          </p>
        </div>
      ) : (
        <div className="mb-2.5 text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{openStatus.nextEventText}</span>
        </div>
      )}

      {/* Highlights tags */}
      {store.highlights && store.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {store.highlights.slice(0, 3).map((item, idx) => (
            <span
              key={idx}
              className="text-[10px] text-[#f7f5ed]/60 bg-black/30 px-2 py-0.5 rounded-md border border-white/5"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#d6b85f]/15" onClick={(e) => e.stopPropagation()}>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-[#d6b85f] text-[#0f2b1d] hover:bg-[#e6ca79] transition-colors shadow-sm active:scale-[0.98]"
        >
          <Navigation className="w-3.5 h-3.5" />
          Yol Tarifi Al
        </a>
        {store.isFlagship && (
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              !openStatus.isOpen
                ? 'bg-amber-950/60 text-amber-300 border-amber-500/40 hover:bg-amber-900/70'
                : 'bg-[#143523] text-emerald-300 border-emerald-500/30 hover:bg-[#1a472f]'
            }`}
            title={!openStatus.isOpen ? 'Önceden Sipariş / Bilgi Al' : 'WhatsApp ile İletişime Geç'}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="text-[11px] font-medium hidden sm:inline">
              {!openStatus.isOpen ? 'Ön Sipariş' : 'WhatsApp'}
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
