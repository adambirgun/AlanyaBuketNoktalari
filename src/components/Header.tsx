import { Phone, Globe, Instagram, MapPin } from 'lucide-react';

interface HeaderProps {
  totalStoresCount: number;
}

export function Header({ totalStoresCount }: HeaderProps) {
  return (
    <header className="relative z-30 bg-[#0f2b1d] border-b border-[#d6b85f]/25 shadow-md">
      <div className="max-w-7xl mx-auto px-3 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <a
              href="https://balconyflowers.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#d6b85f] to-[#bc9d43] p-0.5 shadow-sm shrink-0 flex items-center justify-center transition-transform hover:scale-105"
              title="balconyflowers.com sitesini ziyaret et"
            >
              <div className="w-full h-full rounded-full bg-[#0f2b1d] flex items-center justify-center overflow-hidden">
                <img
                  src="/balcony.png"
                  alt="Balcony Flowers"
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) target.parentElement.innerHTML = '🌸';
                  }}
                />
              </div>
            </a>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.14em] text-[#d6b85f] uppercase truncate">
                  Balcony Flowers
                </span>
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold bg-[#143523] text-emerald-300 px-1.5 py-0.2 rounded-full border border-emerald-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {totalStoresCount} Nokta
                </span>
              </div>
              <h1 className="font-serif text-xs sm:text-base font-bold text-[#f7f5ed] tracking-tight truncate leading-tight">
                Alanya Buket Satış Noktaları
              </h1>
            </div>
          </div>

          {/* Social & Contact Actions (Instagram, Website, Order Phone) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Website Link */}
            <a
              href="https://balconyflowers.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-7 h-7 sm:w-auto sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold bg-[#143523] text-[#d6b85f] border border-[#d6b85f]/30 hover:bg-[#1a442d] transition-colors"
              title="Web Sitesi: https://balconyflowers.com/"
            >
              <Globe className="w-3.5 h-3.5 sm:mr-1 text-[#d6b85f]" />
              <span className="hidden md:inline">balconyflowers.com</span>
            </a>

            {/* Instagram Profile */}
            <a
              href="https://instagram.com/balcony_flowers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-7 h-7 sm:w-auto sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-900/60 to-pink-900/60 text-pink-200 border border-pink-500/30 hover:brightness-110 transition-all"
              title="Instagram: @balcony_flowers"
            >
              <Instagram className="w-3.5 h-3.5 sm:mr-1 text-pink-300" />
              <span className="hidden sm:inline">@balcony_flowers</span>
            </a>

            {/* Sipariş Telefonu / WhatsApp */}
            <a
              href="https://wa.me/905523798373?text=Merhaba%2C%20Alanya%20Balcony%20Flowers%20buket%20sat%C4%B1%C5%9F%20noktalar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold bg-[#d6b85f] text-[#0f2b1d] hover:bg-[#e6ca79] transition-all shadow-sm active:scale-95"
              title="Sipariş Hattı: +90 552 379 83 73"
            >
              <Phone className="w-3.5 h-3.5 fill-[#0f2b1d]" />
              <span className="hidden xs:inline sm:hidden font-mono">Sipariş</span>
              <span className="hidden sm:inline font-mono">+90 552 379 83 73</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
