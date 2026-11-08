/** Safe public asset URL (works with GitHub Pages base path). */
export function assetUrl(path: string): string {
  const clean = path.replace(/^\//, '');
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${clean}`;
}

export const ICONS = {
  balcony: () => assetUrl('balcony.png'),
  migros: () => assetUrl('migros-balcony-pin.png'),
  favicon: () => assetUrl('favicon.svg'),
} as const;
