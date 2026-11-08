import { Phone, Globe, Instagram } from 'lucide-react';
import { ICONS } from '../lib/assets';

interface HeaderProps {
  totalStoresCount: number;
}

export function Header({ totalStoresCount }: HeaderProps) {
  return (
    <header className="relative z-30 bg-[#0f2b1d] border-b border-[#d6b85f]/25 shadow-md">
      <div className="max-w-7xl mx-auto px-3 py-3 sm:py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href="https://balconyflowers.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#d6b85f] to-[#bc9d43] p-[2px] shadow-sm shrink-0 flex items-center justify-center transition-transform hover:scale-105"
              title="balconyflowers.com sitesini ziyaret et"
            >
              <div className="w-full h-full rounded-full bg-[#0f2b1d] flex items-center justify-center overflow-hidden">
                <img
                  src={ICONS.brandLogo()}
                  alt="Balcony Flower & Cafe"
                  className="w-full h-full object-cover"
                  width={56}
                  height={56}
                  decoding="async"
                />
              </div>
            </a>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[13px] sm:text-xs font-bold tracking-[0.1em] text-[#d6b85f] uppercase truncate">
                  Balcony Flowers
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12px] sm:text-[10px] font-semibold bg-[#143523] text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/25">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {totalStoresCount} Nokta
                </span>
              </div>
              <h1 className="font-serif text-[17px] sm:text-base font-bold text-[#f7f5ed] tracking-tight truncate leading-snug mt-0.5">
                Alanya Buket Satış Noktaları
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="https://balconyflowers.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto sm:px-2.5 sm:py-1.5 rounded-xl sm:rounded-lg text-base sm:text-xs font-semibold bg-[#143523] text-[#d6b85f] border border-[#d6b85f]/30 hover:bg-[#1a442d] transition-colors"
              title="Web Sitesi: https://balconyflowers.com/"
              aria-label="Web sitesi"
            >
              <Globe className="w-5 h-5 sm:w-3.5 sm:h-3.5 sm:mr-1 text-[#d6b85f]" />
              <span className="hidden md:inline">balconyflowers.com</span>
            </a>

            <a
              href="https://instagram.com/balcony_flowers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto sm:px-2.5 sm:py-1.5 rounded-xl sm:rounded-lg text-base sm:text-xs font-semibold bg-gradient-to-r from-purple-900/60 to-pink-900/60 text-pink-200 border border-pink-500/30 hover:brightness-110 transition-all"
              title="Instagram: @balcony_flowers"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 sm:w-3.5 sm:h-3.5 sm:mr-1 text-pink-300" />
              <span className="hidden sm:inline">@balcony_flowers</span>
            </a>

            <a
              href="https://wa.me/905523798373?text=Merhaba%2C%20Alanya%20Balcony%20Flowers%20buket%20sat%C4%B1%C5%9F%20noktalar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 min-h-12 px-3.5 sm:px-3 py-2.5 rounded-xl sm:rounded-lg text-[15px] sm:text-xs font-bold bg-[#d6b85f] text-[#0f2b1d] hover:bg-[#e6ca79] transition-all shadow-sm active:scale-95"
              title="Sipariş Hattı: +90 552 379 83 73"
              aria-label="WhatsApp sipariş"
            >
              <Phone className="w-5 h-5 sm:w-3.5 sm:h-3.5 fill-[#0f2b1d]" />
              <span className="sm:hidden font-semibold">Ara</span>
              <span className="hidden sm:inline font-mono">+90 552 379 83 73</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
