# Balcony Flowers · Alanya Buket Satış Noktaları

Alanya’daki Balcony Flowers buket satış noktalarını haritada gösteren web uygulaması.

**Canlı sayfa:** https://adambirgun.github.io/AlanyaBuketNoktalari/

## Sitenize gömme (iframe)

Kendi sitenizde bir sayfa veya bölüm olarak şöyle gömebilirsiniz:

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

- `allow="geolocation"` “en yakın nokta” özelliğinin iframe içinde çalışması için gerekli.
- WordPress / Elementor / özel HTML bloklarına aynı kodu yapıştırabilirsiniz.

## Yerel çalıştırma

1. `npm install`
2. `.env.example` dosyasını `.env.local` olarak kopyalayın ve `VITE_GOOGLE_MAPS_API_KEY` değerini girin
3. `npm run dev`

## GitHub Pages yayınlama

Push sonrası GitHub Actions otomatik derleyip yayınlar.

1. Repo secret ekleyin: **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `VITE_GOOGLE_MAPS_API_KEY`
   - Value: Google Maps API anahtarınız
2. Google Cloud’da anahtarın HTTP referrer kısıtlarına şunları ekleyin:
   - `https://adambirgun.github.io/*`
   - Sitenizin domain’i (ör. `https://siteniz.com/*`)
   - Yerel test için: `http://localhost:3000/*`
3. `main` dalına push edin veya Actions’tan **Deploy to GitHub Pages** workflow’unu manuel çalıştırın

## Teknoloji

React + Vite + Tailwind + Google Maps (`@vis.gl/react-google-maps`)
