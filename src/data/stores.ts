import { ICONS, assetUrl } from '../lib/assets';

export interface StoreLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  kind: 'balcony' | 'migros';
  badge: string;
  neighborhood: string;
  /** Short pin label for the map (mobile-friendly). */
  mapLabel: string;
  address: string;
  hours: string;
  openHour: number;
  openMinute: number;
  closeHour: number;
  closeMinute: number;
  image: string;
  fallbackImage: string;
  phone?: string;
  whatsappMessage?: string;
  highlights: string[];
  isFlagship?: boolean;
}

export interface StoreOpenStatus {
  isOpen: boolean;
  statusText: 'Şu an Açık' | 'Şu an Kapalı' | 'Kapanmak Üzere';
  badgeColor: 'emerald' | 'rose' | 'amber';
  openingHoursText: string;
  nextEventText: string;
  openTimeFormatted: string;
  closeTimeFormatted: string;
  minutesUntilOpen?: number;
  minutesUntilClose?: number;
}

export const STORES: StoreLocation[] = [
  {
    id: 'balcony-flowers-cafe-magaza',
    name: 'Balcony Flowers & Cafe Mağaza',
    lat: 36.538000,
    lng: 32.048588,
    kind: 'balcony',
    badge: 'Ana Mağaza & Çiçek Kafe',
    neighborhood: 'Oba',
    mapLabel: 'Oba',
    address: 'Oba Mah. Eczacılar Cad. Çalış Sitesi A Blok No:12/A, Alanya',
    hours: '08:30 - 22:30 · Her gün açık',
    openHour: 8,
    openMinute: 30,
    closeHour: 22,
    closeMinute: 30,
    image: assetUrl('stores/ana-magaza.jpg'),
    fallbackImage: ICONS.balcony(),
    phone: '+905523798373',
    whatsappMessage: 'Merhaba Balcony Flowers Oba Mağazası için buket ve çiçek aranjmanı bilgisi almak istiyorum.',
    highlights: ['Özel Tasarım Buketler', 'Taze Kesme Çiçekler', 'Saksı & Vazo', 'Kafe Alanı', 'Hızlı Teslimat'],
    isFlagship: true,
  },
  {
    id: 'balcony-corner-alanyum',
    name: 'Balcony Corner (Alanyum AVM)',
    lat: 36.543716,
    lng: 32.031787,
    kind: 'balcony',
    badge: 'AVM Satış Noktası',
    neighborhood: 'Cumhuriyet (Alanyum)',
    mapLabel: 'Alanyum',
    address: 'Cumhuriyet Mah. Keykubat Blv. No:219 Alanyum AVM Giriş Katı, Alanya',
    hours: '10:00 - 22:00 · Her gün açık',
    openHour: 10,
    openMinute: 0,
    closeHour: 22,
    closeMinute: 0,
    image: assetUrl('stores/alanyum-corner.jpg'),
    fallbackImage: ICONS.balcony(),
    phone: '+905523798373',
    whatsappMessage: 'Merhaba Alanyum Balcony Corner buket çeşitleri hakkında bilgi almak istiyorum.',
    highlights: ['Günlük Taze Buketler', 'Hediye Hazır Paketler', 'Kolay Otopark', 'Hızlı Alışveriş'],
    isFlagship: false,
  },
  {
    id: 'otogar-mm-migros',
    name: 'Otogar MM Migros',
    lat: 36.554786,
    lng: 31.973351,
    kind: 'migros',
    badge: 'Migros Buket Standı',
    neighborhood: 'Kızlar Pınarı (Otogar)',
    mapLabel: 'Otogar',
    address: 'Kızlar Pınarı Mah. Şerifler Sok. Alanya Şehirlerarası Otogar Yanı',
    hours: '08:30 - 22:00 · Her gün açık',
    openHour: 8,
    openMinute: 30,
    closeHour: 22,
    closeMinute: 0,
    image: assetUrl('stores/otogar-migros.jpg'),
    fallbackImage: ICONS.migros(),
    phone: '+905523798373',
    whatsappMessage: 'Merhaba Otogar MM Migros Balcony Flowers buket standı hakkında bilgi almak istiyorum.',
    highlights: ['Günlük Taze Teslimat', 'Özel Ambalajlı Buketler', 'Korumalı Su Tüpleri'],
  },
  {
    id: 'sahil-mm-migros',
    name: 'Sahil MM Migros',
    lat: 36.544166,
    lng: 32.007259,
    kind: 'migros',
    badge: 'Migros Buket Standı',
    neighborhood: 'Güller Pınarı (Sahil)',
    mapLabel: 'Sahil',
    address: 'Güller Pınarı Mah. Ahmet Tokuş Bulvarı Sahil Yolu, Alanya',
    hours: '08:30 - 22:00 · Her gün açık',
    openHour: 8,
    openMinute: 30,
    closeHour: 22,
    closeMinute: 0,
    image: assetUrl('stores/sahil-migros.jpg'),
    fallbackImage: ICONS.migros(),
    phone: '+905523798373',
    whatsappMessage: 'Merhaba Sahil MM Migros Balcony Flowers buket standı hakkında bilgi almak istiyorum.',
    highlights: ['Sahil Kordonunda', 'Taze Çiçek Standı', 'Özel Kartlı Buketler'],
  },
  {
    id: '5m-migros',
    name: '5M Migros (Alanya Merkez)',
    lat: 36.546879,
    lng: 32.026385,
    kind: 'migros',
    badge: '5M Migros Buket Standı',
    neighborhood: 'Cumhuriyet',
    mapLabel: '5M',
    address: 'Cumhuriyet Mah. Ahmet Tokuş Bulvarı 5M Migros İçi, Alanya',
    hours: '09:00 - 22:00 · Her gün açık',
    openHour: 9,
    openMinute: 0,
    closeHour: 22,
    closeMinute: 0,
    image: assetUrl('stores/5m-migros.jpg'),
    fallbackImage: ICONS.migros(),
    phone: '+905523798373',
    whatsappMessage: 'Merhaba 5M Migros Alanya Balcony Flowers buket reyonu hakkında bilgi almak istiyorum.',
    highlights: ['Geniş Buket Çeşidi', 'Özel Vazo Alternatifleri', 'Gül & Kır Çiçekleri'],
  },
  {
    id: 'tosmur-mmm-migros',
    name: 'Tosmur MMM Migros',
    lat: 36.531704,
    lng: 32.046578,
    kind: 'migros',
    badge: 'MMM Migros Buket Standı',
    neighborhood: 'Tosmur',
    mapLabel: 'Tosmur',
    address: 'Tosmur Mah. Sahil Cad. No:2 Dimçayı Giriş Bölgesi, Alanya',
    hours: '08:30 - 22:00 · Her gün açık',
    openHour: 8,
    openMinute: 30,
    closeHour: 22,
    closeMinute: 0,
    image: assetUrl('stores/tosmur-migros.jpg'),
    fallbackImage: ICONS.migros(),
    phone: '+905523798373',
    whatsappMessage: 'Merhaba Tosmur MMM Migros Balcony Flowers çiçek standı hakkında bilgi almak istiyorum.',
    highlights: ['Dimçayı Yakını', 'Taze Buketler', 'Hızlı Al-Çık'],
  },
  {
    id: 'mahmutlar-vatan-mmm-migros',
    name: 'Mahmutlar Vatan MMM Migros',
    lat: 36.494412,
    lng: 32.090036,
    kind: 'migros',
    badge: 'MMM Migros Buket Standı',
    neighborhood: 'Mahmutlar (Vatan Cad.)',
    mapLabel: 'Vatan',
    address: 'Mahmutlar Mah. Vatan Cad. No:18, Alanya',
    hours: '08:30 - 22:00 · Her gün açık',
    openHour: 8,
    openMinute: 30,
    closeHour: 22,
    closeMinute: 0,
    image: assetUrl('stores/mahmutlar-vatan-migros.jpg'),
    fallbackImage: ICONS.migros(),
    phone: '+905523798373',
    whatsappMessage: 'Merhaba Mahmutlar Vatan MMM Migros Balcony Flowers buket standı hakkında bilgi almak istiyorum.',
    highlights: ['Doğu Alanya Bölgesi', 'Günlük Taze Buketler', 'Özel Ambalaj'],
  },
  {
    id: 'mahmutlar-mmm-migros',
    name: 'Mahmutlar MMM Migros (Barbaros)',
    lat: 36.485734,
    lng: 32.099537,
    kind: 'migros',
    badge: 'MMM Migros Buket Standı',
    neighborhood: 'Mahmutlar (Barbaros Cad.)',
    mapLabel: 'Barbaros',
    address: 'Mahmutlar Mah. Barbaros Cad. No:142, Alanya',
    hours: '08:30 - 22:00 · Her gün açık',
    openHour: 8,
    openMinute: 30,
    closeHour: 22,
    closeMinute: 0,
    image: assetUrl('stores/mahmutlar-barbaros-migros.jpg'),
    fallbackImage: ICONS.migros(),
    phone: '+905523798373',
    whatsappMessage: 'Merhaba Mahmutlar Barbaros MMM Migros Balcony Flowers çiçek standı hakkında bilgi almak istiyorum.',
    highlights: ['Barbaros Caddesi Üzeri', 'Taze Çiçek Seçenekleri', 'Şık Tasarımlar'],
  },
  {
    id: 'kargicak-premium-migros',
    name: 'Kargıcak Premium Migros',
    lat: 36.464642,
    lng: 32.121368,
    kind: 'migros',
    badge: 'Migros Buket Standı',
    neighborhood: 'Kargıcak',
    mapLabel: 'Kargıcak',
    address: 'Kargıcak Mah. Sahil Yolu Cad. No:62/A, Alanya',
    hours: '08:30 - 22:00 · Her gün açık',
    openHour: 8,
    openMinute: 30,
    closeHour: 22,
    closeMinute: 0,
    image: assetUrl('stores/kargicak-migros.jpg'),
    fallbackImage: ICONS.migros(),
    phone: '+905523798373',
    whatsappMessage: 'Merhaba Kargıcak Migros Balcony Flowers buket standı hakkında bilgi almak istiyorum.',
    highlights: ['En Doğu Satış Noktası', 'Taze Premium Buketler'],
  },
];

export const ALANYA_CENTER = {
  lat: 36.536,
  lng: 32.030,
};

// Calculate distance between two coordinates in kilometers (Haversine formula)
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

export function getDirectionsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat.toFixed(6)},${lng.toFixed(6)}&dir_action=navigate&travelmode=driving`;
}

export function getWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function getStoreOpenStatus(store: StoreLocation, dateOverride?: Date): StoreOpenStatus {
  const now = dateOverride || new Date();

  // Format current time in Turkey timezone (Europe/Istanbul)
  const formatter = new Intl.DateTimeFormat('tr-TR', {
    timeZone: 'Europe/Istanbul',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const currentTotalMinutes = hour * 60 + minute;

  const openTotalMinutes = store.openHour * 60 + store.openMinute;
  const closeTotalMinutes = store.closeHour * 60 + store.closeMinute;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const openTimeFormatted = `${pad(store.openHour)}:${pad(store.openMinute)}`;
  const closeTimeFormatted = `${pad(store.closeHour)}:${pad(store.closeMinute)}`;
  const openingHoursText = `${openTimeFormatted} - ${closeTimeFormatted}`;

  // Check if open
  if (currentTotalMinutes >= openTotalMinutes && currentTotalMinutes < closeTotalMinutes) {
    const minutesLeft = closeTotalMinutes - currentTotalMinutes;
    if (minutesLeft <= 45) {
      return {
        isOpen: true,
        statusText: 'Kapanmak Üzere',
        badgeColor: 'amber',
        openingHoursText,
        openTimeFormatted,
        closeTimeFormatted,
        nextEventText: `${minutesLeft} dakika sonra (${closeTimeFormatted}) kapanıyor`,
        minutesUntilClose: minutesLeft,
      };
    }
    return {
      isOpen: true,
      statusText: 'Şu an Açık',
      badgeColor: 'emerald',
      openingHoursText,
      openTimeFormatted,
      closeTimeFormatted,
      nextEventText: `Bugün saat ${closeTimeFormatted}'ye kadar açık`,
    };
  }

  // Check if closed (has not opened yet today)
  if (currentTotalMinutes < openTotalMinutes) {
    const minutesUntilOpen = openTotalMinutes - currentTotalMinutes;
    return {
      isOpen: false,
      statusText: 'Şu an Kapalı',
      badgeColor: 'rose',
      openingHoursText,
      openTimeFormatted,
      closeTimeFormatted,
      nextEventText: `Bugün saat ${openTimeFormatted}'da açılacak`,
      minutesUntilOpen,
    };
  }

  // Closed for the night, will open tomorrow morning
  return {
    isOpen: false,
    statusText: 'Şu an Kapalı',
    badgeColor: 'rose',
    openingHoursText,
    openTimeFormatted,
    closeTimeFormatted,
    nextEventText: `Yarın saat ${openTimeFormatted}'da açılacak`,
  };
}
