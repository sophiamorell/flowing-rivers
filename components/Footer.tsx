import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { site, ui } from "@/content/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  const links = [site.footer.homeLink, ...site.nav, site.footer.privacyLink];

  return (
    <footer className="bg-navy-900 text-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo variant="light" />
            <p className="mt-4 text-sm text-cream/85">{site.tagline}</p>
            <address className="mt-6 space-y-2 text-[15px] not-italic">
              <p className="flex items-center gap-2.5">
                <MapPin aria-hidden="true" size={18} strokeWidth={1.5} className="shrink-0 text-river-300" />
                <span>{site.location.display}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone aria-hidden="true" size={18} strokeWidth={1.5} className="shrink-0 text-river-300" />
                <a
                  href={`tel:${site.phone.tel}`}
                  className="rounded underline decoration-river-300/60 underline-offset-4 hover:decoration-cream"
                >
                  {site.phone.display}
                </a>
              </p>
              {/* E-38: business email */}
              <p className="flex items-center gap-2.5">
                <Mail aria-hidden="true" size={18} strokeWidth={1.5} className="shrink-0 text-river-300" />
                <a
                  href={`mailto:${site.email}`}
                  className="rounded underline decoration-river-300/60 underline-offset-4 hover:decoration-cream"
                >
                  {site.email}
                </a>
              </p>
            </address>
          </div>

          <nav aria-label={ui.footerNav} className="md:col-span-3">
            <ul className="space-y-2 text-[15px]">
              {links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("#") ? (
                    <a href={`/${l.href}`} className="rounded hover:underline hover:underline-offset-4">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="rounded hover:underline hover:underline-offset-4">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            {/* Brief section 8: boundary statement and crisis line, always visible. */}
            <p className="text-sm leading-relaxed text-cream/85">{site.footer.disclaimer}</p>
            <p className="mt-4 text-sm font-medium">{site.footer.crisisLine}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6 text-sm text-cream/70">
          <p>
            © {year} {site.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
