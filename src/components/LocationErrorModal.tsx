import { MapPinOff, AlertTriangle, RefreshCw, X, ShieldAlert, Sparkles } from 'lucide-react';

interface LocationErrorModalProps {
  isOpen: boolean;
  errorCode: number | null; // 1: PERMISSION_DENIED, 2: POSITION_UNAVAILABLE, 3: TIMEOUT
  errorMessage: string;
  onRetry: () => void;
  onDismiss: () => void;
  onSelectMainStore: () => void;
}

export function LocationErrorModal({
  isOpen,
  errorCode,
  errorMessage,
  onRetry,
  onDismiss,
  onSelectMainStore,
}: LocationErrorModalProps) {
  if (!isOpen) return null;

  const isPermissionDenied = errorCode === 1;

  return (
    <div className="absolute top-16 left-3 right-3 sm:left-auto sm:right-4 sm:max-w-md z-40 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-amber-500/40 shadow-[0_20px_45px_rgba(0,0,0,0.7)] text-[#f7f5ed] relative overflow-hidden backdrop-blur-xl">
        {/* Subtle decorative background gradient */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-2.5 relative">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-950/80 to-rose-950/80 border border-amber-500/40 text-amber-400 shrink-0 shadow-sm">
              <MapPinOff className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#f7f5ed] leading-tight">
                {isPermissionDenied ? 'Konum İzni Verilmedi' : 'Konumunuza Ulaşılamadı'}
              </h3>
              <p className="text-[11px] text-amber-300/90 font-medium">
                {isPermissionDenied ? 'Size en yakın buketi bulabilmemiz için izin gerekiyor' : errorMessage}
              </p>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Guidance Content */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-[#0a1c13]/70 border border-amber-500/25 mb-3.5 space-y-2 text-xs text-[#f7f5ed]/85">
          {isPermissionDenied ? (
            <>
              <p className="font-semibold text-amber-300 flex items-center gap-1.5 text-[11px]">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                Nasıl İzin Verebilirsiniz?
              </p>
              <ol className="space-y-1.5 text-[11px] text-[#f7f5ed]/80 list-decimal list-inside pl-0.5 leading-relaxed">
                <li>
                  Tarayıcınızın adres çubuğundaki <strong>kilit (🔒)</strong> veya <strong>site ayarları</strong> simgesine dokunun.
                </li>
                <li>
                  <strong>&quot;Konum&quot;</strong> iznini <strong>&quot;İzin Ver&quot;</strong> yapın ve aşağıdaki butona tıklayın.
                </li>
              </ol>
            </>
          ) : (
            <p className="text-[11px] text-amber-200/90 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Cihazınızın GPS servisi kapalı olabilir veya sinyal alınamıyor olabilir.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold bg-[#d6b85f] text-[#0f2b1d] hover:bg-[#e6ca79] transition-all shadow-md active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Tekrar Dene
          </button>

          <button
            type="button"
            onClick={() => {
              onSelectMainStore();
              onDismiss();
            }}
            className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold bg-[#143523] text-emerald-300 border border-emerald-500/30 hover:bg-[#1b462f] transition-all"
            title="Balcony Flowers Ana Atölye ve Kafeyi Göster"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d6b85f]" />
            <span className="hidden xs:inline">Ana Mağazayı Göster</span>
            <span className="xs:hidden">Ana Mağaza</span>
          </button>
        </div>
      </div>
    </div>
  );
}
