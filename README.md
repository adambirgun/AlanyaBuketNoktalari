# Balcony Flowers · Alanya Buket Satış Noktaları

Alanya’daki Balcony Flowers buket satış noktalarını haritada gösteren web uygulaması.

**Canlı sayfa:** https://adambirgun.github.io/AlanyaBuketNoktalari/

## Güvenlik

- **API anahtarı yok.** Google Maps SDK kullanılmaz; harita OpenStreetMap + CARTO ile çalışır.
- Repoda `.env` / secret tutulmaz. Public GitHub Pages için anahtar sızıntısı riski yoktur.
- Yol tarifi tıklanınca kullanıcının kendi tarayıcısında Google Maps açılır (harici link; anahtar gerekmez).
- Marker ikonları yalnızca `public/` altındaki yerel dosyalardır.

## Sitenize gömme (iframe)

```html
<iframe
  src="https://adambirgun.github.io/AlanyaBuketNoktalari/"
  title="Alanya Buket Satış Noktaları"
  style="width:100%;min-height:720px;height:85vh;border:0;"
  allow="geolocation"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
></iframe>
```

## Yerel çalıştırma

```bash
npm install
npm run dev
```

## Yayınlama

`main` kaynağı güncellendikten sonra production build `gh-pages` dalına statik olarak yayınlanır:

```bash
npm run build
# dist içeriği GitHub Pages (gh-pages) olarak deploy edilir
```

## Teknoloji

React + Vite + Tailwind + Leaflet (OpenStreetMap)
