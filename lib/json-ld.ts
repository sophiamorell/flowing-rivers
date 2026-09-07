import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/**
 * Local business structured data for search engines.
 * TODO 12: add a street address here once Allison confirms one (or leave
 * it off if she works virtually + by arrangement only).
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${siteUrl}/#business`,
    name: site.name,
    description: site.meta.description,
    url: siteUrl,
    email: site.email,
    image: `${siteUrl}${site.meta.ogImage.src}`,
    logo: `${siteUrl}/logo-mark.png`,
    founder: {
      "@type": "Person",
      name: site.owner.fullName,
      jobTitle: site.owner.role,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.stateCode,
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: `${site.location.city}, ${site.location.stateCode}` },
      { "@type": "State", name: site.location.state },
    ],
    priceRange: "$$",
    sameAs: [], // TODO 13: social profiles, if any
  };
}
