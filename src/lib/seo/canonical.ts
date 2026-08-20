export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bg-remover-one-blush.vercel.app';

/**
 * Returns a fully qualified absolute canonical URL for a given relative path.
 * Strips tracking query parameters and normalizes trailing slashes.
 */
export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') return SITE_URL;
  return `${SITE_URL}${cleanPath.replace(/\/$/, '')}`;
}
