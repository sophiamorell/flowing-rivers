"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { site, ui } from "@/content/site";
import { cx } from "@/lib/cx";
import { Container } from "@/components/ui/Section";

const ROTATE_MS = 9000;

/**
 * Rotating testimonial banner. Auto-advances every 9 seconds; pauses while
 * hovered, focused, or expanded; never auto-advances for people who prefer
 * reduced motion. Previous/next buttons and dots are keyboard-operable and the
 * quote region is announced politely when it changes.
 */
export function Testimonials() {
  const { testimonials } = site;
  const items = testimonials.items;
  const total = items.length;

  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || expanded || reducedMotion || total < 2) return;
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % total);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, expanded, reducedMotion, total]);

  const go = (n: number) => {
    setIndex(((n % total) + total) % total);
    setExpanded(false);
  };

  const item = items[index];
  const hasMore = item.quote !== item.excerpt;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
      className="scroll-mt-20 bg-terracotta-600 py-16 text-cream md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cream/80">
              {testimonials.eyebrow}
            </p>
            <h2 id="testimonials-heading" className="mt-3 text-3xl text-cream md:text-4xl">
              {testimonials.heading}
            </h2>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
            <NavButton onClick={() => go(index - 1)} label={ui.previousTestimonial}>
              <ChevronLeft aria-hidden="true" size={22} strokeWidth={1.75} />
            </NavButton>
            <NavButton onClick={() => go(index + 1)} label={ui.nextTestimonial}>
              <ChevronRight aria-hidden="true" size={22} strokeWidth={1.75} />
            </NavButton>
          </div>
        </div>

        <div
          aria-live="polite"
          aria-atomic="true"
          className="mt-10 min-h-[14rem] md:min-h-[12rem]"
        >
          <figure key={index} className="reveal-in max-w-3xl">
            <Quote aria-hidden="true" size={32} strokeWidth={1.5} className="text-cream/60" />
            <blockquote className="mt-4 font-serif text-xl leading-snug text-cream md:text-2xl">
              <p>“{expanded ? item.quote : item.excerpt}”</p>
            </blockquote>
            <figcaption className="mt-5 text-[15px] font-medium text-cream/90">
              {item.name}, {item.age}
              <span className="sr-only">
                . {ui.testimonialLabel} {index + 1} {ui.of} {total}
              </span>
            </figcaption>
            {hasMore && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-4 rounded text-[15px] font-semibold text-cream underline decoration-cream/50 underline-offset-4 hover:decoration-cream"
              >
                {expanded ? ui.showLess : ui.readFullTestimonial}
              </button>
            )}
          </figure>
        </div>

        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex gap-2" role="group" aria-label={testimonials.eyebrow}>
            {items.map((t, i) => (
              <button
                key={t.name + t.age}
                type="button"
                onClick={() => go(i)}
                aria-label={`${ui.testimonialLabel} ${i + 1} ${ui.of} ${total}: ${t.name}`}
                aria-current={i === index ? "true" : undefined}
                className="flex h-11 w-7 items-center justify-center rounded"
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    "block h-2.5 w-2.5 rounded-full transition-colors",
                    i === index ? "bg-cream" : "bg-cream/40 hover:bg-cream/70",
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2 sm:hidden">
            <NavButton onClick={() => go(index - 1)} label={ui.previousTestimonial}>
              <ChevronLeft aria-hidden="true" size={22} strokeWidth={1.75} />
            </NavButton>
            <NavButton onClick={() => go(index + 1)} label={ui.nextTestimonial}>
              <ChevronRight aria-hidden="true" size={22} strokeWidth={1.75} />
            </NavButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/50 text-cream transition-colors hover:bg-cream hover:text-terracotta-700 focus-visible:outline-cream"
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}
