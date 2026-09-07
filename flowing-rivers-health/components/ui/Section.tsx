import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Tone = "cream" | "sand";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/**
 * A page section: generous vertical padding, alternating cream/sand
 * background, and scroll-margin so anchors clear the sticky header.
 */
export function Section({
  id,
  labelledBy,
  tone = "cream",
  className,
  children,
}: {
  id: string;
  labelledBy: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(
        "relative scroll-mt-20 py-20 md:py-28",
        tone === "sand" ? "bg-sand" : "bg-cream",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Small uppercase label above a section heading. The only all-caps text on the site. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "text-xs font-semibold uppercase tracking-[0.22em] text-terracotta-700",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("max-w-2xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 text-3xl leading-[1.15] md:text-4xl">
        {children}
      </h2>
    </div>
  );
}
