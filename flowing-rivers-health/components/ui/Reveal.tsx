import type { CSSProperties, ReactNode } from "react";

/**
 * Fade-and-rise on scroll (400ms, 12px, staggered by `delay`).
 *
 * This is a server component: it only stamps `data-reveal` on the element.
 * One small inline script in app/layout.tsx (see lib/reveal-script.ts)
 * watches those elements with IntersectionObserver. Content is visible by
 * default, so nothing depends on JavaScript, and the animation is disabled
 * entirely under prefers-reduced-motion (see globals.css).
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  /** Stagger in ms. Use index * 60 inside a grid. */
  delay?: number;
  as?: "div" | "li" | "article" | "figure";
  className?: string;
}) {
  return (
    <Tag
      data-reveal=""
      suppressHydrationWarning
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
