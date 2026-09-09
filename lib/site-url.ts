/**
 * Public URL of the site, without a trailing slash.
 * NEXT_PUBLIC_SITE_URL overrides this at build time. The default is the
 * domain implied by Allison's email address. TODO 5: confirm the domain is
 * registered and pointed at the host before launch.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.flowingrivershealth.com"
).replace(/\/+$/, "");
