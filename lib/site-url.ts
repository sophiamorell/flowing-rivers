/**
 * Public URL of the site, without a trailing slash.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once the domain is known (TODO 5).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
).replace(/\/+$/, "");
