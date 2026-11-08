/** Safe public asset URL (works with GitHub Pages base path). */
export function assetUrl(path: string): string {
  const clean = path.replace(/^\//, '');
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${clean}`;
}

export const ICONS = {
  /** Header / brand mark — official Balcony Flower & Cafe logo */
  brandLogo: () => assetUrl('apple-touch-icon.png'),
  /** Map pin for Balcony stores */
  balcony: () => assetUrl('balcony.png'),
  migros: () => assetUrl('migros-pin.png'),
  favicon: () => assetUrl('favicon-32x32.png'),
  appleTouchIcon: () => assetUrl('apple-touch-icon.png'),
} as const;
