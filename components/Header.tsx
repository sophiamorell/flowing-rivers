"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site, ui } from "@/content/site";
import { cx } from "@/lib/cx";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Sticky header. Transparent over the hero, gains a blurred cream background
 * once the page scrolls. Collapses to a keyboard-operable menu below md.
 * `solid` forces the background on pages without a hero (e.g. /privacy).
 */
export function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (mq.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);
  const showBg = solid || scrolled || open;

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        showBg
          ? "border-sand bg-cream/90 backdrop-blur"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 md:h-20">
        <Logo priority />

        <nav aria-label={ui.mainNav} className="hidden items-center gap-5 md:flex lg:gap-8">
          {site.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded text-[15px] font-medium text-navy-700 transition-colors hover:text-terracotta-700"
            >
              {link.label}
            </a>
          ))}
          <ButtonLink href={site.headerCta.href} className="whitespace-nowrap px-5 py-2.5">
            {site.headerCta.label}
          </ButtonLink>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-700 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? ui.closeMenu : ui.openMenu}</span>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-sand bg-cream md:hidden"
      >
        <nav aria-label={ui.mainNav} className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <ul className="flex flex-col">
            {site.nav.map((link, i) => (
              <li key={link.href}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={close}
                  className="block rounded-lg px-2 py-3 text-lg font-medium text-navy-700 hover:text-terracotta-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 pb-2">
            <ButtonLink
              href={site.headerCta.href}
              onClick={close}
              className="w-full"
            >
              {site.headerCta.label}
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
